/**
 * Renders whatever a toolkit function returned.
 *
 * Scalars get a compact, type-coloured single line; structures fall back to
 * pretty-printed JSON with light token highlighting. Values the library
 * legitimately produces but JSON cannot express (Date, RegExp, undefined,
 * functions) are stringified before serialisation so nothing silently vanishes.
 */
import { cn } from '../lib/cn';

interface Props {
    value: unknown;
    /** Set when `run` threw — the message is shown as a failure instead. */
    error?: Error | null;
}

/** JSON replacer that keeps non-serialisable values visible. */
function serialisable(_key: string, value: unknown): unknown {
    if (value instanceof Date) {
        return `Date(${value.toISOString()})`;
    }
    if (value instanceof RegExp) {
        return value.toString();
    }
    if (typeof value === 'function') {
        return `ƒ ${value.name || 'anonymous'}()`;
    }
    if (typeof value === 'undefined') {
        return 'undefined';
    }
    return value;
}

export function ResultView({ value, error }: Props) {
    if (error) {
        return (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-destructive">
                    threw
                </div>
                <div className="mt-0.5 break-words font-mono text-xs text-destructive">
                    {error.message}
                </div>
            </div>
        );
    }

    if (typeof value === 'boolean') {
        return <BooleanChip value={value} />;
    }

    if (value === null || value === undefined) {
        return (
            <span className="font-mono text-xs italic text-muted-foreground">
                {String(value)}
            </span>
        );
    }

    if (typeof value === 'string') {
        return (
            <span className="whitespace-pre-wrap break-words font-mono text-sm text-foreground">
                {value === '' ? (
                    <span className="italic text-muted-foreground">'' (empty string)</span>
                ) : (
                    value
                )}
            </span>
        );
    }

    if (typeof value === 'number') {
        return (
            <span className="font-mono text-sm text-foreground">
                {Number.isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: 20 }) : String(value)}
            </span>
        );
    }

    if (value instanceof Date) {
        return (
            <div className="space-y-0.5 font-mono text-xs">
                <div className="text-foreground">{value.toISOString()}</div>
                <div className="text-muted-foreground">{value.toString()}</div>
            </div>
        );
    }

    return <JsonBlock value={value} />;
}

function BooleanChip({ value }: { value: boolean }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-medium',
                value
                    ? 'bg-success/15 text-success'
                    : 'bg-destructive/15 text-destructive'
            )}
        >
            <span
                className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    value ? 'bg-success' : 'bg-destructive'
                )}
            />
            {String(value)}
        </span>
    );
}

/**
 * Token-highlighted JSON. Splitting on the JSON grammar's own literals is
 * enough here — the input is always `JSON.stringify` output, never arbitrary
 * source, so there are no edge cases a real tokenizer would be needed for.
 */
function JsonBlock({ value }: { value: unknown }) {
    let text: string;
    try {
        text = JSON.stringify(value, serialisable, 2) ?? String(value);
    } catch {
        text = String(value);
    }

    const tokens = text.split(/("(?:\\.|[^"\\])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g);

    return (
        <pre className="scrollbar-thin max-h-72 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">
            {tokens.map((token, i) => (
                <span key={i} className={tokenClass(token)}>
                    {token}
                </span>
            ))}
        </pre>
    );
}

function tokenClass(token: string): string {
    if (!token) {
        return '';
    }
    if (token.startsWith('"')) {
        return token.trimEnd().endsWith(':')
            ? 'text-primary'
            : 'text-success';
    }
    if (token === 'true' || token === 'false' || token === 'null') {
        return 'text-warning';
    }
    if (/^-?\d/.test(token)) {
        return 'text-accent-foreground dark:text-accent-foreground';
    }
    return 'text-muted-foreground';
}
