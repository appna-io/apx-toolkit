/**
 * Card handling and locale→currency lookup.
 *
 * `isValidCreditCardNumber` runs a real Luhn check, so the sample numbers
 * below are the standard test PANs — mistype one digit and watch it flip.
 */
import {
    CREDIT_CARD_TYPES,
    formatCreditCard,
    getAllCurrencies,
    getAvailableCreditCardTypes,
    getCreditCardInfo,
    getCreditCardType,
    getCurrencyByLocale,
    getCurrencyCode,
    getCurrencyForRegion,
    getCurrencySymbol,
    getLast4Digits,
    getRandomDummyCreditCard,
    getSupportedCountryCodes,
    hasCurrencyMapping,
    isValidCreditCardNumber,
    maskCreditCard,
    type CreditCardType
} from '@apx-ui/toolkit';
import type { ApiSpec, SelectOption } from '../lib/api';
import { REGION_OPTIONS } from '../lib/options';

const CARD_TYPE_OPTIONS: SelectOption[] = Object.keys(CREDIT_CARD_TYPES).map((type) => ({
    label: type,
    value: type
}));

const SAMPLE_CARD = '4111111111111111';

/** Locale spellings the parser is expected to cope with. */
const LOCALE_FORM_OPTIONS: SelectOption[] = [
    { label: 'he-IL (language-REGION)', value: 'he-IL' },
    { label: 'he/IL (slash form)', value: 'he/IL' },
    { label: 'IL (bare region)', value: 'IL' },
    { label: 'ar-IL (other language, same region)', value: 'ar-IL' },
    { label: 'en-US', value: 'en-US' },
    { label: 'ar-AE', value: 'ar-AE' },
    { label: 'ja-JP', value: 'ja-JP' },
    { label: 'en-GB', value: 'en-GB' },
    { label: 'xx-ZZ (unmapped)', value: 'xx-ZZ' }
];

