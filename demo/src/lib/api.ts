/**
 * Declarative model behind every playground card.
 *
 * A demo page is just a list of `ApiSpec`s. Each spec owns its inputs, calls
 * the real exported function, and the card derives both the live result and
 * the code snippet from the same argument values — so what you read is exactly
 * what ran.
 */
import type { ReactNode } from 'react';

export type ArgValue = string | number | boolean;

export type ArgType = 'text' | 'textarea' | 'number' | 'select' | 'boolean';

export interface SelectOption {
    label: string;
    value: string;
}

export interface ArgSpec {
    /** Parameter name, shown as the field label and used in the snippet. */
    name: string;
    type: ArgType;
    /** Initial value. Also the baseline for `omitWhenDefault`. */
    value: ArgValue;
    /** Options for `type: 'select'`. */
    options?: SelectOption[];
    placeholder?: string;
    /** Short helper line under the field. */
    hint?: string;
    /**
     * Render this argument in the snippet as raw source instead of a JSON
     * literal — for values that are really expressions (`new Date(...)`,
     * an enum member, an object literal built from the field).
     */
    literal?: (value: ArgValue) => string;
    /**
     * Trailing optional parameter: dropped from the generated snippet while it
     * still holds `value`, so the code reads like the call you'd actually write.
     */
    omitWhenDefault?: boolean;
    /** Field width inside the card's input grid. */
    span?: 1 | 2;
}

export interface ApiSpec {
    /** Exported symbol name — doubles as the card's anchor id. */
    name: string;
    /** Full TypeScript signature, shown under the name. */
    signature: string;
    /** One line on what it does. */
    summary: string;
    args?: ArgSpec[];
    /** Calls the real toolkit export. Throwing renders the error in the card. */
    run: (args: ArgValue[]) => unknown;
    /**
     * Replaces the auto-generated snippet for calls that aren't a plain
     * function application (class statics, multi-step flows, side effects).
     */
    code?: (args: ArgValue[]) => string;
    /** Extra explanation rendered under the result. */
    note?: ReactNode;
    /**
     * Marks the API as reading `ApxContext`, so the card shows a badge linking
     * to Settings and re-runs whenever the global config changes.
     */
    usesContext?: boolean;
    /**
     * The call mutates the page or storage rather than returning a value, so
     * the card renders a "Run" button instead of computing on every keystroke.
     */
    imperative?: boolean;
}

/** Source-literal form of a single argument value. */
function literalOf(spec: ArgSpec, value: ArgValue): string {
    if (spec.literal) {
        return spec.literal(value);
    }
    if (typeof value === 'string') {
        return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
    }
    return String(value);
}

/**
 * Build the call snippet from the live argument values, dropping trailing
 * optional arguments that are still at their default.
 */
export function renderCall(spec: ApiSpec, values: ArgValue[]): string {
    if (spec.code) {
        return spec.code(values);
    }

    const args = spec.args ?? [];
    let last = args.length - 1;
    while (last >= 0 && args[last].omitWhenDefault && values[last] === args[last].value) {
        last -= 1;
    }

    const rendered = args.slice(0, last + 1).map((arg, i) => literalOf(arg, values[i]));
    return `${spec.name}(${rendered.join(', ')})`;
}

/** Initial value array for a spec, in declaration order. */
export function initialValues(spec: ApiSpec): ArgValue[] {
    return (spec.args ?? []).map((arg) => arg.value);
}
