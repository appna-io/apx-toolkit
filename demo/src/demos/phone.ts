/**
 * Phone number formatting.
 *
 * The format string is a template of placeholders — C country, P prefix,
 * E exchange, S subscriber — so any national convention can be expressed
 * without the library knowing about it.
 */
import { COUNTRY_CODES, formatPhoneNumber } from '@apx-ui/toolkit';
import type { ApiSpec, SelectOption } from '../lib/api';

const FORMAT_OPTIONS: SelectOption[] = [
    { label: 'PPP - EEE SSSS', value: 'PPP - EEE SSSS' },
    { label: '(PPP) - EEE SSSS', value: '(PPP) - EEE SSSS' },
    { label: '(PP)  EEE SSSS', value: '(PP)  EEE SSSS' },
    { label: 'PP-EEE SSSS', value: 'PP-EEE SSSS' },
    { label: 'PPP-EEE SSSS', value: 'PPP-EEE SSSS' },
    { label: '+C (PPP)-EEE-SSSS', value: '+C (PPP)-EEE-SSSS' },
    { label: '+C (PPP) EEESSSS', value: '+C (PPP) EEESSSS' },
    { label: 'E.164', value: 'E.164' }
];

const COUNTRY_OPTIONS: SelectOption[] = Object.entries(COUNTRY_CODES).map(([code, dial]) => ({
    label: `${code} (+${dial})`,
    value: code
}));

export const PHONE_APIS: ApiSpec[] = [
    {
        name: 'formatPhoneNumber',
        signature:
            'formatPhoneNumber(phone: string, format: string, options?: { leadingDigitPad, inputIncludesCountry, nationalNumberLength, originCountry }): string',
        summary:
            'Reshapes a number into any placeholder template, detecting the country prefix when asked to.',
        args: [
            {
                name: 'phone',
                type: 'text',
                value: '0541234567',
                hint: 'Try +972541234567 or 972541234567 too.'
            },
            { name: 'format', type: 'select', value: '+C (PPP)-EEE-SSSS', options: FORMAT_OPTIONS },
            {
                name: 'originCountry',
                type: 'select',
                value: 'IL',
                options: COUNTRY_OPTIONS,
                hint: 'Used to supply the country code when the input omits it.'
            },
            {
                name: 'inputIncludesCountry',
                type: 'select',
                value: 'autoDetect',
                options: [
                    { label: 'autoDetect', value: 'autoDetect' },
                    { label: 'true', value: 'true' },
                    { label: 'false', value: 'false' }
                ]
            },
            { name: 'nationalNumberLength', type: 'number', value: 10 },
            { name: 'leadingDigitPad', type: 'text', value: '0' }
        ],
        code: ([phone, format, originCountry, includesCountry, length, pad]) =>
            `formatPhoneNumber('${phone}', '${format}', {\n  originCountry: '${originCountry}',\n  inputIncludesCountry: ${includesCountry === 'autoDetect' ? "'autoDetect'" : includesCountry},\n  nationalNumberLength: ${length},\n  leadingDigitPad: '${pad}'\n})`,
        run: ([phone, format, originCountry, includesCountry, length, pad]) =>
            formatPhoneNumber(String(phone), String(format), {
                originCountry: originCountry as keyof typeof COUNTRY_CODES,
                inputIncludesCountry:
                    includesCountry === 'autoDetect' ? 'autoDetect' : includesCountry === 'true',
                nationalNumberLength: Number(length),
                leadingDigitPad: String(pad)
            }),
        note: 'C is the country code, P the area prefix, E the exchange, S the subscriber digits. E.164 is a named shortcut for the +CPPPEEESSSS form.'
    },
    {
        name: 'COUNTRY_CODES',
        signature: 'COUNTRY_CODES: Record<string, number>',
        summary: 'The dialling-code table `originCountry` selects from.',
        run: () => COUNTRY_CODES
    }
];
