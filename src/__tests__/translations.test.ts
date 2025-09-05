import {
    TimeUnit,
    getLocaleConjunction,
    getTimeUnitTranslation,
    DAY_NAMES,
    MONTH_NAMES,
    getDayTranslation,
    getMonthTranslation,
    getDaysForLanguage,
    getMonthsForLanguage,
    DAYS_TRANSLATIONS,
    MONTHS_TRANSLATIONS,
    LOCALE_CONJUNCTIONS,
    TIME_UNIT_TRANSLATIONS
} from '../constants/translations';

describe('Translations System', () => {
    describe('Constants and Types', () => {
        it('should have correct TimeUnit type', () => {
            const validUnits: TimeUnit[] = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'];
            expect(validUnits).toHaveLength(8);
        });

        it('should have correct day names', () => {
            expect(DAY_NAMES).toHaveLength(7);
            expect(DAY_NAMES).toContain('sunday');
            expect(DAY_NAMES).toContain('monday');
            expect(DAY_NAMES).toContain('saturday');
        });

        it('should have correct month names', () => {
            expect(MONTH_NAMES).toHaveLength(12);
            expect(MONTH_NAMES).toContain('january');
            expect(MONTH_NAMES).toContain('december');
        });
    });

    describe('Locale Conjunctions', () => {
        it('should return correct conjunction for known locales', () => {
            expect(getLocaleConjunction('en-US')).toBe('at');
            expect(getLocaleConjunction('he-IL')).toBe('ב-');
            expect(getLocaleConjunction('ar-SA')).toBe('في');
            expect(getLocaleConjunction('es-ES')).toBe('a las');
            expect(getLocaleConjunction('fr-FR')).toBe('à');
            expect(getLocaleConjunction('de-DE')).toBe('um');
        });

        it('should return fallback for unknown locales', () => {
            expect(getLocaleConjunction('unknown-locale')).toBe('at');
            expect(getLocaleConjunction('xx-XX')).toBe('at');
        });

        it('should have conjunctions for all major locales', () => {
            const majorLocales = ['en-US', 'he-IL', 'ar-SA', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-PT', 'ru-RU', 'zh-CN', 'ja-JP', 'ko-KR'];
            
            majorLocales.forEach(locale => {
                const conjunction = getLocaleConjunction(locale);
                expect(conjunction).toBeDefined();
                expect(conjunction).not.toBe('');
            });
        });
    });

    describe('Time Unit Translations', () => {
        it('should return correct translations for English', () => {
            expect(getTimeUnitTranslation('en-US', 's', 1)).toBe('Second');
            expect(getTimeUnitTranslation('en-US', 's', 5)).toBe('Seconds');
            expect(getTimeUnitTranslation('en-US', 'm', 1)).toBe('Minute');
            expect(getTimeUnitTranslation('en-US', 'h', 2)).toBe('Hours');
        });

        it('should return correct translations for Hebrew', () => {
            expect(getTimeUnitTranslation('he-IL', 's', 1)).toBe('שנייה');
            expect(getTimeUnitTranslation('he-IL', 's', 5)).toBe('שניות');
            expect(getTimeUnitTranslation('he-IL', 'h', 1)).toBe('שעה');
            expect(getTimeUnitTranslation('he-IL', 'h', 3)).toBe('שעות');
        });

        it('should return correct translations for Arabic', () => {
            expect(getTimeUnitTranslation('ar-SA', 's', 1)).toBe('ثانية');
            expect(getTimeUnitTranslation('ar-SA', 's', 5)).toBe('ثواني');
            expect(getTimeUnitTranslation('ar-SA', 'h', 1)).toBe('ساعة');
            expect(getTimeUnitTranslation('ar-SA', 'h', 3)).toBe('ساعات');
        });

        it('should fallback to English for unknown locales', () => {
            expect(getTimeUnitTranslation('unknown-locale', 's', 1)).toBe('Second');
            expect(getTimeUnitTranslation('xx-XX', 'h', 5)).toBe('Hours');
        });

        it('should handle all time units', () => {
            const units: TimeUnit[] = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y'];
            const locales = ['en-US', 'he-IL', 'ar-SA'];
            
            units.forEach(unit => {
                locales.forEach(locale => {
                    const singular = getTimeUnitTranslation(locale, unit, 1);
                    const plural = getTimeUnitTranslation(locale, unit, 5);
                    
                    expect(singular).toBeDefined();
                    expect(plural).toBeDefined();
                    expect(singular).not.toBe('');
                    expect(plural).not.toBe('');
                });
            });
        });

        it('should handle edge cases', () => {
            // Zero should use plural form
            expect(getTimeUnitTranslation('en-US', 's', 0)).toBe('Seconds');
            // Negative should use plural form
            expect(getTimeUnitTranslation('en-US', 's', -1)).toBe('Seconds');
        });
    });

    describe('Day Translations', () => {
        it('should return correct day translations for English', () => {
            expect(getDayTranslation('en', 'monday', 'short')).toBe('Mon');
            expect(getDayTranslation('en', 'monday', 'long')).toBe('Monday');
            expect(getDayTranslation('en', 'friday', 'short')).toBe('Fri');
            expect(getDayTranslation('en', 'friday', 'long')).toBe('Friday');
        });

        it('should return correct day translations for Hebrew', () => {
            expect(getDayTranslation('he', 'monday', 'short')).toBe('ב\'');
            expect(getDayTranslation('he', 'monday', 'long')).toBe('שני');
            expect(getDayTranslation('he', 'friday', 'short')).toBe('ו\'');
            expect(getDayTranslation('he', 'friday', 'long')).toBe('שישי');
        });

        it('should return correct day translations for Arabic', () => {
            expect(getDayTranslation('ar', 'monday', 'short')).toBe('اثنين');
            expect(getDayTranslation('ar', 'monday', 'long')).toBe('الاثنين');
            expect(getDayTranslation('ar', 'friday', 'short')).toBe('جمعة');
            expect(getDayTranslation('ar', 'friday', 'long')).toBe('الجمعة');
        });

        it('should fallback to English for unknown languages', () => {
            expect(getDayTranslation('unknown', 'monday', 'short')).toBe('Mon');
            expect(getDayTranslation('xx', 'friday', 'long')).toBe('Friday');
        });

        it('should handle all days of the week', () => {
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const languages = ['en', 'he', 'ar', 'es', 'fr'];
            
            days.forEach(day => {
                languages.forEach(lang => {
                    const short = getDayTranslation(lang, day as any, 'short');
                    const long = getDayTranslation(lang, day as any, 'long');
                    
                    expect(short).toBeDefined();
                    expect(long).toBeDefined();
                    expect(short).not.toBe('');
                    expect(long).not.toBe('');
                });
            });
        });
    });

    describe('Month Translations', () => {
        it('should return correct month translations for English', () => {
            expect(getMonthTranslation('en', 'january', 'short')).toBe('Jan');
            expect(getMonthTranslation('en', 'january', 'long')).toBe('January');
            expect(getMonthTranslation('en', 'december', 'short')).toBe('Dec');
            expect(getMonthTranslation('en', 'december', 'long')).toBe('December');
        });

        it('should return correct month translations for Hebrew', () => {
            expect(getMonthTranslation('he', 'january', 'short')).toBe('ינו');
            expect(getMonthTranslation('he', 'january', 'long')).toBe('ינואר');
            expect(getMonthTranslation('he', 'december', 'short')).toBe('דצמ');
            expect(getMonthTranslation('he', 'december', 'long')).toBe('דצמבר');
        });

        it('should return correct month translations for Arabic', () => {
            expect(getMonthTranslation('ar', 'january', 'short')).toBe('يناير');
            expect(getMonthTranslation('ar', 'january', 'long')).toBe('يناير');
            expect(getMonthTranslation('ar', 'december', 'short')).toBe('ديسمبر');
            expect(getMonthTranslation('ar', 'december', 'long')).toBe('ديسمبر');
        });

        it('should fallback to English for unknown languages', () => {
            expect(getMonthTranslation('unknown', 'january', 'short')).toBe('Jan');
            expect(getMonthTranslation('xx', 'december', 'long')).toBe('December');
        });

        it('should handle all months', () => {
            const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            const languages = ['en', 'he', 'ar', 'es', 'fr'];
            
            months.forEach(month => {
                languages.forEach(lang => {
                    const short = getMonthTranslation(lang, month as any, 'short');
                    const long = getMonthTranslation(lang, month as any, 'long');
                    
                    expect(short).toBeDefined();
                    expect(long).toBeDefined();
                    expect(short).not.toBe('');
                    expect(long).not.toBe('');
                });
            });
        });
    });

    describe('Language-Specific Functions', () => {
        it('should return all days for a language', () => {
            const hebrewDays = getDaysForLanguage('he');
            expect(hebrewDays).toHaveProperty('sunday');
            expect(hebrewDays).toHaveProperty('monday');
            expect(hebrewDays).toHaveProperty('saturday');
            expect(hebrewDays.sunday.short).toBe('א\'');
            expect(hebrewDays.monday.long).toBe('שני');
        });

        it('should return all months for a language', () => {
            const hebrewMonths = getMonthsForLanguage('he');
            expect(hebrewMonths).toHaveProperty('january');
            expect(hebrewMonths).toHaveProperty('december');
            expect(hebrewMonths.january.short).toBe('ינו');
            expect(hebrewMonths.december.long).toBe('דצמבר');
        });

        it('should fallback to English for unknown languages', () => {
            const unknownDays = getDaysForLanguage('unknown');
            expect(unknownDays).toHaveProperty('monday');
            expect(unknownDays.monday.short).toBe('Mon');
            
            const unknownMonths = getMonthsForLanguage('unknown');
            expect(unknownMonths).toHaveProperty('january');
            expect(unknownMonths.january.short).toBe('Jan');
        });
    });

    describe('Data Integrity', () => {
        it('should have consistent data structure across all languages', () => {
            const languages = Object.keys(DAYS_TRANSLATIONS);
            
            languages.forEach(lang => {
                const days = DAYS_TRANSLATIONS[lang];
                expect(days).toHaveProperty('sunday');
                expect(days).toHaveProperty('monday');
                expect(days).toHaveProperty('tuesday');
                expect(days).toHaveProperty('wednesday');
                expect(days).toHaveProperty('thursday');
                expect(days).toHaveProperty('friday');
                expect(days).toHaveProperty('saturday');
                
                // Check each day has both short and long
                Object.values(days).forEach(day => {
                    expect(day).toHaveProperty('short');
                    expect(day).toHaveProperty('long');
                    expect(day.short).not.toBe('');
                    expect(day.long).not.toBe('');
                });
            });
        });

        it('should have consistent month data structure', () => {
            const languages = Object.keys(MONTHS_TRANSLATIONS);
            
            languages.forEach(lang => {
                const months = MONTHS_TRANSLATIONS[lang];
                expect(months).toHaveProperty('january');
                expect(months).toHaveProperty('december');
                
                // Check each month has both short and long
                Object.values(months).forEach(month => {
                    expect(month).toHaveProperty('short');
                    expect(month).toHaveProperty('long');
                    expect(month.short).not.toBe('');
                    expect(month.long).not.toBe('');
                });
            });
        });

        it('should have consistent time unit translations', () => {
            const locales = Object.keys(TIME_UNIT_TRANSLATIONS);
            
            locales.forEach(locale => {
                const units = TIME_UNIT_TRANSLATIONS[locale];
                expect(units).toHaveProperty('s');
                expect(units).toHaveProperty('m');
                expect(units).toHaveProperty('h');
                expect(units).toHaveProperty('d');
                expect(units).toHaveProperty('w');
                expect(units).toHaveProperty('mo');
                expect(units).toHaveProperty('y');
                
                // Check each unit has both singular and plural
                Object.values(units).forEach(unit => {
                    expect(unit).toHaveProperty('singular');
                    expect(unit).toHaveProperty('plural');
                    expect(unit.singular).not.toBe('');
                    expect(unit.plural).not.toBe('');
                });
            });
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle empty strings gracefully', () => {
            expect(getLocaleConjunction('')).toBe('at');
        });

        it('should handle null/undefined gracefully', () => {
            expect(getLocaleConjunction(null as any)).toBe('at');
            expect(getLocaleConjunction(undefined as any)).toBe('at');
        });

        it('should handle invalid time units gracefully', () => {
            // This should not throw, but return the unit code as fallback
            expect(getTimeUnitTranslation('en-US', 'invalid' as any, 1)).toBe('invalid');
        });

        it('should handle invalid day names gracefully', () => {
            // Test with a day that doesn't exist in translations
            expect(() => getDayTranslation('en', 'invalid' as any, 'short')).toThrow();
        });

        it('should handle invalid month names gracefully', () => {
            // Test with a month that doesn't exist in translations
            expect(() => getMonthTranslation('en', 'invalid' as any, 'short')).toThrow();
        });
    });
});
