/**
 * Global toolkit settings for the playground.
 *
 * The demo dogfoods the library twice over: the settings you pick here are
 * pushed straight into `config()` (the real `ApxContext`), and the settings
 * themselves are persisted with the toolkit's own `Persister`.
 *
 * Every playground card re-runs whenever `version` bumps, so switching the
 * language or currency here visibly rewrites the output of every
 * context-aware formatter across the app.
 */
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode
} from 'react';
import {
    config,
    getContext,
    getLanguageByLocale,
    isLanguageRTL,
    LANGUAGES,
    Persister,
    type ApxContextOptions,
    type PersistOption
} from '@apx-ui/toolkit';

export type LanguageCode = keyof typeof LANGUAGES;

/**
 * What the playground sends to `config()`.
 *
 * The locale is the source of truth and always set. Language, region and
 * currency are optional: leaving one `undefined` is how you ask the library to
 * derive it from the locale, and setting one is an explicit override. The
 * "— from locale —" entry in each dropdown is exactly this `undefined`.
 */
export interface ToolkitSettings {
    defaultLocale: string;
    defaultLanguage?: LanguageCode;
    defaultCurrency?: string;
    defaultRegion?: string;
    defaultTimezone: string;
    persist: PersistOption;
    debug: boolean;
}

/** Fields that may be left to the locale. */
export const DERIVED_KEYS = ['defaultLanguage', 'defaultCurrency', 'defaultRegion'] as const;

export const DEFAULT_SETTINGS: ToolkitSettings = {
    defaultLocale: 'en-US',
    defaultTimezone: 'UTC',
    persist: 'localStorage',
    debug: false
};

/** Where the playground keeps *its own* settings, separate from `apxConfig`. */
const SETTINGS_KEY = 'apxDemoSettings';

function readStoredSettings(): ToolkitSettings {
    try {
        const stored = Persister.getLocalStorage<Partial<ToolkitSettings>>(SETTINGS_KEY);
        return stored ? { ...DEFAULT_SETTINGS, ...stored } : DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
}

function writeStoredSettings(settings: ToolkitSettings): void {
    try {
        Persister.setLocalStorage({ [SETTINGS_KEY]: { value: settings } });
    } catch {
        // Storage is unavailable (private mode, quota) — the session still works.
    }
}

/** Push settings into the library and hand back the config it actually adopted. */
function applySettings(settings: ToolkitSettings): Required<ApxContextOptions> {
    config(settings);
    return getContext().getConfig();
}

interface SettingsContextValue {
    /** What the user picked in the Settings screen. */
    settings: ToolkitSettings;
    /** What `ApxContext` resolved to — may differ, e.g. auto-detected currency. */
    applied: Required<ApxContextOptions>;
    /** Bumped on every apply; cards depend on it to recompute. */
    version: number;
    isRTL: boolean;
    update: (patch: Partial<ToolkitSettings>) => void;
    reset: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
    // Applied eagerly during the first render so no card ever calls a
    // context-aware formatter before `config()` has run.
    const [settings, setSettings] = useState<ToolkitSettings>(readStoredSettings);
    const [applied, setApplied] = useState<Required<ApxContextOptions>>(() =>
        applySettings(readStoredSettings())
    );
    const [version, setVersion] = useState(0);

    const commit = useCallback((next: ToolkitSettings) => {
        setSettings(next);
        setApplied(applySettings(next));
        setVersion((v) => v + 1);
        writeStoredSettings(next);
    }, []);

    const update = useCallback((patch: Partial<ToolkitSettings>) => {
        setSettings((current) => {
            // An explicit `undefined` in the patch means "go back to deriving
            // this from the locale", so it must survive the merge rather than
            // being treated as absent.
            const next = { ...current, ...patch };
            setApplied(applySettings(next));
            setVersion((v) => v + 1);
            writeStoredSettings(next);
            return next;
        });
    }, []);

    const reset = useCallback(() => commit(DEFAULT_SETTINGS), [commit]);

    const value = useMemo<SettingsContextValue>(
        () => ({
            settings,
            applied,
            version,
            isRTL: isLanguageRTL(directionLanguage(settings)),
            update,
            reset
        }),
        [settings, applied, version, update, reset]
    );

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/**
 * Which language decides the page direction.
 *
 * An explicit language override wins; otherwise the locale names it. This is
 * the same order the library uses internally, so the layout direction can
 * never disagree with the text the formatters produce.
 */
function directionLanguage(settings: ToolkitSettings): string {
    return (
        settings.defaultLanguage ??
        getLanguageByLocale(settings.defaultLocale)?.key ??
        'en'
    );
}

export function useSettings(): SettingsContextValue {
    const ctx = useContext(SettingsContext);
    if (!ctx) {
        throw new Error('useSettings must be used inside <SettingsProvider>');
    }
    return ctx;
}
