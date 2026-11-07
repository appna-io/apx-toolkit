import {
    // Currency and number formatters
    formatCurrency,
    formatCompactNumber,
    formatFileSize,
    formatPercentage,
    formatNumber,
    formatBytes,
    
    // Credit card and personal data formatters
    formatCreditCard,
    formatSSN,
    formatPostalCode,
    
    // Time and duration formatters
    formatDuration,
    formatRelativeTime,
    formatOrdinal,
    
    // Date formatters
    formatDate,
    formatDateLocale,
    
    // Phone number formatter
    formatPhoneNumber,
    
    // I18N formatters
    formatCurrencyI18N,
    formatDateI18N,
    formatTimeI18N
} from '@apx-ui/toolkit';

/**
 * Comprehensive Formatters Demo
 * 
 * This demo showcases all formatting functions available in the toolkit
 * including currency, numbers, dates, personal data, and internationalization.
 */

console.log('=== Comprehensive Formatters Demo ===\n');

/**
 * 1. Currency and Number Formatting
 */
console.log('--- 1. Currency and Number Formatting ---');

// Basic currency formatting
console.log('💰 Currency Formatting:');
const amounts = [1234.56, 0, 999999.99, -1234.56];
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'ILS'];

amounts.forEach(amount => {
    console.log(`  Amount: ${amount}`);
    currencies.forEach(currency => {
        console.log(`    ${currency}: ${formatCurrency(amount, currency)}`);
    });
    console.log('');
});

// Locale-specific currency formatting
console.log('🌍 Locale-Specific Currency:');
const locales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA'];
const testAmount = 1234.56;

locales.forEach(locale => {
    console.log(`  ${locale}: ${formatCurrency(testAmount, 'USD', locale)}`);
});

// Compact number formatting
console.log('\n📊 Compact Number Formatting:');
const compactNumbers = [0, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890];

compactNumbers.forEach(num => {
    console.log(`  ${num.toLocaleString()}: ${formatCompactNumber(num)}`);
});

// File size formatting
console.log('\n📁 File Size Formatting:');
const fileSizes = [0, 1024, 1536, 1048576, 1073741824, 1099511627776];

fileSizes.forEach(bytes => {
    console.log(`  ${bytes} bytes: ${formatFileSize(bytes)}`);
});

// Percentage formatting
console.log('\n📈 Percentage Formatting:');
const percentages = [0, 0.5, 1, 12.5, 50, 99.99, 100];

percentages.forEach(percent => {
    console.log(`  ${percent}%: ${formatPercentage(percent)}`);
    console.log(`  ${percent}% (2 decimals): ${formatPercentage(percent, 2)}`);
});

// Number formatting with options
console.log('\n🔢 Number Formatting with Options:');
const numberOptions = [
    { value: 1234.56, options: { minimumFractionDigits: 2, maximumFractionDigits: 2 } },
    { value: 1234.56, options: { style: 'decimal', minimumFractionDigits: 0 } },
    { value: 1234.56, options: { style: 'currency', currency: 'EUR' } },
    { value: 0.1234, options: { style: 'percent' } }
];

numberOptions.forEach(({ value, options }) => {
    console.log(`  ${value} with options: ${formatNumber(value, 'en-US', options)}`);
});

// Bytes formatting with precision
console.log('\n💾 Bytes Formatting with Precision:');
const byteValues = [1024, 1048576, 1073741824, 1099511627776];

byteValues.forEach(bytes => {
    console.log(`  ${bytes} bytes:`);
    [0, 1, 2, 3].forEach(decimals => {
        console.log(`    ${decimals} decimals: ${formatBytes(bytes, decimals)}`);
    });
});

/**
 * 2. Personal Data Formatting
 */
console.log('\n--- 2. Personal Data Formatting ---');

// Credit card formatting
console.log('💳 Credit Card Formatting:');
const creditCards = [
    '4111111111111111', // Visa
    '5555555555554444', // Mastercard
    '378282246310005',  // American Express
    '6011111111111117'  // Discover
];

creditCards.forEach(card => {
    console.log(`  ${card}:`);
    console.log(`    Masked: ${formatCreditCard(card, true)}`);
    console.log(`    Formatted: ${formatCreditCard(card, false)}`);
});

// SSN formatting
console.log('\n🆔 SSN Formatting:');
const ssns = ['123456789', '1234567890', '12345678901'];

ssns.forEach(ssn => {
    console.log(`  ${ssn}:`);
    console.log(`    Masked: ${formatSSN(ssn, true)}`);
    console.log(`    Formatted: ${formatSSN(ssn, false)}`);
});

// Postal code formatting
console.log('\n📮 Postal Code Formatting:');
const postalCodes = ['12345', '123456789', '1234567890'];

postalCodes.forEach(code => {
    console.log(`  ${code}: ${formatPostalCode(code)}`);
});

