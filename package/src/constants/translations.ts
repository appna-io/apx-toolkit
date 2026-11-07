

/**
 * Time units with their translations
 */
export type TimeUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'mo' | 'y';

/**
 * Day names for reference
 */
export const DAY_NAMES = [
    'sunday',
    'monday', 
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
] as const;

export type DayName = typeof DAY_NAMES[number];

/**
 * Month names for reference
 */
export const MONTH_NAMES = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
] as const;

export type MonthName = typeof MONTH_NAMES[number];

/**
 * Day translation interface
 */
export interface DayTranslation {
    short: string;
    long: string;
}

/**
 * Month translation interface
 */
export interface MonthTranslation {
    short: string;
    long: string;
}

/**
 * Days of the week translations for multiple languages
 */
export const DAYS_TRANSLATIONS: Record<string, Record<DayName, DayTranslation>> = {
    en: {
        sunday: { short: 'Sun', long: 'Sunday' },
        monday: { short: 'Mon', long: 'Monday' },
        tuesday: { short: 'Tue', long: 'Tuesday' },
        wednesday: { short: 'Wed', long: 'Wednesday' },
        thursday: { short: 'Thu', long: 'Thursday' },
        friday: { short: 'Fri', long: 'Friday' },
        saturday: { short: 'Sat', long: 'Saturday' }
    },
    he: {
        sunday: { short: 'א\'', long: 'ראשון' },
        monday: { short: 'ב\'', long: 'שני' },
        tuesday: { short: 'ג\'', long: 'שלישי' },
        wednesday: { short: 'ד\'', long: 'רביעי' },
        thursday: { short: 'ה\'', long: 'חמישי' },
        friday: { short: 'ו\'', long: 'שישי' },
        saturday: { short: 'ש\'', long: 'שבת' }
    },
    ar: {
        sunday: { short: 'أحد', long: 'الأحد' },
        monday: { short: 'اثنين', long: 'الاثنين' },
        tuesday: { short: 'ثلاثاء', long: 'الثلاثاء' },
        wednesday: { short: 'أربعاء', long: 'الأربعاء' },
        thursday: { short: 'خميس', long: 'الخميس' },
        friday: { short: 'جمعة', long: 'الجمعة' },
        saturday: { short: 'سبت', long: 'السبت' }
    },
    es: {
        sunday: { short: 'dom', long: 'Domingo' },
        monday: { short: 'lun', long: 'Lunes' },
        tuesday: { short: 'mar', long: 'Martes' },
        wednesday: { short: 'mié', long: 'Miércoles' },
        thursday: { short: 'jue', long: 'Jueves' },
        friday: { short: 'vie', long: 'Viernes' },
        saturday: { short: 'sáb', long: 'Sábado' }
    },
    fr: {
        sunday: { short: 'dim', long: 'Dimanche' },
        monday: { short: 'lun', long: 'Lundi' },
        tuesday: { short: 'mar', long: 'Mardi' },
        wednesday: { short: 'mer', long: 'Mercredi' },
        thursday: { short: 'jeu', long: 'Jeudi' },
        friday: { short: 'ven', long: 'Vendredi' },
        saturday: { short: 'sam', long: 'Samedi' }
    },
    de: {
        sunday: { short: 'so', long: 'Sonntag' },
        monday: { short: 'mo', long: 'Montag' },
        tuesday: { short: 'di', long: 'Dienstag' },
        wednesday: { short: 'mi', long: 'Mittwoch' },
        thursday: { short: 'do', long: 'Donnerstag' },
        friday: { short: 'fr', long: 'Freitag' },
        saturday: { short: 'sa', long: 'Samstag' }
    },
    it: {
        sunday: { short: 'dom', long: 'Domenica' },
        monday: { short: 'lun', long: 'Lunedì' },
        tuesday: { short: 'mar', long: 'Martedì' },
        wednesday: { short: 'mer', long: 'Mercoledì' },
        thursday: { short: 'gio', long: 'Giovedì' },
        friday: { short: 'ven', long: 'Venerdì' },
        saturday: { short: 'sab', long: 'Sabato' }
    },
    pt: {
        sunday: { short: 'dom', long: 'Domingo' },
        monday: { short: 'seg', long: 'Segunda-feira' },
        tuesday: { short: 'ter', long: 'Terça-feira' },
        wednesday: { short: 'qua', long: 'Quarta-feira' },
        thursday: { short: 'qui', long: 'Quinta-feira' },
        friday: { short: 'sex', long: 'Sexta-feira' },
        saturday: { short: 'sáb', long: 'Sábado' }
    },
    ru: {
        sunday: { short: 'вс', long: 'Воскресенье' },
        monday: { short: 'пн', long: 'Понедельник' },
        tuesday: { short: 'вт', long: 'Вторник' },
        wednesday: { short: 'ср', long: 'Среда' },
        thursday: { short: 'чт', long: 'Четверг' },
        friday: { short: 'пт', long: 'Пятница' },
        saturday: { short: 'сб', long: 'Суббота' }
    },
    zh: {
        sunday: { short: '日', long: '星期日' },
        monday: { short: '一', long: '星期一' },
        tuesday: { short: '二', long: '星期二' },
        wednesday: { short: '三', long: '星期三' },
        thursday: { short: '四', long: '星期四' },
        friday: { short: '五', long: '星期五' },
        saturday: { short: '六', long: '星期六' }
    }
};

