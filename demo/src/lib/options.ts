/**
 * Shared dropdown option lists.
 *
 * All of them are derived from the toolkit's own constants rather than
 * hand-written, so the playground can never drift from what the library
 * actually supports — and the Settings screen and the cards stay in sync.
 */
import {
    getSupportedCurrencies,
    getSupportedRegions,
    LANGUAGES
} from '@apx-ui/toolkit';
import type { SelectOption } from './api';

export const LANGUAGE_OPTIONS: SelectOption[] = Object.entries(LANGUAGES).map(
    ([code, lang]) => ({ label: `${code} — ${lang.label} (${lang.nativeName})`, value: code })
);

/**
 * Unicode locale extensions — valid Intl input that the library resolves to a
 * shipped language via its base subtag, even though it ships no translations
 * under these exact strings. `-u-nu-latn` forces Latin digits for locales that
 * would otherwise render Arabic-Indic ones.
 */
const LOCALE_EXTENSION_OPTIONS: SelectOption[] = [
    { label: 'ar-SA-u-nu-latn — Arabic, Latin digits', value: 'ar-SA-u-nu-latn' },
    { label: 'ar-EG — Arabic (Egypt)', value: 'ar-EG' },
    { label: 'en-GB — English (UK)', value: 'en-GB' },
    { label: 'pt-BR — Portuguese (Brazil)', value: 'pt-BR' },
    { label: 'es-MX — Spanish (Mexico)', value: 'es-MX' }
];

export const LOCALE_OPTIONS: SelectOption[] = [
    ...Object.values(LANGUAGES).map((lang) => ({
        label: `${lang.locale} — ${lang.label}`,
        value: lang.locale
    })),
    ...LOCALE_EXTENSION_OPTIONS
];

export const REGION_OPTIONS: SelectOption[] = getSupportedRegions()
    .sort()
    .map((region) => ({ label: region, value: region }));

export const CURRENCY_OPTIONS: SelectOption[] = getSupportedCurrencies()
    .sort()
    .map((currency) => ({ label: currency, value: currency }));

/**
 * The browser's full IANA list when available (every modern engine), with a
 * short curated fallback so the screen still works on older runtimes.
 */
export const TIMEZONE_OPTIONS: SelectOption[] = buildTimezoneOptions();

function buildTimezoneOptions(): SelectOption[] {
    const supported = (Intl as { supportedValuesOf?: (key: string) => string[] })
        .supportedValuesOf;
    const zones = supported
        ? supported('timeZone')
        : [
            'UTC',
            'America/New_York',
            'America/Los_Angeles',
            'Europe/London',
            'Europe/Berlin',
            'Asia/Jerusalem',
            'Asia/Dubai',
            'Asia/Tokyo',
            'Australia/Sydney'
        ];
    return ['UTC', ...zones.filter((zone) => zone !== 'UTC')].map((zone) => ({
        label: zone,
        value: zone
    }));
}

/** Handful of locales that exercise very different Intl output. */
export const SHOWCASE_LOCALE_OPTIONS: SelectOption[] = [
    { label: 'en-US — English (US)', value: 'en-US' },
    { label: 'de-DE — German', value: 'de-DE' },
    { label: 'fr-FR — French', value: 'fr-FR' },
    { label: 'he-IL — Hebrew (RTL)', value: 'he-IL' },
    { label: 'ar-SA — Arabic (RTL)', value: 'ar-SA' },
    { label: 'ja-JP — Japanese', value: 'ja-JP' },
    { label: 'hi-IN — Hindi', value: 'hi-IN' },
    { label: 'ru-RU — Russian', value: 'ru-RU' }
];
