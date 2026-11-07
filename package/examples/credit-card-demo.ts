import {
    formatCreditCard,
    getCreditCardType,
    getRandomDummyCreditCard,
    getLast4Digits,
    isValidCreditCardNumber,
    getCreditCardInfo,
    maskCreditCard,
    getAvailableCreditCardTypes,
    CREDIT_CARD_TYPES,
    type CreditCardType,
    type CreditCardFormatOptions
} from '@apx-ui/toolkit';

/**
 * Credit Card Demo
 * 
 * This demo showcases all credit card utility functions including
 * formatting, validation, type detection, and dummy card generation.
 */

console.log('=== Credit Card Utilities Demo ===\n');

/**
 * 1. Credit Card Type Detection
 */
console.log('--- 1. Credit Card Type Detection ---');

const testCards = [
    '4111111111111111', // Visa
    '5555555555554444', // MasterCard
    '378282246310005',  // American Express
    '6011111111111117', // Discover
    '30569309025904',   // Diners Club
    '3530111333300000', // JCB
    '6200000000000007', // UnionPay
    '1234567890123456'  // Invalid
];

testCards.forEach(card => {
    const type = getCreditCardType(card);
    const typeName = type ? CREDIT_CARD_TYPES[type].name : 'Unknown';
    console.log(`  ${card}: ${typeName}`);
});

/**
 * 2. Credit Card Formatting
 */
console.log('\n--- 2. Credit Card Formatting ---');

// Basic formatting
console.log('📱 Basic Formatting:');
const visaCard = '4111111111111111';
console.log(`  Original: ${visaCard}`);
console.log(`  Formatted: ${formatCreditCard(visaCard)}`);

// Custom format
console.log('\n🎨 Custom Format:');
const customFormat = 'AAAA-BBBB-CCCC-DDDD';
console.log(`  Custom format (${customFormat}): ${formatCreditCard(visaCard, { format: customFormat })}`);

// Masked formatting
console.log('\n🔒 Masked Formatting:');
console.log(`  Masked: ${formatCreditCard(visaCard, { mask: true })}`);
console.log(`  Custom mask char: ${formatCreditCard(visaCard, { mask: true, maskChar: 'X' })}`);

// Different card types with their default formats
console.log('\n💳 Different Card Types:');
const cards = [
    { number: '4111111111111111', name: 'Visa' },
    { number: '5555555555554444', name: 'MasterCard' },
    { number: '378282246310005', name: 'American Express' },
    { number: '6011111111111117', name: 'Discover' },
    { number: '30569309025904', name: 'Diners Club' },
    { number: '3530111333300000', name: 'JCB' }
];

cards.forEach(({ number, name }) => {
    const formatted = formatCreditCard(number);
    const masked = formatCreditCard(number, { mask: true });
    console.log(`  ${name}: ${formatted} | Masked: ${masked}`);
});

/**
 * 3. Credit Card Validation
 */
console.log('\n--- 3. Credit Card Validation ---');

const validationTests = [
    { number: '4111111111111111', expected: true, description: 'Valid Visa' },
    { number: '5555555555554444', expected: true, description: 'Valid MasterCard' },
    { number: '378282246310005', expected: true, description: 'Valid American Express' },
    { number: '6011111111111117', expected: true, description: 'Valid Discover' },
    { number: '1234567890123456', expected: false, description: 'Invalid number' },
    { number: '411111111111111', expected: false, description: 'Invalid length' },
    { number: '4111111111111112', expected: false, description: 'Invalid Luhn' },
    { number: '', expected: false, description: 'Empty string' },
    { number: 'abc', expected: false, description: 'Non-numeric' }
];

validationTests.forEach(({ number, expected, description }) => {
    const isValid = isValidCreditCardNumber(number);
    const status = isValid === expected ? '✅' : '❌';
    console.log(`  ${status} ${description}: "${number}" -> ${isValid}`);
});

/**
 * 4. Last 4 Digits Extraction
 */
console.log('\n--- 4. Last 4 Digits Extraction ---');

const last4Tests = [
    '4111111111111111',
    '5555555555554444',
    '378282246310005',
    '6011111111111117',
    '4111-1111-1111-1111', // With dashes
    '4111 1111 1111 1111'  // With spaces
];

last4Tests.forEach(card => {
    const last4 = getLast4Digits(card);
    console.log(`  ${card} -> Last 4: ${last4}`);
});

/**
 * 5. Dummy Credit Card Generation
 */
console.log('\n--- 5. Dummy Credit Card Generation ---');

// Generate random cards of each type
console.log('🎲 Random Dummy Cards:');
Object.keys(CREDIT_CARD_TYPES).forEach(type => {
    const dummyCard = getRandomDummyCreditCard(type as CreditCardType);
    const cardType = getCreditCardType(dummyCard);
    const formatted = formatCreditCard(dummyCard);
    console.log(`  ${type}: ${dummyCard} (${formatted})`);
});

// Generate random cards without specifying type
console.log('\n🎯 Random Cards (Any Type):');
for (let i = 0; i < 5; i++) {
    const dummyCard = getRandomDummyCreditCard();
    const cardType = getCreditCardType(dummyCard);
    const typeName = cardType ? CREDIT_CARD_TYPES[cardType].name : 'Unknown';
    console.log(`  ${dummyCard} (${typeName})`);
}

