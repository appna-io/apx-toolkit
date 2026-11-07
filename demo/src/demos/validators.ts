/**
 * Regex-backed validators. Every predicate takes a single string, so the
 * whole group is generated from one small builder — only the ones with a
 * richer return shape (`ValidationResult`) or extra parameters are spelled out.
 */
import {
    hasValidFileExtension,
    isAlphanumeric,
    isCreditCard,
    isCurrency,
    isDate,
    isDomain,
    isEmail,
    isHexColor,
    isHTML,
    isIPv4,
    isNumeric,
    isPhone,
    isPostalCode,
    isSSN,
    isStrongPassword,
    isTime,
    isUsername,
    isUUID,
    isValidURL,
    REGEX,
    validateEmail,
    validatePassword,
    validatePhone,
    validateURL,
    validateWithRegex
} from '@apx-ui/toolkit';
import type { ApiSpec } from '../lib/api';

/** One-string-in, boolean-out validator — the shape most of this module has. */
function predicate(
    name: string,
    summary: string,
    fn: (value: string) => boolean,
    sample: string,
    hint?: string
): ApiSpec {
    return {
        name,
        signature: `${name}(value: string): boolean`,
        summary,
        args: [{ name: 'value', type: 'text', value: sample, hint, span: 2 }],
        run: ([value]) => fn(String(value))
    };
}

export const VALIDATOR_APIS: ApiSpec[] = [
    predicate('isEmail', 'Checks a string against the email pattern.', isEmail, 'ahmad@appna.io'),
    {
        name: 'validateEmail',
        signature: 'validateEmail(email: string): ValidationResult',
        summary: 'Same check, but returns why it failed.',
        args: [{ name: 'email', type: 'text', value: 'ahmad@appna', span: 2 }],
        run: ([email]) => validateEmail(String(email))
    },
    predicate('isPhone', 'Loose international phone check.', isPhone, '+972 54 123 4567'),
    {
        name: 'validatePhone',
        signature: 'validatePhone(phone: string): ValidationResult',
        summary: 'Phone check with an error message attached.',
        args: [{ name: 'phone', type: 'text', value: '054-123', span: 2 }],
        run: ([phone]) => validatePhone(String(phone))
    },
    predicate('isValidURL', 'Full URL validation including scheme.', isValidURL, 'https://appna.io/docs'),
    {
        name: 'validateURL',
        signature: 'validateURL(url: string): ValidationResult',
        summary: 'URL check with a reason on failure.',
        args: [{ name: 'url', type: 'text', value: 'appna.io', span: 2 }],
        run: ([url]) => validateURL(String(url))
    },
    predicate(
        'isStrongPassword',
        'Minimum length plus upper, lower, digit and symbol.',
        isStrongPassword,
        'Str0ng!Pass'
    ),
    {
        name: 'validatePassword',
        signature: 'validatePassword(password: string): ValidationResult',
        summary: 'Reports the first unmet strength requirement.',
        args: [{ name: 'password', type: 'text', value: 'password', span: 2 }],
        run: ([password]) => validatePassword(String(password))
    },
    predicate('isNumeric', 'Digits only — no sign, no separators.', isNumeric, '0421337'),
    predicate('isAlphanumeric', 'Letters and digits only.', isAlphanumeric, 'apxToolkit2026'),
    predicate('isCreditCard', 'Card-number shape (see the Payments group for Luhn).', isCreditCard, '4111111111111111'),
    predicate('isIPv4', 'Dotted-quad address.', isIPv4, '192.168.1.1'),
    predicate('isDate', 'Calendar date in YYYY-MM-DD.', isDate, '2026-08-29'),
    predicate('isTime', 'Clock time in HH:MM:SS.', isTime, '14:30:00'),
    predicate('isUUID', 'RFC 4122 UUID.', isUUID, '3f7c1c8e-9b1a-4f6d-8f2a-1b0c5d6e7f80'),
    predicate('isPostalCode', 'US ZIP or ZIP+4.', isPostalCode, '90210-1234'),
    predicate('isSSN', 'US Social Security Number.', isSSN, '123-45-6789'),
    predicate('isCurrency', 'Currency amount with optional symbol.', isCurrency, '$1,234.56'),
    predicate('isHexColor', 'Three- or six-digit hex colour.', isHexColor, '#2563eb'),
    predicate('isDomain', 'Bare domain name, no scheme.', isDomain, 'appna.io'),
    predicate('isUsername', 'Handle-safe characters and length.', isUsername, 'ahmad_igbaryya'),
    predicate(
        'hasValidFileExtension',
        'Filename ends in a known extension.',
        hasValidFileExtension,
        'invoice.pdf'
    ),
    predicate(
        'isHTML',
        'Detects markup — useful before rendering user input as HTML.',
        isHTML,
        '<p>Hello <b>world</b></p>'
    ),
    {
        name: 'validateWithRegex',
        signature: 'validateWithRegex(value: string, pattern: keyof typeof REGEX): boolean',
        summary: 'Runs any named pattern from the REGEX table against a value.',
        args: [
            { name: 'value', type: 'text', value: '#2563eb' },
            {
                name: 'pattern',
                type: 'select',
                value: 'hexColor',
                options: Object.keys(REGEX).map((key) => ({ label: key, value: key }))
            }
        ],
        run: ([value, pattern]) =>
            validateWithRegex(String(value), pattern as keyof typeof REGEX)
    }
];
