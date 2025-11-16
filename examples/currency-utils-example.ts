/**
 * Example usage of currency utilities
 */
import { 
    getCurrencyByLocale, 
    getCurrencyCode, 
    getCurrencySymbol,
    hasCurrencyMapping,
    getSupportedCountryCodes,
    getAllCurrencies
} from '../src/utils/currencyUtils.js';

console.log('=== Currency Utility Examples ===\n');

// Example 1: Israel - different locale formats
console.log('Israel locale formats:');
console.log('he/IL ->', getCurrencyByLocale('he/IL'));
console.log('IL ->', getCurrencyByLocale('IL'));
console.log('he-IL ->', getCurrencyByLocale('he-IL'));
console.log('ar-IL ->', getCurrencyByLocale('ar-IL'));
console.log('');

// Example 2: Get currency code only
console.log('Currency codes only:');
console.log('he/IL ->', getCurrencyCode('he/IL'));
console.log('IL ->', getCurrencyCode('IL'));
console.log('US ->', getCurrencyCode('US'));
console.log('en-US ->', getCurrencyCode('en-US'));
console.log('ar-AE ->', getCurrencyCode('ar-AE'));
console.log('');

// Example 3: Get currency symbols
console.log('Currency symbols:');
console.log('he/IL ->', getCurrencySymbol('he/IL'));
console.log('US ->', getCurrencySymbol('US'));
console.log('en-GB ->', getCurrencySymbol('en-GB'));
console.log('ar-AE ->', getCurrencySymbol('ar-AE'));
console.log('');

// Example 4: Asian countries (UAE and others)
console.log('Asian countries:');
console.log('UAE (ar-AE) ->', getCurrencyByLocale('ar-AE'));
console.log('Saudi Arabia (ar-SA) ->', getCurrencyByLocale('ar-SA'));
console.log('Japan (ja-JP) ->', getCurrencyByLocale('ja-JP'));
console.log('China (zh-CN) ->', getCurrencyByLocale('zh-CN'));
console.log('South Korea (ko-KR) ->', getCurrencyByLocale('ko-KR'));
console.log('India (hi-IN) ->', getCurrencyByLocale('hi-IN'));
console.log('Singapore (en-SG) ->', getCurrencyByLocale('en-SG'));
console.log('Thailand (th-TH) ->', getCurrencyByLocale('th-TH'));
console.log('');

// Example 5: USA
console.log('USA:');
console.log('en-US ->', getCurrencyByLocale('en-US'));
console.log('US ->', getCurrencyByLocale('US'));
console.log('');

// Example 6: Check if locale has mapping
console.log('Has currency mapping:');
console.log('IL ->', hasCurrencyMapping('IL'));
console.log('he-IL ->', hasCurrencyMapping('he-IL'));
console.log('xyz-XYZ ->', hasCurrencyMapping('xyz-XYZ'));
console.log('');

// Example 7: Get all supported country codes
console.log('Supported country codes:', getSupportedCountryCodes().join(', '));
console.log('');

// Example 8: Get all unique currencies
console.log('Total unique currencies:', getAllCurrencies().length);
console.log('Sample currencies:');
getAllCurrencies().slice(0, 5).forEach(currency => {
    console.log(`  ${currency.code} (${currency.symbol}) - ${currency.name}`);
});

