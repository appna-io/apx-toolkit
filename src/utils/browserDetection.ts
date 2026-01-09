/**
 * This is from dotCollab: Added browser detection utility to detect browser type, version, and mobile status
 */

/**
 * Browser detection result
 */
export interface BrowserInfo {
    /** Browser name (e.g., 'Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'unknown') */
    name: string;
    /** Browser version number (e.g., '120.0.0') */
    version: string;
    /** Whether the browser is running on a mobile device */
    isMobile: boolean;
}

/**
 * Extended Navigator interface for userAgentData (modern browsers)
 */
interface NavigatorWithUserAgentData extends Navigator {
    userAgentData?: {
        brand: string;
        version: string;
        mobile: boolean;
        platform: string;
    };
}

/**
 * Detect if the current environment is mobile based on user agent
 */
const isMobileDevice = (userAgent: string): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

/**
 * Extract version number from user agent string
 */
const extractVersion = (userAgent: string, browserName: string): string => {
    const patterns: Record<string, RegExp> = {
        Chrome: /Chrome\/([\d.]+)/,
        Firefox: /Firefox\/([\d.]+)/,
        Safari: /Version\/([\d.]+)/,
        Edge: /Edg(?:e|A|iOS)?\/([\d.]+)/,
        Opera: /(?:OPR|Opera)\/([\d.]+)/,
    };

    const pattern = patterns[browserName];
    if (!pattern) return '';

    const match = userAgent.match(pattern);
    return match ? match[1] : '';
};

/**
 * Detect browser using modern userAgentData API (Chrome 89+)
 */
const detectFromUserAgentData = (): BrowserInfo | null => {
    if (typeof navigator === 'undefined') return null;

    const nav = navigator as NavigatorWithUserAgentData;
    if (!nav.userAgentData) return null;

    const { brand, version, mobile } = nav.userAgentData;
    
    // Map brand names to standard browser names
    const brandMap: Record<string, string> = {
        'Google Chrome': 'Chrome',
        'Microsoft Edge': 'Edge',
        'Opera': 'Opera',
        'Chromium': 'Chrome',
    };

    const browserName = brandMap[brand] || brand || 'unknown';
    
    return {
        name: browserName,
        version: version || '',
        isMobile: mobile || false,
    };
};

/**
 * Detect browser using userAgent string (fallback for older browsers)
 */
const detectFromUserAgent = (): BrowserInfo => {
    if (typeof navigator === 'undefined') {
        return {
            name: 'unknown',
            version: '',
            isMobile: false,
        };
    }

    const userAgent = navigator.userAgent;
    const isMobile = isMobileDevice(userAgent);

    // Edge detection (must come before Chrome since Edge contains "Chrome" in UA)
    if (/Edg(?:e|A|iOS)?\//i.test(userAgent)) {
        return {
            name: 'Edge',
            version: extractVersion(userAgent, 'Edge'),
            isMobile,
        };
    }

    // Opera detection (must come before Chrome since Opera contains "Chrome" in UA)
    if (/OPR\/|Opera\//i.test(userAgent)) {
        return {
            name: 'Opera',
            version: extractVersion(userAgent, 'Opera'),
            isMobile,
        };
    }

    // Chrome detection
    if (/Chrome\//i.test(userAgent) && !/Chromium\//i.test(userAgent)) {
        return {
            name: 'Chrome',
            version: extractVersion(userAgent, 'Chrome'),
            isMobile,
        };
    }

    // Firefox detection
    if (/Firefox\//i.test(userAgent)) {
        return {
            name: 'Firefox',
            version: extractVersion(userAgent, 'Firefox'),
            isMobile,
        };
    }

    // Safari detection (must come after Chrome since Safari UA contains "Chrome")
    if (/Safari\//i.test(userAgent) && !/Chrome\//i.test(userAgent) && !/Chromium\//i.test(userAgent)) {
        return {
            name: 'Safari',
            version: extractVersion(userAgent, 'Safari'),
            isMobile,
        };
    }

    // Unknown browser
    return {
        name: 'unknown',
        version: '',
        isMobile,
    };
};

/**
 * Detect the user's browser type, version, and mobile status.
 * 
 * Uses modern `navigator.userAgentData` API when available (Chrome 89+),
 * otherwise falls back to parsing `navigator.userAgent` string.
 * 
 * @returns Browser information object with name, version, and isMobile flag
 * 
 * @example
 * ```ts
 * const browser = detectBrowser();
 * console.log(browser.name); // 'Chrome'
 * console.log(browser.version); // '120.0.0'
 * console.log(browser.isMobile); // false
 * ```
 */
export const detectBrowser = (): BrowserInfo => {
    // Try modern API first
    const modernDetection = detectFromUserAgentData();
    if (modernDetection) {
        return modernDetection;
    }

    // Fallback to userAgent parsing
    return detectFromUserAgent();
};

