import { LANGUAGES, getLanguageByLocale } from '../constants/languages.js';
import { 
    TimeUnit, 
    getLocaleConjunction, 
    getTimeUnitTranslation,
    getDayTranslation,
    getClosedTranslation,
    DayName
} from '../constants/translations.js';
import { getLocale, getCurrency } from '../context/index.js';

/**
 * I18N Language Key for storing user's preferred language
 * @deprecated Use context system instead. This will be removed in future versions.
 */
export const I18N_LANG_KEY = 'apxLng';

// Removed legacy isBrowser function - use isBrowser from context instead

/**
 * Get the current locale from context or default to 'en-US'
 */
export const getCurrentLocale = (): string => {
    return getLocale();
};

/**
 * Currency Format: Format the currency based on the locale
 * @param amount - The amount to format
 * @param currency - Optional currency code, if not passed reads from context
 * @param locale - Optional locale, if not passed reads from context
 * @returns Formatted currency string
 */
export const formatCurrencyI18N = (
    amount: number,
    currency?: string,
    locale?: string
): string => {
    const currentLocale = locale || getCurrentLocale();
    const currentCurrency = currency || getCurrency();
  
    try {
        return new Intl.NumberFormat(currentLocale, {
            style: 'currency',
            currency: currentCurrency
        }).format(amount);
    } catch (error) {
    // Fallback formatting
        return `${currentCurrency} ${amount.toFixed(2)}`;
    }
};

/**
 * Date format based on locale with custom formatting options
 * @param date - The date to format
 * @param format - Optional custom format
 * @param variant - Format variant: "appointment" | "default"
 * @param locale - Optional locale, if not passed reads from apxLng
 * @returns Formatted date string
 */
export const formatDateI18N = (
    date: Date | string | number,
    format?: string,
    variant: 'appointment' | 'default' = 'default',
    locale?: string
): string => {
    const currentLocale = locale || getCurrentLocale();
    const dateObj = new Date(date);
  
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
    }

    // If custom format is provided, use it
    if (format) {
        return formatCustomDate(dateObj, format, currentLocale);
    }

    // Use locale-specific formatting based on variant
    return formatDateByVariant(dateObj, variant, currentLocale);
};

/**
 * Format date with custom format string
 */
const formatCustomDate = (
    date: Date,
    format: string,
    locale: string
): string => {
    const options: Intl.DateTimeFormatOptions = {};
  
    // Parse format string and set options
    if (format.includes('YYYY') || format.includes('yyyy')) {
        options.year = 'numeric';
    }
    if (format.includes('MM') || format.includes('M')) {
        options.month = 'long';
    }
    if (format.includes('DD') || format.includes('D')) {
        options.day = 'numeric';
    }
    if (format.includes('HH') || format.includes('h')) {
        options.hour = 'numeric';
    }
    if (format.includes('mm') || format.includes('m')) {
        options.minute = 'numeric';
    }
    if (format.includes('ss') || format.includes('s')) {
        options.second = 'numeric';
    }

    try {
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
        return date.toLocaleDateString(locale, options);
    }
};

/**
 * Format date based on variant (appointment or default)
 */
const formatDateByVariant = (
    date: Date,
    variant: 'appointment' | 'default',
    locale: string
): string => {
    const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;
  
    if (variant === 'appointment') {
        return formatAppointmentDate(date, locale, hasTime);
    } 
    return formatDefaultDate(date, locale, hasTime);
};

/**
 * Format date for appointment variant
 */
const formatAppointmentDate = (
    date: Date,
    locale: string,
    hasTime: boolean
): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    try {
        const dateStr = new Intl.DateTimeFormat(locale, dateOptions).format(date);
    
        if (hasTime) {
            const timeStr = new Intl.DateTimeFormat(locale, timeOptions).format(date);
      
            // Handle different locale formats for "at" conjunction
            const conjunction = getLocaleConjunction(locale);
            return `${dateStr} ${conjunction} ${timeStr}`;
        }
    
        return dateStr;
    } catch (error) {
    // Fallback formatting
        const dateStr = date.toLocaleDateString(locale, dateOptions);
    
        if (hasTime) {
            const timeStr = date.toLocaleTimeString(locale, timeOptions);
            const conjunction = getLocaleConjunction(locale);
            return `${dateStr} ${conjunction} ${timeStr}`;
        }
    
        return dateStr;
    }
};

/**
 * Format date for default variant
 */
const formatDefaultDate = (
    date: Date,
    locale: string,
    hasTime: boolean
): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    try {
        const dateStr = new Intl.DateTimeFormat(locale, dateOptions).format(date);
    
        if (hasTime) {
            const timeStr = new Intl.DateTimeFormat(locale, timeOptions).format(date);
            return `${dateStr} ${timeStr}`;
        }
    
        return dateStr;
    } catch (error) {
    // Fallback formatting
        const dateStr = date.toLocaleDateString(locale, dateOptions);
    
        if (hasTime) {
            const timeStr = date.toLocaleTimeString(locale, timeOptions);
            return `${dateStr} ${timeStr}`;
        }
    
        return dateStr;
    }
};


