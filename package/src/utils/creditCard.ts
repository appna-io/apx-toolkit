/**
 * Credit Card Utilities
 * 
 * Comprehensive credit card handling utilities including formatting, validation,
 * type detection, and dummy card generation for testing.
 */

/**
 * Credit card types and their patterns
 */
export const CREDIT_CARD_TYPES = {
    VISA: {
        name: 'Visa',
        pattern: /^4\d{12}(\d{3}){0,2}$/,
        lengths: [13, 16, 19],
        format: 'AAAA BBBB CCCC DDDD',
        testNumbers: ['4111111111111111', '4000000000000002', '4000000000000069']
    },
    MASTERCARD: {
        name: 'MasterCard',
        pattern: /^(?:5[1-5]\d{14}|2(?:2(?:2[1-9]\d{12}|[3-9]\d{13})|[3-6]\d{14}|7(?:0\d{13}|1\d{13}|20\d{12})))$/,
        lengths: [16],
        format: 'AAAA BBBB CCCC DDDD',
        testNumbers: ['5555555555554444', '2223003122003222', '5105105105105100']
    },
    AMERICAN_EXPRESS: {
        name: 'American Express',
        pattern: /^3[47]\d{13}$/,
        lengths: [15],
        format: 'AAAA BBBBBB CCCCC',
        testNumbers: ['378282246310005', '371449635398431', '378734493671000']
    },
    DISCOVER: {
        name: 'Discover',
        pattern: /^(?:6011\d{12}|65\d{14}|64[4-9]\d{13}|622(?:12[6-9]|1[3-9]\d|[2-8]\d{2}|9(?:[01]\d|2[0-5]))\d{10})$/,
        lengths: [16, 17, 18, 19],
        format: 'AAAA BBBB CCCC DDDD',
        testNumbers: ['6011111111111117', '6011000990139424', '6011000000000004']
    },
    DINERS_CLUB: {
        name: 'Diners Club',
        pattern: /^(?:3(?:0[0-5]\d{11}|[68]\d{12}))$/,
        lengths: [14],
        format: 'AAAA BBBB CCCC DD',
        testNumbers: ['30569309025904', '38520000023237', '30000000000004']
    },
    JCB: {
        name: 'JCB',
        pattern: /^(?:35(?:2[89]|[3-8]\d)\d{12,15}|(?:2131|1800)\d{11})$/,
        lengths: [15, 16, 17, 18, 19],
        format: 'AAAA BBBB CCCC DDDD',
        testNumbers: ['3530111333300000', '3566002020360505', '213112345678904']
    },
    UNIONPAY: {
        name: 'UnionPay',
        pattern: /^(?:62|81)\d{14,17}$/,
        lengths: [16, 17, 18, 19],
        format: 'AAAA BBBB CCCC DDDD',
        testNumbers: ['6200000000000047', '6200000000000005', '6212345678901232']
    }
} as const;

export type CreditCardType = keyof typeof CREDIT_CARD_TYPES;

/**
 * Credit card formatting options
 */
export interface CreditCardFormatOptions {
    mask?: boolean;
    format?: string;
    maskChar?: string;
}

/**
 * Get the credit card type from a card number
 */
export const getCreditCardType = (cardNumber: string): CreditCardType | null => {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return null;
    }

    const cleanedNumber = cardNumber.replace(/\D/g, '');
    
    for (const [type, config] of Object.entries(CREDIT_CARD_TYPES)) {
        if (config.pattern.test(cleanedNumber)) {
            return type as CreditCardType;
        }
    }
    
    return null;
};

/**
 * Format credit card number with custom format and optional masking
 */
export const formatCreditCard = (
    cardNumber: string, 
    options: CreditCardFormatOptions = {}
): string => {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return '';
    }

    const { mask = false, format, maskChar = '*' } = options;
    const cleanedNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanedNumber.length === 0) {
        return '';
    }

    // Get card type to determine default format
    const cardType = getCreditCardType(cleanedNumber);
    const defaultFormat = cardType ? CREDIT_CARD_TYPES[cardType].format : 'AAAA BBBB CCCC DDDD';
    const formatPattern = format || defaultFormat;

    // Apply masking if requested
    let displayNumber = cleanedNumber;
    if (mask) {
        const lastFour = cleanedNumber.slice(-4);
        const maskedLength = Math.max(0, cleanedNumber.length - 4);
        displayNumber = maskChar.repeat(maskedLength) + lastFour;
    }

    // Format the number according to the pattern
    let formatted = formatPattern;
    let numberIndex = 0;

    // Handle special case where format contains * characters and we want to show last 4 digits
    if (format && format.includes('*') && format.includes('AAAA')) {
        const lastFour = cleanedNumber.slice(-4);
        formatted = formatted.replace('AAAA', lastFour);
    }

    // Replace format placeholders with actual digits
    formatted = formatted.replace(/[A-Z]+/g, (match) => {
        const groupLength = match.length;
        const group = displayNumber.slice(numberIndex, numberIndex + groupLength);
        numberIndex += groupLength;
        return group;
    });

    // If masking was applied and no custom format was provided, return simple masked format
    if (mask && !format) {
        const lastFour = cleanedNumber.slice(-4);
        const maskedLength = Math.max(0, cleanedNumber.length - 4);
        return maskChar.repeat(maskedLength) + lastFour;
    }

    return formatted;
};