/**
 * 3. Time and Duration Formatting
 */
console.log('\n--- 3. Time and Duration Formatting ---');

// Duration formatting
console.log('⏱️ Duration Formatting:');
const durations = [0, 30, 60, 90, 3600, 3661, 86400, 90061];

durations.forEach(seconds => {
    console.log(`  ${seconds} seconds: ${formatDuration(seconds)}`);
});

// Relative time formatting
console.log('\n🕐 Relative Time Formatting:');
const now = new Date();
const relativeTimes = [
    new Date(now.getTime() - 30 * 1000), // 30 seconds ago
    new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
    new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000), // 2 weeks ago
    new Date(now.getTime() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 months ago
    new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000), // 2 years ago
    new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours in the future
];

relativeTimes.forEach(time => {
    console.log(`  ${time.toISOString()}: ${formatRelativeTime(time)}`);
});

// Ordinal formatting
console.log('\n🔢 Ordinal Formatting:');
const ordinals = [1, 2, 3, 4, 5, 11, 12, 13, 21, 22, 23, 31, 101, 102, 103];

ordinals.forEach(num => {
    console.log(`  ${num}: ${formatOrdinal(num)}`);
});

/**
 * 4. Date Formatting
 */
console.log('\n--- 4. Date Formatting ---');

// Basic date formatting
console.log('📅 Date Formatting:');
const testDate = new Date('2024-01-15T14:30:45');
const dateFormats = [
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD HH:mm:ss',
    'MMM DD, YYYY',
    'dddd, MMMM Do, YYYY'
];

dateFormats.forEach(format => {
    try {
        console.log(`  ${format}: ${formatDate(testDate, format)}`);
    } catch (error) {
        console.log(`  ${format}: Error - ${error.message}`);
    }
});

// Locale-specific date formatting
console.log('\n🌍 Locale-Specific Date Formatting:');
const dateLocales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA'];
const dateOptions = [
    { year: 'numeric', month: 'long', day: 'numeric' },
    { year: 'numeric', month: 'short', day: 'numeric' },
    { hour: 'numeric', minute: '2-digit', second: '2-digit' },
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
];

dateLocales.forEach(locale => {
    console.log(`  ${locale}:`);
    dateOptions.forEach((options, index) => {
        try {
            const formatted = formatDateLocale(testDate, locale, options);
            console.log(`    Option ${index + 1}: ${formatted}`);
        } catch (error) {
            console.log(`    Option ${index + 1}: Error - ${error.message}`);
        }
    });
});

/**
 * 5. Phone Number Formatting
 */
console.log('\n--- 5. Phone Number Formatting ---');

// Basic phone formatting
console.log('📞 Phone Number Formatting:');
const phoneNumbers = [
    '+12345678901',
    '1234567890',
    '+9720502892553',
    '0502892553',
    '+447911123456'
];

const phoneFormats = [
    'PPP - EEE SSSS',
    '(PPP) - EEE SSSS',
    '+C (PPP)-EEE-SSSS',
    '+C (PPP) EEESSSS'
];

phoneNumbers.forEach(phone => {
    console.log(`  ${phone}:`);
    phoneFormats.forEach(format => {
        try {
            const formatted = formatPhoneNumber(phone, format);
            console.log(`    ${format}: ${formatted}`);
        } catch (error) {
            console.log(`    ${format}: Error - ${error.message}`);
        }
    });
    console.log('');
});

/**
 * 6. Internationalization Formatters
 */
console.log('\n--- 6. Internationalization Formatters ---');

// I18N Currency formatting
console.log('🌍 I18N Currency Formatting:');
const i18nAmounts = [1234.56, 99.99, 0.50];
const i18nCurrencies = ['USD', 'EUR', 'GBP', 'ILS', 'JPY'];
const i18nLocales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ja-JP'];

i18nAmounts.forEach(amount => {
    console.log(`  Amount: ${amount}`);
    i18nCurrencies.forEach(currency => {
        console.log(`    ${currency}:`);
        i18nLocales.forEach(locale => {
            try {
                const formatted = formatCurrencyI18N(amount, currency, locale);
                console.log(`      ${locale}: ${formatted}`);
            } catch (error) {
                console.log(`      ${locale}: Error - ${error.message}`);
            }
        });
    });
    console.log('');
});

// I18N Date formatting
console.log('📅 I18N Date Formatting:');
const i18nDateFormats = ['default', 'appointment'];
const i18nDateLocales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA'];

i18nDateFormats.forEach(format => {
    console.log(`  Format: ${format}`);
    i18nDateLocales.forEach(locale => {
        try {
            const formatted = formatDateI18N(testDate, undefined, format, locale);
            console.log(`    ${locale}: ${formatted}`);
        } catch (error) {
            console.log(`    ${locale}: Error - ${error.message}`);
        }
    });
    console.log('');
});

