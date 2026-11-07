/** Join conditional class names — the demo has no runtime deps beyond React. */
export function cn(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}
