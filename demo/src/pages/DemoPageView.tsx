/**
 * Renders one catalog page: intro, an in-page filter, then a card per export.
 */
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { DemoPage } from '../demos';
import { cn } from '../lib/cn';
import { ApiCard } from '../ui/ApiCard';
import { inputClass } from '../ui/Field';

interface Props {
    page: DemoPage;
    onOpenSettings: () => void;
}

export function DemoPageView({ page, onOpenSettings }: Props) {
    const [query, setQuery] = useState('');
    const trimmed = query.trim().toLowerCase();

    const visible = useMemo(() => {
        if (!trimmed) {
            return page.apis;
        }
        return page.apis.filter((spec) =>
            `${spec.name} ${spec.summary} ${spec.signature}`.toLowerCase().includes(trimmed)
        );
    }, [page.apis, trimmed]);

    return (
        <div className="space-y-5">
            <header>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {page.group}
                </div>
                <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">{page.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {page.description}
                </p>
            </header>

            {page.apis.length > 4 && (
                <label className="relative block max-w-sm">
                    <span className="sr-only">Filter {page.title}</span>
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Filter ${page.apis.length} functions…`}
                        spellCheck={false}
                        className={cn(inputClass, 'h-8 pl-8 pr-8')}
                    />
                    {query && (
                        <button
                            type="button"
                            aria-label="Clear filter"
                            onClick={() => setQuery('')}
                            className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </label>
            )}

            {page.render?.()}

            <div className="space-y-4">
                {visible.map((spec) => (
                    <ApiCard key={spec.name} spec={spec} onOpenSettings={onOpenSettings} />
                ))}
            </div>

            {page.apis.length > 0 && visible.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                    Nothing on this page matches{' '}
                    <span className="font-medium text-foreground">“{query.trim()}”</span>.
                </p>
            )}
        </div>
    );
}
