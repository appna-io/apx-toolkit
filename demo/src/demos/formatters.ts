/**
 * Presentation formatters. These take an explicit `locale` argument and
 * default to `en-US` — unlike the I18N group, which reads the locale from
 * `ApxContext` instead.
 */
import {
    formatBytes,
    formatCompactNumber,
    formatCurrency,
    formatDuration,
    formatFileSize,
    formatNumber,
    formatOrdinal,
    formatPercentage,
    formatPostalCode,
    formatRelativeTime,
    formatSSN
} from '@apx-ui/toolkit';
import type { ApiSpec, ArgValue } from '../lib/api';
import { CURRENCY_OPTIONS, SHOWCASE_LOCALE_OPTIONS } from '../lib/options';

/** Collapses the hours/minutes/seconds fields into the single argument the API takes. */
function totalSeconds([hours, minutes, seconds]: ArgValue[]): number {
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

export const FORMATTER_APIS: ApiSpec[] = [
    {
        name: 'formatCurrency',
        signature: "formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string",
        summary: 'Intl currency formatting, falling back to `CODE 0.00` on an unknown pair.',
        args: [
            { name: 'amount', type: 'number', value: 1234.5 },
            { name: 'currency', type: 'select', value: 'USD', options: CURRENCY_OPTIONS },
            {
                name: 'locale',
                type: 'select',
                value: 'en-US',
                options: SHOWCASE_LOCALE_OPTIONS,
                span: 2,
                hint: 'Switch to de-DE or ar-SA to see symbol placement and digits change.'
            }
        ],
        run: ([amount, currency, locale]) =>
            formatCurrency(Number(amount), String(currency), String(locale))
    },
    {
        name: 'formatNumber',
        signature: 'formatNumber(num: number, locale = \'en-US\', options?: Intl.NumberFormatOptions): string',
        summary: 'Thousands separators and digit shaping for the given locale.',
        args: [
            { name: 'num', type: 'number', value: 1234567.891 },
            { name: 'locale', type: 'select', value: 'en-US', options: SHOWCASE_LOCALE_OPTIONS }
        ],
        run: ([num, locale]) => formatNumber(Number(num), String(locale))
    },
    {
        name: 'formatPercentage',
        signature: "formatPercentage(value: number, decimals = 2, locale = 'en-US'): string",
        summary: 'Takes a 0–100 value — it divides by 100 for you.',
        args: [
            { name: 'value', type: 'number', value: 42.5 },
            { name: 'decimals', type: 'number', value: 2 },
            {
                name: 'locale',
                type: 'select',
                value: 'en-US',
                options: SHOWCASE_LOCALE_OPTIONS,
                omitWhenDefault: true
            }
        ],
        run: ([value, decimals, locale]) =>
            formatPercentage(Number(value), Number(decimals), String(locale))
    },
    {
        name: 'formatCompactNumber',
        signature: 'formatCompactNumber(num: number): string',
        summary: 'Short form for counters and badges — 1.5K, 2M, 3.4B.',
        args: [{ name: 'num', type: 'number', value: 1536000, span: 2 }],
        run: ([num]) => formatCompactNumber(Number(num))
    },
    {
        name: 'formatOrdinal',
        signature: 'formatOrdinal(num: number): string',
        summary: 'English ordinal suffix — 1st, 2nd, 3rd, 11th.',
        args: [{ name: 'num', type: 'number', value: 23, span: 2 }],
        run: ([num]) => formatOrdinal(Number(num))
    },
    {
        name: 'formatFileSize',
        signature: 'formatFileSize(bytes: number): string',
        summary: 'Human-readable size picked from the magnitude.',
        args: [{ name: 'bytes', type: 'number', value: 5242880, span: 2 }],
        run: ([bytes]) => formatFileSize(Number(bytes))
    },
    {
        name: 'formatBytes',
        signature: 'formatBytes(bytes: number, decimals = 2): string',
        summary: 'Same idea as formatFileSize, with the precision under your control.',
        args: [
            { name: 'bytes', type: 'number', value: 5242880 },
            { name: 'decimals', type: 'number', value: 2, omitWhenDefault: true }
        ],
        run: ([bytes, decimals]) => formatBytes(Number(bytes), Number(decimals))
    },
    {
        name: 'formatDuration',
        signature: 'formatDuration(seconds: number): string',
        summary:
            'Seconds to a readable duration — emits `h`, `m` and `s`, dropping whichever components are zero.',
        // The function takes a single seconds argument, but dialling hours and
        // minutes separately is the only way to see that it handles them at all.
        args: [
            { name: 'hours', type: 'number', value: 1 },
            { name: 'minutes', type: 'number', value: 2 },
            { name: 'seconds', type: 'number', value: 5 }
        ],
        code: ([hours, minutes, seconds]) =>
            `const total = ${hours} * 3600 + ${minutes} * 60 + ${seconds}; // ${totalSeconds([hours, minutes, seconds])}\n\nformatDuration(total)`,
        run: (values) => formatDuration(totalSeconds(values)),
        note: 'Zero components are omitted rather than padded — 7200 gives "2h", not "2h 0m 0s". There is no day component either, so 90061 formats as "25h 1m 1s".'
    },
    {
        name: 'formatRelativeTime',
        signature: 'formatRelativeTime(date: Date | string | number): string',
        summary: 'Distance from now, in words.',
        args: [
            {
                name: 'date',
                type: 'select',
                value: '-7200',
                options: [
                    { label: '30 seconds ago', value: '-30' },
                    { label: '2 hours ago', value: '-7200' },
                    { label: '3 days ago', value: '-259200' },
                    { label: 'in 45 minutes', value: '2700' },
                    { label: 'in 2 weeks', value: '1209600' }
                ],
                span: 2,
                literal: (value) => `new Date(Date.now() ${Number(value) < 0 ? '-' : '+'} ${Math.abs(Number(value))} * 1000)`
            }
        ],
        run: ([offset]) => formatRelativeTime(new Date(Date.now() + Number(offset) * 1000))
    },
    {
        name: 'formatSSN',
        signature: 'formatSSN(ssn: string, mask = true): string',
        summary: 'Groups a US SSN and masks all but the last four by default.',
        args: [
            { name: 'ssn', type: 'text', value: '123456789' },
            { name: 'mask', type: 'boolean', value: true, omitWhenDefault: true }
        ],
        run: ([ssn, mask]) => formatSSN(String(ssn), Boolean(mask))
    },
    {
        name: 'formatPostalCode',
        signature: 'formatPostalCode(postalCode: string): string',
        summary: 'Normalises a US ZIP, inserting the ZIP+4 hyphen.',
        args: [{ name: 'postalCode', type: 'text', value: '902101234', span: 2 }],
        run: ([code]) => formatPostalCode(String(code))
    }
];
