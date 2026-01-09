import { 
    formatCurrencyI18N, 
    formatDateI18N, 
    formatTimeI18N
} from '../src/utils/i18nFormatters';
import { config, setLanguage, setLocale, getLocale, getLanguage, isBrowser, resetContext } from '../src/context';

// Demo function to show proper usage
export function demonstrateI18nFormatters() {
    console.log('=== I18N Formatters Demo ===');
    
    // Check if we're in a browser environment
    console.log('Is browser environment:', isBrowser());
    
    // Initialize context
    config({
        defaultLanguage: 'en',
        defaultCurrency: 'USD',
        defaultTimezone: 'America/New_York',
        defaultRegion: 'US',
        persist: 'localStorage',
        debug: false
    });
    
    if (isBrowser()) {
        // Method 1: Set language by language code (recommended)
        console.log('\n--- Method 1: Set by language code ---');
        setLanguage('he'); // This stores 'he' in localStorage
        console.log('Current locale:', getLocale()); // Should return 'he-IL'
        console.log('Current language code:', getLanguage()); // Should return 'he'
        
        // Method 2: Set language by full locale string
        console.log('\n--- Method 2: Set by full locale ---');
        setLocale('ar-SA'); // This stores 'ar-SA' in context
        console.log('Current locale:', getLocale()); // Should return 'ar-SA'
        console.log('Current language code:', getLanguage()); // Should return 'ar'
        
        // Test formatting functions
        console.log('\n--- Formatting Examples ---');
        console.log('Currency (Hebrew):', formatCurrencyI18N(1234.56, 'ILS'));
        console.log('Currency (Arabic):', formatCurrencyI18N(1234.56, 'SAR'));
        
        const testDate = new Date('2024-01-15T14:30:00');
        console.log('Date (Hebrew):', formatDateI18N(testDate, undefined, 'default'));
        console.log('Date (Arabic):', formatDateI18N(testDate, undefined, 'default'));
        
        // Reset to English
        console.log('\n--- Reset to English ---');
        setLanguage('en');
        console.log('Current locale:', getLocale()); // Should return 'en-US'
        console.log('Currency (English):', formatCurrencyI18N(1234.56, 'USD'));
        console.log('Date (English):', formatDateI18N(testDate, undefined, 'default'));
        
        // Clean up
        resetContext();
        
    } else {
        console.log('Not in browser environment - localStorage not available');
        console.log('Using default locale (en-US)');
        
        // Test with default locale
        console.log('Currency (default):', formatCurrencyI18N(1234.56, 'USD'));
        const testDate = new Date('2024-01-15T14:30:00');
        console.log('Date (default):', formatDateI18N(testDate, undefined, 'default'));
    }
}

// Run the demo if this file is executed directly
if (require.main === module) {
    demonstrateI18nFormatters();
}