/**
 * Months translations for multiple languages
 */
export const MONTHS_TRANSLATIONS: Record<string, Record<MonthName, MonthTranslation>> = {
    en: {
        january: { short: 'Jan', long: 'January' },
        february: { short: 'Feb', long: 'February' },
        march: { short: 'Mar', long: 'March' },
        april: { short: 'Apr', long: 'April' },
        may: { short: 'May', long: 'May' },
        june: { short: 'Jun', long: 'June' },
        july: { short: 'Jul', long: 'July' },
        august: { short: 'Aug', long: 'August' },
        september: { short: 'Sep', long: 'September' },
        october: { short: 'Oct', long: 'October' },
        november: { short: 'Nov', long: 'November' },
        december: { short: 'Dec', long: 'December' }
    },
    he: {
        january: { short: 'ינו', long: 'ינואר' },
        february: { short: 'פבר', long: 'פברואר' },
        march: { short: 'מרץ', long: 'מרץ' },
        april: { short: 'אפר', long: 'אפריל' },
        may: { short: 'מאי', long: 'מאי' },
        june: { short: 'יונ', long: 'יוני' },
        july: { short: 'יול', long: 'יולי' },
        august: { short: 'אוג', long: 'אוגוסט' },
        september: { short: 'ספט', long: 'ספטמבר' },
        october: { short: 'אוק', long: 'אוקטובר' },
        november: { short: 'נוב', long: 'נובמבר' },
        december: { short: 'דצמ', long: 'דצמבר' }
    },
    ar: {
        january: { short: 'يناير', long: 'يناير' },
        february: { short: 'فبراير', long: 'فبراير' },
        march: { short: 'مارس', long: 'مارس' },
        april: { short: 'أبريل', long: 'أبريل' },
        may: { short: 'مايو', long: 'مايو' },
        june: { short: 'يونيو', long: 'يونيو' },
        july: { short: 'يوليو', long: 'يوليو' },
        august: { short: 'أغسطس', long: 'أغسطس' },
        september: { short: 'سبتمبر', long: 'سبتمبر' },
        october: { short: 'أكتوبر', long: 'أكتوبر' },
        november: { short: 'نوفمبر', long: 'نوفمبر' },
        december: { short: 'ديسمبر', long: 'ديسمبر' }
    },
    es: {
        january: { short: 'ene', long: 'Enero' },
        february: { short: 'feb', long: 'Febrero' },
        march: { short: 'mar', long: 'Marzo' },
        april: { short: 'abr', long: 'Abril' },
        may: { short: 'may', long: 'Mayo' },
        june: { short: 'jun', long: 'Junio' },
        july: { short: 'jul', long: 'Julio' },
        august: { short: 'ago', long: 'Agosto' },
        september: { short: 'sep', long: 'Septiembre' },
        october: { short: 'oct', long: 'Octubre' },
        november: { short: 'nov', long: 'Noviembre' },
        december: { short: 'dic', long: 'Diciembre' }
    },
    fr: {
        january: { short: 'jan', long: 'Janvier' },
        february: { short: 'fév', long: 'Février' },
        march: { short: 'mar', long: 'Mars' },
        april: { short: 'avr', long: 'Avril' },
        may: { short: 'mai', long: 'Mai' },
        june: { short: 'jun', long: 'Juin' },
        july: { short: 'jui', long: 'Juillet' },
        august: { short: 'aoû', long: 'Août' },
        september: { short: 'sep', long: 'Septembre' },
        october: { short: 'oct', long: 'Octobre' },
        november: { short: 'nov', long: 'Novembre' },
        december: { short: 'déc', long: 'Décembre' }
    },
    de: {
        january: { short: 'Jan', long: 'Januar' },
        february: { short: 'Feb', long: 'Februar' },
        march: { short: 'Mär', long: 'März' },
        april: { short: 'Apr', long: 'April' },
        may: { short: 'Mai', long: 'Mai' },
        june: { short: 'Jun', long: 'Juni' },
        july: { short: 'Jul', long: 'Juli' },
        august: { short: 'Aug', long: 'August' },
        september: { short: 'Sep', long: 'September' },
        october: { short: 'Okt', long: 'Oktober' },
        november: { short: 'Nov', long: 'November' },
        december: { short: 'Dez', long: 'Dezember' }
    },
    it: {
        january: { short: 'gen', long: 'Gennaio' },
        february: { short: 'feb', long: 'Febbraio' },
        march: { short: 'mar', long: 'Marzo' },
        april: { short: 'apr', long: 'Aprile' },
        may: { short: 'mag', long: 'Maggio' },
        june: { short: 'giu', long: 'Giugno' },
        july: { short: 'lug', long: 'Luglio' },
        august: { short: 'ago', long: 'Agosto' },
        september: { short: 'set', long: 'Settembre' },
        october: { short: 'ott', long: 'Ottobre' },
        november: { short: 'nov', long: 'Novembre' },
        december: { short: 'dic', long: 'Dicembre' }
    },
    pt: {
        january: { short: 'jan', long: 'Janeiro' },
        february: { short: 'fev', long: 'Fevereiro' },
        march: { short: 'mar', long: 'Março' },
        april: { short: 'abr', long: 'Abril' },
        may: { short: 'mai', long: 'Maio' },
        june: { short: 'jun', long: 'Junho' },
        july: { short: 'jul', long: 'Julho' },
        august: { short: 'ago', long: 'Agosto' },
        september: { short: 'set', long: 'Setembro' },
        october: { short: 'out', long: 'Outubro' },
        november: { short: 'nov', long: 'Novembro' },
        december: { short: 'dez', long: 'Dezembro' }
    },
    ru: {
        january: { short: 'янв', long: 'Январь' },
        february: { short: 'фев', long: 'Февраль' },
        march: { short: 'мар', long: 'Март' },
        april: { short: 'апр', long: 'Апрель' },
        may: { short: 'май', long: 'Май' },
        june: { short: 'июн', long: 'Июнь' },
        july: { short: 'июл', long: 'Июль' },
        august: { short: 'авг', long: 'Август' },
        september: { short: 'сен', long: 'Сентябрь' },
        october: { short: 'окт', long: 'Октябрь' },
        november: { short: 'ноя', long: 'Ноябрь' },
        december: { short: 'дек', long: 'Декабрь' }
    },
    zh: {
        january: { short: '1月', long: '一月' },
        february: { short: '2月', long: '二月' },
        march: { short: '3月', long: '三月' },
        april: { short: '4月', long: '四月' },
        may: { short: '5月', long: '五月' },
        june: { short: '6月', long: '六月' },
        july: { short: '7月', long: '七月' },
        august: { short: '8月', long: '八月' },
        september: { short: '9月', long: '九月' },
        october: { short: '10月', long: '十月' },
        november: { short: '11月', long: '十一月' },
        december: { short: '12月', long: '十二月' }
    }
};

