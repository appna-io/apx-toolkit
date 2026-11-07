/**
 * Editor for the inputs the toolkit formats — nothing else.
 *
 * Three tabs, one per library call the page makes: service durations and
 * prices (`formatDuration`, `formatCurrencyI18N`), the trading week
 * (`formatOpeningHours`), and the phone number (`formatPhoneNumber`). Every
 * field writes straight into the `SiteConfig`, and the preview re-renders on
 * the same tick — there is no apply step.
 */
import { useState, type ReactNode } from 'react';
import { Plus, RotateCcw, Trash2 } from 'lucide-react';
import { COUNTRY_CODES, type StoreHours } from '@apx-ui/toolkit';
import { cn } from '../lib/cn';
import { SCHEDULE_PRESETS } from '../lib/schedule';
import { makeService, PHONE_FORMATS, type Service, type SiteConfig } from '../lib/site';
import { inputClass } from './Field';
import { ScheduleEditor } from './ScheduleEditor';

interface Props {
    site: SiteConfig;
    onChange: (patch: Partial<SiteConfig>) => void;
    onReset: () => void;
    /** Language for the schedule editor's day labels. */
    language: string;
}

const TABS = ['Services', 'Hours', 'Phone'] as const;
type Tab = (typeof TABS)[number];

export function SiteEditor({ site, onChange, onReset, language }: Props) {
    const [tab, setTab] = useState<Tab>('Services');

    // No card chrome of its own — it is rendered inside the floating panel,
    // which already provides the surface.
    return (
        <section>
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
                <div className="flex flex-wrap gap-1">
                    {TABS.map((name) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setTab(name)}
                            className={cn(
                                'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                                tab === name
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                </button>
            </header>

            {tab === 'Services' && <ServicesTab site={site} onChange={onChange} />}
            {tab === 'Hours' && <HoursTab site={site} onChange={onChange} language={language} />}
            {tab === 'Phone' && <PhoneTab site={site} onChange={onChange} />}
        </section>
    );
}

type TabProps = Pick<Props, 'site' | 'onChange'>;

function ServicesTab({ site, onChange }: TabProps) {
    const update = (id: string, patch: Partial<Service>) => {
        onChange({
            services: site.services.map((service) =>
                service.id === id ? { ...service, ...patch } : service
            )
        });
    };

    return (
        <div className="px-3 py-3">
            <div className="mb-1.5 grid grid-cols-[1fr_4.5rem_4.5rem_1.75rem] gap-2 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>name</span>
                <span>minutes</span>
                <span>price</span>
                <span />
            </div>

            <ul className="space-y-1.5">
                {site.services.map((service) => (
                    <li
                        key={service.id}
                        className="grid grid-cols-[1fr_4.5rem_4.5rem_1.75rem] gap-2"
                    >
                        <input
                            value={service.name}
                            onChange={(e) => update(service.id, { name: e.target.value })}
                            className={inputClass}
                        />
                        <input
                            type="number"
                            min={0}
                            value={service.minutes}
                            onChange={(e) =>
                                update(service.id, { minutes: Number(e.target.value) || 0 })
                            }
                            className={inputClass}
                        />
                        <input
                            type="number"
                            min={0}
                            value={service.price}
                            onChange={(e) =>
                                update(service.id, { price: Number(e.target.value) || 0 })
                            }
                            className={inputClass}
                        />
                        <button
                            type="button"
                            aria-label={`Remove ${service.name}`}
                            onClick={() =>
                                onChange({
                                    services: site.services.filter((s) => s.id !== service.id)
                                })
                            }
                            className="flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={() => onChange({ services: [...site.services, makeService()] })}
                className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-input px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
                <Plus className="h-3 w-3" />
                Add service
            </button>

            <Hint>
                Minutes go through <Code>formatDuration(minutes * 60)</Code> — push one past 60 to
                see it switch to <Code>1h 15m</Code>. Prices go through{' '}
                <Code>formatCurrencyI18N</Code>, which reads the currency from the context above.
            </Hint>
        </div>
    );
}

function HoursTab({ site, onChange, language }: TabProps & { language: string }) {
    return (
        <div>
            <div className="flex flex-wrap gap-1.5 border-b border-border bg-muted/30 px-3 py-2.5">
                {SCHEDULE_PRESETS.map((preset) => (
                    <button
                        key={preset.label}
                        type="button"
                        title={preset.hint}
                        onClick={() => onChange({ hours: preset.hours })}
                        className="rounded-md border border-input bg-background px-2 py-1 text-[11px] font-medium transition-colors hover:bg-muted"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
            <ScheduleEditor
                hours={site.hours}
                onChange={(hours: StoreHours) => onChange({ hours })}
                language={language}
            />
            <div className="px-3 pb-3">
                <Hint>
                    Consecutive days with identical hours merge into one range; matching days that
                    are not adjacent stay separate. Closed days always sort last.
                </Hint>
            </div>
        </div>
    );
}

function PhoneTab({ site, onChange }: TabProps) {
    return (
        <div className="px-3 py-3">
            <div className="grid gap-2 sm:grid-cols-2">
                <Field label="phone" hint="Raw digits, unformatted.">
                    <input
                        value={site.phone}
                        onChange={(e) => onChange({ phone: e.target.value })}
                        className={inputClass}
                    />
                </Field>
                <Field label="originCountry" hint="Supplies the dialling code.">
                    <select
                        value={site.country}
                        onChange={(e) =>
                            onChange({ country: e.target.value as keyof typeof COUNTRY_CODES })
                        }
                        className={cn(inputClass, 'h-[30px] py-0')}
                    >
                        {Object.entries(COUNTRY_CODES).map(([code, dial]) => (
                            <option key={code} value={code}>
                                {code} (+{dial})
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="format" span>
                    <select
                        value={site.phoneFormat}
                        onChange={(e) => onChange({ phoneFormat: e.target.value })}
                        className={cn(inputClass, 'h-[30px] py-0')}
                    >
                        {PHONE_FORMATS.map((format) => (
                            <option key={format} value={format}>
                                {format}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Hint>
                <Code>C</Code> is the country code, <Code>P</Code> the area prefix, <Code>E</Code>{' '}
                the exchange and <Code>S</Code> the subscriber digits. The number ignores the
                context on purpose — a dialling code belongs to the business, not the visitor.
            </Hint>
        </div>
    );
}

function Hint({ children }: { children: ReactNode }) {
    return (
        <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">{children}</p>
    );
}

function Code({ children }: { children: ReactNode }) {
    return <code className="font-mono text-[10px] text-foreground">{children}</code>;
}

interface FieldProps {
    label: string;
    hint?: string;
    span?: boolean;
    children: ReactNode;
}

function Field({ label, hint, span, children }: FieldProps) {
    return (
        <label className={cn('block min-w-0', span && 'sm:col-span-2')}>
            <span className="mb-1 block font-mono text-[11px] font-medium text-muted-foreground">
                {label}
            </span>
            {children}
            {hint && (
                <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">
                    {hint}
                </span>
            )}
        </label>
    );
}
