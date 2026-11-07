/**
 * This is from dotCollab: Added generic debounce and throttle utilities
 */

/**
 * Debounce a function so it only runs after a delay since the last call.
 * Commonly used to limit expensive operations triggered by rapid events (e.g. resize, scroll, keyup).
 */
export const debounce = <TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    delay: number
): ((...args: TArgs) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: TArgs) => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

/**
 * Throttle a function so it runs at most once per interval.
 * Useful for handling high-frequency events without overwhelming the UI thread.
 */
export const throttle = <TArgs extends unknown[]>(
    fn: (...args: TArgs) => void,
    interval: number
): ((...args: TArgs) => void) => {
    let lastCallTime = 0;
    let trailingTimeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: TArgs) => {
        const now = Date.now();
        const timeSinceLastCall = now - lastCallTime;

        if (timeSinceLastCall >= interval) {
            lastCallTime = now;
            fn(...args);
        } else {
            if (trailingTimeoutId !== undefined) {
                clearTimeout(trailingTimeoutId);
            }

            const remaining = interval - timeSinceLastCall;
            trailingTimeoutId = setTimeout(() => {
                lastCallTime = Date.now();
                fn(...args);
            }, remaining);
        }
    };
};