/**
 * Locale-specific conjunction for "at" in date formatting
 */
export const LOCALE_CONJUNCTIONS: Record<string, string> = {
    'en-US': 'at',
    'en-GB': 'at',
    'es-ES': 'a las',
    'es-MX': 'a las',
    'fr-FR': 'à',
    'de-DE': 'um',
    'it-IT': 'alle',
    'pt-PT': 'às',
    'pt-BR': 'às',
    'ru-RU': 'в',
    'zh-CN': '在',
    'ja-JP': 'の',
    'ko-KR': '에',
    'ar-SA': 'في',
    'he-IL': 'ב-',
    'hi-IN': 'पर',
    'tr-TR': 'saat',
    'nl-NL': 'om',
    'pl-PL': 'o',
    'sv-SE': 'kl',
    'no-NO': 'kl',
    'da-DK': 'kl',
    'fi-FI': 'klo',
    'cs-CZ': 'v',
    'hu-HU': 'kor',
    'ro-RO': 'la',
    'bg-BG': 'в',
    'hr-HR': 'u',
    'sk-SK': 'o',
    'sl-SI': 'ob',
    'et-EE': 'kell',
    'lv-LV': 'plkst',
    'lt-LT': 'val',
    'el-GR': 'στις',
    'mt-MT': 'fi',
    'cy-GB': 'am',
    'ga-IE': 'ag',
    'is-IS': 'klukkan',
    'fo-FO': 'kl',
    'sq-AL': 'në',
    'mk-MK': 'во',
    'sr-RS': 'у',
    'bs-BA': 'u',
    'me-ME': 'u',
    'uk-UA': 'о',
    'be-BY': 'а',
    'kk-KZ': 'сағат',
    'ky-KG': 'саат',
    'uz-UZ': 'soat',
    'tg-TJ': 'соат',
    'mn-MN': 'цаг',
    'ka-GE': 'საათზე',
    'hy-AM': 'ժամը',
    'az-AZ': 'saat',
    'fa-IR': 'در',
    'ur-PK': 'بجے',
    'bn-BD': 'সময়ে',
    'ta-IN': 'மணிக்கு',
    'te-IN': 'గంటలకు',
    'kn-IN': 'ಗಂಟೆಗೆ',
    'ml-IN': 'മണിക്ക്',
    'gu-IN': 'વાગ્યે',
    'pa-IN': 'ਵਜੇ',
    'or-IN': 'ବଜାରେ',
    'as-IN': 'বজাত',
    'ne-NP': 'बजे',
    'si-LK': 'වන විට',
    'my-MM': 'နာရီ',
    'km-KH': 'ម៉ោង',
    'lo-LA': 'ໂມງ',
    'th-TH': 'เวลา',
    'vi-VN': 'lúc',
    'id-ID': 'pukul',
    'ms-MY': 'pukul',
    'tl-PH': 'alas',
    'sw-KE': 'saa',
    'am-ET': 'ጥዋት',
    'yo-NG': 'ni',
    'ig-NG': 'n\'elekere',
    'ha-NG': 'da',
    'zu-ZA': 'nga',
    'xh-ZA': 'nga',
    'af-ZA': 'om'
};

