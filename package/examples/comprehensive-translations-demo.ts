import { 
    // Time unit translations
    TimeUnit,
    getTimeUnitTranslation,
    TIME_UNIT_TRANSLATIONS,
    
    // Day translations
    DayName,
    getDayTranslation,
    getDaysForLanguage,
    DAYS_TRANSLATIONS,
    
    // Month translations
    MonthName,
    getMonthTranslation,
    getMonthsForLanguage,
    MONTHS_TRANSLATIONS,
    
    // Conjunction translations
    getLocaleConjunction,
    LOCALE_CONJUNCTIONS
} from '../src/constants/translations';

// Comprehensive demo function
export function demonstrateComprehensiveTranslations() {
    console.log('=== Comprehensive Translations Demo ===\n');
    
    // 1. Time Unit Translations
    console.log('--- 1. Time Unit Translations ---');
    const testUnits: TimeUnit[] = ['s', 'm', 'h', 'd', 'w', 'mo', 'y'];
    const testLocales = ['en-US', 'he-IL', 'ar-SA', 'es-ES', 'fr-FR'];
    
    testLocales.forEach(locale => {
        console.log(`\n${locale}:`);
        testUnits.forEach(unit => {
            const singular = getTimeUnitTranslation(locale, unit, 1);
            const plural = getTimeUnitTranslation(locale, unit, 5);
            console.log(`  ${unit}: ${singular} / ${plural}`);
        });
    });
    
    // 2. Day Translations
    console.log('\n\n--- 2. Day Translations ---');
    const testDays: DayName[] = ['monday', 'wednesday', 'friday'];
    const testLanguages = ['en', 'he', 'ar', 'es', 'fr'];
    
    testLanguages.forEach(lang => {
        console.log(`\n${lang}:`);
        testDays.forEach(day => {
            const short = getDayTranslation(lang, day, 'short');
            const long = getDayTranslation(lang, day, 'long');
            console.log(`  ${day}: ${short} / ${long}`);
        });
    });
    
    // 3. Month Translations
    console.log('\n\n--- 3. Month Translations ---');
    const testMonths: MonthName[] = ['january', 'march', 'december'];
    
    testLanguages.forEach(lang => {
        console.log(`\n${lang}:`);
        testMonths.forEach(month => {
            const short = getMonthTranslation(lang, month, 'short');
            const long = getMonthTranslation(lang, month, 'long');
            console.log(`  ${month}: ${short} / ${long}`);
        });
    });
    
    // 4. Locale Conjunctions
    console.log('\n\n--- 4. Locale Conjunctions ---');
    const conjunctionLocales = ['en-US', 'he-IL', 'ar-SA', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-PT', 'ru-RU', 'zh-CN', 'ja-JP', 'ko-KR'];
    
    conjunctionLocales.forEach(locale => {
        const conjunction = getLocaleConjunction(locale);
        console.log(`${locale}: "${conjunction}"`);
    });
    
    // 5. Get All Translations for a Language
    console.log('\n\n--- 5. All Translations for Hebrew ---');
    const hebrewDays = getDaysForLanguage('he');
    const hebrewMonths = getMonthsForLanguage('he');
    
    console.log('Hebrew Days:');
    Object.entries(hebrewDays).forEach(([day, translation]) => {
        console.log(`  ${day}: ${translation.short} / ${translation.long}`);
    });
    
    console.log('\nHebrew Months:');
    Object.entries(hebrewMonths).forEach(([month, translation]) => {
        console.log(`  ${month}: ${translation.short} / ${translation.long}`);
    });
    
    // 6. Date Formatting with Translations
    console.log('\n\n--- 6. Date Formatting with Translations ---');
    const testDate = new Date('2024-01-15T14:30:00');
    const dateLocales = ['en-US', 'he-IL', 'ar-SA'];
    
    dateLocales.forEach(locale => {
        const conjunction = getLocaleConjunction(locale);
        const dayName = getDayTranslation(locale.split('-')[0], 'monday', 'long');
        const monthName = getMonthTranslation(locale.split('-')[0], 'january', 'long');
        
        console.log(`${locale}: ${dayName}, ${monthName} 15, 2024 ${conjunction} 2:30 PM`);
    });
    
    // 7. Statistics
    console.log('\n\n--- 7. Translation Statistics ---');
    console.log(`Total locales with conjunctions: ${Object.keys(LOCALE_CONJUNCTIONS).length}`);
    console.log(`Total locales with time units: ${Object.keys(TIME_UNIT_TRANSLATIONS).length}`);
    console.log(`Total languages with days: ${Object.keys(DAYS_TRANSLATIONS).length}`);
    console.log(`Total languages with months: ${Object.keys(MONTHS_TRANSLATIONS).length}`);
    
    // 8. Error Handling Examples
    console.log('\n\n--- 8. Error Handling Examples ---');
    console.log('Non-existent locale (time unit):', getTimeUnitTranslation('xx-XX', 'h', 2));
    console.log('Non-existent language (day):', getDayTranslation('xx', 'monday', 'short'));
    console.log('Non-existent language (month):', getMonthTranslation('xx', 'january', 'short'));
    console.log('Non-existent locale (conjunction):', getLocaleConjunction('xx-XX'));
    
    console.log('\n=== Demo Complete ===');
}

// Run the demo if this file is executed directly
if (require.main === module) {
    demonstrateComprehensiveTranslations();
}
