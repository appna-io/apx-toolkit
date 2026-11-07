/**
 * The page catalog behind the sidebar.
 *
 * Most pages are just a list of `ApiSpec`s rendered by `<ApiCard />`. The two
 * exceptions carry a `render` of their own: Settings, which drives the global
 * context, and the rate-limiting lab, whose behaviour is about timing rather
 * than return values.
 */
import type { ReactNode } from 'react';
import {
    Binary,
    BookMarked,
    CalendarDays,
    Clock,
    CreditCard,
    Database,
    Globe2,
    Home,
    Languages,
    LayoutTemplate,
    MonitorSmartphone,
    Phone,
    Settings2,
    ShieldCheck,
    Timer,
    Type
} from 'lucide-react';
import type { ApiSpec } from '../lib/api';
import { LandingShowcase } from '../ui/LandingShowcase';
import { OpeningHoursLab } from '../ui/OpeningHoursLab';
import { RateLimitLab } from '../ui/RateLimitLab';
import { BROWSER_APIS } from './browser';
import { CONSTANT_APIS } from './constants';
import { CONTEXT_APIS } from './context';
import { DATA_APIS } from './data';
import { DATE_APIS } from './dates';
import { FORMATTER_APIS } from './formatters';
import { I18N_APIS } from './i18n';
import { PAYMENT_APIS } from './payments';
import { PHONE_APIS } from './phone';
import { STORAGE_APIS } from './storage';
import { VALIDATOR_APIS } from './validators';

export interface DemoPage {
    /** URL hash and sidebar key. */
    id: string;
    title: string;
    group: string;
    icon: ReactNode;
    /** One line under the title in the sidebar. */
    tagline: string;
    /** Intro paragraph at the top of the page. */
    description: string;
    apis: ApiSpec[];
    /** Replaces the API list entirely for bespoke pages. */
    render?: () => ReactNode;
    /**
     * Exports a bespoke `render` covers. They have no `ApiSpec`, so without
     * this the page would read as empty in the counts and the sidebar badge.
     */
    customApis?: string[];
    /**
     * Renders edge to edge with no page heading — for a `render` that is itself
     * the viewport, rather than content inside the reading column.
     */
    fullBleed?: boolean;
}

/** Exports a page demonstrates, however it renders them. */
export function apiCount(page: DemoPage): number {
    return page.apis.length + (page.customApis?.length ?? 0);
}

export const HOME_ID = 'home';
export const SETTINGS_ID = 'settings';

