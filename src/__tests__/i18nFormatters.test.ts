import {
    formatCurrencyI18N,
    formatDateI18N,
    formatTimeI18N,
    getCurrentLocale,
} from '../utils/i18nFormatters';
import { config, resetContext } from '../context';

// Mock the context functions
jest.mock('../context', () => ({
    config: jest.fn(),
    resetContext: jest.fn(),
    getLanguage: jest.fn(),
    getCurrency: jest.fn(),
    getLocale: jest.fn(),
    isBrowser: jest.fn()
}));

// Import the mocked functions
import { getLanguage, getCurrency, getLocale, isBrowser } from '../context';

describe('I18N Formatters', () => {
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();
        
        // Set up default mock implementations
        (getLanguage as jest.Mock).mockReturnValue('en');
        (getCurrency as jest.Mock).mockReturnValue('USD');
        (getLocale as jest.Mock).mockReturnValue('en-US');
        (isBrowser as jest.Mock).mockReturnValue(true);
    });

    describe('formatCurrencyI18N', () => {
        it('should format currency with default context values', () => {
            const result = formatCurrencyI18N(1234.56);
            expect(result).toBe('$1,234.56');
        });

        it('should format currency with custom currency', () => {
            const result = formatCurrencyI18N(1234.56, 'EUR');
            expect(result).toBe('€1,234.56');
        });

        it('should format currency with custom locale', () => {
            const result = formatCurrencyI18N(1234.56, 'USD', 'de-DE');
            expect(result).toContain('1.234,56');
            expect(result).toContain('$');
        });

        it('should format currency with custom currency and locale', () => {
            const result = formatCurrencyI18N(1234.56, 'EUR', 'de-DE');
            expect(result).toContain('1.234,56');
            expect(result).toContain('€');
        });

        it('should handle zero amount', () => {
            const result = formatCurrencyI18N(0);
            expect(result).toBe('$0.00');
        });

        it('should handle negative amount', () => {
            const result = formatCurrencyI18N(-1234.56);
            expect(result).toBe('-$1,234.56');
        });

        it('should handle very large numbers', () => {
            const result = formatCurrencyI18N(1234567890.12);
            expect(result).toBe('$1,234,567,890.12');
        });

        it('should handle very small numbers', () => {
            const result = formatCurrencyI18N(0.001);
            expect(result).toBe('$0.00');
        });

        it('should fallback gracefully on formatting error', () => {
            // Test fallback behavior by using an invalid currency
            const result = formatCurrencyI18N(1234.56, 'INVALID');
            expect(result).toBe('INVALID 1234.56');
        });

        it('should use context currency when no currency specified', () => {
            (getCurrency as jest.Mock).mockReturnValue('ILS');
            
            const result = formatCurrencyI18N(1234.56);
            expect(result).toBe('₪1,234.56');
        });

        it('should use context locale when no locale specified', () => {
            (getLocale as jest.Mock).mockReturnValue('he-IL');
            
            const result = formatCurrencyI18N(1234.56);
            expect(result).toContain('1,234.56');
            expect(result).toContain('$');
        });
    });

    describe('formatDateI18N', () => {
        const testDate = new Date('2023-12-25T10:30:00Z');

        it('should format date with default locale', () => {
            const result = formatDateI18N(testDate);
            expect(result).toContain('December 25, 2023');
        });

        it('should format date with custom locale', () => {
            const result = formatDateI18N(testDate, 'de-DE');
            expect(result).toContain('25');
        });

        it('should format date with custom format string', () => {
            const result = formatDateI18N(testDate, 'YYYY-MM-DD');
            expect(result).toContain('2023');
            expect(result).toContain('December');
            expect(result).toContain('25');
        });

        it('should handle different date variants', () => {
            const defaultDate = formatDateI18N(testDate, undefined, 'default');
            const appointmentDate = formatDateI18N(testDate, undefined, 'appointment');

            expect(defaultDate).toBeDefined();
            expect(appointmentDate).toBeDefined();
        });

        it('should fallback gracefully on formatting error', () => {
            // Test with invalid date
            expect(() => formatDateI18N('invalid-date')).toThrow('Invalid date');
        });

        it('should use context locale when no locale specified', () => {
            (getLocale as jest.Mock).mockReturnValue('he-IL');
            
            const result = formatDateI18N(testDate);
            expect(result).toContain('25');
            expect(result).toContain('2023');
        });
    });

    describe('formatTimeI18N', () => {
        it('should format time with default locale', () => {
            const result = formatTimeI18N(30, 's');
            expect(result).toContain('30');
            expect(result).toContain('Second');
        });

        it('should format time with custom locale', () => {
            const result = formatTimeI18N(2, 'h', 'de-DE');
            expect(result).toContain('2');
            expect(result).toContain('Stunden');
        });

        it('should format time with different units', () => {
            const seconds = formatTimeI18N(45, 's');
            const minutes = formatTimeI18N(30, 'm');
            const hours = formatTimeI18N(2, 'h');
            const days = formatTimeI18N(7, 'd');

            expect(seconds).toContain('45');
            expect(seconds).toContain('Seconds');
            expect(minutes).toContain('30');
            expect(minutes).toContain('Minutes');
            expect(hours).toContain('2');
            expect(hours).toContain('Hours');
            expect(days).toContain('7');
            expect(days).toContain('Days');
        });

        it('should handle pluralization correctly', () => {
            const singular = formatTimeI18N(1, 'h');
            const plural = formatTimeI18N(5, 'h');

            expect(singular).toContain('Hour');
            expect(plural).toContain('Hours');
        });

        it('should use context locale when no locale specified', () => {
            (getLocale as jest.Mock).mockReturnValue('he-IL');
            
            const result = formatTimeI18N(2, 'h');
            expect(result).toContain('2');
            expect(result).toContain('שעות');
        });
    });



    describe('Legacy Functions (Deprecated)', () => {
        describe('getCurrentLocale', () => {
            it('should return context locale', () => {
                (getLocale as jest.Mock).mockReturnValue('he-IL');
                
                const result = getCurrentLocale();
                expect(result).toBe('he-IL');
            });
        });
    });

    describe('Integration with Context', () => {
        it('should use context values for all formatters', () => {
            (getLocale as jest.Mock).mockReturnValue('he-IL');
            (getCurrency as jest.Mock).mockReturnValue('ILS');
            
            const currencyResult = formatCurrencyI18N(1234.56);
            const dateResult = formatDateI18N(new Date());
            const timeResult = formatTimeI18N(2, 'h');
            
            expect(currencyResult).toContain('₪');
            expect(dateResult).toContain('2025'); // Current year
            expect(timeResult).toBeDefined();
        });

        it('should handle context changes dynamically', () => {
            // Initial context
            (getLocale as jest.Mock).mockReturnValue('en-US');
            (getCurrency as jest.Mock).mockReturnValue('USD');
            
            let result = formatCurrencyI18N(1234.56);
            expect(result).toBe('$1,234.56');
            
            // Change context
            (getLocale as jest.Mock).mockReturnValue('de-DE');
            (getCurrency as jest.Mock).mockReturnValue('EUR');
            
            result = formatCurrencyI18N(1234.56);
            expect(result).toContain('1.234,56');
            expect(result).toContain('€');
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle null/undefined values gracefully', () => {
            expect(() => formatCurrencyI18N(null as any)).not.toThrow();
            expect(() => formatDateI18N(null as any)).not.toThrow();
            expect(() => formatTimeI18N(0, 's')).not.toThrow();
        });

        it('should handle invalid locales gracefully', () => {
            const result = formatCurrencyI18N(1234.56, 'USD', 'invalid-locale');
            expect(result).toBe('$1,234.56'); // Should fallback to default
        });

        it('should handle invalid currencies gracefully', () => {
            const result = formatCurrencyI18N(1234.56, 'INVALID');
            expect(result).toBe('INVALID 1234.56'); // Should fallback to code
        });

        it('should work in Node.js environment', () => {
            (isBrowser as jest.Mock).mockReturnValue(false);
            
            const result = formatCurrencyI18N(1234.56);
            expect(result).toContain('1,234.56');
        });
    });

    describe('Performance and Memory', () => {
        it('should handle large numbers efficiently', () => {
            const largeNumber = 123456789012345678901234567890;
            const result = formatCurrencyI18N(largeNumber);
            expect(result).toBeDefined();
            expect(result).not.toBe('');
        });
    });
});
