/**
 * Type guards, object/array helpers and string case conversion.
 *
 * Arguments that are really values rather than strings (objects, arrays, the
 * `any` the guards accept) are entered as JSON and echoed verbatim into the
 * snippet, so the card shows the literal you would have typed.
 */
import {
    capitalize,
    deepClone,
    deepMerge,
    getTextDirection,
    getValueOrFallback,
    groupBy,
    isArray,
    isBoolean,
    isDefined,
    isEmpty,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isString,
    isUndefined,
    merge,
    omit,
    pick,
    randomNumber,
    randomString,
    sortBy,
    toCamelCase,
    toKebabCase,
    toNumberSafe,
    toPascalCase,
    toSnakeCase,
    truncate,
    unique
} from '@apx-ui/toolkit';
import type { ApiSpec, ArgSpec } from '../lib/api';

/** JSON-entered argument — parsed on the way in, echoed raw into the snippet. */
function jsonArg(name: string, value: string, hint?: string): ArgSpec {
    return {
        name,
        type: 'textarea',
        value,
        hint,
        span: 2,
        literal: (v) => String(v)
    };
}

/**
 * Parses a JSON field, falling back to the raw string. The fallback is what
 * makes the type-guard cards interesting — typing `hello` really does pass a
 * string, and `42` really does pass a number.
 */
function parse(value: unknown): unknown {
    try {
        return JSON.parse(String(value));
    } catch {
        return String(value);
    }
}

/** `(value: any) => boolean` — the type guards, all the same shape. */
function guard(name: string, summary: string, fn: (value: any) => boolean, sample: string): ApiSpec {
    return {
        name,
        signature: `${name}(value: any): boolean`,
        summary,
        args: [jsonArg('value', sample, 'Valid JSON is parsed; anything else is passed as a string.')],
        run: ([value]) => fn(parse(value))
    };
}

/** `(str: string) => string` — the case converters. */
function caseConverter(name: string, summary: string, fn: (str: string) => string): ApiSpec {
    return {
        name,
        signature: `${name}(str: string): string`,
        summary,
        args: [{ name: 'str', type: 'text', value: 'apx toolkit utility-belt', span: 2 }],
        run: ([str]) => fn(String(str))
    };
}

const SAMPLE_USERS = `[
  { "name": "Ahmad", "team": "platform", "score": 42 },
  { "name": "Lina", "team": "design", "score": 91 },
  { "name": "Omar", "team": "platform", "score": 67 }
]`;

