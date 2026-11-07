import { formatPhoneNumber, COUNTRY_CODES } from '../src/utils/phoneNumber';

/**
 * Comprehensive Phone Number Formatting Examples
 * 
 * This demo showcases the new custom phone number formatting utility
 */

console.log('📞 Phone Number Formatting Examples\n');

/**
 * Example 1: Basic formatting patterns
 */
console.log('=== 1. Basic Formatting Patterns ===');

const testNumbers = [
    '1234567890',
    '0502892553',
    '9720502892553',
    '+9720502892553'
];

const basicFormats = [
    'PPP - EEE SSSS',
    '(PPP) - EEE SSSS',
    '(PP)  EEE SSSS',
    'PP-EEE SSSS',
    'PPP-EEE SSSS'
];

testNumbers.forEach(phone => {
    console.log(`\nPhone: ${phone}`);
    basicFormats.forEach(format => {
        try {
            const result = formatPhoneNumber(phone, format);
            console.log(`  ${format}: ${result}`);
        } catch (error) {
            console.log(`  ${format}: Error - ${error.message}`);
        }
    });
});

/**
 * Example 2: International formatting
 */
console.log('\n=== 2. International Formatting ===');

const internationalNumbers = [
    '+12345678901',
    '+9720502892553',
    '+447911123456',
    '12345678901',
    '9720502892553',
    '447911123456'
];

const internationalFormats = [
    '+C (PPP)-EEE-SSSS',
    '+C (PPP) EEESSSS'
];

internationalNumbers.forEach(phone => {
    console.log(`\nPhone: ${phone}`);
    internationalFormats.forEach(format => {
        try {
            const result = formatPhoneNumber(phone, format);
            console.log(`  ${format}: ${result}`);
        } catch (error) {
            console.log(`  ${format}: Error - ${error.message}`);
        }
    });
});

/**
 * Example 3: Custom options
 */
console.log('\n=== 3. Custom Options ===');

const customOptions = [
    { leadingDigitPad: '0', nationalNumberLength: 10 },
    { leadingDigitPad: '9', nationalNumberLength: 9 },
    { inputIncludesCountry: false, originCountry: 'US' as keyof typeof COUNTRY_CODES },
    { inputIncludesCountry: false, originCountry: 'GB' as keyof typeof COUNTRY_CODES },
    { inputIncludesCountry: false, originCountry: 'IL' as keyof typeof COUNTRY_CODES }
];

const testPhone = '123456789';
console.log(`\nPhone: ${testPhone}`);

customOptions.forEach((options, index) => {
    try {
        const result = formatPhoneNumber(testPhone, 'PPP - EEE SSSS', options);
        console.log(`  Options ${index + 1}: ${result}`);
    } catch (error) {
        console.log(`  Options ${index + 1}: Error - ${error.message}`);
    }
});

/**
 * Example 4: Israel special handling
 */
console.log('\n=== 4. Israel Special Handling ===');

const israeliNumbers = [
    '+9720502892553',
    '9720502892553',
    '+972 (050)-289-2553',
    '972502892553'
];

israeliNumbers.forEach(phone => {
    try {
        const result = formatPhoneNumber(phone, '+C (PPP)-EEE-SSSS');
        console.log(`  ${phone} -> ${result}`);
    } catch (error) {
        console.log(`  ${phone} -> Error: ${error.message}`);
    }
});

/**
 * Example 5: Country codes
 */
console.log('\n=== 5. Available Country Codes ===');

const sampleCountries = ['IL', 'US', 'GB', 'DE', 'FR', 'CA', 'AU', 'AE', 'SA', 'JO'];
console.log('Sample country codes:');
sampleCountries.forEach(country => {
    console.log(`  ${country}: ${COUNTRY_CODES[country]}`);
});

/**
 * Example 6: Real-world scenarios
 */
console.log('\n=== 6. Real-World Scenarios ===');

const scenarios = [
    {
        description: 'US customer service number',
        phone: '+12345678901',
        format: '+C (PPP)-EEE-SSSS',
        expected: '+1 (234)-567-8901'
    },
    {
        description: 'Israeli mobile number',
        phone: '+9720502892553',
        format: '+C (PPP)-EEE-SSSS',
        expected: '+972 (050)-289-2553'
    },
    {
        description: 'UK business number',
        phone: '+447911123456',
        format: '+C (PPP)-EEE-SSSS',
        expected: '+44 (791)-112-3456'
    },
    {
        description: 'Local US number without country code',
        phone: '1234567890',
        format: 'PPP - EEE SSSS',
        expected: '123 - 456 7890'
    },
    {
        description: 'Short number with padding',
        phone: '123456789',
        format: 'PPP - EEE SSSS',
        expected: '012 - 345 6789'
    }
];

scenarios.forEach(({ description, phone, format, expected }) => {
    try {
        const result = formatPhoneNumber(phone, format);
        const status = result === expected ? '✅' : '❌';
        console.log(`${status} ${description}:`);
        console.log(`  Input: ${phone}`);
        console.log(`  Format: ${format}`);
        console.log(`  Result: ${result}`);
        if (result !== expected) {
            console.log(`  Expected: ${expected}`);
        }
        console.log('');
    } catch (error) {
        console.log(`❌ ${description}: Error - ${error.message}\n`);
    }
});

/**
 * Example 7: Edge cases and error handling
 */
console.log('\n=== 7. Edge Cases and Error Handling ===');

const edgeCases = [
    { phone: '', description: 'Empty string' },
    { phone: 'abc', description: 'Non-numeric' },
    { phone: '123', description: 'Too short' },
    { phone: '123456789012345', description: 'Too long' },
    { phone: null as any, description: 'Null' },
    { phone: undefined as any, description: 'Undefined' },
    { phone: '+1 (234) 567-8901', description: 'Formatted input' },
    { phone: '1.234.567.8901', description: 'Dotted input' }
];

edgeCases.forEach(({ phone, description }) => {
    try {
        const result = formatPhoneNumber(phone, 'PPP - EEE SSSS');
        console.log(`✅ ${description}: "${result}"`);
    } catch (error) {
        console.log(`❌ ${description}: Error - ${error.message}`);
    }
});

/**
 * Example 8: Format pattern variations
 */
console.log('\n=== 8. Format Pattern Variations ===');

const formatVariations = [
    'PPP - EEE SSSS',
    '(PPP) - EEE SSSS',
    '(PP)  EEE SSSS',
    'PP-EEE SSSS',
    'PPP-EEE SSSS',
    '+C (PPP)-EEE-SSSS',
    '+C (PPP) EEESSSS',
    'C (PPP)-EEE-SSSS',
    'Phone: +C (PPP)-EEE-SSSS',
    'Call us at +C (PPP)-EEE-SSSS for support'
];

const testPhoneForVariations = '+12345678901';
console.log(`\nPhone: ${testPhoneForVariations}`);

formatVariations.forEach(format => {
    try {
        const result = formatPhoneNumber(testPhoneForVariations, format);
        console.log(`  ${format}: ${result}`);
    } catch (error) {
        console.log(`  ${format}: Error - ${error.message}`);
    }
});

/**
 * Example 9: Performance and benefits
 */
console.log('\n=== 9. Performance and Benefits ===');
console.log('✅ Zero external dependencies');
console.log('✅ Lightweight implementation');
console.log('✅ TypeScript support');
console.log('✅ Customizable formatting');
console.log('✅ Country code auto-detection');
console.log('✅ Special handling for specific countries');
console.log('✅ Flexible padding options');
console.log('✅ Error handling for edge cases');
console.log('✅ Pure string manipulation (no regex overhead)');