export const PAYMENT_APIS: ApiSpec[] = [
    {
        name: 'getCreditCardInfo',
        signature: 'getCreditCardInfo(cardNumber: string, options?: CreditCardFormatOptions)',
        summary: 'Everything at once — brand, formatted number, last four, Luhn validity, length.',
        args: [
            { name: 'cardNumber', type: 'text', value: SAMPLE_CARD },
            { name: 'mask', type: 'boolean', value: false }
        ],
        code: ([cardNumber, mask]) =>
            `getCreditCardInfo('${cardNumber}'${mask ? ', { mask: true }' : ''})`,
        run: ([cardNumber, mask]) =>
            getCreditCardInfo(String(cardNumber), { mask: Boolean(mask) })
    },
    {
        name: 'getCreditCardType',
        signature: 'getCreditCardType(cardNumber: string): CreditCardType | null',
        summary: 'Brand detection from the IIN prefix — no network, no lookup table beyond the patterns.',
        args: [
            {
                name: 'cardNumber',
                type: 'text',
                value: SAMPLE_CARD,
                span: 2,
                hint: '4… Visa · 51-55 Mastercard · 34/37 Amex · 6011 Discover'
            }
        ],
        run: ([cardNumber]) => getCreditCardType(String(cardNumber))
    },
    {
        name: 'isValidCreditCardNumber',
        signature: 'isValidCreditCardNumber(cardNumber: string): boolean',
        summary: 'Luhn checksum plus a brand-appropriate length.',
        args: [
            {
                name: 'cardNumber',
                type: 'text',
                value: SAMPLE_CARD,
                span: 2,
                hint: 'Change any single digit to break the checksum.'
            }
        ],
        run: ([cardNumber]) => isValidCreditCardNumber(String(cardNumber))
    },
    {
        name: 'formatCreditCard',
        signature: 'formatCreditCard(cardNumber: string, options?: CreditCardFormatOptions): string',
        summary: 'Groups the digits per brand, optionally masking everything but the tail.',
        args: [
            { name: 'cardNumber', type: 'text', value: SAMPLE_CARD },
            { name: 'mask', type: 'boolean', value: true },
            { name: 'maskChar', type: 'text', value: '*', span: 2 }
        ],
        code: ([cardNumber, mask, maskChar]) =>
            `formatCreditCard('${cardNumber}', { mask: ${mask}, maskChar: '${maskChar}' })`,
        run: ([cardNumber, mask, maskChar]) =>
            formatCreditCard(String(cardNumber), {
                mask: Boolean(mask),
                maskChar: String(maskChar)
            })
    },
    {
        name: 'maskCreditCard',
        signature: "maskCreditCard(cardNumber: string, maskChar = '*'): string",
        summary: 'Keeps the first and last four visible — the PCI-safe display form.',
        args: [
            { name: 'cardNumber', type: 'text', value: SAMPLE_CARD },
            { name: 'maskChar', type: 'text', value: '*', omitWhenDefault: true }
        ],
        run: ([cardNumber, maskChar]) => maskCreditCard(String(cardNumber), String(maskChar))
    },
    {
        name: 'getLast4Digits',
        signature: 'getLast4Digits(cardNumber: string): string',
        summary: 'Strips separators and returns the final four digits.',
        args: [{ name: 'cardNumber', type: 'text', value: '4111 1111 1111 1111', span: 2 }],
        run: ([cardNumber]) => getLast4Digits(String(cardNumber))
    },
    {
        name: 'getRandomDummyCreditCard',
        signature: 'getRandomDummyCreditCard(type?: CreditCardType): string',
        summary: 'A valid test PAN for seeding forms and fixtures.',
        imperative: true,
        args: [
            {
                name: 'type',
                type: 'select',
                value: 'VISA',
                options: CARD_TYPE_OPTIONS,
                span: 2
            }
        ],
        run: ([type]) => getRandomDummyCreditCard(type as CreditCardType),
        note: 'Press Run again for a different number — the result is random by design.'
    },
    {
        name: 'getAvailableCreditCardTypes',
        signature: 'getAvailableCreditCardTypes(): Array<{ type, name, format }>',
        summary: 'Every brand the toolkit recognises, with its display grouping.',
        run: () => getAvailableCreditCardTypes()
    },
    {
        name: 'getCurrencyByLocale',
        signature: 'getCurrencyByLocale(locale: string): CurrencyInfo | null',
        summary: 'Region → currency, accepting hyphen, slash and bare-region spellings.',
        args: [{ name: 'locale', type: 'select', value: 'he-IL', options: LOCALE_FORM_OPTIONS, span: 2 }],
        run: ([locale]) => getCurrencyByLocale(String(locale))
    },
    {
        name: 'getCurrencyCode',
        signature: 'getCurrencyCode(locale: string): string | null',
        summary: 'Just the ISO code.',
        args: [{ name: 'locale', type: 'select', value: 'ar-AE', options: LOCALE_FORM_OPTIONS, span: 2 }],
        run: ([locale]) => getCurrencyCode(String(locale))
    },
    {
        name: 'getCurrencySymbol',
        signature: 'getCurrencySymbol(locale: string): string | null',
        summary: 'Just the symbol.',
        args: [{ name: 'locale', type: 'select', value: 'he-IL', options: LOCALE_FORM_OPTIONS, span: 2 }],
        run: ([locale]) => getCurrencySymbol(String(locale))
    },
    {
        name: 'hasCurrencyMapping',
        signature: 'hasCurrencyMapping(locale: string): boolean',
        summary: 'Whether the locale resolves to a known currency at all.',
        args: [{ name: 'locale', type: 'select', value: 'xx-ZZ', options: LOCALE_FORM_OPTIONS, span: 2 }],
        run: ([locale]) => hasCurrencyMapping(String(locale))
    },
    {
        name: 'getCurrencyForRegion',
        signature: 'getCurrencyForRegion(region: string): string | undefined',
        summary: 'The region table `ApxContext` uses when it auto-detects your currency.',
        args: [{ name: 'region', type: 'select', value: 'IL', options: REGION_OPTIONS, span: 2 }],
        run: ([region]) => getCurrencyForRegion(String(region))
    },
    {
        name: 'getSupportedCountryCodes',
        signature: 'getSupportedCountryCodes(): string[]',
        summary: 'Country codes covered by the currency map.',
        run: () => getSupportedCountryCodes()
    },
    {
        name: 'getAllCurrencies',
        signature: 'getAllCurrencies(): CurrencyInfo[]',
        summary: 'Distinct currencies — countries sharing one (EUR) collapse to a single entry.',
        run: () => getAllCurrencies()
    }
];
