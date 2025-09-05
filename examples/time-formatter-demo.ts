import { 
    formatTimeI18N
} from '../src/utils/i18nFormatters';
import { 
    setLanguage, 
    getLocale 
} from '../src/context';

// Demo of Time Formatter

console.log('=== Time Formatter Demo ===\n');

// 1. English Examples
console.log('1. English Examples:');
console.log('10 minutes:', formatTimeI18N(10, 'm'));
console.log('1 minute:', formatTimeI18N(1, 'm'));
console.log('5 hours:', formatTimeI18N(5, 'h'));
console.log('1 hour:', formatTimeI18N(1, 'h'));
console.log('3 days:', formatTimeI18N(3, 'd'));
console.log('1 day:', formatTimeI18N(1, 'd'));
console.log('2 weeks:', formatTimeI18N(2, 'w'));
console.log('1 week:', formatTimeI18N(1, 'w'));
console.log('6 months:', formatTimeI18N(6, 'mo'));
console.log('1 month:', formatTimeI18N(1, 'mo'));
console.log('10 years:', formatTimeI18N(10, 'y'));
console.log('1 year:', formatTimeI18N(1, 'y'));
console.log('500 milliseconds:', formatTimeI18N(500, 'ms'));
console.log('30 seconds:', formatTimeI18N(30, 's'));
console.log('');

// 2. Arabic Examples
console.log('2. Arabic Examples:');
console.log('10 minutes (ar-SA):', formatTimeI18N(10, 'm', 'ar-SA'));
console.log('1 minute (ar-SA):', formatTimeI18N(1, 'm', 'ar-SA'));
console.log('5 hours (ar-SA):', formatTimeI18N(5, 'h', 'ar-SA'));
console.log('1 hour (ar-SA):', formatTimeI18N(1, 'h', 'ar-SA'));
console.log('3 days (ar-SA):', formatTimeI18N(3, 'd', 'ar-SA'));
console.log('1 day (ar-SA):', formatTimeI18N(1, 'd', 'ar-SA'));
console.log('');

// 3. Hebrew Examples
console.log('3. Hebrew Examples:');
console.log('10 minutes (he-IL):', formatTimeI18N(10, 'm', 'he-IL'));
console.log('1 minute (he-IL):', formatTimeI18N(1, 'm', 'he-IL'));
console.log('5 hours (he-IL):', formatTimeI18N(5, 'h', 'he-IL'));
console.log('1 hour (he-IL):', formatTimeI18N(1, 'h', 'he-IL'));
console.log('');

// 4. Spanish Examples
console.log('4. Spanish Examples:');
console.log('10 minutes (es-ES):', formatTimeI18N(10, 'm', 'es-ES'));
console.log('1 minute (es-ES):', formatTimeI18N(1, 'm', 'es-ES'));
console.log('5 hours (es-ES):', formatTimeI18N(5, 'h', 'es-ES'));
console.log('1 hour (es-ES):', formatTimeI18N(1, 'h', 'es-ES'));
console.log('');

// 5. French Examples
console.log('5. French Examples:');
console.log('10 minutes (fr-FR):', formatTimeI18N(10, 'm', 'fr-FR'));
console.log('1 minute (fr-FR):', formatTimeI18N(1, 'm', 'fr-FR'));
console.log('5 hours (fr-FR):', formatTimeI18N(5, 'h', 'fr-FR'));
console.log('1 hour (fr-FR):', formatTimeI18N(1, 'h', 'fr-FR'));
console.log('');

// 6. German Examples
console.log('6. German Examples:');
console.log('10 minutes (de-DE):', formatTimeI18N(10, 'm', 'de-DE'));
console.log('1 minute (de-DE):', formatTimeI18N(1, 'm', 'de-DE'));
console.log('5 hours (de-DE):', formatTimeI18N(5, 'h', 'de-DE'));
console.log('1 hour (de-DE):', formatTimeI18N(1, 'h', 'de-DE'));
console.log('');

// 7. Chinese Examples
console.log('7. Chinese Examples:');
console.log('10 minutes (zh-CN):', formatTimeI18N(10, 'm', 'zh-CN'));
console.log('1 minute (zh-CN):', formatTimeI18N(1, 'm', 'zh-CN'));
console.log('5 hours (zh-CN):', formatTimeI18N(5, 'h', 'zh-CN'));
console.log('1 hour (zh-CN):', formatTimeI18N(1, 'h', 'zh-CN'));
console.log('');

// 8. Japanese Examples
console.log('8. Japanese Examples:');
console.log('10 minutes (ja-JP):', formatTimeI18N(10, 'm', 'ja-JP'));
console.log('1 minute (ja-JP):', formatTimeI18N(1, 'm', 'ja-JP'));
console.log('5 hours (ja-JP):', formatTimeI18N(5, 'h', 'ja-JP'));
console.log('1 hour (ja-JP):', formatTimeI18N(1, 'h', 'ja-JP'));
console.log('');

// 9. Korean Examples
console.log('9. Korean Examples:');
console.log('10 minutes (ko-KR):', formatTimeI18N(10, 'm', 'ko-KR'));
console.log('1 minute (ko-KR):', formatTimeI18N(1, 'm', 'ko-KR'));
console.log('5 hours (ko-KR):', formatTimeI18N(5, 'h', 'ko-KR'));
console.log('1 hour (ko-KR):', formatTimeI18N(1, 'h', 'ko-KR'));
console.log('');

// 10. Language Management Demo
console.log('10. Language Management Demo:');
console.log('Current locale (before change):', getLocale());

// Change language to Spanish
setLanguage('es');
console.log('Current locale (after setting to Spanish):', getLocale());

// Now time formatting will use Spanish locale by default
console.log('10 minutes with default locale (Spanish):', formatTimeI18N(10, 'm'));
console.log('1 minute with default locale (Spanish):', formatTimeI18N(1, 'm'));

// Reset to English
setLanguage('en');
console.log('Current locale (after reset to English):', getLocale());
console.log('');

// 11. Edge Cases
console.log('11. Edge Cases:');
console.log('Zero minutes:', formatTimeI18N(0, 'm'));
console.log('Negative minutes:', formatTimeI18N(-5, 'm'));
console.log('Large number:', formatTimeI18N(999999, 'y'));
console.log('Decimal value:', formatTimeI18N(1.5, 'h'));
console.log('');

console.log('=== Demo Complete ===');