/**
 * Time unit translations for multiple languages
 */
export const TIME_UNIT_TRANSLATIONS: Record<string, Record<TimeUnit, { singular: string; plural: string }>> = {
    'en-US': {
        'ms': { singular: 'Millisecond', plural: 'Milliseconds' },
        's': { singular: 'Second', plural: 'Seconds' },
        'm': { singular: 'Minute', plural: 'Minutes' },
        'h': { singular: 'Hour', plural: 'Hours' },
        'd': { singular: 'Day', plural: 'Days' },
        'w': { singular: 'Week', plural: 'Weeks' },
        'mo': { singular: 'Month', plural: 'Months' },
        'y': { singular: 'Year', plural: 'Years' }
    },
    'ar-SA': {
        'ms': { singular: 'مللي ثانية', plural: 'مللي ثانية' },
        's': { singular: 'ثانية', plural: 'ثواني' },
        'm': { singular: 'دقيقة', plural: 'دقائق' },
        'h': { singular: 'ساعة', plural: 'ساعات' },
        'd': { singular: 'يوم', plural: 'أيام' },
        'w': { singular: 'أسبوع', plural: 'أسابيع' },
        'mo': { singular: 'شهر', plural: 'أشهر' },
        'y': { singular: 'سنة', plural: 'سنوات' }
    },
    'he-IL': {
        'ms': { singular: 'מילישנייה', plural: 'מילישניות' },
        's': { singular: 'שנייה', plural: 'שניות' },
        'm': { singular: 'דקה', plural: 'דקות' },
        'h': { singular: 'שעה', plural: 'שעות' },
        'd': { singular: 'יום', plural: 'ימים' },
        'w': { singular: 'שבוע', plural: 'שבועות' },
        'mo': { singular: 'חודש', plural: 'חודשים' },
        'y': { singular: 'שנה', plural: 'שנים' }
    },
    'es-ES': {
        'ms': { singular: 'Milisegundo', plural: 'Milisegundos' },
        's': { singular: 'Segundo', plural: 'Segundos' },
        'm': { singular: 'Minuto', plural: 'Minutos' },
        'h': { singular: 'Hora', plural: 'Horas' },
        'd': { singular: 'Día', plural: 'Días' },
        'w': { singular: 'Semana', plural: 'Semanas' },
        'mo': { singular: 'Mes', plural: 'Meses' },
        'y': { singular: 'Año', plural: 'Años' }
    },
    'fr-FR': {
        'ms': { singular: 'Milliseconde', plural: 'Millisecondes' },
        's': { singular: 'Seconde', plural: 'Secondes' },
        'm': { singular: 'Minute', plural: 'Minutes' },
        'h': { singular: 'Heure', plural: 'Heures' },
        'd': { singular: 'Jour', plural: 'Jours' },
        'w': { singular: 'Semaine', plural: 'Semaines' },
        'mo': { singular: 'Mois', plural: 'Mois' },
        'y': { singular: 'Année', plural: 'Années' }
    },
    'de-DE': {
        'ms': { singular: 'Millisekunde', plural: 'Millisekunden' },
        's': { singular: 'Sekunde', plural: 'Sekunden' },
        'm': { singular: 'Minute', plural: 'Minuten' },
        'h': { singular: 'Stunde', plural: 'Stunden' },
        'd': { singular: 'Tag', plural: 'Tage' },
        'w': { singular: 'Woche', plural: 'Wochen' },
        'mo': { singular: 'Monat', plural: 'Monate' },
        'y': { singular: 'Jahr', plural: 'Jahre' }
    },
    'it-IT': {
        'ms': { singular: 'Millisecondo', plural: 'Millisecondi' },
        's': { singular: 'Secondo', plural: 'Secondi' },
        'm': { singular: 'Minuto', plural: 'Minuti' },
        'h': { singular: 'Ora', plural: 'Ore' },
        'd': { singular: 'Giorno', plural: 'Giorni' },
        'w': { singular: 'Settimana', plural: 'Settimane' },
        'mo': { singular: 'Mese', plural: 'Mesi' },
        'y': { singular: 'Anno', plural: 'Anni' }
    },
    'pt-PT': {
        'ms': { singular: 'Milissegundo', plural: 'Milissegundos' },
        's': { singular: 'Segundo', plural: 'Segundos' },
        'm': { singular: 'Minuto', plural: 'Minutos' },
        'h': { singular: 'Hora', plural: 'Horas' },
        'd': { singular: 'Dia', plural: 'Dias' },
        'w': { singular: 'Semana', plural: 'Semanas' },
        'mo': { singular: 'Mês', plural: 'Meses' },
        'y': { singular: 'Ano', plural: 'Anos' }
    },
    'ru-RU': {
        'ms': { singular: 'Миллисекунда', plural: 'Миллисекунд' },
        's': { singular: 'Секунда', plural: 'Секунд' },
        'm': { singular: 'Минута', plural: 'Минут' },
        'h': { singular: 'Час', plural: 'Часов' },
        'd': { singular: 'День', plural: 'Дней' },
        'w': { singular: 'Неделя', plural: 'Недель' },
        'mo': { singular: 'Месяц', plural: 'Месяцев' },
        'y': { singular: 'Год', plural: 'Лет' }
    },
    'zh-CN': {
        'ms': { singular: '毫秒', plural: '毫秒' },
        's': { singular: '秒', plural: '秒' },
        'm': { singular: '分钟', plural: '分钟' },
        'h': { singular: '小时', plural: '小时' },
        'd': { singular: '天', plural: '天' },
        'w': { singular: '周', plural: '周' },
        'mo': { singular: '月', plural: '月' },
        'y': { singular: '年', plural: '年' }
    },
    'ja-JP': {
        'ms': { singular: 'ミリ秒', plural: 'ミリ秒' },
        's': { singular: '秒', plural: '秒' },
        'm': { singular: '分', plural: '分' },
        'h': { singular: '時間', plural: '時間' },
        'd': { singular: '日', plural: '日' },
        'w': { singular: '週間', plural: '週間' },
        'mo': { singular: '月', plural: '月' },
        'y': { singular: '年', plural: '年' }
    },
    'ko-KR': {
        'ms': { singular: '밀리초', plural: '밀리초' },
        's': { singular: '초', plural: '초' },
        'm': { singular: '분', plural: '분' },
        'h': { singular: '시간', plural: '시간' },
        'd': { singular: '일', plural: '일' },
        'w': { singular: '주', plural: '주' },
        'mo': { singular: '개월', plural: '개월' },
        'y': { singular: '년', plural: '년' }
    }
};

