/**
 * Date helpers — no dependency, no Date mutation.
 *
 * Nearly every function here is `(date) => Date | boolean`, so the group is
 * built from three small factories rather than 28 near-identical literals.
 */
import {
    addDays,
    addMonths,
    addYears,
    endOfDay,
    endOfMonth,
    endOfWeek,
    formatDate,
    formatDateLocale,
    getAge,
    getDaysDifference,
    getDaysInMonth,
    getHoursDifference,
    getMinutesDifference,
    getTimeAgo,
    isFuture,
    isLeapYear,
    isPast,
    isSameDay,
    isSameMonth,
    isSameYear,
    isToday,
    isTomorrow,
    isYesterday,
    startOfDay,
    startOfMonth,
    startOfWeek,
    toISOStringUTC
} from '@apx-ui/toolkit';
import type { ApiSpec, ArgSpec } from '../lib/api';
import { SHOWCASE_LOCALE_OPTIONS } from '../lib/options';

/** A date field that renders as `new Date('…')` in the snippet. */
function dateArg(name: string, value: string, hint?: string): ArgSpec {
    return {
        name,
        type: 'text',
        value,
        hint,
        literal: (v) => `new Date('${v}')`
    };
}

/** `(date: Date) => Date` — the boundary helpers. */
function boundary(name: string, summary: string, fn: (date: Date) => Date): ApiSpec {
    return {
        name,
        signature: `${name}(date: Date): Date`,
        summary,
        args: [{ ...dateArg('date', '2026-08-29T14:30:00'), span: 2 }],
        run: ([date]) => fn(new Date(String(date)))
    };
}

/** `(date: Date) => boolean` — the calendar predicates. */
function dateFlag(name: string, summary: string, fn: (date: Date) => boolean, value: string): ApiSpec {
    return {
        name,
        signature: `${name}(date: Date): boolean`,
        summary,
        args: [{ ...dateArg('date', value), span: 2 }],
        run: ([date]) => fn(new Date(String(date)))
    };
}

/** `(date: Date, n: number) => Date` — the arithmetic helpers. */
function shift(
    name: string,
    unit: string,
    fn: (date: Date, amount: number) => Date,
    amount: number
): ApiSpec {
    return {
        name,
        signature: `${name}(date: Date, ${unit}: number): Date`,
        summary: `Adds ${unit} without mutating the input — negatives subtract.`,
        args: [dateArg('date', '2026-08-29'), { name: unit, type: 'number', value: amount }],
        run: ([date, value]) => fn(new Date(String(date)), Number(value))
    };
}

/** `(a: Date, b: Date) => number | boolean` — the two-date comparisons. */
function compare(
    name: string,
    returns: string,
    summary: string,
    fn: (a: Date, b: Date) => number | boolean,
    a = '2026-08-29T09:00:00',
    b = '2026-09-02T17:30:00'
): ApiSpec {
    return {
        name,
        signature: `${name}(date1: Date, date2: Date): ${returns}`,
        summary,
        args: [dateArg('date1', a), dateArg('date2', b)],
        run: ([date1, date2]) => fn(new Date(String(date1)), new Date(String(date2)))
    };
}

const TODAY = new Date().toISOString().slice(0, 10);

