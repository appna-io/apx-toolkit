/**
 * Navigation over the page catalog. Slides in as an overlay on mobile,
 * collapses inline on desktop. ⌘K jumps to the filter.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Github, Search, Wrench, X } from 'lucide-react';
import { apiCount, HOME, PAGES, type DemoPage } from './demos';
import { cn } from './lib/cn';

interface Props {
    open: boolean;
    onClose: () => void;
    activeId: string;
    onPick: (id: string) => void;
    version: string;
}

/** Pre-built lower-cased haystack — one `includes` per page per keystroke. */
function haystack(page: Pick<DemoPage, 'title' | 'tagline' | 'group' | 'id'>): string {
    return `${page.title} ${page.tagline} ${page.group} ${page.id}`.toLowerCase();
}

export function Sidebar({ open, onClose, activeId, onPick, version }: Props) {
    const [query, setQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const trimmed = query.trim().toLowerCase();
    const isSearching = trimmed.length > 0;

    const orderedGroups = useMemo(
        () => Array.from(new Set(PAGES.map((page) => page.group))),
        []
    );

    const filtered = useMemo(
        () => (isSearching ? PAGES.filter((page) => haystack(page).includes(trimmed)) : PAGES),
        [isSearching, trimmed]
    );

    const grouped = useMemo(
        () =>
            filtered.reduce<Record<string, DemoPage[]>>((acc, page) => {
                (acc[page.group] ||= []).push(page);
                return acc;
            }, {}),
        [filtered]
    );

    const homeMatches = !isSearching || haystack(HOME).includes(trimmed);
    const noMatches = isSearching && filtered.length === 0 && !homeMatches;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchRef.current?.focus();
                searchRef.current?.select();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
                />
            )}

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-border bg-card transition-all duration-200 md:sticky md:inset-y-auto md:top-0 md:h-screen md:self-start',
                    open
                        ? 'translate-x-0 md:w-72'
                        : '-translate-x-full md:w-0 md:overflow-hidden md:border-r-0'
                )}
            >
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
                    <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Wrench className="h-4 w-4" />
                        </span>
                        <div className="leading-tight">
                            <div className="text-sm font-semibold tracking-tight">apx toolkit</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                playground
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="shrink-0 border-b border-border px-3 py-2">
                    <label className="relative block">
                        <span className="sr-only">Search pages</span>
                        <Search
                            aria-hidden="true"
                            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            ref={searchRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape' && query) {
                                    e.preventDefault();
                                    setQuery('');
                                }
                            }}
                            placeholder="Search…"
                            spellCheck={false}
                            autoComplete="off"
                            className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-14 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {query ? (
                            <button
                                type="button"
                                aria-label="Clear search"
                                onClick={() => {
                                    setQuery('');
                                    searchRef.current?.focus();
                                }}
                                className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        ) : (
                            <kbd
                                aria-hidden="true"
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1 py-0.5 font-mono text-[9px] font-medium text-muted-foreground"
                            >
                                ⌘K
                            </kbd>
                        )}
                    </label>
                </div>

                <nav className="scrollbar-thin flex-1 overflow-y-auto px-2 py-3">
                    {homeMatches && (
                        <div className="mb-4">
                            <NavItem
                                icon={HOME.icon}
                                title={HOME.title}
                                tagline={HOME.tagline}
                                active={activeId === HOME.id}
                                onClick={() => onPick(HOME.id)}
                            />
                        </div>
                    )}

                    {noMatches && (
                        <div className="px-2 py-6 text-center">
                            <p className="text-xs text-muted-foreground">
                                Nothing matches{' '}
                                <span className="font-medium text-foreground">
                                    “{query.trim()}”
                                </span>
                            </p>
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="mt-2 text-[11px] font-medium text-primary hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}

                    {orderedGroups
                        .filter((group) => grouped[group]?.length)
                        .map((group) => (
                            <div key={group} className="mb-4">
                                <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {group}
                                </div>
                                <ul className="space-y-0.5">
                                    {grouped[group].map((page) => (
                                        <li key={page.id}>
                                            <NavItem
                                                icon={page.icon}
                                                title={page.title}
                                                tagline={page.tagline}
                                                count={apiCount(page)}
                                                active={page.id === activeId}
                                                onClick={() => onPick(page.id)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </nav>

                <div className="shrink-0 border-t border-border p-3">
                    <a
                        href="https://github.com/appna-io/apx-toolkit"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Github className="h-3.5 w-3.5" />
                        <span className="font-mono">apx-toolkit</span>
                        <span className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                            v{version}
                        </span>
                    </a>
                </div>
            </aside>
        </>
    );
}

interface NavItemProps {
    icon: React.ReactNode;
    title: string;
    tagline: string;
    count?: number;
    active: boolean;
    onClick: () => void;
}

function NavItem({ icon, title, tagline, count, active, onClick }: NavItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors',
                active
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
        >
            <span
                className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors',
                    active
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground'
                )}
            >
                {icon}
            </span>
            <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium leading-tight">{title}</span>
                    {count ? (
                        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                            {count}
                        </span>
                    ) : null}
                </span>
                <span className="block truncate text-[11px] leading-tight text-muted-foreground">
                    {tagline}
                </span>
            </span>
        </button>
    );
}
