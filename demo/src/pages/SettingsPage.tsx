/**
 * The global context, as a form.
 *
 * Each control calls `config()` immediately, so the "Resolved configuration"
 * panel below is the library's own answer — not an echo of the form. Where the
 * two disagree (currency auto-detection, locale derived from language) that is
 * the point: it shows what ApxContext actually decided.
 */
import { useState } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import {
    formatCurrencyI18N,
    formatDateI18N,
    formatOpeningHours,
    formatTimeI18N,
    Persister,
    type StoreHours
} from '@apx-ui/toolkit';
import { cn } from '../lib/cn';
import {
    CURRENCY_OPTIONS,
    LANGUAGE_OPTIONS,
    LOCALE_OPTIONS,
    REGION_OPTIONS,
    TIMEZONE_OPTIONS
} from '../lib/options';
import { useSettings, type LanguageCode, type ToolkitSettings } from '../lib/settings';
import { DerivedSelect } from '../ui/DerivedSelect';
import { inputClass } from '../ui/Field';
import { ResultView } from '../ui/ResultView';
import { CodeBlock } from '../ui/CodeBlock';

const PERSIST_OPTIONS = [
    { label: 'localStorage', value: 'localStorage' },
    { label: 'sessionStorage', value: 'sessionStorage' },
    { label: 'memory', value: 'memory' },
    { label: 'false (no persistence)', value: 'false' }
];

/** A single weekday, enough to show the language change reaching the formatter. */
const PREVIEW_HOURS: StoreHours = [
    { open: false, closed: false },
    [{ open: '09:00', closed: '17:00' }],
    [{ open: '09:00', closed: '17:00' }],
    [{ open: '09:00', closed: '17:00' }],
    [{ open: '09:00', closed: '17:00' }],
    [{ open: '09:00', closed: '14:00' }],
    { open: false, closed: false }
];

export function SettingsPage() {
    const { settings, applied, isRTL, update, reset } = useSettings();
    const [cleared, setCleared] = useState(false);

    const configCall = buildConfigCall(settings);

    return (
        <div className="space-y-6">
            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                <header className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight">Context</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Applied on every change — no save button.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={reset}
                        className="flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                    >
                        <RotateCcw className="h-3 w-3" />
                        Defaults
                    </button>
                </header>

                <div className="border-b border-border bg-muted/30 px-4 py-3">
                    <Select
                        label="defaultLocale"
                        hint={
                            isRTL
                                ? 'The source of truth. This locale is right-to-left.'
                                : 'The source of truth — language, region and currency all default to what it implies.'
                        }
                        value={settings.defaultLocale}
                        options={LOCALE_OPTIONS}
                        onChange={(value) => update({ defaultLocale: value })}
                    />
                </div>

                <div className="grid gap-3 px-4 py-4 sm:grid-cols-2">
                    <DerivedSelect
                        label="defaultLanguage"
                        value={settings.defaultLanguage}
                        derived={applied.defaultLanguage}
                        options={LANGUAGE_OPTIONS}
                        onChange={(value) =>
                            update({ defaultLanguage: value as LanguageCode | undefined })
                        }
                    />
                    <DerivedSelect
                        label="defaultRegion"
                        value={settings.defaultRegion}
                        derived={applied.defaultRegion}
                        options={REGION_OPTIONS}
                        onChange={(value) => update({ defaultRegion: value })}
                    />
                    <DerivedSelect
                        label="defaultCurrency"
                        value={settings.defaultCurrency}
                        derived={applied.defaultCurrency}
                        options={CURRENCY_OPTIONS}
                        onChange={(value) => update({ defaultCurrency: value })}
                        hint="Derived through the region, which itself follows the locale."
                    />
                    <Select
                        label="defaultTimezone"
                        value={settings.defaultTimezone}
                        options={TIMEZONE_OPTIONS}
                        onChange={(value) => update({ defaultTimezone: value })}
                    />
                    <Select
                        label="persist"
                        hint="Where ApxContext stores the config between reloads."
                        value={String(settings.persist)}
                        options={PERSIST_OPTIONS}
                        onChange={(value) =>
                            update({
                                persist: value === 'false'
                                    ? false
                                    : (value as ToolkitSettings['persist'])
                            })
                        }
                    />
                    <label className="block sm:col-span-2">
                        <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                            debug
                        </span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={settings.debug}
                            onClick={() => update({ debug: !settings.debug })}
                            className={cn(
                                'flex h-[30px] w-full items-center gap-2 rounded-md border border-input px-2.5 font-mono text-xs transition-colors',
                                settings.debug
                                    ? 'border-primary/40 bg-primary/10'
                                    : 'bg-background text-muted-foreground hover:bg-muted'
                            )}
                        >
                            <span
                                className={cn(
                                    'relative h-3.5 w-6 shrink-0 rounded-full transition-colors',
                                    settings.debug ? 'bg-primary' : 'bg-border'
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background transition-all',
                                        settings.debug ? 'left-3' : 'left-0.5'
                                    )}
                                />
                            </span>
                            {String(settings.debug)}
                        </button>
                        <span className="mt-1 block text-[11px] text-muted-foreground">
                            Logs every context decision to the browser console.
                        </span>
                    </label>
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                    <header className="border-b border-border px-4 py-3">
                        <h3 className="text-sm font-semibold tracking-tight">
                            Resolved configuration
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            <code className="font-mono">getContext().getConfig()</code> — what the
                            library kept, which is not always what you sent.
                        </p>
                    </header>
                    <div className="px-4 py-3">
                        <ResultView value={applied} />
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                    <header className="border-b border-border px-4 py-3">
                        <h3 className="text-sm font-semibold tracking-tight">Your call</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Paste this once at app startup.
                        </p>
                    </header>
                    <div className="px-4 py-3">
                        <CodeBlock code={configCall} />
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                <header className="border-b border-border px-4 py-3">
                    <h3 className="text-sm font-semibold tracking-tight">Live effect</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        The same four calls, with no locale argument — they read everything above.
                    </p>
                </header>
                <div
                    className="divide-y divide-border"
                    dir={isRTL ? 'rtl' : 'ltr'}
                >
                    <PreviewRow
                        call="formatCurrencyI18N(1234.5)"
                        value={safely(() => formatCurrencyI18N(1234.5))}
                    />
                    <PreviewRow
                        call="formatDateI18N('2026-08-29T14:30:00')"
                        value={safely(() => formatDateI18N('2026-08-29T14:30:00'))}
                    />
                    <PreviewRow
                        call="formatTimeI18N(3, 'h')"
                        value={safely(() => formatTimeI18N(3, 'h'))}
                    />
                    <PreviewRow
                        call="formatOpeningHours(hours)"
                        value={safely(() => formatOpeningHours(PREVIEW_HOURS).join(' · '))}
                    />
                </div>
            </section>

            <section className="rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight">Stored keys</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            The context and this playground both persist through{' '}
                            <code className="font-mono">Persister</code>.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            Persister.clear('localStorage');
                            setCleared(true);
                        }}
                        className="flex items-center gap-1.5 rounded-md border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3 w-3" />
                        Clear localStorage
                    </button>
                </div>
                <div className="mt-3">
                    <ResultView value={Persister.keys('localStorage')} />
                </div>
                {cleared && (
                    <p className="mt-2 text-[11px] text-muted-foreground">
                        Cleared. Reload to see the context fall back to its defaults.
                    </p>
                )}
            </section>
        </div>
    );
}

