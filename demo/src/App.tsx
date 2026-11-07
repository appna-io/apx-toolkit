/**
 * Playground shell for `@apx-ui/toolkit`.
 *
 * The sidebar lists every page; the main pane renders the matching catalog
 * entry. The active page is mirrored into the URL hash so any card is
 * shareable, and the theme choice is persisted with the toolkit's own
 * Persister — the demo uses the library it documents wherever it reasonably can.
 */
import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Persister } from '@apx-ui/toolkit';
import pkg from '../../package/package.json';
import { HOME, HOME_ID, PAGE_BY_ID, PAGES, SETTINGS_ID } from './demos';
import { SettingsProvider, useSettings } from './lib/settings';
import { DemoPageView } from './pages/DemoPageView';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import { Sidebar } from './Sidebar';

const THEME_KEY = 'apxDemoTheme';

function readPageIdFromHash(): string {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (!raw || raw === HOME_ID) {
        return HOME_ID;
    }
    return PAGE_BY_ID[raw] ? raw : HOME_ID;
}

function readStoredTheme(): boolean {
    try {
        return Persister.getLocalStorage<boolean>(THEME_KEY) ?? false;
    } catch {
        return false;
    }
}

export function App() {
    return (
        <SettingsProvider>
            <Shell />
        </SettingsProvider>
    );
}

function Shell() {
    const { settings, applied } = useSettings();
    const [pageId, setPageId] = useState<string>(readPageIdFromHash);
    const [dark, setDark] = useState<boolean>(readStoredTheme);
    const [sidebarOpen, setSidebarOpen] = useState(() =>
        window.matchMedia('(min-width: 768px)').matches
    );
    // Set when the page change came from a hashchange (browser back/forward):
    // the URL is already correct, so no history entry should be pushed.
    const skipUrlSync = useRef(false);

    const isHome = pageId === HOME_ID;
    const page = PAGE_BY_ID[pageId] ?? PAGES[0];

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        Persister.setLocalStorage({ [THEME_KEY]: { value: dark } });
    }, [dark]);

    // The whole app is direction-aware, so an RTL language in Settings flips
    // the layout the same way it would in a consuming app.
    useEffect(() => {
        document.documentElement.lang = applied.defaultLanguage;
    }, [applied.defaultLanguage]);

    useEffect(() => {
        if (skipUrlSync.current) {
            skipUrlSync.current = false;
            return;
        }
        const target = pageId === HOME_ID ? '' : `#${pageId}`;
        if (window.location.hash === target) {
            return;
        }
        window.history.pushState(
            null,
            '',
            window.location.pathname + window.location.search + target
        );
        window.scrollTo({ top: 0 });
    }, [pageId]);

    useEffect(() => {
        const onHashChange = () => {
            skipUrlSync.current = true;
            setPageId(readPageIdFromHash());
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const pickPage = (id: string) => {
        setPageId(id);
        if (!window.matchMedia('(min-width: 768px)').matches) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen items-start bg-background text-foreground">
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeId={pageId}
                onPick={pickPage}
                version={pkg.version}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
                    <div className="flex min-w-0 items-center gap-2">
                        <button
                            type="button"
                            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
                            onClick={() => setSidebarOpen((o) => !o)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                        <div className="hidden items-center gap-2 sm:flex">
                            <span className="text-muted-foreground/40">/</span>
                            <span className="text-sm font-medium text-muted-foreground">
                                {isHome ? HOME.group : page.group}
                            </span>
                            <span className="text-muted-foreground/40">/</span>
                        </div>
                        <span className="truncate text-sm font-semibold tracking-tight">
                            {isHome ? HOME.title : page.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => pickPage(SETTINGS_ID)}
                            className="hidden rounded-md px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:block"
                            title="Current context — click to change"
                        >
                            {applied.defaultLocale} · {applied.defaultCurrency}
                        </button>
                        <button
                            type="button"
                            aria-label="Toggle theme"
                            onClick={() => setDark((d) => !d)}
                            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                    </div>
                </header>

                {page.fullBleed && !isHome ? (
                    <main className="w-full">{page.render?.()}</main>
                ) : (
                <main className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
                    {isHome ? (
                        <HomePage onPick={pickPage} />
                    ) : (
                        <div className="py-6">
                            {page.id === SETTINGS_ID ? (
                                <div className="space-y-5">
                                    <header>
                                        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                            {page.group}
                                        </div>
                                        <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">
                                            {page.title}
                                        </h2>
                                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                            {page.description}
                                        </p>
                                    </header>
                                    <SettingsPage />
                                </div>
                            ) : (
                                <DemoPageView
                                    page={page}
                                    onOpenSettings={() => pickPage(SETTINGS_ID)}
                                />
                            )}
                        </div>
                    )}
                </main>
                )}
            </div>
        </div>
    );
}
