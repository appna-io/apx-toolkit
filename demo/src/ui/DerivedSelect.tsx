/**
 * A select for a setting that defaults to whatever the locale implies.
 *
 * The empty option is not a blank value — it is `undefined`, which is how you
 * tell `config()` "I am not providing this, derive it". It shows what the
 * library resolved to, so the derived answer is visible without picking it.
 * Choosing anything else is an explicit override.
 */
import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { SelectOption } from '../lib/api';
import { inputClass } from './Field';

interface Props {
    label: string;
    /** `undefined` means the value is derived from the locale. */
    value: string | undefined;
    /** What the library actually resolved to — shown on the derive option. */
    derived: string;
    options: SelectOption[];
    onChange: (value: string | undefined) => void;
    badge?: ReactNode;
    hint?: string;
}

export function DerivedSelect({
    label,
    value,
    derived,
    options,
    onChange,
    badge,
    hint
}: Props) {
    const isDerived = value === undefined;

    return (
        <label className="block min-w-0">
            <span className="mb-1 flex items-center gap-1.5 font-mono text-[11px] font-medium text-muted-foreground">
                {label}
                {isDerived ? (
                    <span className="rounded bg-muted px-1 py-px text-[9px] uppercase tracking-wider">
                        auto
                    </span>
                ) : (
                    <span className="rounded bg-primary/15 px-1 py-px text-[9px] uppercase tracking-wider text-primary">
                        override
                    </span>
                )}
                {badge}
            </span>
            <select
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value === '' ? undefined : e.target.value)}
                className={cn(
                    inputClass,
                    'h-[30px] py-0',
                    !isDerived && 'border-primary/40'
                )}
            >
                <option value="">— from locale ({derived}) —</option>
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
