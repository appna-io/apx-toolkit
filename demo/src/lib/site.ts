/**
 * The editable model behind the landing-page showcase.
 *
 * Deliberately narrow: it holds only the data the toolkit *formats* — service
 * durations and prices, the trading week, and the phone number. Everything the
 * library never touches (headline, address, brand copy) is fixed page content
 * in `BRAND`, so the editor stays a set of inputs to library functions rather
 * than drifting into a CMS.
 *
 * Nothing here is pre-formatted: minutes are minutes, prices are plain numbers,
 * the phone is raw digits and the week is a `StoreHours` tuple. The page turns
 * all of it into display strings at render time.
 */
import { COUNTRY_CODES, type StoreHours } from '@apx-ui/toolkit';
import { CLOSED } from './schedule';

export interface Service {
    /** Stable across renames so React keys survive editing. */
    id: string;
    name: string;
    /** Appointment length in minutes; `formatDuration` takes seconds. */
    minutes: number;
    /** A flat amount — only its formatting follows the context currency. */
    price: number;
}

export interface SiteConfig {
    services: Service[];
    hours: StoreHours;
    /** Raw digits, exactly as a booking system would store them. */
    phone: string;
    /**
     * Where the business is — not where the visitor is. A dialling code is a
     * property of the shop, so it deliberately does not follow the context.
     */
    country: keyof typeof COUNTRY_CODES;
    phoneFormat: string;
}

/** Fixed page copy. No toolkit call touches any of it, so none of it is editable. */
export const BRAND = {
    name: 'Fade & Co.',
    domain: 'fadeandco.example',
    headline: 'A sharp cut, on the clock.',
    subhead:
        'Six chairs, no queue jumping, and a barber who remembers how you like it. Book online or walk in and take your chances.',
    ctaLabel: 'Book an appointment',
    email: 'hello@fadeandco.example',
    address: '18 Herzl St, Tel Aviv'
} as const;

let nextServiceId = 0;

export function makeService(name = 'New service', minutes = 30, price = 60): Service {
    nextServiceId += 1;
    return { id: `svc-${nextServiceId}`, name, minutes, price };
}

export const PHONE_FORMATS = [
    '+C (PPP)-EEE-SSSS',
    '+C (PPP) EEESSSS',
    'E.164',
    'PPP - EEE SSSS',
    '(PPP) - EEE SSSS',
    'PPP-EEE SSSS',
    'PP-EEE SSSS'
];

export const DEFAULT_SITE: SiteConfig = {
    services: [
        makeService('Classic cut', 30, 80),
        makeService('Skin fade', 45, 110),
        makeService('Beard trim', 20, 45),
        makeService('Cut & beard', 75, 140),
        makeService('Hot towel shave', 40, 95),
        makeService('Kids cut', 25, 55)
    ],
    hours: [
        CLOSED,
        [{ open: '09:00', closed: '19:00' }],
        [{ open: '09:00', closed: '19:00' }],
        [{ open: '09:00', closed: '19:00' }],
        [{ open: '09:00', closed: '19:00' }],
        [{ open: '09:00', closed: '14:00' }],
        [{ open: '10:00', closed: '22:00' }]
    ],
    phone: '0541234567',
    country: 'IL',
    phoneFormat: '+C (PPP)-EEE-SSSS'
};
