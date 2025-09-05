import { KeyOf } from '../common-types';

/**
 * Common languages with their codes and names
 */
export interface ApxLanguageObject {
  label: string;
  nativeName?: string;
  locale: string;
}
export type ApxLanguage = Record<KeyOf<typeof LANGUAGES>, ApxLanguageObject>;

export const RTL_LANGUAGES: string[] = ['ar', 'he', 'fa', 'ur'];

export const LANGUAGES = {
    en: { nativeName: 'English', label: 'English', locale: 'en-US' },
    he: { nativeName: 'עברית', label: 'Hebrew', locale: 'he-IL' },
    ar: { nativeName: 'العربية', label: 'Arabic', locale: 'ar-SA' },
    es: { nativeName: 'Español', label: 'Spanish', locale: 'es-ES' },
    fr: { nativeName: 'Français', label: 'French', locale: 'fr-FR' },
    de: { nativeName: 'Deutsch', label: 'German', locale: 'de-DE' },
    it: { nativeName: 'Italiano', label: 'Italian', locale: 'it-IT' },
    pt: { nativeName: 'Português', label: 'Portuguese', locale: 'pt-PT' },
    ru: { nativeName: 'Русский', label: 'Russian', locale: 'ru-RU' },
    zh: { nativeName: '中文', label: 'Chinese', locale: 'zh-CN' },
    ja: { nativeName: '日本語', label: 'Japanese', locale: 'ja-JP' },
    ko: { nativeName: '한국어', label: 'Korean', locale: 'ko-KR' },
    hi: { nativeName: 'हिन्दी', label: 'Hindi', locale: 'hi-IN' },
    tr: { nativeName: 'Türkçe', label: 'Turkish', locale: 'tr-TR' },
    nl: { nativeName: 'Nederlands', label: 'Dutch', locale: 'nl-NL' },
    pl: { nativeName: 'Polski', label: 'Polish', locale: 'pl-PL' },
    sv: { nativeName: 'Svenska', label: 'Swedish', locale: 'sv-SE' },
    no: { nativeName: 'Norsk', label: 'Norwegian', locale: 'no-NO' },
    da: { nativeName: 'Dansk', label: 'Danish', locale: 'da-DK' },
    fi: { nativeName: 'Suomi', label: 'Finnish', locale: 'fi-FI' },
    cs: { nativeName: 'Čeština', label: 'Czech', locale: 'cs-CZ' },
    hu: { nativeName: 'Magyar', label: 'Hungarian', locale: 'hu-HU' },
    ro: { nativeName: 'Română', label: 'Romanian', locale: 'ro-RO' },
    bg: { nativeName: 'Български', label: 'Bulgarian', locale: 'bg-BG' },
    hr: { nativeName: 'Hrvatski', label: 'Croatian', locale: 'hr-HR' },
    sk: { nativeName: 'Slovenčina', label: 'Slovak', locale: 'sk-SK' },
    sl: { nativeName: 'Slovenščina', label: 'Slovenian', locale: 'sl-SI' },
    et: { nativeName: 'Eesti', label: 'Estonian', locale: 'et-EE' },
    lv: { nativeName: 'Latviešu', label: 'Latvian', locale: 'lv-LV' },
    lt: { nativeName: 'Lietuvių', label: 'Lithuanian', locale: 'lt-LT' },
    el: { nativeName: 'Ελληνικά', label: 'Greek', locale: 'el-GR' },
    mt: { nativeName: 'Malti', label: 'Maltese', locale: 'mt-MT' },
    cy: { nativeName: 'Cymraeg', label: 'Welsh', locale: 'cy-GB' },
    ga: { nativeName: 'Gaeilge', label: 'Irish', locale: 'ga-IE' },
    is: { nativeName: 'Íslenska', label: 'Icelandic', locale: 'is-IS' },
    fo: { nativeName: 'Føroyskt', label: 'Faroese', locale: 'fo-FO' },
    sq: { nativeName: 'Shqip', label: 'Albanian', locale: 'sq-AL' },
    mk: { nativeName: 'Македонски', label: 'Macedonian', locale: 'mk-MK' },
    sr: { nativeName: 'Српски', label: 'Serbian', locale: 'sr-RS' },
    bs: { nativeName: 'Bosanski', label: 'Bosnian', locale: 'bs-BA' },
    me: { nativeName: 'Crnogorski', label: 'Montenegrin', locale: 'me-ME' },
    uk: { nativeName: 'Українська', label: 'Ukrainian', locale: 'uk-UA' },
    be: { nativeName: 'Беларуская', label: 'Belarusian', locale: 'be-BY' },
    kk: { nativeName: 'Қазақша', label: 'Kazakh', locale: 'kk-KZ' },
    ky: { nativeName: 'Кыргызча', label: 'Kyrgyz', locale: 'ky-KG' },
    uz: { nativeName: 'Oʻzbekcha', label: 'Uzbek', locale: 'uz-UZ' },
    tg: { nativeName: 'Тоҷикӣ', label: 'Tajik', locale: 'tg-TJ' },
    mn: { nativeName: 'Монгол', label: 'Mongolian', locale: 'mn-MN' },
    ka: { nativeName: 'ქართული', label: 'Georgian', locale: 'ka-GE' },
    hy: { nativeName: 'Հայերեն', label: 'Armenian', locale: 'hy-AM' },
    az: { nativeName: 'Azərbaycanca', label: 'Azerbaijani', locale: 'az-AZ' },
    fa: { nativeName: 'فارسی', label: 'Persian', locale: 'fa-IR' },
    ur: { nativeName: 'اردو', label: 'Urdu', locale: 'ur-PK' },
    bn: { nativeName: 'বাংলা', label: 'Bengali', locale: 'bn-BD' },
    ta: { nativeName: 'தமிழ்', label: 'Tamil', locale: 'ta-IN' },
    te: { nativeName: 'తెలుగు', label: 'Telugu', locale: 'te-IN' },
    kn: { nativeName: 'ಕನ್ನಡ', label: 'Kannada', locale: 'kn-IN' },
    ml: { nativeName: 'മലയാളം', label: 'Malayalam', locale: 'ml-IN' },
    gu: { nativeName: 'ગુજરાતી', label: 'Gujarati', locale: 'gu-IN' },
    pa: { nativeName: 'ਪੰਜਾਬੀ', label: 'Punjabi', locale: 'pa-IN' },
    or: { nativeName: 'ଓଡ଼ିଆ', label: 'Odia', locale: 'or-IN' },
    as: { nativeName: 'অসমীয়া', label: 'Assamese', locale: 'as-IN' },
    ne: { nativeName: 'नेपाली', label: 'Nepali', locale: 'ne-NP' },
    si: { nativeName: 'සිංහල', label: 'Sinhala', locale: 'si-LK' },
    my: { nativeName: 'မြန်မာဘာသာ', label: 'Burmese', locale: 'my-MM' },
    km: { nativeName: 'ភាសាខ្មែរ', label: 'Khmer', locale: 'km-KH' },
    lo: { nativeName: 'ລາວ', label: 'Lao', locale: 'lo-LA' },
    th: { nativeName: 'ไทย', label: 'Thai', locale: 'th-TH' },
    vi: { nativeName: 'Tiếng Việt', label: 'Vietnamese', locale: 'vi-VN' },
    id: { nativeName: 'Bahasa Indonesia', label: 'Indonesian', locale: 'id-ID' },
    ms: { nativeName: 'Bahasa Melayu', label: 'Malay', locale: 'ms-MY' },
    tl: { nativeName: 'Tagalog', label: 'Tagalog', locale: 'tl-PH' },
    sw: { nativeName: 'Kiswahili', label: 'Swahili', locale: 'sw-KE' },
    am: { nativeName: 'አማርኛ', label: 'Amharic', locale: 'am-ET' },
    yo: { nativeName: 'Yorùbá', label: 'Yoruba', locale: 'yo-NG' },
    ig: { nativeName: 'Igbo', label: 'Igbo', locale: 'ig-NG' },
    ha: { nativeName: 'Hausa', label: 'Hausa', locale: 'ha-NG' },
    zu: { nativeName: 'isiZulu', label: 'Zulu', locale: 'zu-ZA' },
    xh: { nativeName: 'isiXhosa', label: 'Xhosa', locale: 'xh-ZA' },
    af: { nativeName: 'Afrikaans', label: 'Afrikaans', locale: 'af-ZA' }
} as const;