/**
 * Get locale-specific conjunction for "at" in date formatting
 * @param locale - The locale string
 * @returns The conjunction string for the locale, or 'at' as fallback
 */
export const getLocaleConjunction = (locale: string): string => {
    return LOCALE_CONJUNCTIONS[locale] || 'at';
};

/**
 * Get time unit translation with proper pluralization
 * @param locale - The locale string
 * @param unit - The time unit
 * @param value - The numeric value for pluralization
 * @returns The translated time unit string
 */
export const getTimeUnitTranslation = (locale: string, unit: TimeUnit, value: number): string => {
    const translations = TIME_UNIT_TRANSLATIONS[locale] || TIME_UNIT_TRANSLATIONS['en-US'];
    const unitTranslations = translations[unit];
    
    if (!unitTranslations) {
        return unit; // Fallback to unit code
    }
    
    // Handle pluralization
    if (value === 1) {
        return unitTranslations.singular;
    } else {
        return unitTranslations.plural;
    }
};

/**
 * Get day translation for a specific language and day
 * @param language - The language code (e.g., 'en', 'he', 'ar')
 * @param day - The day name
 * @param format - The format: 'short' or 'long'
 * @returns The translated day string
 */
export const getDayTranslation = (
    language: string,
    day: DayName,
    format: 'short' | 'long' = 'long'
): string => {
    const translations = DAYS_TRANSLATIONS[language];
    if (!translations || !translations[day]) {
        // Fallback to English if translation not found
        return DAYS_TRANSLATIONS.en[day][format];
    }
    return translations[day][format];
};

