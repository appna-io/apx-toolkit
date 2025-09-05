/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
  
    if (typeof value === 'string') return value.trim().length === 0;
  
    if (Array.isArray(value)) return value.length === 0;
  
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
  
    return false;
};

/**
 * Check if value is defined (not null or undefined)
 */
export const isDefined = <T>(val: T | undefined | null): val is T => {
    return val !== null && val !== undefined;
};

/**
 * Safely convert value to number with fallback
 */
export const toNumberSafe = (value: any, fallback: number = 0): number => {
    if (typeof value === 'number') return value;
  
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? fallback : parsed;
    }
  
    if (typeof value === 'boolean') return value ? 1 : 0;
  
    return fallback;
};

/**
 * Check if value is a string
 */
export const isString = (value: any): value is string => {
    return typeof value === 'string';
};

/**
 * Check if value is a number
 */
export const isNumber = (value: any): value is number => {
    return typeof value === 'number' && !isNaN(value);
};

/**
 * Check if value is a boolean
 */
export const isBoolean = (value: any): value is boolean => {
    return typeof value === 'boolean';
};

/**
 * Check if value is an object (but not null or array)
 */
export const isObject = (value: any): value is object => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Check if value is an array
 */
export const isArray = (value: any): value is any[] => {
    return Array.isArray(value);
};

/**
 * Check if value is a function
 */
export const isFunction = (value: any): value is Function => {
    return typeof value === 'function';
};

/**
 * Check if value is null
 */
export const isNull = (value: any): value is null => {
    return value === null;
};

/**
 * Check if value is undefined
 */
export const isUndefined = (value: any): value is undefined => {
    return value === undefined;
};

/**
 * Get value or fallback if value is empty
 */
export const getValueOrFallback = <T>(value: T | null | undefined, fallback: T): T => {
    return isDefined(value) ? value : fallback;
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
  
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
  
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as T;
    }
  
    if (typeof obj === 'object') {
        const cloned = {} as T;
        // eslint-disable-next-line no-restricted-syntax
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
  
    return obj;
};

/**
 * Merge multiple objects (shallow merge)
 * TODO: Fix TypeScript issues
 */
// export const merge = <T extends Record<string, any>>(...objects: Partial<T>[]): T => {
//   return objects.reduce((result, obj) => {
//     return { ...result, ...obj } as T;
//   }, {} as T);
// };

/**
 * Deep merge multiple objects
 * TODO: Fix TypeScript issues
 */
// export const deepMerge = <T extends Record<string, any>>(...objects: Partial<T>[]): T => {
//   return objects.reduce((result, obj) => {
//     if (!obj) return result;
    
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         if (isObject(obj[key]) && isObject((result as any)[key])) {
//           (result as any)[key] = deepMerge((result as any)[key], obj[key]);
//         } else {
//           (result as any)[key] = obj[key];
//         }
//       }
//     }
    
//     return result;
//   }, {} as T);
// };

/**
 * Pick specific properties from an object
 */
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
  
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key];
        }
    }
  
    return result;
};

/**
 * Omit specific properties from an object
 */
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj } as Omit<T, K>;
  
    for (const key of keys) {
        delete (result as any)[key];
    }
  
    return result;
};

/**
 * Debounce a function
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Throttle a function
 */
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
  
    return (...args: Parameters<T>) => {
        const now = Date.now();
    
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
};

/**
 * Generate a random string
 */
export const randomString = (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return result;
};

/**
 * Generate a random number between min and max
 */
export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to camelCase
 */
export const toCamelCase = (str: string): string => {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (_, c) => c.toLowerCase());
};

/**
 * Convert string to kebab-case
 */
export const toKebabCase = (str: string): string => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};

/**
 * Convert string to snake_case
 */
export const toSnakeCase = (str: string): string => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
};

/**
 * Convert string to PascalCase
 */
export const toPascalCase = (str: string): string => {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (_, c) => c.toUpperCase());
};

/**
 * Truncate string to specified length
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
};

/**
 * Remove duplicate values from array
 */
export const unique = <T>(array: T[]): T[] => {
    return [...new Set(array)];
};

/**
 * Group array by key
 */
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce((groups, item) => {
        const groupKey = String(item[key]);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(item);
        return groups;
    }, {} as Record<string, T[]>);
};

/**
 * Sort array by key
 */
export const sortBy = <T, K extends keyof T>(array: T[], key: K, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
    
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
}; 

/**
 * Determine text direction (LTR or RTL) based on the first non-whitespace character.
 *
 * - If the first character belongs to common RTL scripts (Arabic, Hebrew, etc.) => 'rtl'
 * - Otherwise => 'ltr'
 * - Fallback is 'ltr'
 */
export type TextDirection = 'ltr' | 'rtl';

// Common RTL Unicode ranges: Hebrew, Arabic, Arabic Supplement, Arabic Extended-A,
// Syriac, Thaana, NKo, Arabic Presentation Forms-A/B
const RTL_CHAR_REGEX = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0700-\u074F\u0780-\u07BF\u07C0-\u07FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export const getTextDirection = (text: string): TextDirection => {
    if (!text) return 'ltr';

    const firstMeaningfulChar = text.trimStart().charAt(0);
    if (!firstMeaningfulChar) return 'ltr';

    return RTL_CHAR_REGEX.test(firstMeaningfulChar) ? 'rtl' as const : 'ltr' as const;
};