/**
 * The ApxContext accessors.
 *
 * The getters below re-read on every settings change, so this page doubles as
 * a live view of what the library currently believes. The setters are the same
 * ones the Settings screen drives — calling one here changes the library
 * immediately, but the Settings form still shows your last choice until you
 * touch it again.
 */
import {
    getContext,
    getCurrency,
    getLanguage,
    getLocale,
    getTimezone,
    isBrowser,
    isInitialized,
    LANGUAGES,
    setCurrency,
    setLanguage,
    setLocale,
    setTimezone,
    updateConfig
} from '@apx-ui/toolkit';
import type { ApiSpec } from '../lib/api';
import {
    CURRENCY_OPTIONS,
    LANGUAGE_OPTIONS,
    LOCALE_OPTIONS,
    TIMEZONE_OPTIONS
} from '../lib/options';

/** `() => T` reader that reflects the current context. */
function reader(name: string, returns: string, summary: string, fn: () => unknown): ApiSpec {
    return {
        name,
        signature: `${name}(): ${returns}`,
        summary,
        usesContext: true,
        run: fn
    };
}

const DESYNC_NOTE =
    'This writes straight to the library. The Settings screen keeps its own copy of what you picked, so it will re-assert itself on the next change there.';

export const CONTEXT_APIS: ApiSpec[] = [
    {
        name: 'getContext().getConfig',
        signature: 'getContext().getConfig(): Required<ApxContextOptions>',
        summary: 'The complete resolved configuration — the single source of truth.',
        usesContext: true,
        run: () => getContext().getConfig()
    },
    reader('getLocale', 'string', 'Active locale, or the fallback when the context was never initialised.', getLocale),
    reader('getLanguage', 'keyof typeof LANGUAGES', 'Active language code.', getLanguage),
    reader('getCurrency', 'string', 'Active currency — auto-detected from region or locale unless you set it.', getCurrency),
    reader('getTimezone', 'string', 'Active timezone.', getTimezone),
    reader('isInitialized', 'boolean', 'Whether `config()` has run.', isInitialized),
    reader('isBrowser', 'boolean', 'Whether Web Storage is reachable — the guard every persistence path uses.', isBrowser),

    {
        name: 'setLanguage',
        signature: 'setLanguage(language: keyof typeof LANGUAGES): void',
        summary: 'Sets the language and derives the matching locale. Unknown codes fall back to `en`.',
        imperative: true,
        args: [{ name: 'language', type: 'select', value: 'he', options: LANGUAGE_OPTIONS, span: 2 }],
        code: ([language]) => `setLanguage('${language}')`,
        run: ([language]) => {
            setLanguage(language as keyof typeof LANGUAGES);
            return { language: getLanguage(), locale: getLocale() };
        },
        note: DESYNC_NOTE
    },
    {
        name: 'setLocale',
        signature: 'setLocale(locale: string): void',
        summary: 'Sets the locale and back-fills the language when one matches.',
        imperative: true,
        args: [{ name: 'locale', type: 'select', value: 'ar-SA', options: LOCALE_OPTIONS, span: 2 }],
        code: ([locale]) => `setLocale('${locale}')`,
        run: ([locale]) => {
            setLocale(String(locale));
            return { locale: getLocale(), language: getLanguage() };
        },
        note: DESYNC_NOTE
    },
    {
        name: 'setCurrency',
        signature: 'setCurrency(currency: string): void',
        summary: 'Pins the currency, overriding auto-detection.',
        imperative: true,
        args: [{ name: 'currency', type: 'select', value: 'ILS', options: CURRENCY_OPTIONS, span: 2 }],
        code: ([currency]) => `setCurrency('${currency}')`,
        run: ([currency]) => {
            setCurrency(String(currency));
            return getCurrency();
        },
        note: DESYNC_NOTE
    },
    {
        name: 'setTimezone',
        signature: 'setTimezone(timezone: string): void',
        summary: 'Sets the timezone carried in the config.',
        imperative: true,
        args: [
            {
                name: 'timezone',
                type: 'select',
                value: 'Asia/Jerusalem',
                options: TIMEZONE_OPTIONS,
                span: 2
            }
        ],
        code: ([timezone]) => `setTimezone('${timezone}')`,
        run: ([timezone]) => {
            setTimezone(String(timezone));
            return getTimezone();
        },
        note: DESYNC_NOTE
    },
    {
        name: 'updateConfig',
        signature: 'updateConfig(options: Partial<ApxContextOptions>): void',
        summary: 'Patches the config in place — no re-initialisation, no storage cleanup.',
        imperative: true,
        args: [
            { name: 'defaultCurrency', type: 'select', value: 'EUR', options: CURRENCY_OPTIONS },
            { name: 'debug', type: 'boolean', value: true, hint: 'Logs to the console when on.' }
        ],
        code: ([currency, debug]) =>
            `updateConfig({ defaultCurrency: '${currency}', debug: ${debug} })`,
        run: ([currency, debug]) => {
            updateConfig({ defaultCurrency: String(currency), debug: Boolean(debug) });
            return getContext().getConfig();
        },
        note: DESYNC_NOTE
    }
];
