/**
 * Shared Intl behaviour for every formatter in the toolkit.
 *
 * Two house rules, applied everywhere so output is consistent no matter which
 * locale is active:
 *
 *   1. Digits are always Latin. Intl renders Arabic locales with Arabic-Indic
 *      digits by default ('٨٠٫٠٠'), which is correct CLDR behaviour but not
 *      what an interface mixing prices, durations and IDs wants.
 *   2. Currencies always render as a symbol. Intl falls back to the bare ISO
 *      code whenever a locale has no symbol for a currency ('ILS 80.00' in
 *      es-MX), so the toolkit's own symbol table fills the gap.
 */
import { getCurrencySymbolByCode } from './currencyUtils.js';

/**
 * The same locale, pinned to Latin digits.
 * Handles script subtags and existing extensions ('ar-SA' -> 'ar-SA-u-nu-latn').
 */
export const withLatinDigits = (locale: string): string => {
    try {
        return new Intl.Locale(locale, { numberingSystem: 'latn' }).toString();
    } catch {
        return locale;
    }
};

/**
 * Number formatting with Latin digits, otherwise standard Intl.
 */
export const formatNumberIntl = (
    value: number,
    locale: string,
    options?: Intl.NumberFormatOptions
): string => {
    try {
        return new Intl.NumberFormat(withLatinDigits(locale), options).format(value);
    } catch {
        return value.toString();
    }
};

/**
 * Currency formatting with Latin digits and a guaranteed symbol.
 *
 * The locale still decides everything else — symbol placement, grouping,
 * decimal separator, and the RTL marks Hebrew and Arabic need.
 */
export const formatCurrencyIntl = (
    amount: number,
    currency: string,
    locale: string
): string => {
    const symbol = getCurrencySymbolByCode(currency);

    try {
        const parts = new Intl.NumberFormat(withLatinDigits(locale), {
            style: 'currency',
            currency,
            // narrowSymbol already resolves most pairs; the table covers the rest.
            currencyDisplay: 'narrowSymbol'
        }).formatToParts(amount);

        return parts
            .map(part => (part.type === 'currency' && symbol ? symbol : part.value))
            .join('');
    } catch {
        // Unknown currency code, or an environment without narrowSymbol support.
        return `${symbol ?? currency} ${amount.toFixed(2)}`;
    }
};

/**
 * Date/time formatting with Latin digits, otherwise standard Intl.
 */
export const formatDateIntl = (
    date: Date,
    locale: string,
    options?: Intl.DateTimeFormatOptions
): string => {
    try {
        return new Intl.DateTimeFormat(withLatinDigits(locale), options).format(date);
    } catch {
        return date.toLocaleDateString(locale, options);
    }
};
