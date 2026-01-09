import { KeyOf } from '../common-types/index.js';

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
    en: { nativeName: 'English', label: 'English', locale: 'en-US', regex: /^[A-Za-z0-9]+$/ },
    he: { nativeName: 'עברית', label: 'Hebrew', locale: 'he-IL', regex: /^[\u0590-\u05FF0-9]+$/ },
    ar: { nativeName: 'العربية', label: 'Arabic', locale: 'ar-SA', regex: /^[\u0600-\u06FF\u0750-\u077F0-9]+$/ },
    es: { nativeName: 'Español', label: 'Spanish', locale: 'es-ES', regex: /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]+$/ },
    fr: { nativeName: 'Français', label: 'French', locale: 'fr-FR', regex: /^[A-Za-z0-9ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ]+$/ },
    de: { nativeName: 'Deutsch', label: 'German', locale: 'de-DE', regex: /^[A-Za-z0-9ÄÖÜßäöü]+$/ },
    it: { nativeName: 'Italiano', label: 'Italian', locale: 'it-IT', regex: /^[A-Za-z0-9ÀÉÈÌÍÒÓÙàéèìíòóù]+$/ },
    pt: { nativeName: 'Português', label: 'Portuguese', locale: 'pt-PT', regex: /^[A-Za-z0-9ÁÂÃÇÉÊÍÓÔÕÚáâãçéêíóôõú]+$/ },
    ru: { nativeName: 'Русский', label: 'Russian', locale: 'ru-RU', regex: /^[\u0400-\u04FF0-9]+$/ },
    zh: { nativeName: '中文', label: 'Chinese', locale: 'zh-CN', regex: /^[\u4E00-\u9FFF]+$/ },
    ja: { nativeName: '日本語', label: 'Japanese', locale: 'ja-JP', regex: /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+$/ },
    ko: { nativeName: '한국어', label: 'Korean', locale: 'ko-KR', regex: /^[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]+$/ },
    hi: { nativeName: 'हिन्दी', label: 'Hindi', locale: 'hi-IN', regex: /^[\u0900-\u097F0-9]+$/ },
    tr: { nativeName: 'Türkçe', label: 'Turkish', locale: 'tr-TR', regex: /^[A-Za-zÇĞİÖŞÜçğıöşü0-9]+$/ },
    nl: { nativeName: 'Nederlands', label: 'Dutch', locale: 'nl-NL', regex: /^[A-Za-z0-9]+$/ },
    pl: { nativeName: 'Polski', label: 'Polish', locale: 'pl-PL', regex: /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9]+$/ },
    sv: { nativeName: 'Svenska', label: 'Swedish', locale: 'sv-SE', regex: /^[A-Za-zÅÄÖåäö0-9]+$/ },
    no: { nativeName: 'Norsk', label: 'Norwegian', locale: 'no-NO', regex: /^[A-Za-zÆØÅæøå0-9]+$/ },
    da: { nativeName: 'Dansk', label: 'Danish', locale: 'da-DK', regex: /^[A-Za-zÆØÅæøå0-9]+$/ },
    fi: { nativeName: 'Suomi', label: 'Finnish', locale: 'fi-FI', regex: /^[A-Za-zÅÄÖåäö0-9]+$/ },
    cs: { nativeName: 'Čeština', label: 'Czech', locale: 'cs-CZ', regex: /^[A-Za-zÁČĎÉĚÍŇÓŘŠŤÚŮÝŽáčďéěíňóřšťúůýž0-9]+$/ },
    ro: { nativeName: 'Română', label: 'Romanian', locale: 'ro-RO', regex: /^[A-Za-zĂÂÎȘȘȚăâîșșț0-9]+$/ },
    bg: { nativeName: 'Български', label: 'Bulgarian', locale: 'bg-BG', regex: /^[\u0400-\u04FF0-9]+$/ },
    uk: { nativeName: 'Українська', label: 'Ukrainian', locale: 'uk-UA', regex: /^[\u0400-\u04FFҐґЄєІіЇї0-9]+$/ },
    el: { nativeName: 'Ελληνικά', label: 'Greek', locale: 'el-GR', regex: /^[\u0370-\u03FF0-9]+$/ },
    fa: { nativeName: 'فارسی', label: 'Persian', locale: 'fa-IR', regex: /^[\u0600-\u06FF0-9]+$/ },
    ur: { nativeName: 'اردو', label: 'Urdu', locale: 'ur-PK', regex: /^[\u0600-\u06FF0-9]+$/ },
    bn: { nativeName: 'বাংলা', label: 'Bengali', locale: 'bn-BD', regex: /^[\u0980-\u09FF0-9]+$/ },
    ta: { nativeName: 'தமிழ்', label: 'Tamil', locale: 'ta-IN', regex: /^[\u0B80-\u0BFF0-9]+$/ },
    te: { nativeName: 'తెలుగు', label: 'Telugu', locale: 'te-IN', regex: /^[\u0C00-\u0C7F0-9]+$/ },
    kn: { nativeName: 'ಕನ್ನಡ', label: 'Kannada', locale: 'kn-IN', regex: /^[\u0C80-\u0CFF0-9]+$/ },
    ml: { nativeName: 'മലയാളം', label: 'Malayalam', locale: 'ml-IN', regex: /^[\u0D00-\u0D7F0-9]+$/ },
    gu: { nativeName: 'ગુજરાતી', label: 'Gujarati', locale: 'gu-IN', regex: /^[\u0A80-\u0AFF0-9]+$/ },
    pa: { nativeName: 'ਪੰਜਾਬੀ', label: 'Punjabi', locale: 'pa-IN', regex: /^[\u0A00-\u0A7F0-9]+$/ },
    si: { nativeName: 'සිංහල', label: 'Sinhala', locale: 'si-LK', regex: /^[\u0D80-\u0DFF0-9]+$/ },
    th: { nativeName: 'ไทย', label: 'Thai', locale: 'th-TH', regex: /^[\u0E00-\u0E7F0-9]+$/ },
    vi: { nativeName: 'Tiếng Việt', label: 'Vietnamese', locale: 'vi-VN', regex: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềể0-9]+$/ }
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

export const isValidTextForLanguage = (text: string, language: KeyOf<typeof LANGUAGES>): boolean => {
    const lang = LANGUAGES[language];
    if (!lang || !lang.regex) return false;
    const cleaned = text.normalize('NFC').replace(/\s+/g, '');
    if (!cleaned) return false;
    return lang.regex.test(cleaned);
  };
  