export const DATE_APIS: ApiSpec[] = [
    {
        name: 'formatDate',
        signature: "formatDate(date: Date | string | number, format = 'YYYY-MM-DD'): string",
        summary: 'Token formatting with no Intl involved — YYYY, MM, DD, HH, mm, ss.',
        args: [
            dateArg('date', '2026-08-29T14:30:00'),
            {
                name: 'format',
                type: 'select',
                value: 'YYYY-MM-DD',
                options: [
                    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
                    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
                    { label: 'YYYY-MM-DD HH:mm', value: 'YYYY-MM-DD HH:mm' },
                    { label: 'HH:mm:ss', value: 'HH:mm:ss' },
                    { label: 'DD.MM.YYYY HH:mm:ss', value: 'DD.MM.YYYY HH:mm:ss' }
                ],
                omitWhenDefault: true
            }
        ],
        run: ([date, format]) => formatDate(String(date), String(format)),
        note: 'Throws on an unparseable date rather than returning "Invalid Date" — try clearing the field.'
    },
    {
        name: 'formatDateLocale',
        signature:
            "formatDateLocale(date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string",
        summary: 'Hands the date to Intl.DateTimeFormat for the given locale.',
        args: [
            dateArg('date', '2026-08-29T14:30:00'),
            { name: 'locale', type: 'select', value: 'en-US', options: SHOWCASE_LOCALE_OPTIONS }
        ],
        run: ([date, locale]) => formatDateLocale(String(date), String(locale))
    },
    {
        name: 'getTimeAgo',
        signature: 'getTimeAgo(date: Date | string | number): string',
        summary: 'Coarse "3 hours ago" phrasing, computed against now.',
        args: [{ ...dateArg('date', '2026-08-20T08:00:00'), span: 2 }],
        run: ([date]) => getTimeAgo(String(date))
    },
    {
        name: 'toISOStringUTC',
        signature: 'toISOStringUTC(date: Date): string',
        summary: 'ISO-8601 in UTC, regardless of the machine timezone.',
        args: [{ ...dateArg('date', '2026-08-29T14:30:00'), span: 2 }],
        run: ([date]) => toISOStringUTC(new Date(String(date)))
    },

    boundary('startOfDay', 'Midnight at the start of that local day.', startOfDay),
    boundary('endOfDay', 'One millisecond before the next local midnight.', endOfDay),
    boundary('startOfWeek', 'Sunday of that week, at midnight.', startOfWeek),
    boundary('endOfWeek', 'Saturday of that week, at end of day.', endOfWeek),
    boundary('startOfMonth', 'First day of the month, at midnight.', startOfMonth),
    boundary('endOfMonth', 'Last day of the month, at end of day.', endOfMonth),

    shift('addDays', 'days', addDays, 45),
    shift('addMonths', 'months', addMonths, 6),
    shift('addYears', 'years', addYears, -2),

    compare('isSameDay', 'boolean', 'Same calendar day, ignoring the clock.', isSameDay, '2026-08-29T09:00:00', '2026-08-29T23:15:00'),
    compare('isSameMonth', 'boolean', 'Same month and year.', isSameMonth),
    compare('isSameYear', 'boolean', 'Same year.', isSameYear),
    compare('getDaysDifference', 'number', 'Whole days between two dates.', getDaysDifference),
    compare('getHoursDifference', 'number', 'Whole hours between two dates.', getHoursDifference),
    compare('getMinutesDifference', 'number', 'Whole minutes between two dates.', getMinutesDifference),

    dateFlag('isToday', 'Whether the date falls on today.', isToday, TODAY),
    dateFlag('isYesterday', 'Whether the date falls on yesterday.', isYesterday, TODAY),
    dateFlag('isTomorrow', 'Whether the date falls on tomorrow.', isTomorrow, TODAY),
    dateFlag('isPast', 'Strictly before now.', isPast, '2020-01-01'),
    dateFlag('isFuture', 'Strictly after now.', isFuture, '2030-01-01'),

    {
        name: 'getAge',
        signature: 'getAge(birthDate: Date): number',
        summary: 'Years elapsed, accounting for whether the birthday has passed this year.',
        args: [{ ...dateArg('birthDate', '1990-11-15'), span: 2 }],
        run: ([date]) => getAge(new Date(String(date)))
    },
    {
        name: 'isLeapYear',
        signature: 'isLeapYear(year: number): boolean',
        summary: 'Gregorian leap-year rule, centuries included.',
        args: [{ name: 'year', type: 'number', value: 2100, span: 2, hint: '1900 and 2100 are not leap years; 2000 is.' }],
        run: ([year]) => isLeapYear(Number(year))
    },
    {
        name: 'getDaysInMonth',
        signature: 'getDaysInMonth(year: number, month: number): number',
        summary: 'Length of a month.',
        args: [
            { name: 'year', type: 'number', value: 2028 },
            {
                name: 'month',
                type: 'select',
                value: 1,
                options: [
                    { label: '0 — January', value: '0' },
                    { label: '1 — February', value: '1' },
                    { label: '2 — March', value: '2' },
                    { label: '11 — December', value: '11' }
                ],
                literal: (v) => String(v)
            }
        ],
        run: ([year, month]) => getDaysInMonth(Number(year), Number(month)),
        note: '`month` is zero-based, following the JS Date convention — February is 1, not 2. The signature does not say so; it is worth pinning down before you rely on it.'
    }
];
