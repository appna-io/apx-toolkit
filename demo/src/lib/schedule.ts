/**
 * Pure helpers for building a `StoreHours` tuple.
 *
 * Both the opening-hours lab and the landing-page showcase let you edit a
 * week, so the tuple mechanics live here rather than in either component.
 * Every function returns a new tuple — nothing mutates in place.
 */
import { DAY_NAMES, type DaySchedule, type OpeningPeriod, type StoreHours } from '@apx-ui/toolkit';

/** The library's sentinel for a day with no trading hours. */
export const CLOSED = { open: false, closed: false } as const;

export const DEFAULT_PERIOD: OpeningPeriod = { open: '09:00', closed: '17:00' };

export function isClosed(schedule: DaySchedule): schedule is { open: false; closed: false } {
    return !Array.isArray(schedule);
}

/** Replaces one day, preserving the 7-tuple type. */
export function setDay(hours: StoreHours, index: number, schedule: DaySchedule): StoreHours {
    return hours.map((day, i) => (i === index ? schedule : day)) as unknown as StoreHours;
}

/** Closed days open with a default period; open days close entirely. */
export function toggleDay(hours: StoreHours, index: number): StoreHours {
    const current = hours[index];
    return setDay(hours, index, isClosed(current) ? [{ ...DEFAULT_PERIOD }] : CLOSED);
}

export function setPeriod(
    hours: StoreHours,
    dayIndex: number,
    periodIndex: number,
    key: keyof OpeningPeriod,
    value: string
): StoreHours {
    const current = hours[dayIndex];
    if (isClosed(current)) {
        return hours;
    }
    return setDay(
        hours,
        dayIndex,
        current.map((period, i) => (i === periodIndex ? { ...period, [key]: value } : period))
    );
}

export function addPeriod(hours: StoreHours, dayIndex: number): StoreHours {
    const current = hours[dayIndex];
    return setDay(
        hours,
        dayIndex,
        isClosed(current) ? [{ ...DEFAULT_PERIOD }] : [...current, { ...DEFAULT_PERIOD }]
    );
}

/** Removing the last period closes the day rather than leaving an empty array. */
export function removePeriod(hours: StoreHours, dayIndex: number, periodIndex: number): StoreHours {
    const current = hours[dayIndex];
    if (isClosed(current)) {
        return hours;
    }
    const remaining = current.filter((_, i) => i !== periodIndex);
    return setDay(hours, dayIndex, remaining.length > 0 ? remaining : CLOSED);
}

/** Builds every day from one schedule — used by the uniform presets. */
export function everyDay(schedule: DaySchedule): StoreHours {
    return Array.from({ length: 7 }, () => schedule) as unknown as StoreHours;
}

/** Source form of the tuple, so a snippet is copy-paste ready. */
export function renderStoreHours(hours: StoreHours): string {
    const rows = hours.map((schedule, index) => {
        const comment = `// ${DAY_NAMES[index]}`;
        if (isClosed(schedule)) {
            return '  { open: false, closed: false },'.padEnd(56) + comment;
        }
        const periods = schedule
            .map((period) => `{ open: '${period.open}', closed: '${period.closed}' }`)
            .join(', ');
        return `  [${periods}],`.padEnd(56) + comment;
    });
    return `const storeHours: StoreHours = [\n${rows.join('\n')}\n];`;
}

/** Presets chosen to expose one grouping rule each. */
export const SCHEDULE_PRESETS: Array<{ label: string; hint: string; hours: StoreHours }> = [
    {
        label: 'Standard week',
        hint: 'Mon–Fri identical and consecutive — they collapse into one range.',
        hours: [
            CLOSED,
            [DEFAULT_PERIOD],
            [DEFAULT_PERIOD],
            [DEFAULT_PERIOD],
            [DEFAULT_PERIOD],
            [DEFAULT_PERIOD],
            CLOSED
        ]
    },
    {
        label: 'Split shift',
        hint: 'Wednesday closes for lunch — two periods on one day.',
        hours: [
            CLOSED,
            [DEFAULT_PERIOD],
            [DEFAULT_PERIOD],
            [
                { open: '09:00', closed: '13:00' },
                { open: '15:00', closed: '19:00' }
            ],
            [DEFAULT_PERIOD],
            [{ open: '09:00', closed: '14:00' }],
            [{ open: '10:00', closed: '22:00' }]
        ]
    },
    {
        label: 'Alternating days',
        hint: 'Mon, Wed, Fri share hours but are not adjacent — three separate lines.',
        hours: [CLOSED, [DEFAULT_PERIOD], CLOSED, [DEFAULT_PERIOD], CLOSED, [DEFAULT_PERIOD], CLOSED]
    },
    {
        label: 'Always open',
        hint: 'Every day identical — the whole week becomes one line.',
        hours: everyDay([{ open: '00:00', closed: '23:59' }])
    },
    {
        label: 'Permanently closed',
        hint: 'No open groups at all.',
        hours: everyDay(CLOSED)
    }
];