/**
 * Get month translation for a specific language and month
 * @param language - The language code (e.g., 'en', 'he', 'ar')
 * @param month - The month name
 * @param format - The format: 'short' or 'long'
 * @returns The translated month string
 */
export const getMonthTranslation = (
    language: string,
    month: MonthName,
    format: 'short' | 'long' = 'long'
): string => {
    const translations = MONTHS_TRANSLATIONS[language];
    if (!translations || !translations[month]) {
        // Fallback to English if translation not found
        return MONTHS_TRANSLATIONS.en[month][format];
    }
    return translations[month][format];
};

/**
 * Get all day translations for a specific language
 * @param language - The language code
 * @returns Record of all day translations for the language
 */
export const getDaysForLanguage = (language: string): Record<DayName, DayTranslation> => {
    return (DAYS_TRANSLATIONS[language] ?? DAYS_TRANSLATIONS.en) as Record<DayName, DayTranslation>;
};

/**
 * Get all month translations for a specific language
 * @param language - The language code
 * @returns Record of all month translations for the language
 */
export const getMonthsForLanguage = (language: string): Record<MonthName, MonthTranslation> => {
    return (MONTHS_TRANSLATIONS[language] ?? MONTHS_TRANSLATIONS.en) as Record<MonthName, MonthTranslation>;
};

