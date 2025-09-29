export const COUNTRY_CODES = {
    IL: 972,
    US: 1,
    CA: 1,
    GB: 44,
    FR: 33,
    DE: 49,
    IT: 39,
    ES: 34,
    NL: 31,
    BE: 32,
    CH: 41,
    AT: 43,
    SE: 46,
    NO: 47,
    DK: 45,
    FI: 358,
    IE: 353,
    AU: 61,
    NZ: 64,
    AE: 971,
    SA: 966,
    JO: 962,
    EG: 20,
    TR: 90
} as const;

export function formatPhoneNumber(
    phone: string,
    format:
| 'PPP - EEE SSSS'
| '(PPP) - EEE SSSS'
| '(PP)  EEE SSSS'
| 'PP-EEE SSSS'
| 'PPP-EEE SSSS'
| '+C (PPP)-EEE-SSSS'
| '+C (PPP) EEESSSS'
| 'E.164'
| string,
    options?: {
leadingDigitPad?: string
inputIncludesCountry?: boolean | 'autoDetect'
nationalNumberLength?: number
originCountry?: keyof typeof COUNTRY_CODES
}
): string {
    const {
        leadingDigitPad = '0',
        inputIncludesCountry = 'autoDetect',
        nationalNumberLength = 10,
        originCountry = 'IL'
    } = options || {};

    if (!phone || typeof phone !== 'string') {
        return phone;
    }

    const normalizedPhone = phone.trim();
    let countryCode = '';
    let nationalNumber = '';

    if (inputIncludesCountry === 'autoDetect' || inputIncludesCountry === true) {
        const hasLeadingPlus = normalizedPhone.startsWith('+');
        const digitsOnly = normalizedPhone.replace(/[^\d+]/g, '');

        if (hasLeadingPlus) {
            const withoutPlus = digitsOnly.substring(1);
            const countryMatch = findLongestCountryCode(withoutPlus);
            if (countryMatch && withoutPlus.length > countryMatch.length) {
                countryCode = countryMatch;
                nationalNumber = withoutPlus.substring(countryMatch.length);
            } else {
                nationalNumber = withoutPlus;
            }
        } else {
            const countryMatch = findLongestCountryCode(digitsOnly);
            if (countryMatch && digitsOnly.length > countryMatch.length && digitsOnly.length >= 11 && digitsOnly.length <= 14) {
                countryCode = countryMatch;
                nationalNumber = digitsOnly.substring(countryMatch.length);
            } else {
                nationalNumber = digitsOnly;
            }
        }
    } else {
        nationalNumber = normalizedPhone.replace(/[^\d]/g, '');
    }


    if (format.includes('+C') && !countryCode && originCountry) {
        countryCode = COUNTRY_CODES[originCountry].toString();
    }

    if (nationalNumber.length < 7 || nationalNumber.length >= 15) {
        return phone;
    }

    if (nationalNumber.length < 8) {
        return phone;
    }

    let workingNumber = nationalNumber;
    if (workingNumber.length < nationalNumberLength) {
        const paddingNeeded = nationalNumberLength - workingNumber.length;
        workingNumber = leadingDigitPad.repeat(paddingNeeded) + workingNumber;
    } else if (workingNumber.length > nationalNumberLength) {
        workingNumber = workingNumber.slice(-nationalNumberLength);
    }




    if (workingNumber.length > 10) {
        return phone;
    }

    if (format.includes('+C') && !countryCode) {
        countryCode = COUNTRY_CODES[originCountry].toString();
    }

    const isIsrael = false;


    const hasPPP = format.includes('PPP');
    const hasPP = format.includes('PP');

    let prefixLength = 3;
    if (hasPP && !hasPPP) {
        prefixLength = 2;
    } else if (hasPPP) {
        prefixLength = 3;
    }

    // Calculate required length based on format
    let requiredLength = prefixLength + 3 + 4; // Default for PPP - EEE SSSS
    if (nationalNumberLength === 9) {
        requiredLength = 9; // For 9-digit numbers, use 9 digits total
    }

    if (workingNumber.length < requiredLength) {
        return phone;
    }

    const PPP = workingNumber.substring(0, prefixLength);


    let EEE, SSSS;
    if (nationalNumberLength === 9) {
        EEE = workingNumber.substring(prefixLength, prefixLength + 3);
        SSSS = workingNumber.substring(prefixLength + 3, prefixLength + 3 + 3);
    } else if (hasPP && !hasPPP) {
        if ((isIsrael || (workingNumber.length === 10 && workingNumber.startsWith('0'))) && workingNumber.length === 10 && workingNumber.startsWith('0')) {
            EEE = workingNumber.substring(prefixLength + 1, prefixLength + 1 + 3);
            SSSS = workingNumber.substring(prefixLength + 1 + 3, prefixLength + 1 + 3 + 4);
        } else {
            EEE = workingNumber.substring(prefixLength, prefixLength + 3);
            SSSS = workingNumber.substring(prefixLength + 3, prefixLength + 3 + 4);
        }
    } else {
        EEE = workingNumber.substring(prefixLength, prefixLength + 3);
        SSSS = workingNumber.substring(prefixLength + 3, prefixLength + 3 + 4);
    }


    let result = format;

    // Handle E.164 format
    if (format === 'E.164') {
        if (!countryCode && originCountry) {
            countryCode = COUNTRY_CODES[originCountry].toString();
        }
        return '+' + countryCode + workingNumber;
    }

    if (format.includes('+C')) {
        result = result.replace('+C', '+' + countryCode);
    } else if (format.includes('C')) {
        result = result.replace('C', countryCode);
    }

    if (hasPPP) {
        result = result.replace('PPP', PPP);
    }
    if (hasPP) {
        // Replace PP with the first 2 digits of the working number
        result = result.replace('PP', workingNumber.substring(0, 2));
    }


    result = result.replace('EEE', EEE);
    result = result.replace('SSSS', SSSS);

    return result;
}

function findLongestCountryCode(digits: string): string {
    const codes = Object.values(COUNTRY_CODES).map(code => code.toString()).sort((a, b) => b.length - a.length);

    for (const code of codes) {
        if (digits.startsWith(code) && digits.length > code.length) {
            return code;
        }
    }

    return '';
}