/**
 * 6. Credit Card Information
 */
console.log('\n--- 6. Credit Card Information ---');

const infoTests = [
    '4111111111111111',
    '5555555555554444',
    '378282246310005',
    '6011111111111117'
];

infoTests.forEach(card => {
    const info = getCreditCardInfo(card);
    console.log(`  Card: ${card}`);
    console.log(`    Type: ${info.typeName} (${info.type})`);
    console.log(`    Formatted: ${info.formatted}`);
    console.log(`    Last 4: ${info.last4}`);
    console.log(`    Valid: ${info.isValid}`);
    console.log(`    Length: ${info.length}`);
    console.log('');
});

/**
 * 7. Masking Utilities
 */
console.log('\n--- 7. Masking Utilities ---');

const maskingTests = [
    '4111111111111111',
    '5555555555554444',
    '378282246310005',
    '6011111111111117',
    '1234567890123456789' // Long number
];

maskingTests.forEach(card => {
    const masked = maskCreditCard(card);
    const maskedX = maskCreditCard(card, 'X');
    console.log(`  ${card} -> ${masked} | ${maskedX}`);
});

/**
 * 8. Available Credit Card Types
 */
console.log('\n--- 8. Available Credit Card Types ---');

const availableTypes = getAvailableCreditCardTypes();
console.log('📋 Supported Credit Card Types:');
availableTypes.forEach(({ type, name, format }) => {
    console.log(`  ${type}: ${name} (${format})`);
});

/**
 * 9. Real-World Usage Scenarios
 */
console.log('\n--- 9. Real-World Usage Scenarios ---');

// Payment form validation
console.log('💳 Payment Form Validation:');
const paymentForm = {
    cardNumber: '4111111111111111',
    expiryDate: '12/25',
    cvv: '123',
    cardholderName: 'John Doe'
};

const cardInfo = getCreditCardInfo(paymentForm.cardNumber);
console.log(`  Card Number: ${formatCreditCard(paymentForm.cardNumber, { mask: true })}`);
console.log(`  Type: ${cardInfo.typeName}`);
console.log(`  Valid: ${cardInfo.isValid ? 'Yes' : 'No'}`);
console.log(`  Last 4: ${cardInfo.last4}`);

// Display saved cards
console.log('\n💾 Saved Cards Display:');
const savedCards = [
    '4111111111111111',
    '5555555555554444',
    '378282246310005'
];

savedCards.forEach((card, index) => {
    const info = getCreditCardInfo(card);
    const masked = maskCreditCard(card);
    console.log(`  Card ${index + 1}: ${info.typeName} ending in ${info.last4} (${masked})`);
});

// Test card generation for development
console.log('\n🧪 Test Card Generation for Development:');
const testCards = [
    getRandomDummyCreditCard('VISA'),
    getRandomDummyCreditCard('MASTERCARD'),
    getRandomDummyCreditCard('AMERICAN_EXPRESS'),
    getRandomDummyCreditCard('DISCOVER')
];

testCards.forEach((card, index) => {
    const info = getCreditCardInfo(card);
    console.log(`  Test Card ${index + 1}: ${info.typeName} - ${formatCreditCard(card)}`);
});

// Custom formatting for different display needs
console.log('\n🎨 Custom Formatting Examples:');
const customFormats = [
    { format: 'AAAA-BBBB-CCCC-DDDD', description: 'Dashed format' },
    { format: 'AAAA BBBB CCCC DDDD', description: 'Spaced format' },
    { format: '**** **** **** AAAA', description: 'Masked with last 4' },
    { format: 'AAAA BBBB CCCC DDDD EEEE', description: 'Extended format' }
];

const testCard = '4111111111111111';
customFormats.forEach(({ format, description }) => {
    const formatted = formatCreditCard(testCard, { format });
    console.log(`  ${description}: ${formatted}`);
});

/**
 * 10. Error Handling
 */
console.log('\n--- 10. Error Handling ---');

const errorTests = [
    { input: null, description: 'Null input' },
    { input: undefined, description: 'Undefined input' },
    { input: '', description: 'Empty string' },
    { input: 'abc', description: 'Non-numeric string' },
    { input: '123', description: 'Too short' },
    { input: '12345678901234567890', description: 'Too long' }
];

errorTests.forEach(({ input, description }) => {
    const type = getCreditCardType(input as string);
    const isValid = isValidCreditCardNumber(input as string);
    const last4 = getLast4Digits(input as string);
    const formatted = formatCreditCard(input as string);
    
    console.log(`  ${description}:`);
    console.log(`    Type: ${type || 'null'}`);
    console.log(`    Valid: ${isValid}`);
    console.log(`    Last 4: "${last4}"`);
    console.log(`    Formatted: "${formatted}"`);
    console.log('');
});

console.log('=== Credit Card Demo Complete ===');
console.log('Key Features:');
console.log('✅ 7 major credit card types supported');
console.log('✅ Custom formatting with placeholders (A, B, C, D, E)');
console.log('✅ Masking with custom characters');
console.log('✅ Luhn algorithm validation');
console.log('✅ Dummy card generation for testing');
console.log('✅ Type detection and validation');
console.log('✅ Last 4 digits extraction');
console.log('✅ Comprehensive error handling');
console.log('✅ Real-world usage examples');
