/**
 * The toolkit composed into the page it is actually for.
 *
 * Every card elsewhere shows one function in isolation. This shows the shape a
 * real site ends up with — hero, service list, trading hours, contact block —
 * built entirely from library calls that read `ApxContext`.
 *
 * The window fills the viewport so the page reads as a site rather than as
 * another panel, and the controls float above it: language and locale write
 * straight to the global context, and the content editor changes what the page
 * renders. Both take effect on the same tick.
 */
import { useCallback, useState } from 'react';
import { Lock, RotateCw } from 'lucide-react';
import { cn } from '../lib/cn';
import { CURRENCY_OPTIONS, LANGUAGE_OPTIONS, LOCALE_OPTIONS } from '../lib/options';
import { useSettings, type LanguageCode } from '../lib/settings';
import { BRAND, DEFAULT_SITE, type SiteConfig } from '../lib/site';
import { DerivedSelect } from './DerivedSelect';
import { FloatingPanel } from './FloatingPanel';
import { inputClass } from './Field';
import { SiteEditor } from './SiteEditor';
import { SitePreview } from './SitePreview';

export function LandingShowcase() {
    const { applied, isRTL } = useSettings();
    const [site, setSite] = useState<SiteConfig>(DEFAULT_SITE);
    const [showSources, setShowSources] = useState(false);
    // Bumping this remounts the scroller, which resets it to the top — the
    // window's reload button, doing what a reload visibly does.
    const [reloadKey, setReloadKey] = useState(0);

    const patchSite = useCallback((patch: Partial<SiteConfig>) => {
        setSite((current) => ({ ...current, ...patch }));
    }, []);

    return (
        <>
            {/* The shell's header is h-14; the window takes everything below it. */}
            <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-muted/40">
                <WindowChrome
                    domain={BRAND.domain}
                    locale={applied.defaultLocale}
                    currency={applied.defaultCurrency}
                    onReload={() => setReloadKey((k) => k + 1)}
                />
                <div
                    key={reloadKey}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="scrollbar-thin flex-1 overflow-y-auto border-t border-border bg-background"
                >
                    <SitePreview site={site} showSources={showSources} />
                </div>
            </div>

            <FloatingPanel
                title="Live controls"
                badge={
                    <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground">
                        {applied.defaultLocale} · {applied.defaultCurrency}
                    </span>
                }
            >
                <ContextControls
                    showSources={showSources}
                    onToggleSources={() => setShowSources((v) => !v)}
                />
                <SiteEditor
                    site={site}
                    onChange={patchSite}
                    onReset={() => setSite(DEFAULT_SITE)}
                    language={applied.defaultLanguage}
                />
            </FloatingPanel>
        </>
    );
}

interface ContextControlsProps {
    showSources: boolean;
    onToggleSources: () => void;
}

/**
 * Locale is the source of truth; language and currency default to whatever it
 * implies and are overridden only when you pick one explicitly. All three are
 * stored in exactly one place — the global settings, same as the Settings
 * screen — so the preview always reflects the real context.
 */
function ContextControls({ showSources, onToggleSources }: ContextControlsProps) {
    const { settings, applied, update, isRTL } = useSettings();

    return (
        <div className="border-b border-border px-3 py-3">
            <label className="mb-2 block min-w-0">
                <span className="mb-1 flex items-center gap-1.5 font-mono text-[11px] font-medium text-muted-foreground">
                    locale
                    <span className="rounded bg-accent px-1 py-px text-[9px] uppercase tracking-wider text-accent-foreground">
                        source of truth
                    </span>
                    {isRTL && (
                        <span className="rounded bg-accent px-1 py-px text-[9px] uppercase tracking-wider text-accent-foreground">
                            rtl
                        </span>
                    )}
                </span>
                <select
                    value={settings.defaultLocale}
                    onChange={(e) => update({ defaultLocale: e.target.value })}
                    className={cn(inputClass, 'h-[30px] py-0')}
                >
                    {LOCALE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
                <DerivedSelect
                    label="language"
                    value={settings.defaultLanguage}
                    derived={applied.defaultLanguage}
                    options={LANGUAGE_OPTIONS}
                    onChange={(value) =>
                        update({ defaultLanguage: value as LanguageCode | undefined })
                    }
                />
                <DerivedSelect
                    label="currency"
                    value={settings.defaultCurrency}
                    derived={applied.defaultCurrency}
                    options={CURRENCY_OPTIONS}
                    onChange={(value) => update({ defaultCurrency: value })}
                />
            </div>

            <div className="mt-2.5 flex items-start justify-between gap-3">
                <p className="text-[11px] leading-tight text-muted-foreground">
                    Change the locale and both follow it. Pick one explicitly and it stops
                    following — the badge flips to <em>override</em>.
                </p>
                <button
                    type="button"
                    role="switch"
                    aria-checked={showSources}
                    onClick={onToggleSources}
                    className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] transition-colors',
                        showSources
                            ? 'border-primary/40 bg-primary/10'
                            : 'border-input text-muted-foreground hover:bg-muted'
                    )}
                >
                    <span
                        className={cn(
                            'relative h-3 w-5 shrink-0 rounded-full transition-colors',
                            showSources ? 'bg-primary' : 'bg-border'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute top-0.5 h-2 w-2 rounded-full bg-background transition-all',
                                showSources ? 'left-2.5' : 'left-0.5'
                            )}
                        />
                    </span>
                    Sources
                </button>
            </div>
        </div>
    );
}

interface ChromeProps {
    domain: string;
    locale: string;
    currency: string;
    onReload: () => void;
}

function WindowChrome({ domain, locale, currency, onReload }: ChromeProps) {
    return (
        <div className="flex shrink-0 items-center gap-3 bg-muted/70 px-3 py-2.5">
            <span className="flex shrink-0 gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>

            <button
                type="button"
                aria-label="Reload preview"
                onClick={onReload}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
                <RotateCw className="h-3 w-3" />
            </button>

            <div className="flex min-w-0 max-w-md flex-1 items-center gap-1.5 rounded-md bg-background px-2.5 py-1">
                <Lock className="h-2.5 w-2.5 shrink-0 text-success" />
                <span className="truncate font-mono text-[11px] text-muted-foreground">
                    https://{domain}
                </span>
            </div>

            <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:block">
                {locale} · {currency}
            </span>
        </div>
    );
}
