/**
 * `debounce` and `throttle` side by side.
 *
 * Rate limiting is the one part of the toolkit a static input/output card
 * cannot show — the interesting behaviour is *when* the call lands, not what
 * it returns. So this drives both wrappers from the same event stream and
 * counts what each one lets through.
 */
import { useEffect, useMemo, useState } from 'react';
import { Zap } from 'lucide-react';
import { debounce, throttle } from '@apx-ui/toolkit';
import { CodeBlock } from './CodeBlock';
import { inputClass } from './Field';
import { cn } from '../lib/cn';

interface Counts {
    raw: number;
    debounced: number;
    throttled: number;
}

const ZERO: Counts = { raw: 0, debounced: 0, throttled: 0 };

const SNIPPET = `import { debounce, throttle } from '@apx-ui/toolkit';

// fires once, 400ms after the last call
const onSearch = debounce((term: string) => search(term), 400);

// fires immediately, then at most once per 400ms
const onScroll = throttle(() => measure(), 400);`;

export function RateLimitLab() {
    const [delay, setDelay] = useState(400);
    const [counts, setCounts] = useState<Counts>(ZERO);
    // The wrappers hold timer state internally, so a change of delay has to
    // build new ones — and that necessarily resets the tally with it.
    const wrapped = useMemo(() => {
        const bump = (key: keyof Counts) =>
            setCounts((current) => ({ ...current, [key]: current[key] + 1 }));
        return {
            debounced: debounce(() => bump('debounced'), delay),
            throttled: throttle(() => bump('throttled'), delay)
        };
    }, [delay]);

    useEffect(() => setCounts(ZERO), [delay]);

    const fire = () => {
        setCounts((current) => ({ ...current, raw: current.raw + 1 }));
        wrapped.debounced();
        wrapped.throttled();
    };

    // A machine-gun burst is the clearest demonstration: 25 calls over ~1s
    // should produce exactly one debounced call and a handful of throttled ones.
    const burst = () => {
        setCounts(ZERO);
        for (let i = 0; i < 25; i += 1) {
            window.setTimeout(fire, i * 40);
        }
    };

    const max = Math.max(counts.raw, 1);

    return (
        <article className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
            <header className="border-b border-border px-4 py-3">
                <h3 className="font-mono text-sm font-semibold tracking-tight">
                    debounce / throttle
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    debounce(fn, delay) · throttle(fn, interval)
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Both wrappers receive every event below. Debounce waits for the stream to go
                    quiet; throttle fires on the leading edge, then rations.
                </p>
            </header>

            <div className="grid gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:grid-cols-2">
                <label className="block">
                    <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                        delay
                    </span>
                    <input
                        type="number"
                        min={50}
                        step={50}
                        value={delay}
                        onChange={(e) => setDelay(Math.max(50, Number(e.target.value) || 50))}
                        className={inputClass}
                    />
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                        milliseconds — changing it rebuilds both wrappers and resets the counts.
                    </span>
                </label>

                <div className="flex items-end gap-2">
                    <button
                        type="button"
                        onClick={fire}
                        className="h-[30px] flex-1 rounded-md border border-input bg-background px-3 font-mono text-xs transition-colors hover:bg-muted active:bg-accent"
                    >
                        fire once
                    </button>
                    <button
                        type="button"
                        onClick={burst}
                        className="flex h-[30px] flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 font-mono text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <Zap className="h-3 w-3" />
                        burst ×25
                    </button>
                </div>
            </div>

            <div className="grid gap-4 px-4 py-3 lg:grid-cols-2">
                <div className="space-y-2.5">
                    <Meter label="raw calls" value={counts.raw} max={max} tone="muted" />
                    <Meter label="debounced" value={counts.debounced} max={max} tone="primary" />
                    <Meter label="throttled" value={counts.throttled} max={max} tone="success" />
                    <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
                        After a burst you should see <strong>1</strong> debounced call — it kept
                        resetting until the stream stopped — against roughly{' '}
                        <strong>burst duration ÷ delay</strong> throttled ones.
                    </p>
                </div>
                <div>
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Code
                    </div>
                    <CodeBlock code={SNIPPET} />
                </div>
            </div>
        </article>
    );
}

function Meter({
    label,
    value,
    max,
    tone
}: {
    label: string;
    value: number;
    max: number;
    tone: 'muted' | 'primary' | 'success';
}) {
    const width = Math.min(100, (value / max) * 100);
    return (
        <div>
            <div className="mb-1 flex items-baseline justify-between font-mono text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold tabular-nums text-foreground">{value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-300',
                        tone === 'primary' && 'bg-primary',
                        tone === 'success' && 'bg-success',
                        tone === 'muted' && 'bg-muted-foreground/40'
                    )}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}
