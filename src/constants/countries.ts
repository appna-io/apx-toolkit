/**
 * Common countries with their codes and names
 */
export interface Country {
  code: string;
  name: string;
  phoneCode?: string;
}

export const COUNTRIES: Country[] = [
    { code: 'US', name: 'United States', phoneCode: '+1' },
    { code: 'IL', name: 'Israel', phoneCode: '+972' },
    { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
    { code: 'CA', name: 'Canada', phoneCode: '+1' },
    { code: 'AU', name: 'Australia', phoneCode: '+61' },
    { code: 'DE', name: 'Germany', phoneCode: '+49' },
    { code: 'FR', name: 'France', phoneCode: '+33' },
    { code: 'IT', name: 'Italy', phoneCode: '+39' },
    { code: 'ES', name: 'Spain', phoneCode: '+34' },
    { code: 'NL', name: 'Netherlands', phoneCode: '+31' },
    { code: 'SE', name: 'Sweden', phoneCode: '+46' },
    { code: 'NO', name: 'Norway', phoneCode: '+47' },
    { code: 'DK', name: 'Denmark', phoneCode: '+45' },
    { code: 'FI', name: 'Finland', phoneCode: '+358' },
    { code: 'CH', name: 'Switzerland', phoneCode: '+41' },
    { code: 'AT', name: 'Austria', phoneCode: '+43' },
    { code: 'BE', name: 'Belgium', phoneCode: '+32' },
    { code: 'IE', name: 'Ireland', phoneCode: '+353' },
    { code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
    { code: 'JP', name: 'Japan', phoneCode: '+81' },
    { code: 'KR', name: 'South Korea', phoneCode: '+82' },
    { code: 'CN', name: 'China', phoneCode: '+86' },
    { code: 'IN', name: 'India', phoneCode: '+91' },
    { code: 'BR', name: 'Brazil', phoneCode: '+55' },
    { code: 'MX', name: 'Mexico', phoneCode: '+52' },
    { code: 'AR', name: 'Argentina', phoneCode: '+54' },
    { code: 'CL', name: 'Chile', phoneCode: '+56' },
    { code: 'CO', name: 'Colombia', phoneCode: '+57' },
    { code: 'PE', name: 'Peru', phoneCode: '+51' },
    { code: 'ZA', name: 'South Africa', phoneCode: '+27' },
    { code: 'EG', name: 'Egypt', phoneCode: '+20' },
    { code: 'NG', name: 'Nigeria', phoneCode: '+234' },
    { code: 'KE', name: 'Kenya', phoneCode: '+254' },
    { code: 'MA', name: 'Morocco', phoneCode: '+212' },
    { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
    { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971' },
    { code: 'TR', name: 'Turkey', phoneCode: '+90' },
    { code: 'RU', name: 'Russia', phoneCode: '+7' },
    { code: 'PL', name: 'Poland', phoneCode: '+48' },
    { code: 'CZ', name: 'Czech Republic', phoneCode: '+420' },
    { code: 'HU', name: 'Hungary', phoneCode: '+36' },
    { code: 'RO', name: 'Romania', phoneCode: '+40' },
    { code: 'BG', name: 'Bulgaria', phoneCode: '+359' },
    { code: 'HR', name: 'Croatia', phoneCode: '+385' },
    { code: 'SI', name: 'Slovenia', phoneCode: '+386' },
    { code: 'SK', name: 'Slovakia', phoneCode: '+421' },
    { code: 'LT', name: 'Lithuania', phoneCode: '+370' },
    { code: 'LV', name: 'Latvia', phoneCode: '+371' },
    { code: 'EE', name: 'Estonia', phoneCode: '+372' },
    { code: 'GR', name: 'Greece', phoneCode: '+30' },
    { code: 'PT', name: 'Portugal', phoneCode: '+351' },
    { code: 'MT', name: 'Malta', phoneCode: '+356' },
    { code: 'CY', name: 'Cyprus', phoneCode: '+357' },
    { code: 'LU', name: 'Luxembourg', phoneCode: '+352' },
    { code: 'IS', name: 'Iceland', phoneCode: '+354' },
    { code: 'MC', name: 'Monaco', phoneCode: '+377' },
    { code: 'LI', name: 'Liechtenstein', phoneCode: '+423' },
    { code: 'AD', name: 'Andorra', phoneCode: '+376' },
    { code: 'SM', name: 'San Marino', phoneCode: '+378' },
    { code: 'VA', name: 'Vatican City', phoneCode: '+379' }
];

/**
 * Get country by code
 */
export const getCountryByCode = (code: string): Country | undefined => {
    return COUNTRIES.find(country => country.code === code.toUpperCase());
};

/**
 * Get country by name
 */
export const getCountryByName = (name: string): Country | undefined => {
    return COUNTRIES.find(country => 
        country.name.toLowerCase() === name.toLowerCase()
    );
};

/**
 * Get countries by phone code
 */
export const getCountriesByPhoneCode = (phoneCode: string): Country[] => {
    return COUNTRIES.filter(country => country.phoneCode === phoneCode);
}; 