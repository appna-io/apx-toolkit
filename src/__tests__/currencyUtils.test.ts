import { 
    getCurrencyByLocale, 
    getCurrencyCode, 
    getCurrencySymbol,
    hasCurrencyMapping,
    getSupportedCountryCodes,
    getAllCurrencies,
    CurrencyInfo
} from '../utils/currencyUtils';

describe('currencyUtils', () => {
    describe('getCurrencyByLocale', () => {
        it('should return ILS for Israel locale formats', () => {
            const expectedResult: CurrencyInfo = {
                code: 'ILS',
                symbol: '₪',
                name: 'Israeli New Shekel'
            };

            expect(getCurrencyByLocale('he/IL')).toEqual(expectedResult);
            expect(getCurrencyByLocale('IL')).toEqual(expectedResult);
            expect(getCurrencyByLocale('he-IL')).toEqual(expectedResult);
            expect(getCurrencyByLocale('ar-IL')).toEqual(expectedResult);
            expect(getCurrencyByLocale('he_IL')).toEqual(expectedResult);
            expect(getCurrencyByLocale('il')).toEqual(expectedResult); // case insensitive
        });

        it('should return USD for US locale formats', () => {
            const expectedResult: CurrencyInfo = {
                code: 'USD',
                symbol: '$',
                name: 'US Dollar'
            };

            expect(getCurrencyByLocale('US')).toEqual(expectedResult);
            expect(getCurrencyByLocale('en-US')).toEqual(expectedResult);
            expect(getCurrencyByLocale('en/US')).toEqual(expectedResult);
            expect(getCurrencyByLocale('es-US')).toEqual(expectedResult);
        });

        it('should return AED for UAE locale formats', () => {
            const expectedResult: CurrencyInfo = {
                code: 'AED',
                symbol: 'د.إ',
                name: 'UAE Dirham'
            };

            expect(getCurrencyByLocale('AE')).toEqual(expectedResult);
            expect(getCurrencyByLocale('ar-AE')).toEqual(expectedResult);
            expect(getCurrencyByLocale('en-AE')).toEqual(expectedResult);
        });

        it('should return EUR for European countries', () => {
            const expectedResult: CurrencyInfo = {
                code: 'EUR',
                symbol: '€',
                name: 'Euro'
            };

            expect(getCurrencyByLocale('DE')).toEqual(expectedResult);
            expect(getCurrencyByLocale('de-DE')).toEqual(expectedResult);
            expect(getCurrencyByLocale('FR')).toEqual(expectedResult);
            expect(getCurrencyByLocale('fr-FR')).toEqual(expectedResult);
            expect(getCurrencyByLocale('IT')).toEqual(expectedResult);
        });

        it('should return GBP for UK locale formats', () => {
            const expectedResult: CurrencyInfo = {
                code: 'GBP',
                symbol: '£',
                name: 'British Pound'
            };

            expect(getCurrencyByLocale('GB')).toEqual(expectedResult);
            expect(getCurrencyByLocale('en-GB')).toEqual(expectedResult);
        });

        it('should return currencies for Asian countries', () => {
            expect(getCurrencyByLocale('JP')?.code).toBe('JPY');
            expect(getCurrencyByLocale('CN')?.code).toBe('CNY');
            expect(getCurrencyByLocale('KR')?.code).toBe('KRW');
            expect(getCurrencyByLocale('IN')?.code).toBe('INR');
            expect(getCurrencyByLocale('SG')?.code).toBe('SGD');
            expect(getCurrencyByLocale('TH')?.code).toBe('THB');
            expect(getCurrencyByLocale('MY')?.code).toBe('MYR');
        });

        it('should return null for invalid or unsupported locales', () => {
            expect(getCurrencyByLocale('')).toBeNull();
            expect(getCurrencyByLocale('XYZ')).toBeNull();
            expect(getCurrencyByLocale('invalid')).toBeNull();
            expect(getCurrencyByLocale('ZZ')).toBeNull();
        });

        it('should handle null/undefined inputs gracefully', () => {
            expect(getCurrencyByLocale(null as any)).toBeNull();
            expect(getCurrencyByLocale(undefined as any)).toBeNull();
        });
    });

    describe('getCurrencyCode', () => {
        it('should return currency code for valid locales', () => {
            expect(getCurrencyCode('he/IL')).toBe('ILS');
            expect(getCurrencyCode('IL')).toBe('ILS');
            expect(getCurrencyCode('US')).toBe('USD');
            expect(getCurrencyCode('en-US')).toBe('USD');
            expect(getCurrencyCode('ar-AE')).toBe('AED');
            expect(getCurrencyCode('en-GB')).toBe('GBP');
        });

        it('should return null for invalid locales', () => {
            expect(getCurrencyCode('XYZ')).toBeNull();
            expect(getCurrencyCode('')).toBeNull();
            expect(getCurrencyCode('invalid')).toBeNull();
        });
    });

    describe('getCurrencySymbol', () => {
        it('should return currency symbol for valid locales', () => {
            expect(getCurrencySymbol('he/IL')).toBe('₪');
            expect(getCurrencySymbol('IL')).toBe('₪');
            expect(getCurrencySymbol('US')).toBe('$');
            expect(getCurrencySymbol('en-GB')).toBe('£');
            expect(getCurrencySymbol('ar-AE')).toBe('د.إ');
            expect(getCurrencySymbol('DE')).toBe('€');
        });

        it('should return null for invalid locales', () => {
            expect(getCurrencySymbol('XYZ')).toBeNull();
            expect(getCurrencySymbol('')).toBeNull();
        });
    });

    describe('hasCurrencyMapping', () => {
        it('should return true for supported locales', () => {
            expect(hasCurrencyMapping('IL')).toBe(true);
            expect(hasCurrencyMapping('he-IL')).toBe(true);
            expect(hasCurrencyMapping('US')).toBe(true);
            expect(hasCurrencyMapping('en-US')).toBe(true);
            expect(hasCurrencyMapping('AE')).toBe(true);
            expect(hasCurrencyMapping('ar-AE')).toBe(true);
        });

        it('should return false for unsupported locales', () => {
            expect(hasCurrencyMapping('XYZ')).toBe(false);
            expect(hasCurrencyMapping('xyz-XYZ')).toBe(false);
            expect(hasCurrencyMapping('ZZ')).toBe(false);
            expect(hasCurrencyMapping('')).toBe(false);
        });
    });

    describe('getSupportedCountryCodes', () => {
        it('should return an array of country codes', () => {
            const codes = getSupportedCountryCodes();
            expect(Array.isArray(codes)).toBe(true);
            expect(codes.length).toBeGreaterThan(0);
        });

        it('should include key countries', () => {
            const codes = getSupportedCountryCodes();
            expect(codes).toContain('IL');
            expect(codes).toContain('US');
            expect(codes).toContain('AE');
            expect(codes).toContain('GB');
            expect(codes).toContain('JP');
            expect(codes).toContain('CN');
        });

        it('should have at least 20 Asian and Middle Eastern countries', () => {
            const codes = getSupportedCountryCodes();
            const asianMiddleEasternCodes = [
                'IL', 'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB',
                'JP', 'CN', 'KR', 'IN', 'SG', 'MY', 'TH', 'ID', 'PH', 'VN', 'HK', 'TW', 'PK', 'BD'
            ];
            const supportedAsianMiddleEastern = asianMiddleEasternCodes.filter(code => 
                codes.includes(code)
            );
            expect(supportedAsianMiddleEastern.length).toBeGreaterThanOrEqual(20);
        });
    });

    describe('getAllCurrencies', () => {
        it('should return an array of unique currencies', () => {
            const currencies = getAllCurrencies();
            expect(Array.isArray(currencies)).toBe(true);
            expect(currencies.length).toBeGreaterThan(0);
        });

        it('should return unique currency objects', () => {
            const currencies = getAllCurrencies();
            const codes = currencies.map(c => c.code);
            const uniqueCodes = new Set(codes);
            expect(codes.length).toBe(uniqueCodes.size);
        });

        it('should include key currencies', () => {
            const currencies = getAllCurrencies();
            const codes = currencies.map(c => c.code);
            expect(codes).toContain('ILS');
            expect(codes).toContain('USD');
            expect(codes).toContain('EUR');
            expect(codes).toContain('GBP');
            expect(codes).toContain('AED');
            expect(codes).toContain('JPY');
        });

        it('should have complete currency info objects', () => {
            const currencies = getAllCurrencies();
            currencies.forEach(currency => {
                expect(currency).toHaveProperty('code');
                expect(currency).toHaveProperty('symbol');
                expect(currency).toHaveProperty('name');
                expect(typeof currency.code).toBe('string');
                expect(typeof currency.symbol).toBe('string');
                expect(typeof currency.name).toBe('string');
            });
        });
    });

    describe('locale format parsing', () => {
        it('should handle various separator formats', () => {
            expect(getCurrencyCode('he/IL')).toBe('ILS');
            expect(getCurrencyCode('he-IL')).toBe('ILS');
            expect(getCurrencyCode('he_IL')).toBe('ILS');
        });

        it('should handle different language-country combinations', () => {
            expect(getCurrencyCode('en-US')).toBe('USD');
            expect(getCurrencyCode('es-US')).toBe('USD');
            expect(getCurrencyCode('fr-US')).toBe('USD');
            expect(getCurrencyCode('en-AE')).toBe('AED');
            expect(getCurrencyCode('ar-AE')).toBe('AED');
        });

        it('should be case-insensitive for country codes', () => {
            expect(getCurrencyCode('il')).toBe('ILS');
            expect(getCurrencyCode('IL')).toBe('ILS');
            expect(getCurrencyCode('Il')).toBe('ILS');
            expect(getCurrencyCode('us')).toBe('USD');
            expect(getCurrencyCode('US')).toBe('USD');
        });
    });
});

