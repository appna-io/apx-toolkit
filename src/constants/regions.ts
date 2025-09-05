/**
 * Region to Currency mapping
 * Maps ISO 3166-1 alpha-2 country codes to ISO 4217 currency codes
 */
export const REGION_CURRENCY_MAP: Record<string, string> = {
    // North America
    US: 'USD', // United States
    CA: 'CAD', // Canada
    MX: 'MXN', // Mexico
    
    // Europe
    GB: 'GBP', // United Kingdom
    DE: 'EUR', // Germany
    FR: 'EUR', // France
    IT: 'EUR', // Italy
    ES: 'EUR', // Spain
    NL: 'EUR', // Netherlands
    BE: 'EUR', // Belgium
    AT: 'EUR', // Austria
    FI: 'EUR', // Finland
    IE: 'EUR', // Ireland
    PT: 'EUR', // Portugal
    GR: 'EUR', // Greece
    SE: 'SEK', // Sweden
    NO: 'NOK', // Norway
    DK: 'DKK', // Denmark
    CH: 'CHF', // Switzerland
    PL: 'PLN', // Poland
    CZ: 'CZK', // Czech Republic
    HU: 'HUF', // Hungary
    RO: 'RON', // Romania
    BG: 'BGN', // Bulgaria
    HR: 'HRK', // Croatia
    SK: 'SKK', // Slovakia
    SI: 'SIT', // Slovenia
    EE: 'EEK', // Estonia
    LV: 'LVL', // Latvia
    LT: 'LTL', // Lithuania
    CY: 'EUR', // Cyprus
    MT: 'EUR', // Malta
    LU: 'EUR', // Luxembourg
    
    // Asia
    CN: 'CNY', // China
    JP: 'JPY', // Japan
    KR: 'KRW', // South Korea
    IN: 'INR', // India
    SG: 'SGD', // Singapore
    HK: 'HKD', // Hong Kong
    TW: 'TWD', // Taiwan
    TH: 'THB', // Thailand
    MY: 'MYR', // Malaysia
    ID: 'IDR', // Indonesia
    PH: 'PHP', // Philippines
    VN: 'VND', // Vietnam
    BD: 'BDT', // Bangladesh
    PK: 'PKR', // Pakistan
    LK: 'LKR', // Sri Lanka
    NP: 'NPR', // Nepal
    MM: 'MMK', // Myanmar
    KH: 'KHR', // Cambodia
    LA: 'LAK', // Laos
    MN: 'MNT', // Mongolia
    KZ: 'KZT', // Kazakhstan
    UZ: 'UZS', // Uzbekistan
    KG: 'KGS', // Kyrgyzstan
    TJ: 'TJS', // Tajikistan
    TM: 'TMT', // Turkmenistan
    AF: 'AFN', // Afghanistan
    IR: 'IRR', // Iran
    IQ: 'IQD', // Iraq
    SA: 'SAR', // Saudi Arabia
    AE: 'AED', // United Arab Emirates
    QA: 'QAR', // Qatar
    KW: 'KWD', // Kuwait
    BH: 'BHD', // Bahrain
    OM: 'OMR', // Oman
    YE: 'YER', // Yemen
    JO: 'JOD', // Jordan
    LB: 'LBP', // Lebanon
    SY: 'SYP', // Syria
    IL: 'ILS', // Israel
    PS: 'ILS', // Palestine
    TR: 'TRY', // Turkey
    GE: 'GEL', // Georgia
    AM: 'AMD', // Armenia
    AZ: 'AZN', // Azerbaijan
    
    // Oceania
    AU: 'AUD', // Australia
    NZ: 'NZD', // New Zealand
    FJ: 'FJD', // Fiji
    PG: 'PGK', // Papua New Guinea
    SB: 'SBD', // Solomon Islands
    VU: 'VUV', // Vanuatu
    NC: 'XPF', // New Caledonia
    PF: 'XPF', // French Polynesia
    
    // Africa
    ZA: 'ZAR', // South Africa
    EG: 'EGP', // Egypt
    NG: 'NGN', // Nigeria
    KE: 'KES', // Kenya
    GH: 'GHS', // Ghana
    ET: 'ETB', // Ethiopia
    UG: 'UGX', // Uganda
    TZ: 'TZS', // Tanzania
    DZ: 'DZD', // Algeria
    MA: 'MAD', // Morocco
    TN: 'TND', // Tunisia
    LY: 'LYD', // Libya
    SD: 'SDG', // Sudan
    SS: 'SSP', // South Sudan
    CM: 'XAF', // Cameroon
    CI: 'XOF', // Ivory Coast
    SN: 'XOF', // Senegal
    BF: 'XOF', // Burkina Faso
    ML: 'XOF', // Mali
    NE: 'XOF', // Niger
    TD: 'XAF', // Chad
    CF: 'XAF', // Central African Republic
    GA: 'XAF', // Gabon
    CG: 'XAF', // Republic of the Congo
    CD: 'CDF', // Democratic Republic of the Congo
    AO: 'AOA', // Angola
    ZM: 'ZMW', // Zambia
    ZW: 'ZWL', // Zimbabwe
    BW: 'BWP', // Botswana
    NA: 'NAD', // Namibia
    SZ: 'SZL', // Eswatini
    LS: 'LSL', // Lesotho
    MG: 'MGA', // Madagascar
    MU: 'MUR', // Mauritius
    SC: 'SCR', // Seychelles
    KM: 'KMF', // Comoros
    DJ: 'DJF', // Djibouti
    SO: 'SOS', // Somalia
    ER: 'ERN', // Eritrea
    RW: 'RWF', // Rwanda
    BI: 'BIF', // Burundi
    MW: 'MWK', // Malawi
    MZ: 'MZN', // Mozambique
    
    // South America
    BR: 'BRL', // Brazil
    AR: 'ARS', // Argentina
    CL: 'CLP', // Chile
    CO: 'COP', // Colombia
    PE: 'PEN', // Peru
    VE: 'VES', // Venezuela
    EC: 'USD', // Ecuador (uses USD)
    BO: 'BOB', // Bolivia
    PY: 'PYG', // Paraguay
    UY: 'UYU', // Uruguay
    GY: 'GYD', // Guyana
    SR: 'SRD', // Suriname
    GF: 'EUR', // French Guiana
    
    // Central America & Caribbean
    CR: 'CRC', // Costa Rica
    PA: 'PAB', // Panama
    NI: 'NIO', // Nicaragua
    HN: 'HNL', // Honduras
    GT: 'GTQ', // Guatemala
    BZ: 'BZD', // Belize
    SV: 'USD', // El Salvador (uses USD)
    CU: 'CUP', // Cuba
    JM: 'JMD', // Jamaica
    HT: 'HTG', // Haiti
    DO: 'DOP', // Dominican Republic
    PR: 'USD', // Puerto Rico (uses USD)
    TT: 'TTD', // Trinidad and Tobago
    BB: 'BBD', // Barbados
    GD: 'XCD', // Grenada
    LC: 'XCD', // Saint Lucia
    VC: 'XCD', // Saint Vincent and the Grenadines
    AG: 'XCD', // Antigua and Barbuda
    DM: 'XCD', // Dominica
    KN: 'XCD', // Saint Kitts and Nevis
    BS: 'BSD', // Bahamas
    TC: 'USD', // Turks and Caicos Islands
    KY: 'KYD', // Cayman Islands
    BM: 'BMD', // Bermuda
    AW: 'AWG', // Aruba
    CW: 'ANG', // Curaçao
    SX: 'ANG', // Sint Maarten
    
    // Special cases and territories
    EU: 'EUR', // European Union
    XK: 'EUR', // Kosovo
    AD: 'EUR', // Andorra
    MC: 'EUR', // Monaco
    SM: 'EUR', // San Marino
    VA: 'EUR', // Vatican City
    LI: 'CHF', // Liechtenstein
    IS: 'ISK', // Iceland
    FO: 'DKK', // Faroe Islands
    GL: 'DKK', // Greenland
    AX: 'EUR', // Åland Islands
    GI: 'GIP', // Gibraltar
    IM: 'GBP', // Isle of Man
    JE: 'GBP', // Jersey
    GG: 'GBP', // Guernsey
    IO: 'USD', // British Indian Ocean Territory
    PN: 'NZD', // Pitcairn Islands
    SH: 'SHP', // Saint Helena
    TA: 'GBP', // Tristan da Cunha
    VG: 'USD', // British Virgin Islands
    AI: 'XCD', // Anguilla
    MS: 'XCD', // Montserrat
    BL: 'EUR', // Saint Barthélemy
    MF: 'EUR', // Saint Martin
    GP: 'EUR', // Guadeloupe
    MQ: 'EUR', // Martinique
    RE: 'EUR', // Réunion
    YT: 'EUR', // Mayotte
    WF: 'XPF', // Wallis and Futuna
    TF: 'EUR', // French Southern Territories
    PM: 'EUR', // Saint Pierre and Miquelon
    AQ: 'USD' // Antarctica (no official currency, using USD as fallback)
};

/**
 * Get currency code for a given region
 * @param region - ISO 3166-1 alpha-2 country code
 * @returns ISO 4217 currency code or undefined if not found
 */
export const getCurrencyForRegion = (region: string): string | undefined => {
    return REGION_CURRENCY_MAP[region.toUpperCase()];
};

/**
 * Get all supported regions
 * @returns Array of all supported region codes
 */
export const getSupportedRegions = (): string[] => {
    return Object.keys(REGION_CURRENCY_MAP);
};

/**
 * Get all supported currencies
 * @returns Array of all supported currency codes
 */
export const getSupportedCurrencies = (): string[] => {
    return [...new Set(Object.values(REGION_CURRENCY_MAP))];
};