// I18N Time formatting
console.log('⏰ I18N Time Formatting:');
const timeUnits = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'];
const timeValues = [1, 5, 10];
const timeLocales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA'];

timeUnits.forEach(unit => {
    console.log(`  Unit: ${unit}`);
    timeValues.forEach(value => {
        console.log(`    Value: ${value}`);
        timeLocales.forEach(locale => {
            try {
                const formatted = formatTimeI18N(value, unit, locale);
                console.log(`      ${locale}: ${formatted}`);
            } catch (error) {
                console.log(`      ${locale}: Error - ${error.message}`);
            }
        });
    });
    console.log('');
});

/**
 * 7. Real-World Formatting Scenarios
 */
console.log('\n--- 7. Real-World Formatting Scenarios ---');

// E-commerce product display
console.log('🛒 E-commerce Product Display:');
interface Product {
    name: string;
    price: number;
    discount: number;
    fileSize: number;
    createdAt: Date;
    phone: string;
    rating: number;
}

const product: Product = {
    name: 'Premium Headphones',
    price: 299.99,
    discount: 15,
    fileSize: 1048576, // 1MB
    createdAt: new Date('2024-01-15T10:30:00'),
    phone: '+12345678901',
    rating: 4.5
};

console.log(`  Product: ${product.name}`);
console.log(`  Price: ${formatCurrency(product.price, 'USD')}`);
console.log(`  Discount: ${formatPercentage(product.discount)}`);
console.log(`  Final Price: ${formatCurrency(product.price * (1 - product.discount / 100), 'USD')}`);
console.log(`  File Size: ${formatFileSize(product.fileSize)}`);
console.log(`  Created: ${formatRelativeTime(product.createdAt)}`);
console.log(`  Phone: ${formatPhoneNumber(product.phone, '+C (PPP)-EEE-SSSS')}`);
console.log(`  Rating: ${formatNumber(product.rating, 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/5`);

// User profile display
console.log('\n👤 User Profile Display:');
interface UserProfile {
    name: string;
    email: string;
    phone: string;
    ssn: string;
    creditCard: string;
    joinDate: Date;
    lastLogin: Date;
    fileUploads: number;
    totalStorage: number;
}

const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+12345678901',
    ssn: '123456789',
    creditCard: '4111111111111111',
    joinDate: new Date('2023-06-15T09:00:00'),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    fileUploads: 150,
    totalStorage: 5368709120 // 5GB
};

console.log(`  Name: ${userProfile.name}`);
console.log(`  Email: ${userProfile.email}`);
console.log(`  Phone: ${formatPhoneNumber(userProfile.phone, '+C (PPP)-EEE-SSSS')}`);
console.log(`  SSN: ${formatSSN(userProfile.ssn, true)}`);
console.log(`  Credit Card: ${formatCreditCard(userProfile.creditCard, true)}`);
console.log(`  Join Date: ${formatDate(userProfile.joinDate, 'MMMM Do, YYYY')}`);
console.log(`  Last Login: ${formatRelativeTime(userProfile.lastLogin)}`);
console.log(`  File Uploads: ${formatCompactNumber(userProfile.fileUploads)}`);
console.log(`  Total Storage: ${formatFileSize(userProfile.totalStorage)}`);

// Financial report
console.log('\n📊 Financial Report:');
interface FinancialData {
    revenue: number;
    expenses: number;
    profit: number;
    growth: number;
    transactions: number;
    avgTransaction: number;
}

const financialData: FinancialData = {
    revenue: 1250000,
    expenses: 875000,
    profit: 375000,
    growth: 12.5,
    transactions: 15420,
    avgTransaction: 81.05
};

const profitMargin = (financialData.profit / financialData.revenue) * 100;

console.log(`  Revenue: ${formatCurrency(financialData.revenue, 'USD')}`);
console.log(`  Expenses: ${formatCurrency(financialData.expenses, 'USD')}`);
console.log(`  Profit: ${formatCurrency(financialData.profit, 'USD')}`);
console.log(`  Profit Margin: ${formatPercentage(profitMargin, 1)}`);
console.log(`  Growth: ${formatPercentage(financialData.growth, 1)}`);
console.log(`  Transactions: ${formatCompactNumber(financialData.transactions)}`);
console.log(`  Avg Transaction: ${formatCurrency(financialData.avgTransaction, 'USD')}`);

console.log('\n=== Comprehensive Formatters Demo Complete ===');
console.log('Key Features:');
console.log('✅ 15+ formatting functions');
console.log('✅ Currency and number formatting with locales');
console.log('✅ Personal data formatting with masking');
console.log('✅ Time and duration formatting');
console.log('✅ Date formatting with custom formats');
console.log('✅ Phone number formatting with patterns');
console.log('✅ Internationalization support');
console.log('✅ Real-world usage scenarios');
