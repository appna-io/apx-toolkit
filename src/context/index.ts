/**
 * Global Context System for @apx-ui/toolkit
 * Provides a centralized configuration mechanism for the library
 */

import { getLanguageByLocale, LANGUAGES } from '../constants/languages.js';
import { getCurrencyForRegion } from '../constants/regions.js';
import Persister from '../persister/index.js';

/**
 * Storage persistence options
 */
export type PersistOption = 'localStorage' | 'sessionStorage' | 'memory' | false;

/**
 * Configuration options for the library
 */
export interface ApxContextOptions {
    apxLangStorageKey?: string;
    defaultLanguage?: keyof typeof LANGUAGES;
    defaultLocale?: string;
    defaultCurrency?: string;
    defaultTimezone?: string;
    defaultRegion?: string;
    configStorageKey?: string;
    persist?: PersistOption;
    fallbackLocale?: string;
    debug?: boolean;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<ApxContextOptions> = {
    defaultLanguage: 'en',
    defaultLocale: 'en-US',
    defaultCurrency: 'USD',
    defaultTimezone: 'UTC',
    defaultRegion: 'US',
    configStorageKey: 'apxConfig',
    apxLangStorageKey: 'apxLang',
    persist: 'localStorage',
    fallbackLocale: 'en-US',
    debug: false
};

/**
 * Internal context state
 */
class ApxContext {
    private config: Required<ApxContextOptions> = { ...DEFAULT_CONFIG };
    private initialized = false;
    private memoryStorage: Map<string, string> = new Map();

    /**
     * Check if code is running in browser environment
     */
    public isBrowser(): boolean {
        try {
            return !!(globalThis.window && globalThis.window.localStorage);
        } catch {
            return false;
        }
    }

    /**
     * Clean up expired TTL items in sessionStorage
     */
    private cleanupExpiredTTL(): void {
        if (!this.isBrowser()) {
            return;
        }
        
        try {
            Persister.cleanupExpiredTTL('localStorage');
            Persister.cleanupExpiredTTL('sessionStorage');
        } catch (error) {
            this.log('Failed to cleanup expired TTL items:', error);
        }
    }

    /**
     * Debug logging helper
     */
    private log(...args: any[]): void {
        if (this.config.debug) {
            // eslint-disable-next-line no-console
            console.log('[ApxContext]', ...args);
        }
    }

    /**
     * Get config from storage safely using the new Persister utility
     */
    private getStoredConfig(persist?: PersistOption): Partial<ApxContextOptions> | null {
        if (!persist && this.config.persist === false) {
            return this.memoryStorage.get('config') ? JSON.parse(this.memoryStorage.get('config')!) : null;
        }
        
        if (!this.isBrowser()) {
            return this.memoryStorage.get('config') ? JSON.parse(this.memoryStorage.get('config')!) : null;
        }
        
        try {
            let storedConfig: string | null | undefined = null;
            
            switch (persist || this.config.persist) {
                case 'localStorage':
                    if (Persister.isAvailable()) {
                        storedConfig = Persister.getLocalStorage<string>(this.config.configStorageKey);
                    } else {
                        storedConfig = window.localStorage.getItem(this.config.configStorageKey);
                    }
                    break;
                case 'sessionStorage':
                    if (Persister.isAvailable()) {
                        storedConfig = Persister.getSessionStorage<string>(this.config.configStorageKey);
                    } else {
                        storedConfig = window.sessionStorage.getItem(this.config.configStorageKey);
                    }
                    break;
                case 'memory':
                    storedConfig = this.memoryStorage.get('config');
                    break;
                default:
                    storedConfig = this.memoryStorage.get('config');
            }
            
            if (storedConfig) {
                return JSON.parse(storedConfig);
            }
        } catch (error) {
            this.log('Failed to read config from storage:', error);
            const memoryConfig = this.memoryStorage.get('config');
            return memoryConfig ? JSON.parse(memoryConfig) : null;
        }
        
        return null;
    }

