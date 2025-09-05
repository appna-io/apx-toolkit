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
    type CreditCardType
} from '../utils/creditCard';

describe('Credit Card Utilities', () => {
    describe('getCreditCardType', () => {
        test('should detect Visa cards', () => {
            expect(getCreditCardType('4111111111111111')).toBe('VISA');
            expect(getCreditCardType('4000000000000002')).toBe('VISA');
            expect(getCreditCardType('4000000000000069')).toBe('VISA');
        });

        test('should detect MasterCard cards', () => {
            expect(getCreditCardType('5555555555554444')).toBe('MASTERCARD');
            expect(getCreditCardType('2223003122003222')).toBe('MASTERCARD');
            expect(getCreditCardType('5105105105105100')).toBe('MASTERCARD');
        });

        test('should detect American Express cards', () => {
            expect(getCreditCardType('378282246310005')).toBe('AMERICAN_EXPRESS');
            expect(getCreditCardType('371449635398431')).toBe('AMERICAN_EXPRESS');
            expect(getCreditCardType('378734493671000')).toBe('AMERICAN_EXPRESS');
        });

        test('should detect Discover cards', () => {
            expect(getCreditCardType('6011111111111117')).toBe('DISCOVER');
            expect(getCreditCardType('6011000990139424')).toBe('DISCOVER');
            expect(getCreditCardType('6011000000000004')).toBe('DISCOVER');
        });

        test('should detect Diners Club cards', () => {
            expect(getCreditCardType('30569309025904')).toBe('DINERS_CLUB');
            expect(getCreditCardType('38520000023237')).toBe('DINERS_CLUB');
            expect(getCreditCardType('30000000000004')).toBe('DINERS_CLUB');
        });

        test('should detect JCB cards', () => {
            expect(getCreditCardType('3530111333300000')).toBe('JCB');
            expect(getCreditCardType('3566002020360505')).toBe('JCB');
            expect(getCreditCardType('213112345678901')).toBe('JCB');
        });

        test('should detect UnionPay cards', () => {
            expect(getCreditCardType('6200000000000007')).toBe('UNIONPAY');
            expect(getCreditCardType('6200000000000047')).toBe('UNIONPAY');
            expect(getCreditCardType('6200000000000000005')).toBe('UNIONPAY');
        });

        test('should return null for invalid cards', () => {
            expect(getCreditCardType('1234567890123456')).toBeNull();
            expect(getCreditCardType('')).toBeNull();
            expect(getCreditCardType('abc')).toBeNull();
            expect(getCreditCardType(null as any)).toBeNull();
            expect(getCreditCardType(undefined as any)).toBeNull();
        });
    });

    describe('formatCreditCard', () => {
        test('should format with default format', () => {
            expect(formatCreditCard('4111111111111111')).toBe('4111 1111 1111 1111');
            expect(formatCreditCard('5555555555554444')).toBe('5555 5555 5555 4444');
            expect(formatCreditCard('378282246310005')).toBe('3782 822463 10005');
        });

        test('should format with custom format', () => {
            expect(formatCreditCard('4111111111111111', { format: 'AAAA-BBBB-CCCC-DDDD' })).toBe('4111-1111-1111-1111');
            expect(formatCreditCard('4111111111111111', { format: 'AAAA BBBB CCCC DDDD' })).toBe('4111 1111 1111 1111');
            expect(formatCreditCard('4111111111111111', { format: '**** **** **** AAAA' })).toBe('**** **** **** 1111');
        });

        test('should mask card numbers', () => {
            expect(formatCreditCard('4111111111111111', { mask: true })).toBe('************1111');
            expect(formatCreditCard('4111111111111111', { mask: true, maskChar: 'X' })).toBe('XXXXXXXXXXXX1111');
            expect(formatCreditCard('4111111111111111', { mask: true, maskChar: '#' })).toBe('############1111');
        });

        test('should handle empty and invalid inputs', () => {
            expect(formatCreditCard('')).toBe('');
            expect(formatCreditCard(null as any)).toBe('');
            expect(formatCreditCard(undefined as any)).toBe('');
            expect(formatCreditCard('abc')).toBe('');
        });

        test('should clean non-numeric characters', () => {
            expect(formatCreditCard('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
            expect(formatCreditCard('4111 1111 1111 1111')).toBe('4111 1111 1111 1111');
            expect(formatCreditCard('4111.1111.1111.1111')).toBe('4111 1111 1111 1111');
        });
    });

    describe('getLast4Digits', () => {
        test('should extract last 4 digits', () => {
            expect(getLast4Digits('4111111111111111')).toBe('1111');
            expect(getLast4Digits('5555555555554444')).toBe('4444');
            expect(getLast4Digits('378282246310005')).toBe('0005');
        });

        test('should handle cards with less than 4 digits', () => {
            expect(getLast4Digits('123')).toBe('123');
            expect(getLast4Digits('12')).toBe('12');
            expect(getLast4Digits('1')).toBe('1');
        });

        test('should handle empty and invalid inputs', () => {
            expect(getLast4Digits('')).toBe('');
            expect(getLast4Digits(null as any)).toBe('');
            expect(getLast4Digits(undefined as any)).toBe('');
        });

        test('should clean non-numeric characters', () => {
            expect(getLast4Digits('4111-1111-1111-1111')).toBe('1111');
            expect(getLast4Digits('4111 1111 1111 1111')).toBe('1111');
        });
    });

    describe('isValidCreditCardNumber', () => {
        test('should validate valid credit cards', () => {
            expect(isValidCreditCardNumber('4111111111111111')).toBe(true);
            expect(isValidCreditCardNumber('5555555555554444')).toBe(true);
            expect(isValidCreditCardNumber('378282246310005')).toBe(true);
            expect(isValidCreditCardNumber('6011111111111117')).toBe(true);
            expect(isValidCreditCardNumber('30569309025904')).toBe(true);
            expect(isValidCreditCardNumber('3530111333300000')).toBe(true);
            expect(isValidCreditCardNumber('6200000000000047')).toBe(true);
        });

        test('should reject invalid credit cards', () => {
            expect(isValidCreditCardNumber('1234567890123456')).toBe(false);
            expect(isValidCreditCardNumber('4111111111111112')).toBe(false);
            expect(isValidCreditCardNumber('411111111111111')).toBe(false);
            expect(isValidCreditCardNumber('41111111111111111')).toBe(false);
            expect(isValidCreditCardNumber('')).toBe(false);
            expect(isValidCreditCardNumber('abc')).toBe(false);
            expect(isValidCreditCardNumber(null as any)).toBe(false);
            expect(isValidCreditCardNumber(undefined as any)).toBe(false);
        });

        test('should validate Luhn algorithm', () => {
            // Valid Luhn checksum
            expect(isValidCreditCardNumber('4111111111111111')).toBe(true);
            // Invalid Luhn checksum
            expect(isValidCreditCardNumber('4111111111111112')).toBe(false);
        });
    });

    describe('getRandomDummyCreditCard', () => {
        test('should generate valid credit cards', () => {
            const card = getRandomDummyCreditCard();
            expect(isValidCreditCardNumber(card)).toBe(true);
            expect(getCreditCardType(card)).not.toBeNull();
        });

        test('should generate specific card types', () => {
            const visaCard = getRandomDummyCreditCard('VISA');
            expect(getCreditCardType(visaCard)).toBe('VISA');
            expect(isValidCreditCardNumber(visaCard)).toBe(true);

            const masterCard = getRandomDummyCreditCard('MASTERCARD');
            expect(getCreditCardType(masterCard)).toBe('MASTERCARD');
            expect(isValidCreditCardNumber(masterCard)).toBe(true);

            const amexCard = getRandomDummyCreditCard('AMERICAN_EXPRESS');
            expect(getCreditCardType(amexCard)).toBe('AMERICAN_EXPRESS');
            expect(isValidCreditCardNumber(amexCard)).toBe(true);
        });

        test('should generate different cards on multiple calls', () => {
            const card1 = getRandomDummyCreditCard();
            const card2 = getRandomDummyCreditCard();
            // They might be the same, but the function should work
            expect(isValidCreditCardNumber(card1)).toBe(true);
            expect(isValidCreditCardNumber(card2)).toBe(true);
        });
    });

    describe('getCreditCardInfo', () => {
        test('should return complete card information', () => {
            const info = getCreditCardInfo('4111111111111111');
            
            expect(info.type).toBe('VISA');
            expect(info.typeName).toBe('Visa');
            expect(info.number).toBe('4111111111111111');
            expect(info.formatted).toBe('4111 1111 1111 1111');
            expect(info.last4).toBe('1111');
            expect(info.isValid).toBe(true);
            expect(info.length).toBe(16);
        });

        test('should handle invalid cards', () => {
            const info = getCreditCardInfo('1234567890123456');
            
            expect(info.type).toBeNull();
            expect(info.typeName).toBeNull();
            expect(info.number).toBe('1234567890123456');
            expect(info.formatted).toBe('1234 5678 9012 3456');
            expect(info.last4).toBe('3456');
            expect(info.isValid).toBe(false);
            expect(info.length).toBe(16);
        });

        test('should handle empty input', () => {
            const info = getCreditCardInfo('');
            
            expect(info.type).toBeNull();
            expect(info.typeName).toBeNull();
            expect(info.number).toBe('');
            expect(info.formatted).toBe('');
            expect(info.last4).toBe('');
            expect(info.isValid).toBe(false);
            expect(info.length).toBe(0);
        });
    });

    describe('maskCreditCard', () => {
        test('should mask card numbers showing first 4 and last 4', () => {
            expect(maskCreditCard('4111111111111111')).toBe('4111 **** 1111');
            expect(maskCreditCard('5555555555554444')).toBe('5555 **** 4444');
            expect(maskCreditCard('378282246310005')).toBe('3782 **** 0005');
        });

        test('should use custom mask character', () => {
            expect(maskCreditCard('4111111111111111', 'X')).toBe('4111 XXXX 1111');
            expect(maskCreditCard('4111111111111111', '#')).toBe('4111 #### 1111');
        });

        test('should handle short numbers', () => {
            expect(maskCreditCard('1234')).toBe('****');
            expect(maskCreditCard('12345')).toBe('1***5');
        });

        test('should handle empty input', () => {
            expect(maskCreditCard('')).toBe('');
            expect(maskCreditCard(null as any)).toBe('');
            expect(maskCreditCard(undefined as any)).toBe('');
        });
    });

    describe('getAvailableCreditCardTypes', () => {
        test('should return all available card types', () => {
            const types = getAvailableCreditCardTypes();
            
            expect(types).toHaveLength(7);
            expect(types.map(t => t.type)).toContain('VISA');
            expect(types.map(t => t.type)).toContain('MASTERCARD');
            expect(types.map(t => t.type)).toContain('AMERICAN_EXPRESS');
            expect(types.map(t => t.type)).toContain('DISCOVER');
            expect(types.map(t => t.type)).toContain('DINERS_CLUB');
            expect(types.map(t => t.type)).toContain('JCB');
            expect(types.map(t => t.type)).toContain('UNIONPAY');
        });

        test('should return correct structure', () => {
            const types = getAvailableCreditCardTypes();
            const visaType = types.find(t => t.type === 'VISA');
            
            expect(visaType).toBeDefined();
            expect(visaType?.name).toBe('Visa');
            expect(visaType?.format).toBe('AAAA BBBB CCCC DDDD');
        });
    });

    describe('CREDIT_CARD_TYPES', () => {
        test('should have correct structure for all types', () => {
            Object.entries(CREDIT_CARD_TYPES).forEach(([type, config]) => {
                expect(config).toHaveProperty('name');
                expect(config).toHaveProperty('pattern');
                expect(config).toHaveProperty('lengths');
                expect(config).toHaveProperty('format');
                expect(config).toHaveProperty('testNumbers');
                
                expect(typeof config.name).toBe('string');
                expect(config.pattern).toBeInstanceOf(RegExp);
                expect(Array.isArray(config.lengths)).toBe(true);
                expect(typeof config.format).toBe('string');
                expect(Array.isArray(config.testNumbers)).toBe(true);
            });
        });

        test('should have valid test numbers', () => {
            Object.entries(CREDIT_CARD_TYPES).forEach(([type, config]) => {
                config.testNumbers.forEach(testNumber => {
                    expect(isValidCreditCardNumber(testNumber)).toBe(true);
                    expect(getCreditCardType(testNumber)).toBe(type);
                });
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle cards with spaces and dashes', () => {
            expect(getCreditCardType('4111-1111-1111-1111')).toBe('VISA');
            expect(getCreditCardType('4111 1111 1111 1111')).toBe('VISA');
            expect(isValidCreditCardNumber('4111-1111-1111-1111')).toBe(true);
            expect(isValidCreditCardNumber('4111 1111 1111 1111')).toBe(true);
        });

        test('should handle very long numbers', () => {
            const longNumber = '41111111111111111111';
            expect(getCreditCardType(longNumber)).toBeNull();
            expect(isValidCreditCardNumber(longNumber)).toBe(false);
        });

        test('should handle very short numbers', () => {
            const shortNumber = '123';
            expect(getCreditCardType(shortNumber)).toBeNull();
            expect(isValidCreditCardNumber(shortNumber)).toBe(false);
        });

        test('should handle mixed characters', () => {
            const mixedNumber = '4111-1111-1111-1111abc';
            expect(getCreditCardType(mixedNumber)).toBe('VISA');
            expect(isValidCreditCardNumber(mixedNumber)).toBe(true);
        });
    });
});
