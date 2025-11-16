/**
 * Currency mapping for countries based on locale strings
 * Supports various locale formats: he/IL, IL, he-IL, ar-IL
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

/**
 * Comprehensive currency mapping for countries
 * Includes Israel, UAE, USA, and 20+ countries from Asia
 */
const CURRENCY_MAP: Record<string, CurrencyInfo> = {
    // Middle East
    'IL': { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
    'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
    'QA': { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
    'KW': { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
    'OM': { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },
    'BH': { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar' },
    'JO': { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
    'LB': { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
    
    // Asia
    'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    'KR': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    'TH': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    'ID': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    'PH': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    'VN': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
    'HK': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    'TW': { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
    'PK': { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    'BD': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
    
    // Americas
    'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
    'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    'MX': { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
    'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    'AR': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
    
    // Europe
    // Euro zone countries
    'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
    'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
    'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
    'ES': { code: 'EUR', symbol: '€', name: 'Euro' },
    'NL': { code: 'EUR', symbol: '€', name: 'Euro' },
    'BE': { code: 'EUR', symbol: '€', name: 'Euro' },
    'AT': { code: 'EUR', symbol: '€', name: 'Euro' },
    'IE': { code: 'EUR', symbol: '€', name: 'Euro' },
    'PT': { code: 'EUR', symbol: '€', name: 'Euro' },
    'GR': { code: 'EUR', symbol: '€', name: 'Euro' },
    'FI': { code: 'EUR', symbol: '€', name: 'Euro' },
    
    // Non-Euro European countries
    'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
    'CH': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    'SE': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    'NO': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    'DK': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
    'PL': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
    'CZ': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
    'HU': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
    'RO': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
    'TR': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    
    // Oceania
    'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    'NZ': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    
    // Africa
    'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'EG': { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
    'NG': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'KE': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    'MA': { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' }
};

/**
 * Parse locale string and extract country code
 * Supports formats: he/IL, IL, he-IL, ar-IL, he_IL, etc.
 * @param locale - The locale string to parse
 * @returns The extracted country code (uppercase) or null if not found
 */
const parseLocaleToCountryCode = (locale: string): string | null => {
    if (!locale || typeof locale !== 'string') {
        return null;
    }

    const normalizedLocale = locale.trim();

    // If it's just a 2-letter country code (e.g., "IL", "US")
    if (/^[A-Z]{2}$/i.test(normalizedLocale)) {
        return normalizedLocale.toUpperCase();
    }

    // Split by common separators: /, -, _
    const parts = normalizedLocale.split(/[/_-]/);
    
    // If we have multiple parts, the country code is typically the last part
    if (parts.length > 1) {
        const lastPart = parts[parts.length - 1].toUpperCase();
        // Validate it's a 2-letter code
        if (/^[A-Z]{2}$/.test(lastPart)) {
            return lastPart;
        }
    }

    // Try to extract 2-letter uppercase code from anywhere in the string
    const match = normalizedLocale.match(/[A-Z]{2}/);
    if (match) {
        return match[0];
    }

    return null;
};

/**
 * Get currency information based on locale string
 * Supports various locale formats: he/IL, IL, he-IL, ar-IL, he_IL, etc.
 * @param locale - The locale string (e.g., "he/IL", "IL", "he-IL", "ar-IL")
 * @returns CurrencyInfo object with code, symbol, and name, or null if not found
 * @example
 * getCurrencyByLocale('he/IL') // { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' }
 * getCurrencyByLocale('IL') // { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' }
 * getCurrencyByLocale('he-IL') // { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' }
 * getCurrencyByLocale('ar-IL') // { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' }
 * getCurrencyByLocale('US') // { code: 'USD', symbol: '$', name: 'US Dollar' }
 * getCurrencyByLocale('en-US') // { code: 'USD', symbol: '$', name: 'US Dollar' }
 */
export const getCurrencyByLocale = (locale: string): CurrencyInfo | null => {
    const countryCode = parseLocaleToCountryCode(locale);
    
    if (!countryCode) {
        return null;
    }

    return CURRENCY_MAP[countryCode] || null;
};

/**
 * Get currency code only (shorthand for getCurrencyByLocale)
 * @param locale - The locale string
 * @returns Currency code (e.g., 'ILS', 'USD') or null if not found
 * @example
 * getCurrencyCode('he/IL') // 'ILS'
 * getCurrencyCode('US') // 'USD'
 * getCurrencyCode('ar-AE') // 'AED'
 */
export const getCurrencyCode = (locale: string): string | null => {
    const currencyInfo = getCurrencyByLocale(locale);
    return currencyInfo ? currencyInfo.code : null;
};

/**
 * Get currency symbol only
 * @param locale - The locale string
 * @returns Currency symbol (e.g., '₪', '$') or null if not found
 * @example
 * getCurrencySymbol('he/IL') // '₪'
 * getCurrencySymbol('US') // '$'
 * getCurrencySymbol('en-GB') // '£'
 */
export const getCurrencySymbol = (locale: string): string | null => {
    const currencyInfo = getCurrencyByLocale(locale);
    return currencyInfo ? currencyInfo.symbol : null;
};

/**
 * Check if a locale has a currency mapping
 * @param locale - The locale string to check
 * @returns True if the locale has a currency mapping, false otherwise
 */
export const hasCurrencyMapping = (locale: string): boolean => {
    return getCurrencyByLocale(locale) !== null;
};

/**
 * Get all supported country codes
 * @returns Array of supported country codes
 */
export const getSupportedCountryCodes = (): string[] => {
    return Object.keys(CURRENCY_MAP);
};

/**
 * Get all supported currencies
 * @returns Array of all CurrencyInfo objects
 */
export const getAllCurrencies = (): CurrencyInfo[] => {
    // Return unique currencies (some countries share currencies like EUR)
    const uniqueCurrencies = new Map<string, CurrencyInfo>();
    
    Object.values(CURRENCY_MAP).forEach(currency => {
        if (!uniqueCurrencies.has(currency.code)) {
            uniqueCurrencies.set(currency.code, currency);
        }
    });
    
    return Array.from(uniqueCurrencies.values());
};

