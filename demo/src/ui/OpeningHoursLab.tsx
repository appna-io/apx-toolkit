/**
 * A weekly schedule you can actually edit, wired to `formatOpeningHours`.
 *
 * The interesting behaviour is the grouping: identical schedules on
 * *consecutive* days collapse into a range, identical schedules on
 * non-consecutive days stay separate, and closed days always sort to the end.
 * None of that is visible against a fixed fixture, so this builds the
 * `StoreHours` tuple from real controls and reformats on every edit.
 */
import { useMemo, useState } from 'react';
import { Settings2 } from 'lucide-react';
import { formatOpeningHours, isLanguageRTL, type StoreHours } from '@apx-ui/toolkit';
import { cn } from '../lib/cn';
import { LANGUAGE_OPTIONS } from '../lib/options';
import { renderStoreHours, SCHEDULE_PRESETS } from '../lib/schedule';
import { useSettings } from '../lib/settings';
import { CodeBlock } from './CodeBlock';
import { inputClass } from './Field';
import { ResultView } from './ResultView';
import { ScheduleEditor } from './ScheduleEditor';

export function OpeningHoursLab() {
    const { applied } = useSettings();
    const [hours, setHours] = useState<StoreHours>(SCHEDULE_PRESETS[1].hours);
    const [use24Hour, setUse24Hour] = useState(false);
    // '' means "let the formatter derive the language from the context locale".
    const [language, setLanguage] = useState('');

    const effectiveLanguage = language || applied.defaultLanguage;
    const rtl = isLanguageRTL(effectiveLanguage);

    const result = useMemo(() => {
        try {
            return {
                lines: formatOpeningHours(hours, {
                    use24Hour,
                    language: language || undefined
                }),
                error: null as Error | null
            };
        } catch (cause) {
            return {
                lines: [] as string[],
                error: cause instanceof Error ? cause : new Error(String(cause))
            };
        }
    }, [hours, use24Hour, language]);

    const code = `${renderStoreHours(hours)}\n\nformatOpeningHours(storeHours, {\n  use24Hour: ${use24Hour}${language ? `,\n  language: '${language}'` : ''}\n});`;

    return (
        <article className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
            <header className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
                <div className="min-w-0">
                    <h3 className="font-mono text-sm font-semibold tracking-tight">
                        formatOpeningHours
                    </h3>
                    <p className="mt-1 break-words font-mono text-[11px] leading-relaxed text-muted-foreground">
                        formatOpeningHours(storeHours: StoreHours, options?: {'{'} locale?, use24Hour?, language? {'}'}): string[]
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        Edit the week and watch the grouping react. Leave the language on “from
                        context” and it follows the locale set in Settings.
                    </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
                    <Settings2 className="h-3 w-3" />
                    context
                </span>
            </header>

            <div className="flex flex-wrap gap-1.5 border-b border-border bg-muted/30 px-4 py-3">
                {SCHEDULE_PRESETS.map((preset) => (
                    <button
                        key={preset.label}
                        type="button"
                        title={preset.hint}
                        onClick={() => setHours(preset.hours)}
                        className="rounded-md border border-input bg-background px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-muted"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                        language
                    </span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={cn(inputClass, 'h-[30px] py-0')}
                    >
                        <option value="">— from context —</option>
                        {LANGUAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block">
                    <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                        use24Hour
                    </span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={use24Hour}
                        onClick={() => setUse24Hour((v) => !v)}
                        className={cn(
                            'flex h-[30px] w-full items-center gap-2 rounded-md border border-input px-2.5 font-mono text-xs transition-colors',
                            use24Hour
                                ? 'border-primary/40 bg-primary/10 text-foreground'
                                : 'bg-background text-muted-foreground hover:bg-muted'
                        )}
                    >
                        <span
                            className={cn(
                                'relative h-3.5 w-6 shrink-0 rounded-full transition-colors',
                                use24Hour ? 'bg-primary' : 'bg-border'
                            )}
                        >
                            <span
                                className={cn(
                                    'absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background transition-all',
                                    use24Hour ? 'left-3' : 'left-0.5'
                                )}
                            />
                        </span>
                        {String(use24Hour)}
                    </button>
                </label>
            </div>

            <div className="border-b border-border">
                <ScheduleEditor hours={hours} onChange={setHours} language={effectiveLanguage} />
            </div>

            <div className="grid gap-4 px-4 py-3 lg:grid-cols-2">
                <section className="min-w-0">
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Result — {result.lines.length} line{result.lines.length === 1 ? '' : 's'}
                    </div>
                    {result.error ? (
                        <ResultView value={undefined} error={result.error} />
                    ) : (
                        <ul className="space-y-1" dir={rtl ? 'rtl' : 'ltr'}>
                            {result.lines.map((line) => (
                                <li
                                    key={line}
                                    className="rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-xs"
                                >
                                    {line}
                                </li>
                            ))}
                            {result.lines.length === 0 && (
                                <li className="font-mono text-xs italic text-muted-foreground">
                                    [] — nothing to show
                                </li>
                            )}
                        </ul>
                    )}
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                        Consecutive days with identical hours merge into a range; identical days
                        that are not adjacent stay on separate lines. Closed days are always
                        emitted last, whatever their position in the week.
                    </p>
                </section>

                <section className="min-w-0">
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Code
                    </div>
                    <CodeBlock code={code} />
                </section>
            </div>
        </article>
    );
}
