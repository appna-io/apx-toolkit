import {
    // Basic validators
    isEmail,
    isPhone,
    isNumeric,
    isAlphanumeric,
    isValidURL,
    isStrongPassword,
    
    // Advanced validators
    isCreditCard,
    isIPv4,
    isDate,
    isTime,
    isUUID,
    isPostalCode,
    isSSN,
    isCurrency,
    isHexColor,
    isDomain,
    isUsername,
    hasValidFileExtension,
    
    // Validation with detailed results
    validateEmail,
    validatePhone,
    validateURL,
    validatePassword,
    
    // Generic validation
    validateWithRegex,
    
    // Regex patterns
    REGEX
} from '@apx-ui/toolkit';

/**
 * Comprehensive Validators Demo
 * 
 * This demo showcases all validation functions available in the toolkit
 * including basic validators, advanced validators, and validation with detailed results.
 */

console.log('=== Comprehensive Validators Demo ===\n');

/**
 * 1. Basic Validators
 */
console.log('--- 1. Basic Validators ---');

// Email validation
console.log('📧 Email Validation:');
const emailTests = [
    'user@example.com',
    'test.email+tag@domain.co.uk',
    'invalid-email',
    'user@',
    '@domain.com',
    'user@domain',
    ''
];

emailTests.forEach(email => {
    console.log(`  "${email}": ${isEmail(email) ? '✅' : '❌'}`);
});

// Phone validation
console.log('\n📱 Phone Validation:');
const phoneTests = [
    '+1234567890',
    '1234567890',
    '123-456-7890',
    'invalid',
    '123',
    '123456789012345',
    ''
];

phoneTests.forEach(phone => {
    console.log(`  "${phone}": ${isPhone(phone) ? '✅' : '❌'}`);
});

// URL validation
console.log('\n🌐 URL Validation:');
const urlTests = [
    'https://example.com',
    'http://example.com',
    'https://subdomain.example.com/path?query=value',
    'invalid-url',
    'ftp://example.com',
    'example.com',
    ''
];

urlTests.forEach(url => {
    console.log(`  "${url}": ${isValidURL(url) ? '✅' : '❌'}`);
});

// Password strength validation
console.log('\n🔒 Password Strength Validation:');
const passwordTests = [
    'MyPass123!',
    'StrongP@ssw0rd',
    'weak',
    '12345678',
    'NoNumbers!',
    'NoSpecial123',
    'NoUppercase123!',
    ''
];

passwordTests.forEach(password => {
    console.log(`  "${password}": ${isStrongPassword(password) ? '✅' : '❌'}`);
});

// Numeric validation
console.log('\n🔢 Numeric Validation:');
const numericTests = ['123', '0', '999', 'abc', '12.34', '12a', ''];

numericTests.forEach(value => {
    console.log(`  "${value}": ${isNumeric(value) ? '✅' : '❌'}`);
});

// Alphanumeric validation
console.log('\n🔤 Alphanumeric Validation:');
const alphanumericTests = ['abc123', 'ABC123', 'abc', '123', 'abc-123', 'abc_123', ''];

alphanumericTests.forEach(value => {
    console.log(`  "${value}": ${isAlphanumeric(value) ? '✅' : '❌'}`);
});

/**
 * 2. Advanced Validators
 */
console.log('\n--- 2. Advanced Validators ---');

// Credit card validation
console.log('💳 Credit Card Validation:');
const creditCardTests = [
    '4111111111111111', // Visa
    '5555555555554444', // Mastercard
    '378282246310005',  // American Express
    '6011111111111117', // Discover
    '1234567890123456', // Invalid
    '4111-1111-1111-1111', // With dashes
    ''
];

creditCardTests.forEach(card => {
    console.log(`  "${card}": ${isCreditCard(card) ? '✅' : '❌'}`);
});

// IPv4 validation
console.log('\n🌐 IPv4 Validation:');
const ipv4Tests = [
    '192.168.1.1',
    '10.0.0.1',
    '255.255.255.255',
    '0.0.0.0',
    '256.1.1.1', // Invalid
    '192.168.1', // Invalid
    '192.168.1.1.1', // Invalid
    ''
];

ipv4Tests.forEach(ip => {
    console.log(`  "${ip}": ${isIPv4(ip) ? '✅' : '❌'}`);
});

// Date validation
console.log('\n📅 Date Validation (YYYY-MM-DD):');
const dateTests = [
    '2024-01-15',
    '2024-12-31',
    '2024-02-29', // Leap year
    '2023-02-29', // Not leap year
    '2024-13-01', // Invalid month
    '2024-01-32', // Invalid day
    '24-01-15', // Invalid format
    ''
];

