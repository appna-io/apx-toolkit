import { REGEX } from '../regex/patterns';

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Check if a string is a valid email address
 */
export const isEmail = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.email.test(value.trim());
};

/**
 * Validate email with detailed result
 */
export const validateEmail = (email: string): ValidationResult => {
    if (!email || typeof email !== 'string') {
        return { valid: false, error: 'Email is required' };
    }
  
    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
        return { valid: false, error: 'Email cannot be empty' };
    }
  
    if (!REGEX.email.test(trimmedEmail)) {
        return { valid: false, error: 'Invalid email format' };
    }
  
    return { valid: true };
};

/**
 * Check if a string is a valid phone number
 */
export const isPhone = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.phone.test(value.replace(/\s+/g, ''));
};

/**
 * Validate phone number with detailed result
 */
export const validatePhone = (phone: string): ValidationResult => {
    if (!phone || typeof phone !== 'string') {
        return { valid: false, error: 'Phone number is required' };
    }
  
    const cleanedPhone = phone.replace(/\s+/g, '');
    if (cleanedPhone.length === 0) {
        return { valid: false, error: 'Phone number cannot be empty' };
    }
  
    if (!REGEX.phone.test(cleanedPhone)) {
        return { valid: false, error: 'Invalid phone number format' };
    }
  
    return { valid: true };
};

/**
 * Check if a string is numeric (contains only digits)
 */
export const isNumeric = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.numeric.test(value);
};

/**
 * Check if a string is alphanumeric (contains only letters and digits)
 */
export const isAlphanumeric = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.alphanumeric.test(value);
};

/**
 * Check if a string is a valid URL
 */
export const isValidURL = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.url.test(value.trim());
};

/**
 * Validate URL with detailed result
 */
export const validateURL = (url: string): ValidationResult => {
    if (!url || typeof url !== 'string') {
        return { valid: false, error: 'URL is required' };
    }
  
    const trimmedURL = url.trim();
    if (trimmedURL.length === 0) {
        return { valid: false, error: 'URL cannot be empty' };
    }
  
    if (!REGEX.url.test(trimmedURL)) {
        return { valid: false, error: 'Invalid URL format' };
    }
  
    return { valid: true };
};

/**
 * Check if a string is a strong password
 */
export const isStrongPassword = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.strongPassword.test(value);
};

/**
 * Validate password strength with detailed result
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password || typeof password !== 'string') {
        return { valid: false, error: 'Password is required' };
    }
  
    if (password.length < 8) {
        return { valid: false, error: 'Password must be at least 8 characters long' };
    }
  
    if (!/(?=.*[A-Z])/.test(password)) {
        return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }
  
    if (!/(?=.*\d)/.test(password)) {
        return { valid: false, error: 'Password must contain at least one digit' };
    }
  
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
        return { valid: false, error: 'Password must contain at least one special character (!@#$%^&*)' };
    }
  
    return { valid: true };
};

/**
 * Check if a string is a valid credit card number
 */
export const isCreditCard = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.creditCard.test(value.replace(/\s+/g, ''));
};

/**
 * Check if a string is a valid IPv4 address
 */
export const isIPv4 = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.ipv4.test(value);
};

/**
 * Check if a string is a valid date in YYYY-MM-DD format
 */
export const isDate = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    if (!REGEX.date.test(value)) return false;
  
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

/**
 * Check if a string is a valid time in HH:MM:SS format
 */
export const isTime = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.time.test(value);
};

/**
 * Check if a string is a valid UUID
 */
export const isUUID = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.uuid.test(value);
};

/**
 * Check if a string is a valid US postal code
 */
export const isPostalCode = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.postalCode.test(value);
};

/**
 * Check if a string is a valid US Social Security Number
 */
export const isSSN = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.ssn.test(value);
};

/**
 * Check if a string is a valid currency amount
 */
export const isCurrency = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.currency.test(value);
};

/**
 * Check if a string is a valid hex color code
 */
export const isHexColor = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.hexColor.test(value);
};

/**
 * Check if a string is a valid domain name
 */
export const isDomain = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.domain.test(value);
};

/**
 * Check if a string is a valid username
 */
export const isUsername = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.username.test(value);
};

/**
 * Check if a string has a valid file extension
 */
export const hasValidFileExtension = (value: string): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX.fileExtension.test(value);
};

/**
 * Generic validation function using regex patterns
 */
export const validateWithRegex = (value: string, pattern: keyof typeof REGEX): boolean => {
    if (!value || typeof value !== 'string') return false;
    return REGEX[pattern].test(value);
}; 