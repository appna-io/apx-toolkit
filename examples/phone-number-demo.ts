import { formatPhoneNumber, COUNTRY_CODES } from '../src/utils/phoneNumber';

/**
 * Demo function showing how to use the new phone number formatting utility
 */
export function demonstratePhoneNumberUtility() {
    console.log('=== Phone Number Formatting Utility Demo ===\n');
    
    // 1. Basic formatting examples
    console.log('--- 1. Basic Formatting Examples ---');
    const testNumbers = [
        '1234567890',
        '0502892553',
        '9720502892553',
        '+9720502892553'
    ];
    
    const formats = [
        'PPP - EEE SSSS',
        '(PPP) - EEE SSSS',
        '(PP)  EEE SSSS',
        'PP-EEE SSSS',
        'PPP-EEE SSSS'
    ];
    
    testNumbers.forEach(phone => {
        console.log(`\nPhone: ${phone}`);
        formats.forEach(format => {
            try {
                const result = formatPhoneNumber(phone, format);
                console.log(`  ${format}: ${result}`);
            } catch (error) {
                console.log(`  ${format}: Error - ${error.message}`);
            }
        });
    });
    
    // 2. International formatting with country codes
    console.log('\n--- 2. International Formatting ---');
    const internationalFormats = [
        '+C (PPP)-EEE-SSSS',
        '+C (PPP) EEESSSS'
    ];
    
    const internationalNumbers = [
        '+12345678901',
        '+9720502892553',
        '+447911123456',
        '12345678901',
        '9720502892553'
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
    
    // 3. Custom options
    console.log('\n--- 3. Custom Options ---');
    const customOptions = [
    { leadingDigitPad: '0', nationalNumberLength: 10 },
    { leadingDigitPad: '9', nationalNumberLength: 9 },
    { inputIncludesCountry: false, originCountry: 'US' as keyof typeof COUNTRY_CODES },
    { inputIncludesCountry: false, originCountry: 'GB' as keyof typeof COUNTRY_CODES }
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
    
    // 4. Israel special handling
    console.log('\n--- 4. Israel Special Handling ---');
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
    
    // 5. Country codes constant
    console.log('\n--- 5. Available Country Codes ---');
    console.log('Sample country codes:');
    const sampleCountries = ['IL', 'US', 'GB', 'DE', 'FR', 'CA', 'AU'];
    sampleCountries.forEach(country => {
        console.log(`  ${country}: ${COUNTRY_CODES[country]}`);
    });
    
    // 6. Edge cases and error handling
    console.log('\n--- 6. Edge Cases ---');
    const edgeCases = [
        '', // Empty string
        'abc', // Non-numeric
        '123', // Too short
        '123456789012345', // Too long
        null as any, // Null
        undefined as any // Undefined
    ];
    
    edgeCases.forEach(phone => {
        try {
            const result = formatPhoneNumber(phone, 'PPP - EEE SSSS');
            console.log(`  "${phone}" -> "${result}"`);
        } catch (error) {
            console.log(`  "${phone}" -> Error: ${error.message}`);
        }
    });
    
    // 7. Real-world examples
    console.log('\n--- 7. Real-World Examples ---');
    const realWorldExamples = [
        { phone: '+12345678901', format: '+C (PPP)-EEE-SSSS', description: 'US number with country code' },
        { phone: '1234567890', format: '+C (PPP)-EEE-SSSS', description: 'US number without country code' },
        { phone: '+9720502892553', format: '+C (PPP)-EEE-SSSS', description: 'Israeli number' },
        { phone: '0502892553', format: 'PPP - EEE SSSS', description: 'Israeli local number' },
        { phone: '+447911123456', format: '+C (PPP)-EEE-SSSS', description: 'UK mobile number' },
        { phone: '123456789', format: 'PPP - EEE SSSS', description: 'Short number with padding' }
    ];
    
    realWorldExamples.forEach(({ phone, format, description }) => {
        try {
            const result = formatPhoneNumber(phone, format);
            console.log(`  ${description}:`);
            console.log(`    Input: ${phone}`);
            console.log(`    Format: ${format}`);
            console.log(`    Result: ${result}\n`);
        } catch (error) {
            console.log(`  ${description}: Error - ${error.message}\n`);
        }
    });
    
    console.log('=== Phone Number Demo Complete ===');
}

// Run demo if this file is executed directly
if (require.main === module) {
    demonstratePhoneNumberUtility();
}