dateTests.forEach(date => {
    console.log(`  "${date}": ${isDate(date) ? '✅' : '❌'}`);
});

// Time validation
console.log('\n⏰ Time Validation (HH:MM:SS):');
const timeTests = [
    '09:30:00',
    '23:59:59',
    '00:00:00',
    '25:00:00', // Invalid hour
    '12:60:00', // Invalid minute
    '12:30:60', // Invalid second
    '9:30:00', // Invalid format
    ''
];

timeTests.forEach(time => {
    console.log(`  "${time}": ${isTime(time) ? '✅' : '❌'}`);
});

// UUID validation
console.log('\n🆔 UUID Validation:');
const uuidTests = [
    '550e8400-e29b-41d4-a716-446655440000',
    '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    'invalid-uuid',
    '550e8400-e29b-41d4-a716', // Too short
    '550e8400-e29b-41d4-a716-446655440000-extra', // Too long
    ''
];

uuidTests.forEach(uuid => {
    console.log(`  "${uuid}": ${isUUID(uuid) ? '✅' : '❌'}`);
});

// Postal code validation (US)
console.log('\n📮 Postal Code Validation (US):');
const postalCodeTests = [
    '12345',
    '12345-6789',
    '1234', // Too short
    '123456', // Too long
    '12345-678', // Invalid format
    'abcde', // Non-numeric
    ''
];

postalCodeTests.forEach(code => {
    console.log(`  "${code}": ${isPostalCode(code) ? '✅' : '❌'}`);
});

// SSN validation (US)
console.log('\n🆔 SSN Validation (US):');
const ssnTests = [
    '123-45-6789',
    '123456789',
    '123-45-678', // Too short
    '123-45-67890', // Too long
    '000-00-0000', // Invalid
    '123-45-678a', // Non-numeric
    ''
];

ssnTests.forEach(ssn => {
    console.log(`  "${ssn}": ${isSSN(ssn) ? '✅' : '❌'}`);
});

// Currency validation
console.log('\n💰 Currency Validation:');
const currencyTests = [
    '$123.45',
    '123.45',
    '123,45.67', // Invalid format
    '$123.456', // Too many decimals
    'abc', // Non-numeric
    ''
];

currencyTests.forEach(currency => {
    console.log(`  "${currency}": ${isCurrency(currency) ? '✅' : '❌'}`);
});

// Hex color validation
console.log('\n🎨 Hex Color Validation:');
const hexColorTests = [
    '#FF0000',
    '#ff0000',
    '#f00',
    '#F00',
    'FF0000', // Without #
    '#GG0000', // Invalid hex
    '#FF00', // Too short
    '#FF00000', // Too long
    ''
];

hexColorTests.forEach(color => {
    console.log(`  "${color}": ${isHexColor(color) ? '✅' : '❌'}`);
});

// Domain validation
console.log('\n🌐 Domain Validation:');
const domainTests = [
    'example.com',
    'subdomain.example.com',
    'example.co.uk',
    'example-site.com',
    'example', // No TLD
    'example..com', // Double dot
    'example.com.', // Trailing dot
    ''
];

domainTests.forEach(domain => {
    console.log(`  "${domain}": ${isDomain(domain) ? '✅' : '❌'}`);
});

// Username validation
console.log('\n👤 Username Validation:');
const usernameTests = [
    'user123',
    'user_name',
    'user-name',
    'user.name',
    'user', // Too short
    'a'.repeat(21), // Too long
    'user@name', // Invalid character
    '123user', // Starts with number
    ''
];

usernameTests.forEach(username => {
    console.log(`  "${username}": ${isUsername(username) ? '✅' : '❌'}`);
});

// File extension validation
console.log('\n📁 File Extension Validation:');
const fileExtensionTests = [
    'document.pdf',
    'image.jpg',
    'script.js',
    'style.css',
    'data.json',
    'document', // No extension
    'document.', // No extension after dot
    '.pdf', // No filename
    ''
];

fileExtensionTests.forEach(file => {
    console.log(`  "${file}": ${hasValidFileExtension(file) ? '✅' : '❌'}`);
});

/**
 * 3. Validation with Detailed Results
 */
console.log('\n--- 3. Validation with Detailed Results ---');

// Email validation with details
console.log('📧 Email Validation with Details:');
const emailDetails = [
    'user@example.com',
    'invalid-email',
    '',
    'user@',
    'user@domain'
];