    /**
     * Store config to storage safely using the new Persister utility with encoding
     */
    private storeConfig(persist?: PersistOption): void {
        this.memoryStorage.set('config', JSON.stringify(this.config));
        
        const persistOption = persist || this.config.persist;
        
        if (persistOption === false || persistOption === 'memory') {
            this.log('Stored config to memory');
            return;
        }
        
        if (!this.isBrowser()) {
            this.log('Stored config to memory (no browser)');
            return;
        }
        
        try {
            const configData = {
                [this.config.configStorageKey]: {
                    value: JSON.stringify(this.config),
                    encode: true
                }
            };
            
            switch (persistOption) {
                case 'localStorage':
                    if (Persister.isAvailable()) {
                        Persister.setLocalStorage(configData);
                        this.log('Stored encoded config to localStorage');
                    } else {
                        this.log('localStorage not available, using memory only');
                    }
                    break;
                case 'sessionStorage':
                    if (Persister.isAvailable()) {
                        Persister.setSessionStorage(configData);
                        this.log('Stored encoded config to sessionStorage');
                    } else {
                        this.log('sessionStorage not available, using memory only');
                    }
                    break;
                default:
                    this.log('Stored config to memory');
            }
        } catch (error) {
            this.log('Failed to write config to storage, using memory:', error);
        }
    }

    /**
     * Detect currency from locale string
     */
    private detectCurrencyFromLocale(locale: string): string | null {
        try {
            const region = locale.split('-')[1]?.toUpperCase();
            if (region) {
                const currency = getCurrencyForRegion(region);
                return currency || null;
            }
        } catch (error) {
            // this.log('Failed to detect currency from locale:', error); // Original line commented out
        }
        return null;
    }

    /**
     * Initialize the context with the given options
     */
    public init(options: ApxContextOptions = {}): void {
        if (this.initialized && JSON.stringify(this.config) === JSON.stringify(options)) {
            this.log('Context already initialized with same config, skipping');
            return;
        }

        this.log('Initializing context with options:', options);
        
        if (this.isBrowser()) {
            this.cleanupExpiredTTL();
        }

        this.reset();
        this.log('After reset, config is:', this.config);
        
        this.config = { ...DEFAULT_CONFIG, ...options };
        this.log('After applying options, config is:', this.config);
        
        // Update defaultLocale if defaultLanguage is provided and no explicit defaultLocale was provided
        if (options.defaultLanguage && LANGUAGES[options.defaultLanguage] && !options.defaultLocale) {
            this.config.defaultLocale = LANGUAGES[options.defaultLanguage].locale;
            this.log('Updated defaultLocale to match defaultLanguage:', this.config.defaultLocale);
        }
        
        this.initialized = true;
        
        this.loadPersistedValues(options.persist);
        this.log('After loading persisted values, config is:', this.config);
        
        // Only run currency detection if explicitly provided options are present
        const hasExplicitOptions = options.defaultRegion || options.defaultLocale || options.defaultCurrency;
        if (hasExplicitOptions) {
            this.log('Explicit options provided, calling detectCurrencyFromConfig');
            this.detectCurrencyFromConfig();
        } else {
            this.log('No explicit options provided, trying browser auto-detection');
            // Try browser auto-detection when no explicit options are provided
            if (this.isBrowser()) {
                const detectedCurrency = this.autoDetectCurrency();
                if (detectedCurrency) {
                    this.config.defaultCurrency = detectedCurrency;
                    this.log('Currency auto-detected from browser:', detectedCurrency);
                } else {
                    this.log('No currency auto-detected, keeping default:', this.config.defaultCurrency);
                }
            } else {
                this.log('Not in browser, keeping default currency:', this.config.defaultCurrency);
            }
        }
        
        this.storeConfig(options.persist);
        this.log('Context initialized with final config:', this.config);
    }

