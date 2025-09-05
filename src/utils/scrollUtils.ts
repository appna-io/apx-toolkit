/**
 * Scroll behavior options for smooth scrolling
 */
export type ScrollBehavior = 'auto' | 'smooth';

/**
 * Enhanced scroll options with custom duration
 */
export interface ScrollOptions {
  behavior?: ScrollBehavior;
  duration?: number; // Duration in milliseconds
  easing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut';
  target?: Window | Element;
}

/**
 * Default scroll options
 */
const DEFAULT_SCROLL_OPTIONS: ScrollOptions = {
    behavior: 'smooth',
    duration: 500,
    easing: 'easeInOut',
    target: typeof window !== 'undefined' ? window : undefined
};

/**
 * Easing functions for smooth scrolling
 */
const EASING_FUNCTIONS = {
    linear: (t: number) => t,
    easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t)
};

/**
 * Custom smooth scroll implementation with duration control
 */
const smoothScrollTo = (
    startPosition: number,
    endPosition: number,
    duration: number,
    easing: keyof typeof EASING_FUNCTIONS,
    target: Window | Element,
    onComplete?: () => void
): void => {
    const startTime = performance.now();
    const distance = endPosition - startPosition;
  
    const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        const easedProgress = EASING_FUNCTIONS[easing](progress);
        const currentPosition = startPosition + (distance * easedProgress);
    
        if (target === window) {
            window.scrollTo(0, currentPosition);
        } else if ('scrollTop' in (target as Element)){
            (target as Element).scrollTop = currentPosition;
        }
    
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else if (onComplete) {
            onComplete();
        }
    };
  
    requestAnimationFrame(animateScroll);
};

/**
 * Scroll to top of the page with enhanced smooth scrolling
 * @param options - Scroll options including behavior, duration, and easing
 */
export const scrollToTop = (options: ScrollOptions = {}): void => {
    const { behavior, duration, easing, target } = { ...DEFAULT_SCROLL_OPTIONS, ...options };
  
    if (behavior === 'auto') {
        if (target === window) {
            window.scrollTo(0, 0);
        } else if ('scrollTop' in (target as Element)){
            (target as Element).scrollTop = 0;
        }
        return;
    }
  
    const currentPosition = getScrollPosition(target);
    smoothScrollTo(currentPosition, 0, duration!, easing!, target!, () => {
    // Ensure we end up exactly at the top
        if (target === window) {
            window.scrollTo(0, 0);
        } else if ('scrollTop' in (target as Element)){
            (target as Element).scrollTop = 0;
        }
    });
};

/**
 * Scroll to a specific element with enhanced smooth scrolling
 * @param element - Element to scroll to
 * @param options - Scroll options including behavior, duration, and easing
 * @param offset - Additional offset from the top (in pixels)
 */
export const scrollToElement = (
    element: Element,
    options: ScrollOptions = {},
    offset: number = 0
): void => {
    const { behavior, duration, easing, target } = { ...DEFAULT_SCROLL_OPTIONS, ...options };
  
    if (behavior === 'auto') {
        const elementRect = element.getBoundingClientRect();
        const targetTop = target === window ? 0 : (target as Element)?.scrollTop;
        const scrollTop = targetTop + elementRect.top - offset;
    
        if (target === window) {
            window.scrollTo(0, scrollTop);
        } else if ('scrollTop' in (target as Element)){
            (target as Element).scrollTop = scrollTop;
        }
        return;
    }
  
    const elementRect = element.getBoundingClientRect();
    const targetTop = target === window ? 0 : (target as Element)?.scrollTop;
    const endPosition = targetTop + elementRect.top - offset;
    const currentPosition = getScrollPosition(target);
  
    smoothScrollTo(currentPosition, endPosition, duration!, easing!, target!);
};

/**
 * Scroll to a specific position with enhanced smooth scrolling
 * @param position - Position to scroll to (in pixels)
 * @param options - Scroll options including behavior, duration, and easing
 */
export const scrollToPosition = (
    position: number,
    options: ScrollOptions = {}
): void => {
    const { behavior, duration, easing, target } = { ...DEFAULT_SCROLL_OPTIONS, ...options };
  
    if (behavior === 'auto') {
        if (target === window) {
            window.scrollTo(0, position);
        } else if ('scrollTop' in (target as Element)){
            (target as Element).scrollTop = position;
        }
        return;
    }
  
    const currentPosition = getScrollPosition(target);
    smoothScrollTo(currentPosition, position, duration!, easing!, target!);
};

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @param threshold - Threshold for considering element "in view" (0-1, default 0)
 * @returns True if element is in viewport
 */
export const isInViewport = (
    element: Element,
    threshold: number = 0
): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
  
    const topThreshold = threshold * windowHeight;
    const bottomThreshold = (1 - threshold) * windowHeight;
  
    return rect.top <= bottomThreshold && rect.bottom >= topThreshold;
};

/**
 * Get current scroll position
 * @param target - Target element to get scroll position from (defaults to window)
 * @returns Current scroll position in pixels
 */
export const getScrollPosition = (target: Window | Element = window): number => {
    if (target === window) {
        return window.pageYOffset || document.documentElement?.scrollTop;
    }
    return (target as Element)?.scrollTop;
};

/**
 * Stop any ongoing smooth scroll animation
 * @param target - Target element to stop scrolling (defaults to window)
 */
export const stopScroll = (target: Window | Element = window): void => {
    // This is a simple implementation - in a more complex setup you might want to track animation IDs
    if (target === window) {
        window.scrollTo(0, getScrollPosition());
    } else if ('scrollTop' in (target as Element)){
        (target as Element).scrollTop = getScrollPosition(target);
    }
};
