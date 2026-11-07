/**
 * One argument of a playground card, rendered from its `ArgSpec`.
 * The label is the real parameter name so the field maps 1:1 onto the snippet.
 */
import { cn } from '../lib/cn';
import type { ArgSpec, ArgValue } from '../lib/api';

interface Props {
    spec: ArgSpec;
    value: ArgValue;
    onChange: (value: ArgValue) => void;
}

export const inputClass =
    'w-full rounded-md border border-input bg-background px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20';

export function Field({ spec, value, onChange }: Props) {
    return (
        <label className={cn('block min-w-0', spec.span === 2 && 'sm:col-span-2')}>
            <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                {spec.name}
            </span>
            <Control spec={spec} value={value} onChange={onChange} />
            {spec.hint && (
                <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">
                    {spec.hint}
                </span>
            )}
        </label>
    );
}

function Control({ spec, value, onChange }: Props) {
    switch (spec.type) {
        case 'boolean':
            return (
                <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(value)}
                    onClick={() => onChange(!value)}
                    className={cn(
                        'flex h-[30px] w-full items-center gap-2 rounded-md border border-input px-2.5 font-mono text-xs transition-colors',
                        value
                            ? 'border-primary/40 bg-primary/10 text-foreground'
                            : 'bg-background text-muted-foreground hover:bg-muted'
                    )}
                >
                    <span
                        className={cn(
                            'relative h-3.5 w-6 shrink-0 rounded-full transition-colors',
                            value ? 'bg-primary' : 'bg-border'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background transition-all',
                                value ? 'left-3' : 'left-0.5'
                            )}
                        />
                    </span>
                    {String(Boolean(value))}
                </button>
            );

        case 'select':
            return (
                <select
                    value={String(value)}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(inputClass, 'h-[30px] py-0')}
                >
                    {spec.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );

        case 'number':
            return (
                <input
                    type="number"
                    value={String(value)}
                    placeholder={spec.placeholder}
                    onChange={(e) =>
                        onChange(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className={inputClass}
                />
            );

        case 'textarea':
            return (
                <textarea
                    value={String(value)}
                    placeholder={spec.placeholder}
                    rows={3}
                    spellCheck={false}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(inputClass, 'scrollbar-thin resize-y leading-relaxed')}
                />
            );

        default:
            return (
                <input
                    type="text"
                    value={String(value)}
                    placeholder={spec.placeholder}
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClass}
                />
            );
    }
}