    /**
     * Detect currency from config options (region, locale) or browser
     */
    private detectCurrencyFromConfig(): void {
        let detectedCurrency: string | null = null;

        this.log('Starting currency detection from config...');
        this.log('Config region:', this.config.defaultRegion);
        this.log('Config locale:', this.config.defaultLocale);
        this.log('Current currency:', this.config.defaultCurrency);

        // Check if region was explicitly provided in options (not from DEFAULT_CONFIG)
        if (this.config.defaultRegion && this.config.defaultRegion !== 'US') {
            const regionCurrency = getCurrencyForRegion(this.config.defaultRegion);
            this.log('Region currency lookup result:', this.config.defaultRegion, '->', regionCurrency);
            if (regionCurrency) {
                detectedCurrency = regionCurrency;
                this.log('Currency detected from config region:', this.config.defaultRegion, '->', detectedCurrency);
            }
        }

        // If no region currency detected, check locale
        if (!detectedCurrency && this.config.defaultLocale && this.config.defaultLocale !== 'en-US') {
            detectedCurrency = this.detectCurrencyFromLocale(this.config.defaultLocale);
            if (detectedCurrency) {
                this.log('Currency detected from config locale:', this.config.defaultLocale, '->', detectedCurrency);
            }
        }

        // If still no currency detected, try browser auto-detection
        if (!detectedCurrency && this.isBrowser()) {
            detectedCurrency = this.autoDetectCurrency();
        }

        if (detectedCurrency) {
            this.config.defaultCurrency = detectedCurrency;
            this.log('Currency set to:', detectedCurrency);
        } else {
            this.log('No currency detected, keeping default:', this.config.defaultCurrency);
        }

        this.log('Final currency setting:', this.config.defaultCurrency);
    }

    /**
     * Auto-detect currency from browser locale
     */
    private autoDetectCurrency(): string | null {
        if (!this.isBrowser()) {
            return null;
        }

        try {
            // Use Intl.DateTimeFormat to get the browser locale (this matches the test mocking)
            const dateTimeFormat = new Intl.DateTimeFormat();
            const browserLocale = dateTimeFormat.resolvedOptions().locale;
            
            if (browserLocale) {
                const detectedCurrency = this.detectCurrencyFromLocale(browserLocale);
                if (detectedCurrency) {
                    this.log('Currency detected from browser locale:', detectedCurrency);
                    return detectedCurrency;
                }
            }
        } catch (error) {
            this.log('Failed to auto-detect currency:', error);
        }
        
        return null;
    }

    /**
     * Load persisted values from storage
     */
    private loadPersistedValues(persist?: PersistOption): void {
        const storedConfig = this.getStoredConfig(persist);
        if (storedConfig) {
            this.config = { ...this.config, ...storedConfig };
        }

        if (this.isBrowser() && persist !== false && persist !== 'memory') {
            this.loadLanguageFromStorage();
            this.loadCurrencyFromStorage();
            this.loadTimezoneFromStorage();
        }
    }

    /**
     * Load language from storage
     */
    private loadLanguageFromStorage(): void {
        if (this.config.apxLangStorageKey) {
            if (Persister.isAvailable()) {
                const langData = Persister.getLocalStorage<string>(this.config.apxLangStorageKey);
                if (langData) {
                    this.config.defaultLanguage = langData as keyof typeof LANGUAGES;
                    this.config.defaultLocale = langData;
                }
            } else {
                const langData = window.localStorage.getItem(this.config.apxLangStorageKey);
                if (langData) {
                    this.config.defaultLanguage = langData as keyof typeof LANGUAGES;
                    this.config.defaultLocale = langData;
                }
            }
        }
    }

    /**
     * Load currency from storage
     */
    private loadCurrencyFromStorage(): void {
        const storedCurrency = this.memoryStorage.get('currency');
        if (storedCurrency) {
            this.config.defaultCurrency = storedCurrency;
        }
    }

    /**
     * Load timezone from storage
     */
    private loadTimezoneFromStorage(): void {
        const storedTimezone = this.memoryStorage.get('timezone');
        if (storedTimezone) {
            this.config.defaultTimezone = storedTimezone;
        }
    }

    /**
     * Get current configuration
     */
    public getConfig(): Required<ApxContextOptions> {
        return { ...this.config };
    }

    /**
     * Update configuration
     */
    public updateConfig(options: ApxContextOptions): void {
        this.config = { ...this.config, ...options };
        this.storeConfig();
        // this.log('Config updated:', this.config); // Original line commented out
    }

    /**
     * Set language and update locale
     */
    public setLanguage(language: keyof typeof LANGUAGES): void {
        let validLanguage = language;
        if (!LANGUAGES[language]) {
            this.log(`Invalid language code: ${language}, falling back to default`);
            validLanguage = 'en'; // Fall back to default language
        }

        this.config.defaultLanguage = validLanguage;
        this.config.defaultLocale = LANGUAGES[validLanguage].locale;
        this.storeConfig();
        this.log('Language set to:', validLanguage);
    }

    /**
     * Get current language
     */
    public getLanguage(): keyof typeof LANGUAGES {
        return this.config.defaultLanguage;
    }