/**
 * Get all available locales
 * @returns Array of all available locale strings
 */
export const getAvailableLocales = (): string[] => {
    return Object.values(LANGUAGES).map(lang => lang.locale);
};

/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns True if the locale is supported
 */
export const isLocaleSupported = (locale: string): boolean => {
    return getAvailableLocales().includes(locale);
};



/**
 * Time formatter: Format time values with proper pluralization and localization
 * @param value - The numeric value
 * @param unit - The time unit (ms, s, m, h, d, w, mo, y)
 * @param locale - Optional locale, if not passed reads from apxLng
 * @returns Formatted time string with proper pluralization
 */
export const formatTimeI18N = (
    value: number,
    unit: TimeUnit,
    locale?: string
): string => {
    const currentLocale = locale || getCurrentLocale();
    
    // Get the appropriate translation for the time unit
    const translation = getTimeUnitTranslation(currentLocale, unit, value);
    
    // Format the number according to locale
    const formattedNumber = new Intl.NumberFormat(currentLocale).format(value);
    
    return `${formattedNumber} ${translation}`;
};

/**
 * Opening period type for store hours
 */
export type OpeningPeriod = {
    open: string;
    closed: string;
};

/**
 * Day schedule type - either array of opening periods or closed day
 */
export type DaySchedule = OpeningPeriod[] | { open: false; closed: false };

/**
 * Store hours type - array of 7 days (Sunday to Saturday)
 */
export type StoreHours = [
    DaySchedule, // Sunday (0)
    DaySchedule, // Monday (1)
    DaySchedule, // Tuesday (2)
    DaySchedule, // Wednesday (3)
    DaySchedule, // Thursday (4)
    DaySchedule, // Friday (5)
    DaySchedule // Saturday (6)
];

/**
 * Format opening hours with locale support and time format options
 * @param storeHours - Array of 7 days with opening hours (Sunday to Saturday)
 * @param options - Formatting options
 * @param options.locale - Optional locale, if not passed reads from context
 * @param options.use24Hour - Whether to use 24-hour format (default: false for AM/PM)
 * @param options.language - Optional language code for day names (e.g., 'en', 'he', 'ar')
 * @returns Array of formatted opening hours strings
 */
export const formatOpeningHours = (
    storeHours: StoreHours,
    options: {
        locale?: string;
        use24Hour?: boolean;
        language?: string;
    } = {}
): string[] => {
    const currentLocale = options.locale || getCurrentLocale();
    const use24Hour = options.use24Hour || false;
    const language = options.language || getLanguageByLocale(currentLocale)?.key || 'en';
    
    const openGroups: string[] = [];
    const closedGroups: string[] = [];
    
    // First, group all days by their schedule
    const scheduleGroups = new Map<string, number[]>();
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const schedule = storeHours[dayIndex];
        const scheduleKey = getScheduleKey(schedule);
        
        if (!scheduleGroups.has(scheduleKey)) {
            scheduleGroups.set(scheduleKey, []);
        }
        scheduleGroups.get(scheduleKey)!.push(dayIndex);
    }
    
    // Process each schedule group
    for (const [scheduleKey, dayIndices] of scheduleGroups) {
        const schedule = parseScheduleKey(scheduleKey);
        
        // Group consecutive days within the same schedule
        const consecutiveGroups = groupConsecutiveDays(dayIndices);
        
        for (const consecutiveGroup of consecutiveGroups) {
            const formattedGroup = formatDayGroup(
                { 
                    startDay: consecutiveGroup[0], 
                    endDay: consecutiveGroup[consecutiveGroup.length - 1], 
                    schedule, 
                    dayIndices: consecutiveGroup 
                },
                language,
                use24Hour,
                currentLocale
            );
            
            if (isClosedDay(schedule)) {
                closedGroups.push(formattedGroup);
            } else {
                openGroups.push(formattedGroup);
            }
        }
    }
    
    // Remove duplicates from open groups
    const uniqueOpenGroups = [...new Set(openGroups)];
    const uniqueClosedGroups = [...new Set(closedGroups)];
    
    // Sort groups to ensure consistent order (Sunday first, then by day order)
    const sortedOpenGroups = uniqueOpenGroups.sort((a, b) => {
        // Extract day names and sort by day order
        const getDayOrder = (str: string) => {
            const firstDay = str.split(':')[0].split(',')[0].split(' - ')[0].trim();
            
            // Map day names to their order (0=Sunday, 6=Saturday)
            const dayNames: DayName[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            
            // Find which day this corresponds to by checking translations
            for (let i = 0; i < dayNames.length; i++) {
                const dayName = dayNames[i];
                const translatedDay = getDayTranslation(language, dayName, 'long');
                if (firstDay === translatedDay || firstDay.includes(translatedDay)) {
                    return i;
                }
            }
            
            return 7; // fallback
        };
        return getDayOrder(a) - getDayOrder(b);
    });
    
    // Return open groups first, then closed groups
    return [...sortedOpenGroups, ...uniqueClosedGroups];
};

