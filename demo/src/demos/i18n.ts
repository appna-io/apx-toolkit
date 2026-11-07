/**
 * Context-aware internationalisation.
 *
 * Everything here falls back to `ApxContext` when you leave the locale
 * argument out — which is the point of the group: change the language in
 * Settings and every card below rewrites itself without touching an input.
 */
import {
    DAY_NAMES,
    formatCurrencyI18N,
    formatDateI18N,
    formatTimeI18N,
    getAvailableLocales,
    getClosedTranslation,
    getDaysForLanguage,
    getDayTranslation,
    getLocaleConjunction,
    getMonthsForLanguage,
    getMonthTranslation,
    getTimeUnitTranslation,
    isLocaleSupported,
    MONTH_NAMES,
    type DayName,
    type MonthName,
    type TimeUnit
} from '@apx-ui/toolkit';
import type { ApiSpec } from '../lib/api';
import {
    CURRENCY_OPTIONS,
    LANGUAGE_OPTIONS,
    SHOWCASE_LOCALE_OPTIONS
} from '../lib/options';

/** `''` means "leave the argument out and let the context decide". */
const FROM_CONTEXT = { label: '— from context —', value: '' };

const CONTEXT_LOCALE_OPTIONS = [FROM_CONTEXT, ...SHOWCASE_LOCALE_OPTIONS];
const CONTEXT_CURRENCY_OPTIONS = [FROM_CONTEXT, ...CURRENCY_OPTIONS];

const TIME_UNIT_OPTIONS = (['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'] as TimeUnit[]).map(
    (unit) => ({ label: unit, value: unit })
);

/** Optional string arguments are dropped from the call when left on context. */
function optional(value: unknown): string | undefined {
    return value === '' ? undefined : String(value);
}