    /**
     * Set locale and update language if possible
     */
    public setLocale(locale: string): void {
        this.config.defaultLocale = locale;
        
        const language = getLanguageByLocale(locale);
        if (language) {
            this.config.defaultLanguage = language.key;
        }
        
        this.storeConfig();
        // this.log('Locale set to:', locale); // Original line commented out
    }

    /**
     * Get current locale
     */
    public getLocale(): string {
        if (!this.initialized) {
            return this.config.fallbackLocale;
        }
        return this.config.defaultLocale;
    }

    /**
     * Set currency
     */
    public setCurrency(currency: string): void {
        this.config.defaultCurrency = currency;
        this.memoryStorage.set('currency', currency);
        this.storeConfig();
        // this.log('Currency set to:', currency); // Original line commented out
    }

    /**
     * Get current currency
     */
    public getCurrency(): string {
        return this.config.defaultCurrency;
    }

    /**
     * Set timezone
     */
    public setTimezone(timezone: string): void {
        this.config.defaultTimezone = timezone;
        this.memoryStorage.set('timezone', timezone);
        this.storeConfig();
        // this.log('Timezone set to:', timezone); // Original line commented out
    }

    /**
     * Get current timezone
     */
    public getTimezone(): string {
        return this.config.defaultTimezone;
    }

    /**
     * Reset context to defaults
     */
    public reset(): void {
        // this.log('Resetting context to defaults'); // Original line commented out
        this.memoryStorage.clear();
        
        if (this.isBrowser() && this.config.persist !== false) {
            try {
                if (Persister.isAvailable()) {
                    switch (this.config.persist) {
                        case 'localStorage':
                            Persister.removeLocalStorage(this.config.configStorageKey);
                            Persister.removeLocalStorage(this.config.apxLangStorageKey);
                            break;
                        case 'sessionStorage':
                            Persister.removeSessionStorage(this.config.configStorageKey);
                            Persister.removeSessionStorage(this.config.apxLangStorageKey);
                            break;
                    }
                } else {
                    switch (this.config.persist) {
                        case 'localStorage':
                            window.localStorage.removeItem(this.config.configStorageKey);
                            window.localStorage.removeItem(this.config.apxLangStorageKey);
                            break;
                        case 'sessionStorage':
                            window.sessionStorage.removeItem(this.config.configStorageKey);
                            window.sessionStorage.removeItem(this.config.apxLangStorageKey);
                            break;
                    }
                }
            } catch (error) {
                // this.log('Failed to clear browser storage:', error); // Original line commented out
            }
        }
        
        this.config = { ...DEFAULT_CONFIG };
        this.initialized = false;
        
        // this.log('Context reset complete'); // Original line commented out
    }


    /**
     * Check if context is initialized
     */
    public isInitialized(): boolean {
        return this.initialized;
    }
}

export default ApxContext;

/**
 * Global context instance
 */
const contextInstance = new ApxContext();

/**
 * Initialize the library with configuration options
 */
export const config = (options: ApxContextOptions = {}): void => {
    try {
        contextInstance.init(options);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error calling init method:', error);
    }
};

/**
 * Get the global context instance
 */
export const getContext = (): ApxContext => {
    return contextInstance;
};

/**
 * Export individual context functions for convenience
 */
export const setLanguage = (language: keyof typeof LANGUAGES): void => contextInstance.setLanguage(language);
export const getLanguage = (): keyof typeof LANGUAGES => contextInstance.getLanguage();
export const setLocale = (locale: string): void => contextInstance.setLocale(locale);
export const getLocale = (): string => contextInstance.getLocale();
export const setCurrency = (currency: string): void => contextInstance.setCurrency(currency);
export const getCurrency = (): string => contextInstance.getCurrency();
export const setTimezone = (timezone: string): void => contextInstance.setTimezone(timezone);
export const getTimezone = (): string => contextInstance.getTimezone();
export const resetContext = (): void => contextInstance.reset();
export const isInitialized = (): boolean => contextInstance.isInitialized();
export const updateConfig = (options: Partial<ApxContextOptions>): void => contextInstance.updateConfig(options);

/**
 * Legacy compatibility - check if browser environment
 */
export const isBrowser = (): boolean => contextInstance.isBrowser();