/**
 * "Closed" translations for multiple languages
 */
export const CLOSED_TRANSLATIONS: Record<string, string> = {
    en: 'Closed',
    he: 'סגור',
    ar: 'مغلق',
    es: 'Cerrado',
    fr: 'Fermé',
    de: 'Geschlossen',
    it: 'Chiuso',
    pt: 'Fechado',
    ru: 'Закрыто',
    zh: '关闭',
    ja: '休業',
    ko: '휴무',
    hi: 'बंद',
    tr: 'Kapalı',
    nl: 'Gesloten',
    pl: 'Zamknięte',
    sv: 'Stängt',
    no: 'Stengt',
    da: 'Lukket',
    fi: 'Suljettu',
    cs: 'Zavřeno',
    hu: 'Zárva',
    ro: 'Închis',
    bg: 'Затворено',
    hr: 'Zatvoreno',
    sk: 'Zatvorené',
    sl: 'Zaprto',
    et: 'Suletud',
    lv: 'Slēgts',
    lt: 'Uždaryta',
    el: 'Κλειστό',
    mt: 'Magħluq',
    cy: 'Ar gau',
    ga: 'Dúnta',
    is: 'Lokað',
    fo: 'Lukt',
    sq: 'Mbyllur',
    mk: 'Затворено',
    sr: 'Затворено',
    bs: 'Zatvoreno',
    me: 'Zatvoreno',
    uk: 'Закрито',
    be: 'Зачынена',
    kk: 'Жабық',
    ky: 'Жабык',
    uz: 'Yopiq',
    tg: 'Пӯшида',
    mn: 'Хаалттай',
    ka: 'დახურული',
    hy: 'Փակ',
    az: 'Bağlı',
    fa: 'بسته',
    ur: 'بند',
    bn: 'বন্ধ',
    ta: 'மூடப்பட்டது',
    te: 'మూసివేయబడింది',
    kn: 'ಮುಚ್ಚಲಾಗಿದೆ',
    ml: 'അടച്ചിരിക്കുന്നു',
    gu: 'બંધ',
    pa: 'ਬੰਦ',
    or: 'ବନ୍ଦ',
    as: 'বন্ধ',
    ne: 'बन्द',
    si: 'වසා ඇත',
    my: 'ပိတ်ထား',
    km: 'បានបិទ',
    lo: 'ປິດ',
    th: 'ปิด',
    vi: 'Đóng cửa',
    id: 'Tutup',
    ms: 'Tutup',
    tl: 'Sarado',
    sw: 'Imefungwa',
    am: 'ዝጋ',
    yo: 'Tiipa',
    ig: 'Mechie',
    ha: 'Rufe',
    zu: 'Valiwe',
    xh: 'Ivaliwe',
    af: 'Gesluit'
};

/**
 * Get "Closed" translation for a specific language
 * @param language - The language code
 * @returns The translated "Closed" string
 */
export const getClosedTranslation = (language: string): string => {
    return CLOSED_TRANSLATIONS[language] || CLOSED_TRANSLATIONS.en;
};