export const I18N_APIS: ApiSpec[] = [
    {
        name: 'formatCurrencyI18N',
        signature: 'formatCurrencyI18N(amount: number, currency?: string, locale?: string): string',
        summary: 'Currency formatting that reads both currency and locale from the context.',
        usesContext: true,
        args: [
            { name: 'amount', type: 'number', value: 1234.5 },
            { name: 'currency', type: 'select', value: '', options: CONTEXT_CURRENCY_OPTIONS },
            {
                name: 'locale',
                type: 'select',
                value: '',
                options: CONTEXT_LOCALE_OPTIONS,
                span: 2,
                hint: 'Leave both on “from context” and change the language in Settings.'
            }
        ],
        code: ([amount, currency, locale]) => {
            const args = [String(amount), currency ? `'${currency}'` : '', locale ? `'${locale}'` : '']
                .filter(Boolean)
                .join(', ');
            return `formatCurrencyI18N(${args})`;
        },
        run: ([amount, currency, locale]) =>
            formatCurrencyI18N(Number(amount), optional(currency), optional(locale))
    },
    {
        name: 'formatDateI18N',
        signature:
            "formatDateI18N(date, format?: string, variant: 'appointment' | 'default' = 'default', locale?: string): string",
        summary: 'Locale-aware date rendering, with an appointment variant for booking UIs.',
        usesContext: true,
        args: [
            { name: 'date', type: 'text', value: '2026-08-29T14:30:00', hint: 'Anything `new Date()` accepts.' },
            {
                name: 'variant',
                type: 'select',
                value: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'appointment', value: 'appointment' }
                ]
            },
            { name: 'locale', type: 'select', value: '', options: CONTEXT_LOCALE_OPTIONS, span: 2 }
        ],
        code: ([date, variant, locale]) =>
            `formatDateI18N('${date}', undefined, '${variant}'${locale ? `, '${locale}'` : ''})`,
        run: ([date, variant, locale]) =>
            formatDateI18N(
                String(date),
                undefined,
                variant as 'appointment' | 'default',
                optional(locale)
            )
    },
    {
        name: 'formatTimeI18N',
        signature: 'formatTimeI18N(value: number, unit: TimeUnit, locale?: string): string',
        summary: 'Pluralises and translates a duration — "3 hours", "3 שעות", "3 ساعات".',
        usesContext: true,
        args: [
            { name: 'value', type: 'number', value: 3 },
            { name: 'unit', type: 'select', value: 'h', options: TIME_UNIT_OPTIONS },
            { name: 'locale', type: 'select', value: '', options: CONTEXT_LOCALE_OPTIONS, span: 2 }
        ],
        code: ([value, unit, locale]) =>
            `formatTimeI18N(${value}, '${unit}'${locale ? `, '${locale}'` : ''})`,
        run: ([value, unit, locale]) =>
            formatTimeI18N(Number(value), unit as TimeUnit, optional(locale))
    },
    {
        name: 'getDayTranslation',
        signature: "getDayTranslation(language: string, day: DayName, format: 'short' | 'long' = 'long'): string",
        summary: 'One translated weekday name, falling back to English when the language is unknown.',
        args: [
            { name: 'language', type: 'select', value: 'he', options: LANGUAGE_OPTIONS },
            {
                name: 'day',
                type: 'select',
                value: 'monday',
                options: DAY_NAMES.map((day) => ({ label: day, value: day }))
            },
            {
                name: 'format',
                type: 'select',
                value: 'long',
                options: [
                    { label: 'long', value: 'long' },
                    { label: 'short', value: 'short' }
                ],
                omitWhenDefault: true,
                span: 2
            }
        ],
        run: ([language, day, format]) =>
            getDayTranslation(String(language), day as DayName, format as 'short' | 'long')
    },
    {
        name: 'getMonthTranslation',
        signature: "getMonthTranslation(language: string, month: MonthName, format: 'short' | 'long' = 'long'): string",
        summary: 'One translated month name.',
        args: [
            { name: 'language', type: 'select', value: 'ar', options: LANGUAGE_OPTIONS },
            {
                name: 'month',
                type: 'select',
                value: 'january',
                options: MONTH_NAMES.map((month) => ({ label: month, value: month }))
            },
            {
                name: 'format',
                type: 'select',
                value: 'long',
                options: [
                    { label: 'long', value: 'long' },
                    { label: 'short', value: 'short' }
                ],
                omitWhenDefault: true,
                span: 2
            }
        ],
        run: ([language, month, format]) =>
            getMonthTranslation(String(language), month as MonthName, format as 'short' | 'long')
    },
    {
        name: 'getDaysForLanguage',
        signature: 'getDaysForLanguage(language: string): Record<DayName, DayTranslation>',
        summary: 'The whole weekday table for one language — short and long together.',
        args: [{ name: 'language', type: 'select', value: 'he', options: LANGUAGE_OPTIONS, span: 2 }],
        run: ([language]) => getDaysForLanguage(String(language))
    },
    {
        name: 'getMonthsForLanguage',
        signature: 'getMonthsForLanguage(language: string): Record<MonthName, MonthTranslation>',
        summary: 'The whole month table for one language.',
        args: [{ name: 'language', type: 'select', value: 'ru', options: LANGUAGE_OPTIONS, span: 2 }],
        run: ([language]) => getMonthsForLanguage(String(language))
    },
    {
        name: 'getTimeUnitTranslation',
        signature: 'getTimeUnitTranslation(locale: string, unit: TimeUnit, value: number): string',
        summary: 'The bare unit word, pluralised for the value — what formatTimeI18N appends.',
        args: [
            { name: 'locale', type: 'select', value: 'he-IL', options: SHOWCASE_LOCALE_OPTIONS },
            { name: 'unit', type: 'select', value: 'd', options: TIME_UNIT_OPTIONS },
            { name: 'value', type: 'number', value: 2, span: 2 }
        ],
        run: ([locale, unit, value]) =>
            getTimeUnitTranslation(String(locale), unit as TimeUnit, Number(value))
    },
    {
        name: 'getLocaleConjunction',
        signature: "getLocaleConjunction(locale: string): string",
        summary: 'The "at" word a locale uses between a date and a time.',
        args: [{ name: 'locale', type: 'select', value: 'fr-FR', options: SHOWCASE_LOCALE_OPTIONS, span: 2 }],
        run: ([locale]) => getLocaleConjunction(String(locale))
    },
    {
        name: 'getClosedTranslation',
        signature: 'getClosedTranslation(language: string): string',
        summary: 'The "Closed" label used by formatOpeningHours.',
        args: [{ name: 'language', type: 'select', value: 'ar', options: LANGUAGE_OPTIONS, span: 2 }],
        run: ([language]) => getClosedTranslation(String(language))
    },
    {
        name: 'getAvailableLocales',
        signature: 'getAvailableLocales(): string[]',
        summary: 'Every locale the toolkit ships translations for.',
        run: () => getAvailableLocales()
    },
    {
        name: 'isLocaleSupported',
        signature: 'isLocaleSupported(locale: string): boolean',
        summary: 'Whether a locale is in that list.',
        args: [{ name: 'locale', type: 'text', value: 'pt-BR', span: 2, hint: 'Try pt-PT — shipped — versus pt-BR.' }],
        run: ([locale]) => isLocaleSupported(String(locale))
    }
];