/**
 * The `config()` snippet matching the current form state.
 *
 * Derived settings are simply absent from the call — that omission *is* the
 * mechanism, so printing them as `undefined` would misrepresent it.
 */
function buildConfigCall(settings: ToolkitSettings): string {
    const lines = [`  defaultLocale: '${settings.defaultLocale}',`];
    if (settings.defaultLanguage) {
        lines.push(`  defaultLanguage: '${settings.defaultLanguage}',`);
    }
    if (settings.defaultRegion) {
        lines.push(`  defaultRegion: '${settings.defaultRegion}',`);
    }
    if (settings.defaultCurrency) {
        lines.push(`  defaultCurrency: '${settings.defaultCurrency}',`);
    }
    lines.push(`  defaultTimezone: '${settings.defaultTimezone}',`);
    lines.push(`  persist: ${settings.persist === false ? 'false' : `'${settings.persist}'`},`);
    lines.push(`  debug: ${settings.debug}`);

    return `import { config } from '@apx-ui/toolkit';

config({
${lines.join('\n')}
});`;
}

/** Preview calls run against live settings, so a bad combination must not blank the page. */
function safely(fn: () => string): string {
    try {
        return fn();
    } catch (error) {
        return error instanceof Error ? `threw: ${error.message}` : String(error);
    }
}

function PreviewRow({ call, value }: { call: string; value: string }) {
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-2.5">
            <code className="font-mono text-[11px] text-muted-foreground">{call}</code>
            <span className="font-mono text-sm font-medium text-foreground">{value}</span>
        </div>
    );
}

interface SelectProps {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
    hint?: string;
    onChange: (value: string) => void;
}

function Select({ label, value, options, hint, onChange }: SelectProps) {
    return (
        <label className="block min-w-0">
            <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                {label}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(inputClass, 'h-[30px] py-0')}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {hint && (
                <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">
                    {hint}
                </span>
            )}
        </label>
    );
}
