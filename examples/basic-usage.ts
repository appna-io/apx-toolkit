import {
  // Validators
  isEmail,
  isPhone,
  isValidURL,
  isStrongPassword,
  
  // Formatters
  formatCurrency,
  formatPhoneNumber,
  formatCompactNumber,
  formatDate,
  
  // Date utilities
  getTimeAgo,
  isToday,
  addDays,
  
  // Generic helpers
  isEmpty,
  isDefined,
  toNumberSafe,
  
  // Constants
  COUNTRIES,
  LANGUAGES,
  SECONDS_IN_MINUTE,
  
  // Regex patterns
  REGEX,
  
  // Days translations
  DAYS_TRANSLATIONS,
  getDayTranslation,
  getDaysForLanguage,
  getDayAcrossLanguages,
  
  // Months translations
  MONTHS_TRANSLATIONS,
  getMonthTranslation,
  getMonthsForLanguage,
  getMonthAcrossLanguages,
  
  // Scroll utilities
  scrollToTop,
  scrollToElement,
  scrollToPosition,
  isInViewport,
  getScrollPosition
} from '@apx-ui/toolkit';

console.log('=== @apx-ui/toolkit Examples ===\n');

// Validation examples
console.log('📧 Email Validation:');
console.log('isEmail("user@example.com"):', isEmail('user@example.com')); // true
console.log('isEmail("invalid-email"):', isEmail('invalid-email')); // false

console.log('\n📱 Phone Validation:');
console.log('isPhone("+1234567890"):', isPhone('+1234567890')); // true
console.log('isPhone("invalid"):', isPhone('invalid')); // false

console.log('\n🌐 URL Validation:');
console.log('isValidURL("https://example.com"):', isValidURL('https://example.com')); // true
console.log('isValidURL("invalid-url"):', isValidURL('invalid-url')); // false

console.log('\n🔒 Password Validation:');
console.log('isStrongPassword("MyPass123!"):', isStrongPassword('MyPass123!')); // true
console.log('isStrongPassword("weak"):', isStrongPassword('weak')); // false

// Formatting examples
console.log('\n💰 Currency Formatting:');
console.log('formatCurrency(1234.56):', formatCurrency(1234.56)); // $1,234.56
console.log('formatCurrency(1234.56, "EUR", "de-DE"):', formatCurrency(1234.56, 'EUR', 'de-DE')); // 1.234,56 €

