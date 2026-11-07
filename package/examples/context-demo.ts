import { 
    // Context configuration
    config,
    resetContext,
    
    // Context getters and setters
    setLanguage,
    getLanguage,
    setLocale,
    getLocale,
    setCurrency,
    getCurrency,
    setTimezone,
    getTimezone,
    
    // Context utilities
    isInitialized,
    
    // Formatters that use context
    formatCurrencyI18N,
    formatDateI18N,
    formatTimeI18N,
    
    // Types
    ApxContextOptions
} from '../src/index';

/**
 * Demo function showing how to use the new context system
 */
export function demonstrateContextSystem() {
    console.log('=== Context System Demo ===\n');
    
    // 1. Initialize the library with configuration
    console.log('--- 1. Library Initialization ---');
    
    const contextOptions: ApxContextOptions = {
        defaultLanguage: 'en',
        defaultLocale: 'en-US',
        defaultCurrency: 'USD',
        defaultTimezone: 'UTC',
        persist: 'localStorage', // 'localStorage' | 'sessionStorage' | 'memory' | false
        debug: true
    };
    
    config(contextOptions);
    console.log('Library initialized with options:', contextOptions);
    
    // 2. Check current context values
    console.log('\n--- 2. Initial Context Values ---');
    console.log('Language:', getLanguage());
    console.log('Locale:', getLocale());
    console.log('Currency:', getCurrency());
    console.log('Timezone:', getTimezone());
    
    // 3. Test formatting with default context values
    console.log('\n--- 3. Formatting with Default Context ---');
    console.log('Currency (default):', formatCurrencyI18N(1234.56));
    console.log('Date (default):', formatDateI18N(new Date('2024-01-15T14:30:00')));
    console.log('Time (default):', formatTimeI18N(2, 'h'));
    
    // 4. Change context settings
    console.log('\n--- 4. Changing Context Settings ---');
    
    setLanguage('he');
    setCurrency('ILS');
    setTimezone('Asia/Jerusalem');
    
    console.log('Changed to Hebrew/Israeli settings');
    console.log('Language:', getLanguage());
    console.log('Locale:', getLocale());
    console.log('Currency:', getCurrency());
    console.log('Timezone:', getTimezone());
    
    // 5. Test formatting with new context values
    console.log('\n--- 5. Formatting with Hebrew Context ---');
    console.log('Currency (Hebrew):', formatCurrencyI18N(1234.56));
    console.log('Date (Hebrew):', formatDateI18N(new Date('2024-01-15T14:30:00')));
    console.log('Time (Hebrew):', formatTimeI18N(2, 'h'));
    
    // 6. Override context values in function calls
    console.log('\n--- 6. Overriding Context in Function Calls ---');
    console.log('Currency (override to EUR):', formatCurrencyI18N(1234.56, 'EUR'));
    console.log('Currency (override to EUR + German):', formatCurrencyI18N(1234.56, 'EUR', 'de-DE'));
    console.log('Date (override to French):', formatDateI18N(new Date('2024-01-15T14:30:00'), undefined, 'default', 'fr-FR'));
    
    // 7. Test Arabic settings
    console.log('\n--- 7. Testing Arabic Settings ---');
    
    setLanguage('ar');
    setCurrency('SAR');
    
    console.log('Changed to Arabic/Saudi settings');
    console.log('Language:', getLanguage());
    console.log('Locale:', getLocale());
    console.log('Currency:', getCurrency());
    console.log('Currency (Arabic):', formatCurrencyI18N(1234.56));
    console.log('Date (Arabic):', formatDateI18N(new Date('2024-01-15T14:30:00')));
    console.log('Time (Arabic):', formatTimeI18N(2, 'h'));
    
    // 8. Test Spanish settings
    console.log('\n--- 8. Testing Spanish Settings ---');
    
    setLanguage('es');
    setCurrency('EUR');
    
    console.log('Changed to Spanish/European settings');
    console.log('Language:', getLanguage());
    console.log('Locale:', getLocale());
    console.log('Currency:', getCurrency());
    console.log('Currency (Spanish):', formatCurrencyI18N(1234.56));
    console.log('Date (Spanish):', formatDateI18N(new Date('2024-01-15T14:30:00')));
    console.log('Time (Spanish):', formatTimeI18N(2, 'h'));
    
    // 9. Set custom locale directly
    console.log('\n--- 9. Setting Custom Locale ---');
    
    setLocale('pt-BR');
    setCurrency('BRL');
    
    console.log('Set to Brazilian Portuguese');
    console.log('Language:', getLanguage());
    console.log('Locale:', getLocale());
    console.log('Currency:', getCurrency());
    console.log('Currency (Portuguese):', formatCurrencyI18N(1234.56));
    console.log('Date (Portuguese):', formatDateI18N(new Date('2024-01-15T14:30:00')));

    // 10. Configuration with custom storage keys
    console.log('\n--- 10. Custom Configuration ---');
    
    resetContext(); // Reset to defaults
    
    const customConfig: ApxContextOptions = {
        defaultLanguage: 'fr',
        defaultCurrency: 'EUR',
        apxLangStorageKey: 'myAppLanguage',
        persist: 'sessionStorage', // Use sessionStorage instead
        debug: true
    };
    
    config(customConfig);
    console.log('Reconfigured with custom settings');
    console.log('Language:', getLanguage());
    console.log('Currency:', getCurrency());
    console.log('Currency (French):', formatCurrencyI18N(1234.56));
    
    // 11. Test error handling
    console.log('\n--- 11. Error Handling ---');
    
    try {
        // These should work gracefully
        console.log('Before context init (should use defaults):');
        resetContext();
        console.log('Currency (no context):', formatCurrencyI18N(1234.56));
        
            // Re-initialize for clean state
        config({ persist: 'memory', debug: false });
        
    } catch (error) {
        console.log('Error caught:', error);
    }
    
    console.log('\n=== Context Demo Complete ===');
}