emailDetails.forEach(email => {
    const result = validateEmail(email);
    console.log(`  "${email}": ${result.valid ? '✅' : '❌'} ${result.error || 'Valid'}`);
});

// Phone validation with details
console.log('\n📱 Phone Validation with Details:');
const phoneDetails = [
    '+1234567890',
    'invalid-phone',
    '',
    '123',
    '123456789012345'
];

phoneDetails.forEach(phone => {
    const result = validatePhone(phone);
    console.log(`  "${phone}": ${result.valid ? '✅' : '❌'} ${result.error || 'Valid'}`);
});

// URL validation with details
console.log('\n🌐 URL Validation with Details:');
const urlDetails = [
    'https://example.com',
    'invalid-url',
    '',
    'example.com',
    'ftp://example.com'
];

urlDetails.forEach(url => {
    const result = validateURL(url);
    console.log(`  "${url}": ${result.valid ? '✅' : '❌'} ${result.error || 'Valid'}`);
});

// Password validation with details
console.log('\n🔒 Password Validation with Details:');
const passwordDetails = [
    'MyPass123!',
    'weak',
    '',
    '12345678',
    'NoNumbers!',
    'NoSpecial123',
    'NoUppercase123!'
];

passwordDetails.forEach(password => {
    const result = validatePassword(password);
    console.log(`  "${password}": ${result.valid ? '✅' : '❌'} ${result.error || 'Valid'}`);
});

/**
 * 4. Generic Validation with Regex
 */
console.log('\n--- 4. Generic Validation with Regex ---');

console.log('🔣 Available Regex Patterns:');
Object.keys(REGEX).forEach(pattern => {
    console.log(`  ${pattern}: ${REGEX[pattern as keyof typeof REGEX]}`);
});

console.log('\n🔣 Custom Regex Validation:');
const customTests = [
    { value: 'hello', pattern: 'alphanumeric' as keyof typeof REGEX },
    { value: '123', pattern: 'numeric' as keyof typeof REGEX },
    { value: 'test@example.com', pattern: 'email' as keyof typeof REGEX },
    { value: 'https://example.com', pattern: 'url' as keyof typeof REGEX }
];

customTests.forEach(({ value, pattern }) => {
    const result = validateWithRegex(value, pattern);
    console.log(`  "${value}" with ${pattern}: ${result ? '✅' : '❌'}`);
});

/**
 * 5. Real-World Validation Scenarios
 */
console.log('\n--- 5. Real-World Validation Scenarios ---');

// Form validation example
console.log('📝 Form Validation Example:');
interface FormData {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    website: string;
    creditCard: string;
}

const formData: FormData = {
    email: 'user@example.com',
    phone: '+1234567890',
    password: 'MyPass123!',
    confirmPassword: 'MyPass123!',
    website: 'https://example.com',
    creditCard: '4111111111111111'
};

const formValidation = {
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    password: validatePassword(formData.password),
    website: validateURL(formData.website),
    creditCard: { valid: isCreditCard(formData.creditCard), error: isCreditCard(formData.creditCard) ? undefined : 'Invalid credit card' },
    passwordMatch: { valid: formData.password === formData.confirmPassword, error: formData.password === formData.confirmPassword ? undefined : 'Passwords do not match' }
};

console.log('Form validation results:');
Object.entries(formValidation).forEach(([field, result]) => {
    console.log(`  ${field}: ${result.valid ? '✅' : '❌'} ${result.error || 'Valid'}`);
});

// Data sanitization example
console.log('\n🧹 Data Sanitization Example:');
const userInputs = [
    '  user@example.com  ', // Email with spaces
    '  +1 (234) 567-8900  ', // Phone with spaces and formatting
    '  https://example.com  ', // URL with spaces
    '  MyPass123!  ' // Password with spaces
];

userInputs.forEach((input, index) => {
    const trimmed = input.trim();
    const types = ['email', 'phone', 'url', 'password'];
    const validators = [isEmail, isPhone, isValidURL, isStrongPassword];
    
    const isValid = validators[index](trimmed);
    console.log(`  "${input}" -> "${trimmed}": ${isValid ? '✅' : '❌'}`);
});

console.log('\n=== Comprehensive Validators Demo Complete ===');
console.log('Key Features:');
console.log('✅ 20+ validation functions');
console.log('✅ Detailed validation results with error messages');
console.log('✅ Support for common data types and formats');
console.log('✅ Generic regex validation');
console.log('✅ Real-world form validation examples');
console.log('✅ Data sanitization examples');
