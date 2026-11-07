import { 
    LOCALE_CONJUNCTIONS, 
    TIME_UNIT_TRANSLATIONS, 
    getLocaleConjunction, 
    getTimeUnitTranslation,
    TimeUnit 
} from '../src/constants/translations';

// Demo function to show how to use the translations
export function demonstrateTranslations() {
    console.log('=== Translations Demo ===');
    
    // 1. Show available conjunctions for different locales
    console.log('\n--- Locale Conjunctions ---');
    console.log('English (en-US):', getLocaleConjunction('en-US'));
    console.log('Hebrew (he-IL):', getLocaleConjunction('he-IL'));
    console.log('Arabic (ar-SA):', getLocaleConjunction('ar-SA'));
    console.log('Spanish (es-ES):', getLocaleConjunction('es-ES'));
    console.log('French (fr-FR):', getLocaleConjunction('fr-FR'));
    console.log('German (de-DE):', getLocaleConjunction('de-DE'));
    
    // 2. Show time unit translations
    console.log('\n--- Time Unit Translations ---');
    const testUnits: TimeUnit[] = ['s', 'm', 'h', 'd', 'w', 'mo', 'y'];
    
    console.log('English (en-US):');
    testUnits.forEach(unit => {
        console.log(`  ${unit}: ${getTimeUnitTranslation('en-US', unit, 1)} / ${getTimeUnitTranslation('en-US', unit, 5)}`);
    });
    
    console.log('\nHebrew (he-IL):');
    testUnits.forEach(unit => {
        console.log(`  ${unit}: ${getTimeUnitTranslation('he-IL', unit, 1)} / ${getTimeUnitTranslation('he-IL', unit, 5)}`);
    });
    
    console.log('\nArabic (ar-SA):');
    testUnits.forEach(unit => {
        console.log(`  ${unit}: ${getTimeUnitTranslation('ar-SA', unit, 1)} / ${getTimeUnitTranslation('ar-SA', unit, 5)}`);
    });
    
    // 3. Show direct access to translation data
    console.log('\n--- Direct Access to Translation Data ---');
    console.log('Available locales for conjunctions:', Object.keys(LOCALE_CONJUNCTIONS).length);
    console.log('Available locales for time units:', Object.keys(TIME_UNIT_TRANSLATIONS).length);
    
    // 4. Show how to use in date formatting context
    console.log('\n--- Date Formatting Context ---');
    const testDate = new Date('2024-01-15T14:30:00');
    const locales = ['en-US', 'he-IL', 'ar-SA', 'es-ES'];
    
    locales.forEach(locale => {
        const conjunction = getLocaleConjunction(locale);
        const dateStr = testDate.toLocaleDateString(locale, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = testDate.toLocaleTimeString(locale, { 
            hour: 'numeric', 
            minute: 'numeric' 
        });
        
        console.log(`${locale}: ${dateStr} ${conjunction} ${timeStr}`);
    });
    
    // 5. Show pluralization examples
    console.log('\n--- Pluralization Examples ---');
    const testValues = [1, 2, 5, 10];
    const testUnit: TimeUnit = 'h';
    
    console.log(`Time unit: ${testUnit}`);
    testValues.forEach(value => {
        const translation = getTimeUnitTranslation('en-US', testUnit, value);
        console.log(`  ${value} ${testUnit} → ${translation}`);
    });
    
    console.log('\nHebrew pluralization:');
    testValues.forEach(value => {
        const translation = getTimeUnitTranslation('he-IL', testUnit, value);
        console.log(`  ${value} ${testUnit} → ${translation}`);
    });
}

// Run the demo if this file is executed directly
if (require.main === module) {
    demonstrateTranslations();
}
