/**
 * A single exported function, live.
 *
 * Inputs on top, then the real return value and the exact call that produced
 * it side by side. Both derive from the same argument state, so the snippet is
 * never a stale approximation of what ran.
 */
import { useMemo, useState } from 'react';
import { Play, Settings2 } from 'lucide-react';
import { initialValues, renderCall, type ApiSpec, type ArgValue } from '../lib/api';
import { useSettings } from '../lib/settings';
import { CodeBlock } from './CodeBlock';
import { Field } from './Field';
import { ResultView } from './ResultView';

interface Props {
    spec: ApiSpec;
    onOpenSettings: () => void;
}

interface Outcome {
    value: unknown;
    error: Error | null;
}

function invoke(spec: ApiSpec, values: ArgValue[]): Outcome {
    try {
        return { value: spec.run(values), error: null };
    } catch (cause) {
        return {
            value: undefined,
            error: cause instanceof Error ? cause : new Error(String(cause))
        };
    }
}

export function ApiCard({ spec, onOpenSettings }: Props) {
    const { version } = useSettings();
    const [values, setValues] = useState<ArgValue[]>(() => initialValues(spec));
    // Imperative APIs (scroll, document.title, storage writes) must not fire on
    // every keystroke — they run only when the user presses Run.
    const [manualRun, setManualRun] = useState(0);

    const code = useMemo(() => renderCall(spec, values), [spec, values]);

    const outcome = useMemo<Outcome | null>(() => {
        if (spec.imperative && manualRun === 0) {
            return null;
        }
        return invoke(spec, values);
        // `version` re-runs context-aware calls when global settings change;
        // `manualRun` re-runs imperative ones on demand.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spec, values, version, manualRun]);

    const setValue = (index: number, next: ArgValue) => {
        setValues((current) => current.map((v, i) => (i === index ? next : v)));
    };

    return (
        <article
            id={spec.name}
            className="scroll-mt-20 overflow-hidden rounded-lg border border-border bg-card shadow-soft"
        >
            <header className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3">
                <div className="min-w-0">
                    <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
                        {spec.name}
                    </h3>
                    <p className="mt-1 break-words font-mono text-[11px] leading-relaxed text-muted-foreground">
                        {spec.signature}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {spec.summary}
                    </p>
                </div>
                {spec.usesContext && (
                    <button
                        type="button"
                        onClick={onOpenSettings}
                        title="This function reads the global ApxContext — change it in Settings"
                        className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-foreground transition-opacity hover:opacity-80"
                    >
                        <Settings2 className="h-3 w-3" />
                        context
                    </button>
                )}
            </header>

            {values.length > 0 && (
                <div className="grid gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:grid-cols-2">
                    {spec.args?.map((arg, i) => (
                        <Field
                            key={arg.name}
                            spec={arg}
                            value={values[i]}
                            onChange={(next) => setValue(i, next)}
                        />
                    ))}
                </div>
            )}

            <div className="grid gap-4 px-4 py-3 lg:grid-cols-2">
                <section className="min-w-0">
                    <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Result
                        </span>
                        {spec.imperative && (
                            <button
                                type="button"
                                onClick={() => setManualRun((n) => n + 1)}
                                className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                <Play className="h-2.5 w-2.5" />
                                Run
                            </button>
                        )}
                    </div>
                    <div
                        key={`${code}-${version}-${manualRun}`}
                        className="min-h-[2rem] animate-flash rounded-md"
                    >
                        {outcome ? (
                            <ResultView value={outcome.value} error={outcome.error} />
                        ) : (
                            <span className="font-mono text-xs italic text-muted-foreground">
                                press Run — this call has side effects
                            </span>
                        )}
                    </div>
                    {spec.note && (
                        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                            {spec.note}
                        </p>
                    )}
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