/**
 * Get the last 4 digits of a credit card number
 */
export const getLast4Digits = (cardNumber: string): string => {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return '';
    }

    const cleanedNumber = cardNumber.replace(/\D/g, '');
    return cleanedNumber.slice(-4);
};

/**
 * Generate a random dummy credit card number for testing
 */
export const getRandomDummyCreditCard = (type?: CreditCardType): string => {
    const cardTypes = type ? [type] : Object.keys(CREDIT_CARD_TYPES) as CreditCardType[];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const cardConfig = CREDIT_CARD_TYPES[randomType];
    
    // Use a test number from the config if available
    if (cardConfig.testNumbers && cardConfig.testNumbers.length > 0) {
        return cardConfig.testNumbers[Math.floor(Math.random() * cardConfig.testNumbers.length)];
    }

    // Generate a random number based on the pattern
    const length = cardConfig.lengths[Math.floor(Math.random() * cardConfig.lengths.length)];
    let number = '';

    // Generate based on card type patterns
    switch (randomType) {
        case 'VISA':
            number = '4' + generateRandomDigits(length - 1);
            break;
        case 'MASTERCARD':
            number = '5' + (Math.floor(Math.random() * 5) + 1) + generateRandomDigits(length - 2);
            break;
        case 'AMERICAN_EXPRESS':
            number = '3' + (Math.random() < 0.5 ? '4' : '7') + generateRandomDigits(length - 2);
            break;
        case 'DISCOVER':
            number = '6' + (Math.random() < 0.5 ? '011' : '5' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10)) + generateRandomDigits(length - 4);
            break;
        case 'DINERS_CLUB':
            number = '3' + ['0', '6', '8', '9'][Math.floor(Math.random() * 4)] + generateRandomDigits(length - 2);
            break;
        case 'JCB':
            const jcbPrefixes = ['2131', '1800', '35'];
            const prefix = jcbPrefixes[Math.floor(Math.random() * jcbPrefixes.length)];
            number = prefix + generateRandomDigits(length - prefix.length);
            break;
        case 'UNIONPAY':
            number = '62' + generateRandomDigits(length - 2);
            break;
        default:
            number = generateRandomDigits(length);
    }

    return number;
};

/**
 * Validate credit card number using Luhn algorithm and type checking
 */
export const isValidCreditCardNumber = (cardNumber: string): boolean => {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return false;
    }

    const cleanedNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
        return false;
    }

    // Check Luhn algorithm
    if (!isValidLuhn(cleanedNumber)) {
        return false;
    }

    // Check if it matches any known card type
    const cardType = getCreditCardType(cleanedNumber);
    if (!cardType) {
        return false;
    }

    // Verify length matches expected length for the card type
    const cardConfig = CREDIT_CARD_TYPES[cardType];
    return cardConfig.lengths.some(length => length === cleanedNumber.length);
};

/**
 * Luhn algorithm implementation for credit card validation
 */
const isValidLuhn = (cardNumber: string): boolean => {
    let sum = 0;
    let isEven = false;

    // Process digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

/**
 * Generate random digits for dummy card generation
 */
const generateRandomDigits = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10).toString();
    }
    return result;
};

/**
 * Get credit card information including type, formatted number, and last 4 digits
 */
export const getCreditCardInfo = (cardNumber: string, options: CreditCardFormatOptions = {}) => {
    const cleanedNumber = cardNumber.replace(/\D/g, '');
    const cardType = getCreditCardType(cleanedNumber);
    const last4 = getLast4Digits(cleanedNumber);
    const formatted = formatCreditCard(cardNumber, options);
    const isValid = isValidCreditCardNumber(cardNumber);

    return {
        type: cardType,
        typeName: cardType ? CREDIT_CARD_TYPES[cardType].name : null,
        number: cleanedNumber,
        formatted,
        last4,
        isValid,
        length: cleanedNumber.length
    };
};

/**
 * Mask credit card number showing only first 4 and last 4 digits
 */
export const maskCreditCard = (cardNumber: string, maskChar: string = '*'): string => {
    if (!cardNumber || typeof cardNumber !== 'string') {
        return '';
    }

    const cleanedNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanedNumber.length < 8) {
        if (cleanedNumber.length <= 4) {
            return maskChar.repeat(cleanedNumber.length);
        }
        const first1 = cleanedNumber.slice(0, 1);
        const last1 = cleanedNumber.slice(-1);
        const middle = maskChar.repeat(cleanedNumber.length - 2);
        return `${first1}${middle}${last1}`;
    }

    const first4 = cleanedNumber.slice(0, 4);
    const last4 = cleanedNumber.slice(-4);
    const middleLength = cleanedNumber.length - 8;
    const middle = maskChar.repeat(Math.max(4, Math.min(4, middleLength)));

    return `${first4} ${middle} ${last4}`;
};

/**
 * Get all available credit card types
 */
export const getAvailableCreditCardTypes = (): Array<{ type: CreditCardType; name: string; format: string }> => {
    return Object.entries(CREDIT_CARD_TYPES).map(([type, config]) => ({
        type: type as CreditCardType,
        name: config.name,
        format: config.format
    }));
};
