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
    | "PPP - EEE SSSS"
    | "(PPP) - EEE SSSS"
    | "(PP)  EEE SSSS"
    | "PP-EEE SSSS"
    | "PPP-EEE SSSS"
    | "+C (PPP)-EEE-SSSS"
    | "+C (PPP) EEESSSS"
    | string,
  options?: {
    leadingDigitPad?: string
    inputIncludesCountry?: boolean | "autoDetect"
    nationalNumberLength?: number
    originCountry?: keyof typeof COUNTRY_CODES
  }
): string {
  const {
    leadingDigitPad = "0",
    inputIncludesCountry = "autoDetect",
    nationalNumberLength = 10,
    originCountry = "IL"
  } = options || {};

  if (!phone || typeof phone !== 'string') {
    return phone;
  }

  let normalizedPhone = phone.trim();
  let countryCode = '';
  let nationalNumber = '';

  if (inputIncludesCountry === "autoDetect" || inputIncludesCountry === true) {
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
      if (countryMatch && digitsOnly.length > countryMatch.length && digitsOnly.length >= 12) {
        countryCode = countryMatch;
        nationalNumber = digitsOnly.substring(countryMatch.length);
      } else {
        nationalNumber = digitsOnly;
      }
    }
  } else {
    nationalNumber = normalizedPhone.replace(/[^\d]/g, '');
  }

  if (nationalNumber.length < 9 || nationalNumber.length > nationalNumberLength) {
        return phone;
    }
    
  let workingNumber = nationalNumber;
  if (workingNumber.length < nationalNumberLength) {
    const paddingNeeded = nationalNumberLength - workingNumber.length;
    workingNumber = leadingDigitPad.repeat(paddingNeeded) + workingNumber;
  } else {
    workingNumber = workingNumber.slice(-nationalNumberLength);
  }

  let detectedCountryCode = countryCode;
  if (format.includes('+C') && !countryCode) {
    countryCode = COUNTRY_CODES[originCountry].toString();
  }

  const isIsrael = detectedCountryCode === '972';
  if (isIsrael && workingNumber.length === 10 && !workingNumber.startsWith('0')) {
    workingNumber = '0' + workingNumber.slice(-9);
  }

  const hasPP = format.includes('PP') && !format.includes('PPP');
  const hasPPP = format.includes('PPP');
  
  let prefixLength = 3;
  if (hasPP && !hasPPP) {
    prefixLength = 2;
  } else if (hasPPP) {
    prefixLength = 3;
  }

  if (workingNumber.length < prefixLength + 3 + 4) {
        return phone;
    }
    
  const PPP = workingNumber.substring(0, prefixLength);
  const EEE = workingNumber.substring(prefixLength, prefixLength + 3);
  const SSSS = workingNumber.substring(prefixLength + 3, prefixLength + 3 + 4);

  let result = format;
  
  if (format.includes('+C')) {
    result = result.replace('+C', '+' + countryCode);
  } else if (format.includes('C')) {
    result = result.replace('C', countryCode);
  }
  
  if (hasPPP) {
    result = result.replace('PPP', PPP);
  } else if (hasPP) {
    result = result.replace('PP', PPP.substring(0, 2));
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