/**
 * Group consecutive days from a list of day indices
 * Special handling for Sunday (0) and Saturday (6) to be considered consecutive
 */
const groupConsecutiveDays = (dayIndices: number[]): number[][] => {
    if (dayIndices.length === 0) return [];
    
    const sortedIndices = [...dayIndices].sort((a, b) => a - b);
    const groups: number[][] = [];
    let currentGroup = [sortedIndices[0]];
    
    for (let i = 1; i < sortedIndices.length; i++) {
        const currentDay = sortedIndices[i];
        const previousDay = sortedIndices[i - 1];
        
        // Check if days are consecutive
        const isConsecutive = currentDay === previousDay + 1;
        
        if (isConsecutive) {
            currentGroup.push(currentDay);
        } else {
            groups.push(currentGroup);
            currentGroup = [currentDay];
        }
    }
    
    groups.push(currentGroup);
    
    // Special case: if we have Sunday (0) and Saturday (6) in separate groups, merge them
    if (groups.length > 1) {
        const sundayGroup = groups.find(group => group.includes(0));
        const saturdayGroup = groups.find(group => group.includes(6));
        
        if (sundayGroup && saturdayGroup && sundayGroup !== saturdayGroup) {
            // Remove both groups
            const sundayIndex = groups.indexOf(sundayGroup);
            const saturdayIndex = groups.indexOf(saturdayGroup);
            
            // Merge them (Sunday first, then Saturday)
            const mergedGroup = [...sundayGroup, ...saturdayGroup];
            groups.splice(Math.max(sundayIndex, saturdayIndex), 1);
            groups.splice(Math.min(sundayIndex, saturdayIndex), 1);
            groups.push(mergedGroup);
        }
    }
    
    return groups;
};

/**
 * Generate a unique key for a schedule to group similar schedules
 */
const getScheduleKey = (schedule: DaySchedule): string => {
    if (isClosedDay(schedule)) {
        return 'CLOSED';
    }
    
    const periods = schedule as OpeningPeriod[];
    return periods.map(p => `${p.open}-${p.closed}`).join(',');
};

/**
 * Parse a schedule key back to a schedule object
 */
const parseScheduleKey = (scheduleKey: string): DaySchedule => {
    if (scheduleKey === 'CLOSED') {
        return { open: false, closed: false };
    }
    
    const periods: OpeningPeriod[] = scheduleKey.split(',').map(periodStr => {
        const [open, closed] = periodStr.split('-');
        return { open, closed };
    });
    
    return periods;
};

/**
 * Check if a day is closed
 */
const isClosedDay = (schedule: DaySchedule): boolean => {
    return typeof schedule === 'object' && 'open' in schedule && schedule.open === false;
};

/**
 * Format a group of days with the same schedule
 */
const formatDayGroup = (
    group: { startDay: number; endDay: number; schedule: DaySchedule; dayIndices: number[] },
    language: string,
    use24Hour: boolean,
    locale: string
): string => {
    const dayNames: DayName[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    // Format day range - handle non-consecutive days
    let dayRange: string;
    if (group.dayIndices.length === 1) {
        // Single day
        dayRange = getDayTranslation(language, dayNames[group.dayIndices[0]], 'long');
    } else {
        // Multiple days - check if they are consecutive
        const sortedIndices = [...group.dayIndices].sort((a, b) => a - b);
        const isConsecutive = sortedIndices.every((day, index) => 
            index === 0 || day === sortedIndices[index - 1] + 1
        );
        
        if (isConsecutive) {
            // Consecutive days: "Tuesday - Thursday"
            const startDayName = getDayTranslation(language, dayNames[sortedIndices[0]], 'long');
            const endDayName = getDayTranslation(language, dayNames[sortedIndices[sortedIndices.length - 1]], 'long');
            dayRange = `${startDayName} - ${endDayName}`;
        } else {
            // Non-consecutive days: "Sunday, Saturday"
            const dayNamesList = sortedIndices.map(dayIndex => 
                getDayTranslation(language, dayNames[dayIndex], 'long')
            );
            dayRange = dayNamesList.join(', ');
        }
    }
    
    // Format schedule
    if (isClosedDay(group.schedule)) {
        const closedText = getClosedTranslation(language);
        return `${dayRange}: ${closedText}`;
    }
    
    const periods = group.schedule as OpeningPeriod[];
    const timeRanges = periods.map(period => {
        const openTime = formatTime(period.open, use24Hour, locale);
        const closeTime = formatTime(period.closed, use24Hour, locale);
        return `${openTime} - ${closeTime}`;
    });
    
    return `${dayRange}: ${timeRanges.join(', ')}`;
};

/**
 * Format time string with locale support
 */
const formatTime = (timeString: string, use24Hour: boolean, locale: string): string => {
    try {
        // Parse time string (e.g., "09:00", "18:00")
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: !use24Hour
        };
        
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
        // Fallback to original string if parsing fails
        return timeString;
    }
};



