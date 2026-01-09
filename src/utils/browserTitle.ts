/**
 * This is from dotCollab: Added browser title utility to dynamically change and restore document title
 */

/**
 * Check if we're in a browser environment (document exists)
 */
const isBrowser = (): boolean => {
    return typeof document !== 'undefined';
};

/**
 * Store the original title for restoration
 */
let originalTitle: string | null = null;

/**
 * Get the current browser document title
 * 
 * @returns The current document title, or empty string if not in browser environment
 * 
 * @example
 * ```ts
 * const currentTitle = getBrowserTitle();
 * console.log(currentTitle); // "My Page Title"
 * ```
 */
export const getBrowserTitle = (): string => {
    if (!isBrowser()) return '';
    return document.title || '';
};

/**
 * Set the browser document title
 * 
 * @param title - The new title to set
 * @param saveOriginal - Whether to save the current title for later restoration (default: true)
 * 
 * @example
 * ```ts
 * setBrowserTitle('New Page Title');
 * setBrowserTitle('Dashboard', false); // Don't save original
 * ```
 */
export const setBrowserTitle = (title: string, saveOriginal: boolean = true): void => {
    if (!isBrowser()) return;
    
    // Save original title on first call if not already saved
    if (saveOriginal && originalTitle === null) {
        originalTitle = document.title || '';
    }
    
    document.title = title || '';
};

/**
 * Restore the browser title to its original value
 * 
 * @example
 * ```ts
 * setBrowserTitle('Temporary Title');
 * // ... do something
 * restoreBrowserTitle(); // Restores to original
 * ```
 */
export const restoreBrowserTitle = (): void => {
    if (!isBrowser() || originalTitle === null) return;
    
    document.title = originalTitle;
    originalTitle = null;
};

/**
 * Update the browser title with a prefix
 * 
 * @param prefix - The prefix to add before the current title
 * 
 * @example
 * ```ts
 * // Current title: "Dashboard"
 * setBrowserTitlePrefix('🔔 ');
 * // New title: "🔔 Dashboard"
 * ```
 */
export const setBrowserTitlePrefix = (prefix: string): void => {
    if (!isBrowser()) return;
    
    if (originalTitle === null) {
        originalTitle = document.title || '';
    }
    
    const currentTitle = document.title || '';
    document.title = prefix + currentTitle;
};

/**
 * Update the browser title with a suffix
 * 
 * @param suffix - The suffix to add after the current title
 * 
 * @example
 * ```ts
 * // Current title: "Dashboard"
 * setBrowserTitleSuffix(' - My App');
 * // New title: "Dashboard - My App"
 * ```
 */
export const setBrowserTitleSuffix = (suffix: string): void => {
    if (!isBrowser()) return;
    
    if (originalTitle === null) {
        originalTitle = document.title || '';
    }
    
    const currentTitle = document.title || '';
    document.title = currentTitle + suffix;
};

/**
 * Reset the original title storage (useful for cleanup)
 * 
 * @example
 * ```ts
 * resetBrowserTitleStorage();
 * ```
 */
export const resetBrowserTitleStorage = (): void => {
    originalTitle = null;
};

