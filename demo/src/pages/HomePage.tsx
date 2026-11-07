/**
 * Landing page: what the toolkit is, how to start, and a card per group.
 */
import { ArrowRight, PackageCheck, Scale, Zap } from 'lucide-react';
import { API_COUNT, apiCount, PAGES, SETTINGS_ID, type DemoPage } from '../demos';
import { CodeBlock } from '../ui/CodeBlock';

interface Props {
    onPick: (id: string) => void;
}

const INSTALL = 'npm install @apx-ui/toolkit';

const QUICK_START = `import { config, formatCurrencyI18N, isEmail } from '@apx-ui/toolkit';

// once, at app startup
config({
  defaultLanguage: 'he',
  defaultRegion: 'IL',
  persist: 'localStorage'
});

// everywhere else — locale and currency come from the context
formatCurrencyI18N(1234.5);   // ‏1,234.50 ₪
isEmail('ahmad@appna.io');    // true`;

export function HomePage({ onPick }: Props) {
    const groups = PAGES.reduce<Record<string, DemoPage[]>>((acc, page) => {
        (acc[page.group] ||= []).push(page);
        return acc;
    }, {});

    return (
        <div className="space-y-10 py-8">
            <header className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                    <PackageCheck className="h-3 w-3" />
                    @apx-ui/toolkit
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Every utility in the toolkit, running live.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {API_COUNT} exports across validation, formatting, dates, i18n, payments and
                    storage — each one wired to real inputs, showing its real return value and the
                    exact call that produced it.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => onPick(SETTINGS_ID)}
                        className="flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        Configure the context
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => onPick('validators')}
                        className="rounded-md border border-input px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        Jump to validators
                    </button>
                </div>
            </header>

            <section className="grid gap-3 sm:grid-cols-3">
                <Highlight
                    icon={<Scale className="h-4 w-4" />}
                    title="Zero dependencies"
                    body="Nothing in package.json but devDependencies. The whole library is Intl and hand-written logic."
                />
                <Highlight
                    icon={<Zap className="h-4 w-4" />}
                    title="ESM and CJS"
                    body="Dual output with bundled types, so it drops into a Vite app or a Node script alike."
                />
                <Highlight
                    icon={<PackageCheck className="h-4 w-4" />}
                    title="One context"
                    body="Set language, region and currency once; every i18n helper reads from it."
                />
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <div>
                    <h2 className="mb-2 text-sm font-semibold tracking-tight">Install</h2>
                    <CodeBlock code={INSTALL} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-semibold tracking-tight">Quick start</h2>
                    <CodeBlock code={QUICK_START} />
                </div>
            </section>

            <section className="space-y-6">
                {Object.entries(groups).map(([group, pages]) => (
                    <div key={group}>
                        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {group}
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {pages.map((page) => (
                                <button
                                    key={page.id}
                                    type="button"
                                    onClick={() => onPick(page.id)}
                                    className="group rounded-lg border border-border bg-card p-4 text-left shadow-soft transition-colors hover:border-primary/40"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
                                        {page.icon}
                                    </span>
                                    <div className="mt-2.5 flex items-center gap-1.5">
                                        <span className="text-sm font-medium">{page.title}</span>
                                        {apiCount(page) > 0 && (
                                            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                                {apiCount(page)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        {page.tagline}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

function Highlight({
    icon,
    title,
    body
}: {
    icon: React.ReactNode;
    title: string;
    body: string;
}) {
    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-soft">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                {icon}
            </span>
            <h3 className="mt-2.5 text-sm font-medium">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
        </div>
    );
}