export const DATA_APIS: ApiSpec[] = [
    guard('isEmpty', 'Empty string, empty array, empty object, null or undefined.', isEmpty, '""'),
    guard('isDefined', 'Narrows out null and undefined.', isDefined, 'null'),
    guard('isString', 'String type guard.', isString, '"hello"'),
    guard('isNumber', 'Number type guard.', isNumber, '42'),
    guard('isBoolean', 'Boolean type guard.', isBoolean, 'true'),
    guard('isObject', 'Plain-object type guard.', isObject, '{ "a": 1 }'),
    guard('isArray', 'Array type guard.', isArray, '[1, 2, 3]'),
    guard('isFunction', 'Function type guard.', isFunction, '"not a function"'),
    guard('isNull', 'Strictly null.', isNull, 'null'),
    guard('isUndefined', 'Strictly undefined.', isUndefined, 'undefined'),
    {
        name: 'toNumberSafe',
        signature: 'toNumberSafe(value: any, fallback = 0): number',
        summary: 'Coerces to a number, returning the fallback instead of NaN.',
        args: [
            { name: 'value', type: 'text', value: '12.5kg' },
            { name: 'fallback', type: 'number', value: 0, omitWhenDefault: true }
        ],
        run: ([value, fallback]) => toNumberSafe(value, Number(fallback))
    },
    {
        name: 'getValueOrFallback',
        signature: 'getValueOrFallback<T>(value: T | null | undefined, fallback: T): T',
        summary: 'Null-coalescing with an explicit fallback.',
        args: [
            { name: 'value', type: 'text', value: 'null', literal: (v) => String(v) },
            { name: 'fallback', type: 'text', value: 'anonymous' }
        ],
        run: ([value, fallback]) =>
            getValueOrFallback(parse(value) as string | null, String(fallback))
    },

    {
        name: 'deepClone',
        signature: 'deepClone<T>(obj: T): T',
        summary: 'Structural copy — nested objects and arrays are new references.',
        args: [jsonArg('obj', '{ "user": { "name": "Ahmad", "tags": ["a", "b"] } }')],
        run: ([obj]) => deepClone(parse(obj))
    },
    {
        name: 'merge',
        signature: 'merge<T>(...objects: Array<Partial<T>>): Partial<T>',
        summary: 'Shallow merge, left to right.',
        args: [
            jsonArg('a', '{ "theme": "dark", "layout": { "sidebar": true } }'),
            jsonArg('b', '{ "layout": { "density": "compact" } }')
        ],
        code: ([a, b]) => `merge(${a}, ${b})`,
        run: ([a, b]) =>
            merge(parse(a) as Record<string, unknown>, parse(b) as Record<string, unknown>),
        note: 'Note `layout` is replaced wholesale — compare with deepMerge below.'
    },
    {
        name: 'deepMerge',
        signature: 'deepMerge<T>(...objects: Array<Partial<T>>): Partial<T>',
        summary: 'Recursive merge — nested objects combine instead of overwriting.',
        args: [
            jsonArg('a', '{ "theme": "dark", "layout": { "sidebar": true } }'),
            jsonArg('b', '{ "layout": { "density": "compact" } }')
        ],
        code: ([a, b]) => `deepMerge(${a}, ${b})`,
        run: ([a, b]) =>
            deepMerge(parse(a) as Record<string, unknown>, parse(b) as Record<string, unknown>)
    },
    {
        name: 'pick',
        signature: 'pick<T, K>(obj: T, keys: K[]): Pick<T, K>',
        summary: 'Keeps only the listed keys.',
        args: [
            jsonArg('obj', '{ "id": 7, "name": "Ahmad", "email": "a@appna.io", "token": "secret" }'),
            jsonArg('keys', '["id", "name"]')
        ],
        code: ([obj, keys]) => `pick(${obj}, ${keys})`,
        run: ([obj, keys]) =>
            pick(parse(obj) as Record<string, unknown>, parse(keys) as never[])
    },
    {
        name: 'omit',
        signature: 'omit<T, K>(obj: T, keys: K[]): Omit<T, K>',
        summary: 'Drops the listed keys — the safer half of pick for API responses.',
        args: [
            jsonArg('obj', '{ "id": 7, "name": "Ahmad", "email": "a@appna.io", "token": "secret" }'),
            jsonArg('keys', '["token"]')
        ],
        code: ([obj, keys]) => `omit(${obj}, ${keys})`,
        run: ([obj, keys]) =>
            omit(parse(obj) as Record<string, unknown>, parse(keys) as never[])
    },

    {
        name: 'unique',
        signature: 'unique<T>(array: T[]): T[]',
        summary: 'De-duplicates by identity.',
        args: [jsonArg('array', '["a", "b", "a", "c", "b"]')],
        run: ([array]) => unique(parse(array) as unknown[])
    },
    {
        name: 'groupBy',
        signature: 'groupBy<T, K>(array: T[], key: K): Record<string, T[]>',
        summary: 'Buckets records by the value at one key.',
        args: [jsonArg('array', SAMPLE_USERS), { name: 'key', type: 'text', value: 'team', span: 2 }],
        code: ([array, key]) => `groupBy(${array}, '${key}')`,
        run: ([array, key]) => groupBy(parse(array) as never[], key as never)
    },
    {
        name: 'sortBy',
        signature: "sortBy<T, K>(array: T[], key: K, order: 'asc' | 'desc' = 'asc'): T[]",
        summary: 'Sorts by one key without mutating the input array.',
        args: [
            jsonArg('array', SAMPLE_USERS),
            { name: 'key', type: 'text', value: 'score' },
            {
                name: 'order',
                type: 'select',
                value: 'desc',
                options: [
                    { label: 'asc', value: 'asc' },
                    { label: 'desc', value: 'desc' }
                ]
            }
        ],
        code: ([array, key, order]) => `sortBy(${array}, '${key}', '${order}')`,
        run: ([array, key, order]) =>
            sortBy(parse(array) as never[], key as never, order as 'asc' | 'desc')
    },

    caseConverter('capitalize', 'Uppercases the first character only.', capitalize),
    caseConverter('toCamelCase', 'camelCase.', toCamelCase),
    caseConverter('toPascalCase', 'PascalCase.', toPascalCase),
    caseConverter('toKebabCase', 'kebab-case.', toKebabCase),
    caseConverter('toSnakeCase', 'snake_case.', toSnakeCase),
    {
        name: 'truncate',
        signature: "truncate(str: string, length: number, suffix = '...'): string",
        summary: 'Clips to a length and appends a suffix.',
        args: [
            { name: 'str', type: 'text', value: 'A modern utility SDK for frontend web applications', span: 2 },
            { name: 'length', type: 'number', value: 24 },
            { name: 'suffix', type: 'text', value: '...', omitWhenDefault: true }
        ],
        run: ([str, length, suffix]) => truncate(String(str), Number(length), String(suffix))
    },
    {
        name: 'getTextDirection',
        signature: "getTextDirection(text: string): 'ltr' | 'rtl'",
        summary: 'Infers writing direction from the characters — for `dir` on a rendered field.',
        args: [
            {
                name: 'text',
                type: 'text',
                value: 'مرحبا بالعالم',
                span: 2,
                hint: 'Try Hebrew (שלום), Arabic, or plain English.'
            }
        ],
        run: ([text]) => getTextDirection(String(text))
    },

    {
        name: 'randomString',
        signature: 'randomString(length = 8): string',
        summary: 'Alphanumeric id for keys and fixtures — not for anything security-bearing.',
        imperative: true,
        args: [{ name: 'length', type: 'number', value: 12, span: 2 }],
        run: ([length]) => randomString(Number(length))
    },
    {
        name: 'randomNumber',
        signature: 'randomNumber(min: number, max: number): number',
        summary: 'Inclusive integer in a range.',
        imperative: true,
        args: [
            { name: 'min', type: 'number', value: 1 },
            { name: 'max', type: 'number', value: 100 }
        ],
        run: ([min, max]) => randomNumber(Number(min), Number(max))
    }
];