export const PAGES: DemoPage[] = [
    {
        id: 'landing',
        title: 'Landing page',
        group: 'Showcase',
        icon: <LayoutTemplate className="h-3.5 w-3.5" />,
        tagline: 'The utilities composed together',
        description:
            'A real landing page built entirely from toolkit calls — durations, prices, trading hours and a dialling-formatted phone number. Edit any of its content below and the page updates live; change the language, region or currency in Settings and the same content re-renders, right-to-left included.',
        apis: [],
        fullBleed: true,
        render: () => <LandingShowcase />
    },
    {
        id: SETTINGS_ID,
        title: 'Settings',
        group: 'Configuration',
        icon: <Settings2 className="h-3.5 w-3.5" />,
        tagline: 'Populate the global context',
        description:
            'Everything you set here is pushed into config() — the real ApxContext — and every context-aware card across the playground re-renders against it.',
        apis: []
    },
    {
        id: 'context',
        title: 'Context API',
        group: 'Configuration',
        icon: <Globe2 className="h-3.5 w-3.5" />,
        tagline: 'Read and write the context',
        description:
            'The accessors behind the Settings screen. The getters reflect the live configuration; the setters mutate it directly.',
        apis: CONTEXT_APIS
    },
    {
        id: 'validators',
        title: 'Validators',
        group: 'Validation',
        icon: <ShieldCheck className="h-3.5 w-3.5" />,
        tagline: 'Regex-backed predicates',
        description:
            'Boolean checks for the shapes a form deals with, plus validate* variants that explain the failure instead of just denying it.',
        apis: VALIDATOR_APIS
    },
    {
        id: 'formatters',
        title: 'Formatters',
        group: 'Formatting',
        icon: <Type className="h-3.5 w-3.5" />,
        tagline: 'Numbers, money, sizes, durations',
        description:
            'Display formatting with an explicit locale argument. For the versions that read the locale from the context instead, see Internationalization.',
        apis: FORMATTER_APIS
    },
    {
        id: 'i18n',
        title: 'Internationalization',
        group: 'Formatting',
        icon: <Languages className="h-3.5 w-3.5" />,
        tagline: 'Context-aware, 38 languages',
        description:
            'Leave the locale argument out and these read ApxContext. Change the language in Settings and watch every card below rewrite itself.',
        apis: I18N_APIS
    },
    {
        id: 'opening-hours',
        title: 'Opening hours',
        group: 'Formatting',
        icon: <Clock className="h-3.5 w-3.5" />,
        tagline: 'Editable weekly schedule',
        description:
            'formatOpeningHours turns a 7-day StoreHours tuple into display lines. Edit the week below — the grouping, translation and 12/24-hour handling all react live.',
        apis: [],
        customApis: ['formatOpeningHours'],
        render: () => <OpeningHoursLab />
    },
    {
        id: 'dates',
        title: 'Dates',
        group: 'Formatting',
        icon: <CalendarDays className="h-3.5 w-3.5" />,
        tagline: 'Format, compare, shift',
        description:
            'A dependency-free date layer. Nothing here mutates the Date you pass in — every helper returns a new one.',
        apis: DATE_APIS
    },
    {
        id: 'payments',
        title: 'Cards & currency',
        group: 'Domain',
        icon: <CreditCard className="h-3.5 w-3.5" />,
        tagline: 'Luhn, masking, locale → currency',
        description:
            'Card brand detection and PCI-safe display, plus the locale-to-currency table that backs the context’s auto-detection.',
        apis: PAYMENT_APIS
    },
    {
        id: 'phone',
        title: 'Phone numbers',
        group: 'Domain',
        icon: <Phone className="h-3.5 w-3.5" />,
        tagline: 'Template-driven formatting',
        description:
            'One formatter, driven by a placeholder template — so a national convention the library has never heard of is still one string away.',
        apis: PHONE_APIS
    },
    {
        id: 'data',
        title: 'Data helpers',
        group: 'Core',
        icon: <Binary className="h-3.5 w-3.5" />,
        tagline: 'Guards, objects, arrays, strings',
        description:
            'The lodash-shaped layer: type guards, deep clone and merge, pick/omit, grouping and sorting, case conversion.',
        apis: DATA_APIS
    },
    {
        id: 'rate-limiting',
        title: 'Rate limiting',
        group: 'Core',
        icon: <Timer className="h-3.5 w-3.5" />,
        tagline: 'debounce vs throttle',
        description:
            'Both wrappers fed from one event stream, so the difference in when they fire is visible rather than described.',
        apis: [],
        customApis: ['debounce', 'throttle'],
        render: () => <RateLimitLab />
    },
    {
        id: 'storage',
        title: 'Persister',
        group: 'Browser',
        icon: <Database className="h-3.5 w-3.5" />,
        tagline: 'Storage with encoding and TTL',
        description:
            'A thin layer over Web Storage adding base64 encoding and per-key expiry. These cards write to your real browser storage.',
        apis: STORAGE_APIS
    },
    {
        id: 'browser',
        title: 'Browser & scroll',
        group: 'Browser',
        icon: <MonitorSmartphone className="h-3.5 w-3.5" />,
        tagline: 'UA parsing, title, scrolling',
        description:
            'Utilities that read or drive the page itself. Run them and the effect happens here, in this tab.',
        apis: BROWSER_APIS
    },
    {
        id: 'constants',
        title: 'Constants & tables',
        group: 'Reference',
        icon: <BookMarked className="h-3.5 w-3.5" />,
        tagline: 'Countries, languages, regex',
        description:
            'The data the rest of the toolkit is built on, with the accessors that read it.',
        apis: CONSTANT_APIS
    }
];

export const PAGE_BY_ID: Record<string, DemoPage> = Object.fromEntries(
    PAGES.map((page) => [page.id, page])
);

export const HOME: Pick<DemoPage, 'id' | 'title' | 'group' | 'icon' | 'tagline'> = {
    id: HOME_ID,
    title: 'Overview',
    group: 'Getting started',
    icon: <Home className="h-3.5 w-3.5" />,
    tagline: 'What ships in the toolkit'
};

/** Total number of exports demonstrated — shown on the overview. */
export const API_COUNT = PAGES.reduce((total, page) => total + apiCount(page), 0);
