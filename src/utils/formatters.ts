/**
 * Format currency amount
 */
export const formatCurrency = (
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    } catch (error) {
    // Fallback formatting
        return `${currency} ${amount.toFixed(2)}`;
    }
};

/**
 * Format compact number (e.g., 1.5K, 2M)
 */
export const formatCompactNumber = (num: number): string => {
    if (num === 0) return '0';
  
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
  
    if (absNum >= 1e12) {
        return `${sign}${(absNum / 1e12).toFixed(1)}T`;
    }
    if (absNum >= 1e9) {
        return `${sign}${(absNum / 1e9).toFixed(1)}B`;
    }
    if (absNum >= 1e6) {
        return `${sign}${(absNum / 1e6).toFixed(1)}M`;
    }
    if (absNum >= 1e3) {
        return `${sign}${(absNum / 1e3).toFixed(1)}K`;
    }
  
    return `${sign}${absNum}`;
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (
    value: number,
    decimals: number = 2,
    locale: string = 'en-US'
): string => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    } catch (error) {
        return `${value.toFixed(decimals)}%`;
    }
};

/**
 * Format number with thousands separator
 */
export const formatNumber = (
    num: number,
    locale: string = 'en-US',
    options?: Intl.NumberFormatOptions
): string => {
    try {
        return new Intl.NumberFormat(locale, options).format(num);
    } catch (error) {
        return num.toString();
    }
};


/**
 * Format social security number with masking
 */
export const formatSSN = (ssn: string, mask: boolean = true): string => {
    if (!ssn || typeof ssn !== 'string') return '';
  
    const cleaned = ssn.replace(/\D/g, '');
  
    if (mask) {
        if (cleaned.length >= 4) {
            const lastFour = cleaned.slice(-4);
            return `***-**-${lastFour}`;
        }
        return '*'.repeat(cleaned.length);
    }
  
    // Format without masking
    if (cleaned.length === 9) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
    }
  
    return cleaned;
};

/**
 * Format postal code
 */
export const formatPostalCode = (postalCode: string): string => {
    if (!postalCode || typeof postalCode !== 'string') return '';
  
    const cleaned = postalCode.replace(/\D/g, '');
  
    if (cleaned.length === 9) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
  
    return cleaned;
};

/**
 * Format time duration in human readable format
 */
export const formatDuration = (seconds: number): string => {
    if (seconds < 0) return '0s';
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    const parts: string[] = [];
  
    if (hours > 0) {
        parts.push(`${hours}h`);
    }
    if (minutes > 0) {
        parts.push(`${minutes}m`);
    }
    if (secs > 0 || parts.length === 0) {
        parts.push(`${secs}s`);
    }
  
    return parts.join(' ');
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export const formatRelativeTime = (date: Date | string | number): string => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
    if (diffInSeconds < 0) {
        return 'in the future';
    }
  
    if (diffInSeconds < 60) {
        return 'just now';
    }
  
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
  
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  
    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }
  
    const years = Math.floor(days / 365);
    return `${years} year${years === 1 ? '' : 's'} ago`;
};

/**
 * Format number with ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export const formatOrdinal = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
  
    if (j === 1 && k !== 11) {
        return `${num}st`;
    }
    if (j === 2 && k !== 12) {
        return `${num}nd`;
    }
    if (j === 3 && k !== 13) {
        return `${num}rd`;
    }
  
    return `${num}th`;
};

/**
 * Format bytes to human readable format with specific precision
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}; 