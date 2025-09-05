import { 
    config, 
    getContext,
    setLanguage,
    getLanguage,
    setLocale,
    getLocale,
    setCurrency,
    getCurrency,
    setTimezone,
    getTimezone,
    resetContext,

    isInitialized,
    isBrowser,
    ApxContextOptions
} from '../context';
import { LANGUAGES } from '../constants/languages';

// Mock localStorage and sessionStorage
const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};

const mockSessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};

// Mock window object for browser environment
const mockWindow = {
    localStorage: mockLocalStorage,
    sessionStorage: mockSessionStorage
};

// Mock the global window check
Object.defineProperty(global, 'window', {
    value: mockWindow,
    writable: true,
    configurable: true
});

describe('ApxContext', () => {
    beforeEach(() => {
        // Reset context before each test with memory storage to reduce quota usage
        resetContext();
        config({ persist: 'memory', debug: false });
        // Clear all mocks
        jest.clearAllMocks();
        
        // Reset the window mock for each test
        delete (global as any).window;
        Object.defineProperty(global, 'window', {
            value: mockWindow,
            writable: true,
            configurable: true
        });
    });

    describe('Initialization', () => {
        it('should initialize with default values', () => {
            config({});
            
            expect(getLanguage()).toBe('en');
            expect(getLocale()).toBe('en-US');
            expect(getCurrency()).toBe('USD');
            expect(getTimezone()).toBe('UTC');
            expect(isInitialized()).toBe(true);
        });

        it('should initialize with custom values', () => {
            const options: ApxContextOptions = {
                defaultLanguage: 'he',
                defaultLocale: 'he-IL',
                defaultCurrency: 'ILS',
                defaultTimezone: 'Asia/Jerusalem',
                debug: false
            };
            
            config(options);
            
            expect(getLanguage()).toBe('he');
            expect(getLocale()).toBe('he-IL');
            expect(getCurrency()).toBe('ILS');
            expect(getTimezone()).toBe('Asia/Jerusalem');
        });

        it('should ignore subsequent init calls with same config (singleton behavior)', () => {
            config({ defaultLanguage: 'en' });
            const firstLanguage = getLanguage();
            
            // Same config should be ignored
            config({ defaultLanguage: 'en' });
            const secondLanguage = getLanguage();
            
            expect(firstLanguage).toBe('en');
            expect(secondLanguage).toBe('en'); // Should not change
            expect(isInitialized()).toBe(true);
        });

        it('should reset and reinitialize when new changes are detected', () => {
            // Initial config
            config({ 
                defaultLanguage: 'en', 
                defaultCurrency: 'USD',
                persist: 'memory'
            });
            
            expect(getLanguage()).toBe('en');
            expect(getCurrency()).toBe('USD');
            
            // Set some values
            setLanguage('he');
            setCurrency('ILS');
            
            expect(getLanguage()).toBe('he');
            expect(getCurrency()).toBe('ILS');
            
            // Config with new changes should reset context
            config({ 
                defaultLanguage: 'fr', 
                defaultCurrency: 'EUR',
                persist: 'memory'
            });
            
            // Should use new defaults (context was reset)
            expect(getLanguage()).toBe('fr');
            expect(getCurrency()).toBe('EUR');
        });

        it('should auto-detect user currency when not provided', () => {
            // Mock Intl.DateTimeFormat to return a specific locale
            const mockResolvedOptions = jest.fn().mockReturnValue({ locale: 'de-DE' });
            const mockDateTimeFormat = jest.fn().mockImplementation(() => ({
                resolvedOptions: mockResolvedOptions
            }));
            
            const originalDateTimeFormat = global.Intl.DateTimeFormat;
            global.Intl.DateTimeFormat = mockDateTimeFormat as any;
            
            try {
                config({ 
                    defaultLanguage: 'en',
                    persist: 'memory'
                    // Note: no defaultCurrency provided
                });
                
                expect(getCurrency()).toBe('EUR'); // Should use auto-detected currency from de-DE locale
                expect(mockDateTimeFormat).toHaveBeenCalled();
                expect(mockResolvedOptions).toHaveBeenCalled();
            } finally {
                // Restore original
                global.Intl.DateTimeFormat = originalDateTimeFormat;
            }
        });

        it('should use provided currency over auto-detected currency', () => {
            // Mock Intl.NumberFormat to return EUR
            const mockResolvedOptions = jest.fn().mockReturnValue({ currency: 'EUR' });
            const mockNumberFormat = jest.fn().mockImplementation(() => ({
                resolvedOptions: mockResolvedOptions
            }));
            
            const originalNumberFormat = global.Intl.NumberFormat;
            global.Intl.NumberFormat = mockNumberFormat as any;
            
            try {
                config({ 
                    defaultLanguage: 'en',
                    defaultCurrency: 'USD', // Explicitly provided
                    persist: 'memory'
                });
                
                expect(getCurrency()).toBe('USD'); // Should use provided currency, not EUR
            } finally {
                // Restore original
                global.Intl.NumberFormat = originalNumberFormat;
            }
        });

        it('should fallback to default currency when auto-detection fails', () => {
            // Mock Intl.NumberFormat to return undefined currency
            const mockResolvedOptions = jest.fn().mockReturnValue({ currency: undefined });
            const mockNumberFormat = jest.fn().mockImplementation(() => ({
                resolvedOptions: mockResolvedOptions
            }));
            
            const originalNumberFormat = global.Intl.NumberFormat;
            global.Intl.NumberFormat = mockNumberFormat as any;
            
            try {
                config({ 
                    defaultLanguage: 'en',
                    persist: 'memory'
                    // Note: no defaultCurrency provided
                });
                
                expect(getCurrency()).toBe('USD'); // Should fallback to default
            } finally {
                // Restore original
                global.Intl.NumberFormat = originalNumberFormat;
            }
        });

        it('should handle Intl.NumberFormat errors gracefully', () => {
            // Mock Intl.DateTimeFormat constructor to throw an error
            const originalDateTimeFormat = global.Intl.DateTimeFormat;
            
            // Replace with a mock that throws during construction
            Object.defineProperty(global.Intl, 'DateTimeFormat', {
                value: function() {
                    throw new Error('Intl error');
                },
                writable: true,
                configurable: true
            });
            
            try {
                config({ 
                    defaultLanguage: 'en',
                    persist: 'memory'
                    // Note: no defaultCurrency provided
                });
                
                expect(getCurrency()).toBe('USD'); // Should fallback to default
            } finally {
                // Restore original
                Object.defineProperty(global.Intl, 'DateTimeFormat', {
                    value: originalDateTimeFormat,
                    writable: true,
                    configurable: true
                });
            }
        });

        it('should detect currency from config region when provided', () => {
            config({ 
                defaultLanguage: 'en',
                defaultRegion: 'IL', // Israel
                persist: 'memory'
                // Note: no defaultCurrency provided
            });
            
            expect(getCurrency()).toBe('ILS'); // Should use ILS from IL region
        });

        it('should detect currency from config locale when no region provided', () => {
            config({ 
                defaultLanguage: 'en',
                defaultLocale: 'he-IL', // Hebrew Israel
                persist: 'memory'
                // Note: no defaultCurrency or defaultRegion provided
            });
            
            expect(getCurrency()).toBe('ILS'); // Should extract IL from he-IL and use ILS
        });

        it('should prioritize config region over config locale', () => {
            config({ 
                defaultLanguage: 'en',
                defaultRegion: 'GB', // United Kingdom
                defaultLocale: 'he-IL', // Hebrew Israel
                persist: 'memory'
                // Note: no defaultCurrency provided
            });
            
            expect(getCurrency()).toBe('GBP'); // Should use GBP from GB region, not ILS from locale
        });

        it('should use custom storage key', () => {
            const options: ApxContextOptions = {
                configStorageKey: 'myAppConfig',
                persist: 'localStorage'
            };
            
            config(options);
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Verify that the custom storage key is used for the entire config
            // Note: Values are now encoded using the Persister utility
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('myAppConfig', expect.stringMatching(/^apx&/));
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('myAppConfig', expect.stringMatching(/^apx&/));
        });
    });

    describe('Storage Options', () => {
        it('should use localStorage when persist is localStorage', () => {
            config({ persist: 'localStorage' });
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Verify localStorage is used with the default config key
            // Note: Values are now encoded using the Persister utility
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('apxConfig', expect.stringMatching(/^apx&/));
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('apxConfig', expect.stringMatching(/^apx&/));
        });

        it('should use sessionStorage when persist is sessionStorage', () => {
            config({ persist: 'sessionStorage' });
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Verify sessionStorage is used with the default config key
            // Note: Values are now encoded using the Persister utility
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('apxConfig', expect.stringMatching(/^apx&/));
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('apxConfig', expect.stringMatching(/^apx&/));
        });

        it('should use memory when persist is memory', () => {
            config({ persist: 'memory' });
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Should not call browser storage
            expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
            expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
            
            // But values should still be accessible
            expect(getLanguage()).toBe('he');
            expect(getCurrency()).toBe('ILS');
        });

        it('should not persist when persist is false', () => {
            config({ persist: false });
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Should not call browser storage
            expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
            expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
            
            // But values should still be accessible
            expect(getLanguage()).toBe('he');
            expect(getCurrency()).toBe('ILS');
        });

        it('should fallback to memory when browser storage fails', () => {
            // Mock localStorage to throw error on setItem
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('Storage quota exceeded');
            });
            
            // Mock localStorage to throw error on getItem as well
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('Storage read error');
            });
            
            config({ persist: 'localStorage' });
            
            setLanguage('he');
            setCurrency('ILS');
            
            // Should still work despite storage error - values are stored in memory
            expect(getLanguage()).toBe('he');
            expect(getCurrency()).toBe('ILS');
        });
    });

    describe('Language Management', () => {
        beforeEach(() => {
            config({ persist: 'memory' });
        });

        it('should set and get language', () => {
            setLanguage('he');
            expect(getLanguage()).toBe('he');
        });

        it('should reject invalid language codes', () => {
            setLanguage('invalid' as any);
            expect(getLanguage()).toBe('en'); // Should remain default
        });

        it('should update locale when language changes', () => {
            setLanguage('he');
            expect(getLocale()).toBe('he-IL');
        });

        it('should fallback to default when language not found', () => {
            // Mock LANGUAGES to not have 'he'
            const originalLanguages = { ...LANGUAGES };
            delete (LANGUAGES as any).he;
            
            setLanguage('he');
            expect(getLanguage()).toBe('en'); // Should fallback to default
            
            // Restore
            Object.assign(LANGUAGES, originalLanguages);
        });
    });

    describe('Locale Management', () => {
        beforeEach(() => {
            config({ persist: 'memory' });
        });

        it('should set and get locale', () => {
            setLocale('fr-FR');
            expect(getLocale()).toBe('fr-FR');
        });

        it('should update language when locale is set', () => {
            setLocale('he-IL');
            expect(getLanguage()).toBe('he');
        });

        it('should not update language for unknown locale', () => {
            setLanguage('en');
            setLocale('unknown-locale');
            expect(getLanguage()).toBe('en'); // Should remain unchanged
        });

        it('should use fallback locale when not initialized', () => {
            resetContext();
            expect(getLocale()).toBe('en-US'); // Should use fallback
        });
    });

    describe('Currency Management', () => {
        beforeEach(() => {
            config({ persist: 'memory' });
        });

        it('should set and get currency', () => {
            setCurrency('EUR');
            expect(getCurrency()).toBe('EUR');
        });

        it('should use default currency when not set', () => {
            expect(getCurrency()).toBe('USD');
        });

        it('should persist currency changes', () => {
            setCurrency('ILS');
            expect(getCurrency()).toBe('ILS');
        });
    });

    describe('Timezone Management', () => {
        beforeEach(() => {
            config({ persist: 'memory' });
        });

        it('should set and get timezone', () => {
            setTimezone('America/New_York');
            expect(getTimezone()).toBe('America/New_York');
        });

        it('should use default timezone when not set', () => {
            expect(getTimezone()).toBe('UTC');
        });

        it('should persist timezone changes', () => {
            setTimezone('Asia/Jerusalem');
            expect(getTimezone()).toBe('Asia/Jerusalem');
        });
    });

    describe('Context Reset', () => {
        it('should reset all values to defaults', () => {
            config({ defaultLanguage: 'he', defaultCurrency: 'ILS' });
            setLanguage('ar');
            setCurrency('SAR');
            
            resetContext();
            
            expect(getLanguage()).toBe('en'); // Back to default
            expect(getCurrency()).toBe('USD'); // Back to default
            // Note: isInitialized() returns false because resetContext() reinitializes with defaults
            expect(isInitialized()).toBe(false);
        });

        it('should clear browser storage when resetting', () => {
            config({ persist: 'localStorage' });
            setLanguage('he');
            setCurrency('ILS');
            
            resetContext();
            
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('apxConfig');
        });

        it('should clear session storage when resetting', () => {
            config({ persist: 'sessionStorage' });
            setLanguage('he');
            setCurrency('ILS');
            
            resetContext();
            
            expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('apxConfig');
        });
    });

    describe('Browser Environment Detection', () => {
        it('should detect browser environment correctly', () => {
            expect(isBrowser()).toBe(true);
        });

        it('should work in Node.js environment', () => {
            // Temporarily remove window
            const originalWindow = global.window;
            delete (global as any).window;
            
            config({ persist: 'memory' });
            setLanguage('he');
            
            expect(getLanguage()).toBe('he');
            expect(isBrowser()).toBe(false);
            
            // Restore
            global.window = originalWindow;
        });
    });

    describe('Error Handling', () => {
        it('should handle storage errors gracefully', () => {
            // Mock localStorage to throw on setItem
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('Storage error');
            });
            
            // Mock localStorage to throw on getItem as well
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('Storage read error');
            });
            
            config({ persist: 'localStorage' });
            
            // Should not throw
            expect(() => setLanguage('he')).not.toThrow();
            
            // Should still work - values are stored in memory
            expect(getLanguage()).toBe('he');
        });

        it('should handle storage errors gracefully on getItem', () => {
            // Mock localStorage to throw on getItem
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('Storage error');
            });
            
            config({ persist: 'localStorage' });
            
            // Should not throw
            expect(() => getLanguage()).not.toThrow();
            
            // Should return default
            expect(getLanguage()).toBe('en');
        });
    });

    describe('Integration with Formatters', () => {
        it('should provide context values to formatters', () => {
            config({ 
                defaultLanguage: 'he', 
                defaultCurrency: 'ILS',
                persist: 'memory'
            });
            
            // These values should be used by the formatters
            expect(getLanguage()).toBe('he');
            expect(getCurrency()).toBe('ILS');
            expect(getLocale()).toBe('he-IL');
        });
    });
});
