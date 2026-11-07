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
 * Drop keys whose value is undefined.
 *
 * Spreading an explicit `undefined` overwrites the default it was meant to
 * fall back to, so `config({ defaultCurrency: undefined })` would leave the
 * config with no currency at all. Callers building options objects
 * conditionally rely on undefined meaning "not provided".
 */
function stripUndefined(options: ApxContextOptions): ApxContextOptions {
    const provided: ApxContextOptions = {};
    (Object.keys(options) as Array<keyof ApxContextOptions>).forEach(key => {
        if (options[key] !== undefined) {
            (provided as Record<string, unknown>)[key] = options[key];
        }
    });
    return provided;
}

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
     * Region subtag of a locale, via Intl.Locale so script subtags and
     * extensions are handled (zh-Hans-CN -> CN, ar-SA-u-nu-latn -> SA).
     * Returns null for a locale that names no region ('en') or cannot be parsed.
     */
    private getRegionFromLocale(locale: string): string | null {
        try {
            return new Intl.Locale(locale).region?.toUpperCase() ?? null;
        } catch {
            this.log('Failed to read region from locale:', locale);
            return null;
        }
    }

    /**
     * Detect currency from locale string, via its region subtag.
     */
    private detectCurrencyFromLocale(locale: string): string | null {
        const region = this.getRegionFromLocale(locale);
        return region ? getCurrencyForRegion(region) || null : null;
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
        
        const provided = stripUndefined(options);

        this.config = { ...DEFAULT_CONFIG, ...provided };
        this.log('After applying options, config is:', this.config);

        this.initialized = true;

        this.loadPersistedValues(options.persist);
        this.log('After loading persisted values, config is:', this.config);

        this.resolveRegionalSettings(provided);

        this.storeConfig(options.persist);
        this.log('Context initialized with final config:', this.config);
    }

    /**
     * Settle locale, language, region and currency together.
     *
     * The locale is the source of truth: language, region and currency each
     * default to whatever it implies. Anything the caller passes explicitly
     * overrides its derived default and is never second-guessed.
     *
     *   config({ defaultLocale: 'he-IL' })
     *     -> language 'he', region 'IL', currency 'ILS'
     *
     *   config({ defaultLocale: 'he-IL', defaultCurrency: 'USD' })
     *     -> language 'he', region 'IL', currency 'USD'   (override)
     *
     * Every decision reads `provided` — what the caller actually passed —
     * rather than the resolved config, which cannot tell a deliberate value
     * from a default one.
     */
    private resolveRegionalSettings(provided: ApxContextOptions): void {
        this.config.defaultLocale = this.resolveLocale(provided);
        this.config.defaultLanguage = this.resolveLanguage(provided, this.config.defaultLocale);
        this.config.defaultRegion = this.resolveRegion(provided, this.config.defaultLocale);
        this.config.defaultCurrency = this.resolveCurrency(provided, this.config.defaultRegion);

        this.log('Resolved regional settings:', {
            locale: this.config.defaultLocale,
            language: this.config.defaultLanguage,
            region: this.config.defaultRegion,
            currency: this.config.defaultCurrency
        });
    }

    /**
     * An explicit locale wins. Failing that, an explicit language implies its
     * own locale, so `config({ defaultLanguage: 'he' })` still yields 'he-IL'.
     */
    private resolveLocale(provided: ApxContextOptions): string {
        if (provided.defaultLocale) {
            return provided.defaultLocale;
        }
        if (provided.defaultLanguage && LANGUAGES[provided.defaultLanguage]) {
            return LANGUAGES[provided.defaultLanguage].locale;
        }
        return this.config.defaultLocale;
    }

    /** Explicit language, else the one the locale names. */
    private resolveLanguage(
        provided: ApxContextOptions,
        locale: string
    ): keyof typeof LANGUAGES {
        if (provided.defaultLanguage && LANGUAGES[provided.defaultLanguage]) {
            return provided.defaultLanguage;
        }
        return getLanguageByLocale(locale)?.key ?? this.config.defaultLanguage;
    }

    /** Explicit region, else the one the locale names. */
    private resolveRegion(provided: ApxContextOptions, locale: string): string {
        if (provided.defaultRegion) {
            return provided.defaultRegion;
        }
        return this.getRegionFromLocale(locale) ?? this.config.defaultRegion;
    }

    /**
     * Explicit currency, else the region's currency — and the region itself
     * came from the locale unless it was overridden. The browser is consulted
     * only when the region maps to nothing.
     */
    private resolveCurrency(provided: ApxContextOptions, region: string): string {
        if (provided.defaultCurrency) {
            return provided.defaultCurrency;
        }
        return (
            getCurrencyForRegion(region) ??
            this.autoDetectCurrency() ??
            this.config.defaultCurrency
        );
    }


    /**
     * Auto-detect currency from browser locale via navigator.language
     */
    private autoDetectCurrency(): string | null {
        if (!this.isBrowser()) {
            return null;
        }

        try {
            const browserLocale = navigator.language;
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