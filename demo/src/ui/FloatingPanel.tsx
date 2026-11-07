/**
 * A draggable, collapsible panel that floats above the page.
 *
 * Used for controls that need to stay reachable while the thing they drive
 * fills the viewport. It is deliberately movable: any fixed corner will cover
 * something eventually, and the answer is to let the reader shove it aside
 * rather than to guess a corner that is always free.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, GripHorizontal } from 'lucide-react';
import { cn } from '../lib/cn';

interface Props {
    title: string;
    /** Rendered next to the title, e.g. a live status badge. */
    badge?: ReactNode;
    defaultOpen?: boolean;
    children: ReactNode;
}

interface Position {
    x: number;
    y: number;
}

/** Keeps the panel's header on screen after a drag or a window resize. */
function clampToViewport({ x, y }: Position, width: number): Position {
    const maxX = Math.max(8, window.innerWidth - width - 8);
    const maxY = Math.max(8, window.innerHeight - 56);
    return {
        x: Math.min(Math.max(8, x), maxX),
        y: Math.min(Math.max(8, y), maxY)
    };
}

export function FloatingPanel({ title, badge, defaultOpen = true, children }: Props) {
    const [open, setOpen] = useState(defaultOpen);
    // `null` means "still parked in the default corner" — resolved on first drag
    // so the panel does not need a layout pass just to sit where it starts.
    const [position, setPosition] = useState<Position | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const dragOffset = useRef<Position | null>(null);

    const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
        const panel = panelRef.current;
        if (!panel) {
            return;
        }
        const rect = panel.getBoundingClientRect();
        dragOffset.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        setPosition({ x: rect.left, y: rect.top });
        event.preventDefault();
    }, []);

    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            const offset = dragOffset.current;
            const panel = panelRef.current;
            if (!offset || !panel) {
                return;
            }
            setPosition(
                clampToViewport(
                    { x: event.clientX - offset.x, y: event.clientY - offset.y },
                    panel.offsetWidth
                )
            );
        };
        const onUp = () => {
            dragOffset.current = null;
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    }, []);

    // A resize can strand a dragged panel off-screen; pull it back.
    useEffect(() => {
        const onResize = () => {
            const panel = panelRef.current;
            setPosition((current) =>
                current && panel ? clampToViewport(current, panel.offsetWidth) : current
            );
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div
            ref={panelRef}
            style={position ? { left: position.x, top: position.y } : undefined}
            className={cn(
                'fixed z-40 flex w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg',
                !position && 'bottom-4 end-4'
            )}
        >
            <div
                onPointerDown={onPointerDown}
                className="flex shrink-0 cursor-grab items-center gap-2 border-b border-border bg-muted/70 px-3 py-2 active:cursor-grabbing"
            >
                <GripHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="text-xs font-semibold tracking-tight">{title}</span>
                {badge}
                <button
                    type="button"
                    aria-label={open ? 'Collapse panel' : 'Expand panel'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="ms-auto flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                    <ChevronDown
                        className={cn('h-3.5 w-3.5 transition-transform', !open && 'rotate-180')}
                    />
                </button>
            </div>

            {open && (
                <div className="scrollbar-thin max-h-[min(34rem,calc(100vh-10rem))] overflow-y-auto">
                    {children}
                </div>
            )}
        </div>
    );
}