/**
 * Demo showing context usage in a typical app initialization
 */
export function demonstrateAppInitialization() {
    console.log('\n=== App Initialization Demo ===\n');
    
    // This is how you would typically initialize your app
    console.log('1. Initialize library on app startup:');
    
    config({
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        defaultTimezone: 'America/New_York',
        persist: 'localStorage',
        debug: false // Turn off in production
    });
    
    console.log('Library initialized for US/English app');
    
    // 2. User changes language preference
    console.log('\n2. User selects different language:');
    setLanguage('es');
    console.log('Language changed to Spanish');
    console.log('Currency formatting:', formatCurrencyI18N(29.99));
    
    // 3. User changes region/currency
    console.log('\n3. User updates currency preference:');
    setCurrency('EUR');
    console.log('Currency changed to EUR');
    console.log('Currency formatting:', formatCurrencyI18N(29.99));
    
    // 4. App restart - settings are persisted
    console.log('\n4. App restart simulation:');
    console.log('Settings before restart:', { 
        language: getLanguage(), 
        currency: getCurrency() 
    });
    
    // Simulate restart by reinitializing
    config({
        defaultLanguage: 'en', // Default settings
        defaultCurrency: 'USD',
        persist: 'localStorage'
    });
    
    console.log('Settings after restart:', { 
        language: getLanguage(), 
        currency: getCurrency() 
    });
    console.log('Persisted settings are automatically loaded!');
    
    console.log('\n=== App Initialization Demo Complete ===');
}

/**
 * Demo showing different storage options
 */
export function demonstrateStorageOptions() {
    console.log('\n=== Storage Options Demo ===\n');
    
    // 1. localStorage (persists across browser sessions)
    console.log('--- 1. localStorage (persistent) ---');
    config({
        persist: 'localStorage',
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        debug: true
    });
    
    setLanguage('he');
    setCurrency('ILS');
    console.log('Settings saved to localStorage');
    console.log('Language:', getLanguage());
    console.log('Currency:', getCurrency());
    
    // 2. sessionStorage (cleared when tab closes)
    console.log('\n--- 2. sessionStorage (session only) ---');
    config({
        persist: 'sessionStorage',
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        debug: true
    });
    
    setLanguage('ar');
    setCurrency('SAR');
    console.log('Settings saved to sessionStorage');
    console.log('Language:', getLanguage());
    console.log('Currency:', getCurrency());
    
    // 3. Memory only (no persistence)
    console.log('\n--- 3. Memory only (no persistence) ---');
    config({
        persist: false,
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        debug: true
    });
    
    setLanguage('fr');
    setCurrency('EUR');
    console.log('Settings saved to memory only');
    console.log('Language:', getLanguage());
    console.log('Currency:', getCurrency());
    
    // 4. Memory with fallback
    console.log('\n--- 4. Memory with fallback ---');
    config({
        persist: 'memory',
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        debug: true
    });
    
    setLanguage('es');
    setCurrency('MXN');
    console.log('Settings saved to memory');
    console.log('Language:', getLanguage());
    console.log('Currency:', getCurrency());
    
    // 5. Singleton behavior
    console.log('\n--- 5. Singleton Behavior ---');
    console.log('Context initialized:', isInitialized());
    
    // Try to initialize again (should be ignored)
    config({
        persist: 'localStorage',
        defaultLanguage: 'de',
        defaultCurrency: 'EUR'
    });
    
    console.log('After second init attempt:');
    console.log('Language:', getLanguage()); // Should still be 'es'
    console.log('Currency:', getCurrency()); // Should still be 'MXN'
    console.log('Context initialized:', isInitialized());
    
    console.log('\n=== Storage Options Demo Complete ===');
}

// Run demos if this file is executed directly
if (require.main === module) {
    demonstrateContextSystem();
    demonstrateAppInitialization();
    demonstrateStorageOptions();
}
