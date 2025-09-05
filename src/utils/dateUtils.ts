/**
 * Format date to string with custom format
 */
export const formatDate = (
    date: Date | string | number,
    format: string = 'YYYY-MM-DD'
): string => {
    const d = new Date(date);
  
    if (isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
  
    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
};

/**
 * Get relative time ago (e.g., "3 hours ago")
 */
export const getTimeAgo = (date: Date | string | number): string => {
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
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
    );
};

/**
 * Check if two dates are the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
    );
};

/**
 * Check if two dates are the same year
 */
export const isSameYear = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear();
};

/**
 * Convert date to ISO string in UTC
 */
export const toISOStringUTC = (date: Date): string => {
    return date.toISOString();
};

/**
 * Get start of day (00:00:00)
 */
export const startOfDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

/**
 * Get end of day (23:59:59.999)
 */
export const endOfDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
};

/**
 * Get start of week (Sunday)
 */
export const startOfWeek = (date: Date): Date => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day;
    newDate.setDate(diff);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

/**
 * Get end of week (Saturday)
 */
export const endOfWeek = (date: Date): Date => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + 6;
    newDate.setDate(diff);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
};

/**
 * Get start of month
 */
export const startOfMonth = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

/**
 * Get end of month
 */
export const endOfMonth = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1, 0);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
};

/**
 * Add days to date
 */
export const addDays = (date: Date, days: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

/**
 * Add months to date
 */
export const addMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
};

/**
 * Add years to date
 */
export const addYears = (date: Date, years: number): Date => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
};

/**
 * Get difference between two dates in days
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
};

/**
 * Get difference between two dates in hours
 */
export const getHoursDifference = (date1: Date, date2: Date): number => {
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.floor(timeDiff / (1000 * 3600));
};

/**
 * Get difference between two dates in minutes
 */
export const getMinutesDifference = (date1: Date, date2: Date): number => {
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.floor(timeDiff / (1000 * 60));
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};

/**
 * Check if date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(date, yesterday);
};

/**
 * Check if date is tomorrow
 */
export const isTomorrow = (date: Date): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(date, tomorrow);
};

/**
 * Check if date is in the past
 */
export const isPast = (date: Date): boolean => {
    return date < new Date();
};

/**
 * Check if date is in the future
 */
export const isFuture = (date: Date): boolean => {
    return date > new Date();
};

/**
 * Get age from birth date
 */
export const getAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
  
    return age;
};

/**
 * Check if year is leap year
 */
export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Get days in month
 */
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

/**
 * Format date for display with locale
 */
export const formatDateLocale = (
    date: Date | string | number,
    locale: string = 'en-US',
    options?: Intl.DateTimeFormatOptions
): string => {
    const d = new Date(date);
  
    if (isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
  
    try {
        return new Intl.DateTimeFormat(locale, options).format(d);
    } catch (error) {
        return d.toLocaleDateString(locale, options);
    }
}; 