/**
 * The landing page itself — the only thing inside the browser window.
 *
 * Nothing here holds a pre-formatted string. Every duration, price, opening
 * line and phone number is produced by a toolkit call at render time, so the
 * page follows `ApxContext` without a single locale branch of its own.
 */
import { Clock3, Mail, MapPin, Phone, Scissors } from 'lucide-react';
import {
    formatCurrencyI18N,
    formatDuration,
    formatOpeningHours,
    formatPhoneNumber
} from '@apx-ui/toolkit';
import { BRAND, type Service, type SiteConfig } from '../lib/site';

interface Props {
    site: SiteConfig;
    /** Annotates each rendered value with the call that produced it. */
    showSources: boolean;
}

/** Caption naming the call behind the value above it. */
function Source({ show, call }: { show: boolean; call: string }) {
    if (!show) {
        return null;
    }
    return (
        <span className="mt-0.5 block break-all font-mono text-[10px] leading-tight text-primary/70">
            {call}
        </span>
    );
}

export function SitePreview({ site, showSources }: Props) {
    const phone = formatPhoneNumber(site.phone, site.phoneFormat, {
        originCountry: site.country
    });
    const hours = formatOpeningHours(site.hours);

    return (
        <div className="bg-background">
            <SiteNav />
            <Hero site={site} phone={phone} showSources={showSources} />
            <Services services={site.services} showSources={showSources} />
            <Hours lines={hours} showSources={showSources} />
            <Contact site={site} phone={phone} showSources={showSources} />
            <SiteFooter />
        </div>
    );
}

function SiteNav() {
    return (
        <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-6 py-3 backdrop-blur">
            <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Scissors className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold tracking-tight">{BRAND.name}</span>
            </div>
            <div className="hidden items-center gap-5 text-xs text-muted-foreground sm:flex">
                <span>Services</span>
                <span>Hours</span>
                <span>Contact</span>
            </div>
            <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                Book
            </span>
        </nav>
    );
}

interface HeroProps {
    site: SiteConfig;
    phone: string;
    showSources: boolean;
}

function Hero({ site, phone, showSources }: HeroProps) {
    const prices = site.services.map((service) => service.price);
    const minutes = site.services.map((service) => service.minutes);
    const cheapest = prices.length > 0 ? Math.min(...prices) : 0;
    const shortest = minutes.length > 0 ? Math.min(...minutes) : 0;
    const longest = minutes.length > 0 ? Math.max(...minutes) : 0;

    return (
        <header className="border-b border-border bg-gradient-to-b from-accent/70 via-accent/20 to-transparent px-6 py-14">
            <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {BRAND.headline}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {BRAND.subhead}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                    {BRAND.ctaLabel}
                </span>
                <span className="flex items-center gap-1.5 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium">
                    <Phone className="h-3.5 w-3.5" />
                    {phone}
                </span>
            </div>

            {site.services.length > 0 && (
                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    <Stat label="services" value={String(site.services.length)} />
                    <Stat
                        label="from"
                        value={formatCurrencyI18N(cheapest)}
                        source={showSources ? `formatCurrencyI18N(${cheapest})` : undefined}
                    />
                    <Stat
                        label="appointments"
                        value={`${formatDuration(shortest * 60)} – ${formatDuration(longest * 60)}`}
                        source={
                            showSources
                                ? `formatDuration(${shortest * 60}) … formatDuration(${longest * 60})`
                                : undefined
                        }
                    />
                </dl>
            )}
        </header>
    );
}

function Stat({ label, value, source }: { label: string; value: string; source?: string }) {
    return (
        <div>
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-lg font-semibold tabular-nums">{value}</dd>
            {source && <Source show call={source} />}
        </div>
    );
}

function Services({ services, showSources }: { services: Service[]; showSources: boolean }) {
    return (
        <section className="border-b border-border px-6 py-10">
            <SectionHeading title="Services" caption="Prices include VAT. Walk-ins subject to availability." />

            {services.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted-foreground">
                    No services yet — add one in the Live controls panel.
                </p>
            ) : (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {services.map((service) => (
                        <li
                            key={service.id}
                            className="flex items-start justify-between gap-3 rounded-lg border border-border px-4 py-3.5"
                        >
                            <div className="min-w-0">
                                <div className="text-sm font-medium">{service.name}</div>
                                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Clock3 className="h-3 w-3 shrink-0" />
                                    {formatDuration(service.minutes * 60)}
                                </div>
                                <Source
                                    show={showSources}
                                    call={`formatDuration(${service.minutes * 60})`}
                                />
                            </div>
                            <div className="shrink-0 text-end">
                                <div className="text-sm font-semibold tabular-nums">
                                    {formatCurrencyI18N(service.price)}
                                </div>
                                <Source
                                    show={showSources}
                                    call={`formatCurrencyI18N(${service.price})`}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function Hours({ lines, showSources }: { lines: string[]; showSources: boolean }) {
    return (
        <section className="border-b border-border px-6 py-10">
            <SectionHeading title="Opening hours" caption="Last appointment 30 minutes before close." />
            <ul className="mt-5 max-w-md">
                {lines.map((line) => (
                    <li
                        key={line}
                        className="border-b border-border/60 py-2 text-sm last:border-0"
                    >
                        {line}
                    </li>
                ))}
            </ul>
            <Source show={showSources} call="formatOpeningHours(storeHours)" />
        </section>
    );
}

interface ContactProps {
    site: SiteConfig;
    phone: string;
    showSources: boolean;
}

function Contact({ site, phone, showSources }: ContactProps) {
    return (
        <section className="border-b border-border px-6 py-10">
            <SectionHeading title="Contact us" caption="We answer during opening hours." />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <ContactCard icon={<Phone className="h-3.5 w-3.5" />} value={phone}>
                    <Source
                        show={showSources}
                        call={`formatPhoneNumber('${site.phone}', '${site.phoneFormat}', { originCountry: '${site.country}' })`}
                    />
                </ContactCard>
                <ContactCard icon={<Mail className="h-3.5 w-3.5" />} value={BRAND.email} />
                <ContactCard icon={<MapPin className="h-3.5 w-3.5" />} value={BRAND.address} />
            </div>
        </section>
    );
}

function ContactCard({
    icon,
    value,
    children
}: {
    icon: React.ReactNode;
    value: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-border px-4 py-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
                {icon}
            </span>
            <div className="mt-2 break-words text-sm font-medium">{value}</div>
            {children}
        </div>
    );
}

function SiteFooter() {
    return (
        <footer className="px-6 py-6 text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.domain}
        </footer>
    );
}

function SectionHeading({ title, caption }: { title: string; caption: string }) {
    return (
        <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{caption}</p>
        </div>
    );
}
