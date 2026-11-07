import {
    // Validators
    isEmail,
    isPhone,
    isNumeric,
    isValidURL,
    isStrongPassword,
  
    // Formatters
    formatCurrency,
    formatPhoneNumber,
    formatCompactNumber,
  
    // Date utilities
    formatDate,
    getTimeAgo,
    isToday,
  
    // Generic helpers
    isEmpty,
    isDefined,
    toNumberSafe,
  
    // Constants
    COUNTRIES,
    LANGUAGES,
    SECONDS_IN_MINUTE,
  
    // Regex patterns
    REGEX
} from '../index';

describe('@apx-ui/toolkit', () => {
    describe('Validators', () => {
        test('isEmail should validate email addresses', () => {
            expect(isEmail('test@example.com')).toBe(true);
            expect(isEmail('invalid-email')).toBe(false);
            expect(isEmail('')).toBe(false);
        });

        test('isPhone should validate phone numbers', () => {
            expect(isPhone('+1234567890')).toBe(true);
            expect(isPhone('1234567890')).toBe(true);
            expect(isPhone('invalid')).toBe(false);
        });

        test('isNumeric should validate numeric strings', () => {
            expect(isNumeric('123')).toBe(true);
            expect(isNumeric('abc')).toBe(false);
        });

        test('isValidURL should validate URLs', () => {
            expect(isValidURL('https://example.com')).toBe(true);
            expect(isValidURL('http://example.com')).toBe(true);
            expect(isValidURL('invalid-url')).toBe(false);
        });

        test('isStrongPassword should validate strong passwords', () => {
            expect(isStrongPassword('MyPass123!')).toBe(true);
            expect(isStrongPassword('weak')).toBe(false);
        });
    });

    describe('Formatters', () => {
        test('formatCurrency should format currency', () => {
            expect(formatCurrency(1234.56, 'USD', 'en-US')).toContain('$1,234.56');
        });

        test('formatPhoneNumber should format phone numbers', () => {
            expect(formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS')).toContain('+1');
            expect(formatPhoneNumber('1234567890', 'PPP - EEE SSSS')).toContain('123');
        });

        test('formatCompactNumber should format compact numbers', () => {
            expect(formatCompactNumber(1500)).toBe('1.5K');
            expect(formatCompactNumber(2000000)).toBe('2.0M');
        });
    });

    describe('Date Utilities', () => {
        test('formatDate should format dates', () => {
            const date = new Date('2024-01-15');
            expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15');
        });

        test('isToday should check if date is today', () => {
            expect(isToday(new Date())).toBe(true);
            expect(isToday(new Date('2020-01-01'))).toBe(false);
        });
    });

    describe('Generic Helpers', () => {
        test('isEmpty should check if value is empty', () => {
            expect(isEmpty('')).toBe(true);
            expect(isEmpty([])).toBe(true);
            expect(isEmpty({})).toBe(true);
            expect(isEmpty('hello')).toBe(false);
        });

        test('isDefined should check if value is defined', () => {
            expect(isDefined(null)).toBe(false);
            expect(isDefined(undefined)).toBe(false);
            expect(isDefined('hello')).toBe(true);
        });

        test('toNumberSafe should safely convert to number', () => {
            expect(toNumberSafe('123')).toBe(123);
            expect(toNumberSafe('abc', 0)).toBe(0);
        });
    });

    describe('Constants', () => {
        test('COUNTRIES should contain country data', () => {
            expect(COUNTRIES.length).toBeGreaterThan(0);
            expect(COUNTRIES.find(c => c.code === 'US')).toBeDefined();
        });

        test('LANGUAGES should contain language data', () => {
            expect(Object.keys(LANGUAGES).length).toBeGreaterThan(0);
            expect(LANGUAGES.en).toBeDefined();
        });

        test('SECONDS_IN_MINUTE should be 60', () => {
            expect(SECONDS_IN_MINUTE).toBe(60);
        });
    });

    describe('Regex Patterns', () => {
        test('REGEX should contain regex patterns', () => {
            expect(REGEX.email).toBeInstanceOf(RegExp);
            expect(REGEX.phone).toBeInstanceOf(RegExp);
            expect(REGEX.numeric).toBeInstanceOf(RegExp);
        });
    });
}); 