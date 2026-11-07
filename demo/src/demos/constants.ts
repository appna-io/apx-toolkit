/**
 * The shipped lookup tables — countries, languages, regions, regex patterns
 * and the magic-number constants — plus the accessors that read them.
 */
import {
    COUNTRIES,
    getCountriesByPhoneCode,
    getCountryByCode,
    getCountryByName,
    getLanguageByCode,
    getLanguageByLabel,
    getLanguageByLocale,
    getSupportedCurrencies,
    getSupportedLanguageCodes,
    getSupportedRegions,
    isLanguageRTL,
    isValidTextForLanguage,
    LANGUAGES,
    REGEX,
    REGION_CURRENCY_MAP,
    RTL_LANGUAGES
} from '@apx-ui/toolkit';
import type { ApiSpec } from '../lib/api';
import { LANGUAGE_OPTIONS, LOCALE_OPTIONS } from '../lib/options';

const REGEX_OPTIONS = Object.keys(REGEX).map((key) => ({ label: key, value: key }));

export const CONSTANT_APIS: ApiSpec[] = [
    {
        name: 'getCountryByCode',
        signature: 'getCountryByCode(code: string): Country | undefined',
        summary: 'ISO country lookup — name, dialling code, currency.',
        args: [
            {
                name: 'code',
                type: 'select',
                value: 'IL',
                options: COUNTRIES.map((country) => ({
                    label: `${country.code} — ${country.name}`,
                    value: country.code
                })),
                span: 2
            }
        ],
        run: ([code]) => getCountryByCode(String(code))
    },
    {
        name: 'getCountryByName',
        signature: 'getCountryByName(name: string): Country | undefined',
        summary: 'The same record, looked up by name.',
        args: [{ name: 'name', type: 'text', value: 'Israel', span: 2 }],
        run: ([name]) => getCountryByName(String(name))
    },
    {
        name: 'getCountriesByPhoneCode',
        signature: 'getCountriesByPhoneCode(phoneCode: string): Country[]',
        summary: 'Every country sharing a dialling code — +1 returns more than one.',
        args: [{ name: 'phoneCode', type: 'text', value: '+1', span: 2 }],
        run: ([phoneCode]) => getCountriesByPhoneCode(String(phoneCode))
    },
    {
        name: 'COUNTRIES',
        signature: 'COUNTRIES: Country[]',
        summary: 'The full table.',
        run: () => COUNTRIES
    },

    {
        name: 'getLanguageByCode',
        signature: 'getLanguageByCode(code): ApxLanguageObject | undefined',
        summary: 'Label, native name and default locale for a language code.',
        args: [{ name: 'code', type: 'select', value: 'he', options: LANGUAGE_OPTIONS, span: 2 }],
        run: ([code]) => getLanguageByCode(code as keyof typeof LANGUAGES)
    },
    {
        name: 'getLanguageByLocale',
        signature: 'getLanguageByLocale(locale: string): { key, lang } | null',
        summary: 'The reverse lookup — locale back to language code.',
        args: [{ name: 'locale', type: 'select', value: 'ar-SA', options: LOCALE_OPTIONS, span: 2 }],
        run: ([locale]) => getLanguageByLocale(String(locale))
    },
    {
        name: 'getLanguageByLabel',
        signature: 'getLanguageByLabel(label: string): ApxLanguageObject | undefined',
        summary: 'Lookup by English label.',
        args: [{ name: 'label', type: 'text', value: 'Arabic', span: 2 }],
        run: ([label]) => getLanguageByLabel(String(label))
    },
    {
        name: 'isLanguageRTL',
        signature: 'isLanguageRTL(code: string): boolean',
        summary: 'Whether a language is written right to left.',
        args: [{ name: 'code', type: 'select', value: 'ar', options: LANGUAGE_OPTIONS, span: 2 }],
        run: ([code]) => isLanguageRTL(String(code))
    },
    {
        name: 'isValidTextForLanguage',
        signature: 'isValidTextForLanguage(text: string, language): boolean',
        summary: 'Checks text against a language’s own character range — useful for input guards.',
        args: [
            { name: 'text', type: 'text', value: 'שלום' },
            { name: 'language', type: 'select', value: 'he', options: LANGUAGE_OPTIONS }
        ],
        run: ([text, language]) =>
            isValidTextForLanguage(String(text), language as keyof typeof LANGUAGES),
        note: 'Try Hebrew text against `en`, or Latin text against `he`.'
    },
    {
        name: 'getSupportedLanguageCodes',
        signature: 'getSupportedLanguageCodes(): string[]',
        summary: 'All shipped language codes.',
        run: () => getSupportedLanguageCodes()
    },
    {
        name: 'RTL_LANGUAGES',
        signature: 'RTL_LANGUAGES: string[]',
        summary: 'The right-to-left set behind isLanguageRTL.',
        run: () => RTL_LANGUAGES
    },

    {
        name: 'getSupportedRegions',
        signature: 'getSupportedRegions(): string[]',
        summary: 'Regions that resolve to a currency.',
        run: () => getSupportedRegions()
    },
    {
        name: 'getSupportedCurrencies',
        signature: 'getSupportedCurrencies(): string[]',
        summary: 'Distinct currencies across those regions.',
        run: () => getSupportedCurrencies()
    },
    {
        name: 'REGION_CURRENCY_MAP',
        signature: 'REGION_CURRENCY_MAP: Record<string, string>',
        summary: 'The region → currency table the context uses to auto-detect.',
        run: () => REGION_CURRENCY_MAP
    },

    {
        name: 'REGEX',
        signature: 'REGEX: Record<RegexPattern, RegExp>',
        summary: 'Every named pattern, testable right here.',
        args: [
            { name: 'pattern', type: 'select', value: 'email', options: REGEX_OPTIONS },
            { name: 'value', type: 'text', value: 'ahmad@appna.io' }
        ],
        code: ([pattern, value]) => `REGEX.${pattern}.test('${value}')`,
        run: ([pattern, value]) => {
            const expression = REGEX[pattern as keyof typeof REGEX];
            return {
                source: expression.toString(),
                matches: expression.test(String(value))
            };
        },
        note: 'These are the exact objects the validators call `.test()` on — no pattern carries the global flag, so repeated tests are stateless.'
    }
];
