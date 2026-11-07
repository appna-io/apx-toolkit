/**
 * Browser-only utilities. These read or mutate the real page, so most are
 * marked `imperative` — the card gives you a Run button instead of firing on
 * every keystroke. Scroll the page and re-run to watch the numbers move.
 */
import {
    detectBrowser,
    getBrowserTitle,
    getScrollPosition,
    isInViewport,
    resetBrowserTitleStorage,
    restoreBrowserTitle,
    scrollToPosition,
    scrollToTop,
    setBrowserTitle,
    setBrowserTitlePrefix,
    setBrowserTitleSuffix,
    stopScroll
} from '@apx-ui/toolkit';
import type { ApiSpec } from '../lib/api';

const EASING_OPTIONS = [
    { label: 'easeInOut', value: 'easeInOut' },
    { label: 'linear', value: 'linear' },
    { label: 'easeIn', value: 'easeIn' },
    { label: 'easeOut', value: 'easeOut' }
];

/** Confirms an imperative call ran, since these return `void`. */
function acknowledged(message: string): string {
    return message;
}

export const BROWSER_APIS: ApiSpec[] = [
    {
        name: 'detectBrowser',
        signature: 'detectBrowser(): BrowserInfo',
        summary: 'Parses the current user agent — engine, version, platform, mobile flags.',
        run: () => detectBrowser(),
        note: 'This is your actual browser, read live from navigator.'
    },

    {
        name: 'getScrollPosition',
        signature: 'getScrollPosition(target: Window | Element = window): number',
        summary: 'Current vertical scroll offset in pixels.',
        imperative: true,
        run: () => getScrollPosition(),
        note: 'Scroll the page, then press Run again.'
    },
    {
        name: 'scrollToPosition',
        signature: 'scrollToPosition(position: number, options?: ScrollOptions): void',
        summary: 'Animates the page to an absolute offset with your own easing and duration.',
        imperative: true,
        args: [
            { name: 'position', type: 'number', value: 0 },
            { name: 'duration', type: 'number', value: 600 },
            { name: 'easing', type: 'select', value: 'easeInOut', options: EASING_OPTIONS },
            {
                name: 'behavior',
                type: 'select',
                value: 'smooth',
                options: [
                    { label: 'smooth', value: 'smooth' },
                    { label: 'auto (jump)', value: 'auto' }
                ]
            }
        ],
        code: ([position, duration, easing, behavior]) =>
            `scrollToPosition(${position}, {\n  behavior: '${behavior}',\n  duration: ${duration},\n  easing: '${easing}'\n})`,
        run: ([position, duration, easing, behavior]) => {
            scrollToPosition(Number(position), {
                behavior: behavior as 'auto' | 'smooth',
                duration: Number(duration),
                easing: easing as 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'
            });
            return acknowledged(`scrolling to ${position}px`);
        }
    },
    {
        name: 'scrollToTop',
        signature: 'scrollToTop(options?: ScrollOptions): void',
        summary: 'The common case, with the same easing controls.',
        imperative: true,
        args: [
            { name: 'duration', type: 'number', value: 500 },
            { name: 'easing', type: 'select', value: 'easeOut', options: EASING_OPTIONS }
        ],
        code: ([duration, easing]) =>
            `scrollToTop({ duration: ${duration}, easing: '${easing}' })`,
        run: ([duration, easing]) => {
            scrollToTop({
                duration: Number(duration),
                easing: easing as 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'
            });
            return acknowledged('scrolling to top');
        }
    },
    {
        name: 'stopScroll',
        signature: 'stopScroll(target: Window | Element = window): void',
        summary: 'Pins the page where it is, cancelling an in-flight animation.',
        imperative: true,
        run: () => {
            stopScroll();
            return acknowledged('scroll halted');
        },
        note: 'Start a long scroll above, then hit Run here mid-flight.'
    },
    {
        name: 'isInViewport',
        signature: 'isInViewport(element: Element, threshold = 0): boolean',
        summary: 'Whether an element intersects the viewport, with an optional margin.',
        imperative: true,
        args: [
            {
                name: 'selector',
                type: 'text',
                value: '#detectBrowser',
                hint: 'Any CSS selector on this page — card ids are the function names.'
            },
            { name: 'threshold', type: 'number', value: 0 }
        ],
        code: ([selector, threshold]) =>
            `const el = document.querySelector('${selector}');\nisInViewport(el, ${threshold})`,
        run: ([selector, threshold]) => {
            const element = document.querySelector(String(selector));
            if (!element) {
                throw new Error(`No element matches ${selector}`);
            }
            return isInViewport(element, Number(threshold));
        }
    },

    {
        name: 'getBrowserTitle',
        signature: 'getBrowserTitle(): string',
        summary: 'Reads document.title.',
        imperative: true,
        run: () => getBrowserTitle()
    },
    {
        name: 'setBrowserTitle',
        signature: 'setBrowserTitle(title: string, saveOriginal = true): void',
        summary: 'Replaces the tab title, stashing the original so it can be restored.',
        imperative: true,
        args: [
            { name: 'title', type: 'text', value: '(1) New message' },
            { name: 'saveOriginal', type: 'boolean', value: true, omitWhenDefault: true }
        ],
        run: ([title, saveOriginal]) => {
            setBrowserTitle(String(title), Boolean(saveOriginal));
            return acknowledged(document.title);
        },
        note: 'Watch the browser tab, not just this card.'
    },
    {
        name: 'setBrowserTitlePrefix',
        signature: 'setBrowserTitlePrefix(prefix: string): void',
        summary: 'Prepends to the current title — unread counters, environment tags.',
        imperative: true,
        args: [{ name: 'prefix', type: 'text', value: '● ', span: 2 }],
        run: ([prefix]) => {
            setBrowserTitlePrefix(String(prefix));
            return acknowledged(document.title);
        }
    },
    {
        name: 'setBrowserTitleSuffix',
        signature: 'setBrowserTitleSuffix(suffix: string): void',
        summary: 'Appends to the current title.',
        imperative: true,
        args: [{ name: 'suffix', type: 'text', value: ' · AppNA', span: 2 }],
        run: ([suffix]) => {
            setBrowserTitleSuffix(String(suffix));
            return acknowledged(document.title);
        }
    },
    {
        name: 'restoreBrowserTitle',
        signature: 'restoreBrowserTitle(): void',
        summary: 'Puts back whatever the title was before the first setBrowserTitle call.',
        imperative: true,
        run: () => {
            restoreBrowserTitle();
            return acknowledged(document.title);
        }
    },
    {
        name: 'resetBrowserTitleStorage',
        signature: 'resetBrowserTitleStorage(): void',
        summary: 'Forgets the saved original, so the next setBrowserTitle starts fresh.',
        imperative: true,
        run: () => {
            resetBrowserTitleStorage();
            return acknowledged('saved title cleared');
        }
    }
];