/**
 * Get language by locale
 * @param locale - Locale string (e.g., 'en-US', 'he-IL', 'ar-SA')
 * @returns Language object or undefined if not found
 */export const getLanguageByLocale = (locale: string): {key: KeyOf<typeof LANGUAGES>, lang: ApxLanguageObject} | null => {
    const langKey = Object.keys(LANGUAGES).find(lang => LANGUAGES[lang as keyof typeof LANGUAGES].locale === locale);
    if (!langKey) {
        return null;   
    }
    const lang = LANGUAGES[langKey as keyof typeof LANGUAGES];
    if (!lang) {
        return null;
    }
    return {
        key: langKey as KeyOf<typeof LANGUAGES>,
        lang
    };
};

/**
 * Get language by code
 */
export const getLanguageByCode = (code: KeyOf<typeof LANGUAGES>): ApxLanguageObject | undefined => {
    return LANGUAGES[code];
};

/**
 * Check if language is RTL
 */
export const isLanguageRTL = (code: string): boolean => {
    return RTL_LANGUAGES.includes(code.toLowerCase());
};

/**
 * Get language by label
 */
export const getLanguageByLabel = (label: string): ApxLanguageObject | undefined => {
    return Object.values(LANGUAGES).find(lang =>
        lang.label.toLowerCase() === label.toLowerCase()
    );
};

/**
 * Get supported language codes
 */
export const getSupportedLanguageCodes = (): string[] => {
    return Object.keys(LANGUAGES);
};