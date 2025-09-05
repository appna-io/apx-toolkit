/**
 * Common regex patterns for validation
 */
export const REGEX = {
    /**
   * Email validation pattern
   * Matches: user@domain.com, user.name@domain.co.uk
   */
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    /**
   * Phone number validation pattern
   * Matches: +1234567890, 1234567890, +1-234-567-8900
   */
    phone: /^(\+?\d{1,3})?\d{7,14}$/,

    /**
   * Numeric validation pattern
   * Matches: 123, 456789
   */
    numeric: /^\d+$/,

    /**
   * URL validation pattern
   * Matches: http://example.com, https://example.com/path?param=value
   */
    url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,

    /**
   * Strong password validation pattern
   * Requires: at least 8 chars, 1 uppercase, 1 digit, 1 special char
   */
    strongPassword: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,

    /**
   * Alphanumeric validation pattern
   * Matches: abc123, ABC123, 123abc
   */
    alphanumeric: /^[a-zA-Z0-9]+$/,

    /**
   * Credit card validation pattern (basic)
   * Matches: 1234-5678-9012-3456, 1234567890123456
   */
    creditCard: /^(\d{4}[- ]?){4}$/,

    /**
   * IPv4 address validation pattern
   * Matches: 192.168.1.1, 10.0.0.1
   */
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

    /**
   * Date validation pattern (YYYY-MM-DD)
   * Matches: 2023-12-31, 2024-01-01
   */
    date: /^\d{4}-\d{2}-\d{2}$/,

    /**
   * Time validation pattern (HH:MM:SS)
   * Matches: 12:30:45, 23:59:59
   */
    time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,

    /**
   * UUID validation pattern
   * Matches: 550e8400-e29b-41d4-a716-446655440000
   */
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

    /**
   * Postal code validation pattern (US format)
   * Matches: 12345, 12345-6789
   */
    postalCode: /^\d{5}(-\d{4})?$/,

    /**
   * Social Security Number validation pattern (US format)
   * Matches: 123-45-6789, 123456789
   */
    ssn: /^\d{3}-?\d{2}-?\d{4}$/,

    /**
   * Currency validation pattern
   * Matches: $123.45, 123.45, 1,234.56
   */
    currency: /^[\$]?[\d,]+(\.\d{2})?$/,

    /**
   * Hex color validation pattern
   * Matches: #ff0000, #f00, #FF0000
   */
    hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

    /**
   * Domain validation pattern
   * Matches: example.com, sub.example.co.uk
   */
    domain: /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

    /**
   * Username validation pattern
   * Matches: user123, user_name, user-name
   */
    username: /^[a-zA-Z0-9_-]{3,20}$/,

    /**
   * File extension validation pattern
   * Matches: .jpg, .pdf, .docx
   */
    fileExtension: /\.(jpg|jpeg|png|gif|bmp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|zip|rar|7z)$/i
} as const;

export type RegexPattern = keyof typeof REGEX; 