console.log('\n📞 Phone Formatting:');
console.log('formatPhoneNumber("+12345678901", "+C (PPP)-EEE-SSSS"):', formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS')); // +1 (234)-567-8901
console.log('formatPhoneNumber("1234567890", "PPP - EEE SSSS"):', formatPhoneNumber('1234567890', 'PPP - EEE SSSS')); // 123 - 456 7890

console.log('\n📊 Compact Number Formatting:');
console.log('formatCompactNumber(1500):', formatCompactNumber(1500)); // 1.5K
console.log('formatCompactNumber(2000000):', formatCompactNumber(2000000)); // 2.0M

console.log('\n📅 Date Formatting:');
const now = new Date();
console.log('formatDate(now):', formatDate(now)); // 2024-01-15
console.log('formatDate(now, "YYYY-MM-DD HH:mm"):', formatDate(now, 'YYYY-MM-DD HH:mm')); // 2024-01-15 14:30

// Date utilities
console.log('\n⏰ Time Ago:');
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
console.log('getTimeAgo(yesterday):', getTimeAgo(yesterday)); // 1 day ago

console.log('\n📅 Date Checks:');
console.log('isToday(now):', isToday(now)); // true
console.log('addDays(now, 7):', formatDate(addDays(now, 7))); // 7 days from now

// Generic helpers
console.log('\n🔍 Generic Helpers:');
console.log('isEmpty(""):', isEmpty('')); // true
console.log('isEmpty("hello"):', isEmpty('hello')); // false
console.log('isEmpty([]):', isEmpty([])); // true
console.log('isEmpty({}):', isEmpty({})); // true

console.log('\n✅ Type Checks:');
console.log('isDefined(null):', isDefined(null)); // false
console.log('isDefined(undefined):', isDefined(undefined)); // false
console.log('isDefined("hello"):', isDefined('hello')); // true

console.log('\n🔢 Safe Number Conversion:');
console.log('toNumberSafe("123"):', toNumberSafe('123')); // 123
console.log('toNumberSafe("abc", 0):', toNumberSafe('abc', 0)); // 0

// Constants
console.log('\n🌍 Countries:');
const israel = COUNTRIES.find(c => c.code === 'IL');
console.log('Israel:', israel); // { code: 'IL', name: 'Israel', phoneCode: '+972' }

console.log('\n🗣️ Languages:');
const english = LANGUAGES.find(l => l.code === 'en');
console.log('English:', english); // { code: 'en', label: 'English', nativeName: 'English' }

console.log('\n🔢 Magic Numbers:');
console.log('SECONDS_IN_MINUTE:', SECONDS_IN_MINUTE); // 60

// Regex patterns
console.log('\n🔣 Regex Patterns:');
console.log('REGEX.email:', REGEX.email); // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
console.log('REGEX.phone:', REGEX.phone); // /^(\+?\d{1,3})?\d{7,14}$/

// Days translations
console.log('\n📅 Days Translations:');
console.log('English Monday:', getDayTranslation('en', 'monday')); // Monday
console.log('Hebrew Monday:', getDayTranslation('he', 'monday')); // שני
console.log('Arabic Monday:', getDayTranslation('ar', 'monday')); // الاثنين
console.log('Hebrew Monday (short):', getDayTranslation('he', 'monday', 'short')); // ב'

console.log('\n🌍 All Hebrew Days:');
const hebrewDays = getDaysForLanguage('he');
console.log('Hebrew Sunday:', hebrewDays.sunday); // { short: "א'", long: "ראשון" }

console.log('\n🔤 Monday Across Languages:');
const mondayTranslations = getDayAcrossLanguages('monday');
console.log('Monday in Spanish:', mondayTranslations.es?.long); // Lunes

// Months translations
console.log('\n📅 Months Translations:');
console.log('English January:', getMonthTranslation('en', 'january')); // January
console.log('Hebrew January:', getMonthTranslation('he', 'january')); // ינואר
console.log('Arabic January:', getMonthTranslation('ar', 'january')); // يناير
console.log('Hebrew January (short):', getMonthTranslation('he', 'january', 'short')); // ינו

console.log('\n🌍 All Hebrew Months:');
const hebrewMonths = getMonthsForLanguage('he');
console.log('Hebrew March:', hebrewMonths.march); // { short: "מרץ", long: "מרץ" }

console.log('\n🔤 January Across Languages:');
const januaryTranslations = getMonthAcrossLanguages('january');
console.log('January in Spanish:', januaryTranslations.es?.long); // Enero

// Scroll utilities
console.log('\n📜 Scroll Utilities:');
console.log('Current scroll position:', getScrollPosition()); // Current scroll position in pixels

// Note: These functions would be used in actual browser environment
// Enhanced smooth scrolling with custom duration and easing:
// scrollToTop({ duration: 1000, easing: 'easeInOut' }); // 1 second smooth scroll to top
// scrollToTop({ duration: 200, easing: 'easeOut' }); // Quick 200ms scroll to top
// scrollToTop({ behavior: 'auto' }); // Instant scroll to top

// scrollToPosition(500, { duration: 800, easing: 'easeIn' }); // 800ms scroll to position 500px
// scrollToElement(document.getElementById('example'), { duration: 1200, easing: 'easeInOut' }, 20); // 1.2s scroll to element with 20px offset

// stopScroll(); // Stop any ongoing smooth scroll animation

console.log('\n✅ All examples completed successfully!'); 