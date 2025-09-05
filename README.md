# @apx-ui/toolkit

A modern utility SDK for frontend web applications.  
Includes regex-based validators, generic helpers, formatting utilities, date tools, magic constants, phone number formatting, scroll utilities, storage persister, and more.

---

## Getting Started

### 1. Installation

```bash
npm install @apx-ui/toolkit
```

or

```bash
yarn add @apx-ui/toolkit
```

> **Note**: This package has **zero external dependencies**, making it lightweight and secure for production use.

### 2. Initialize Context (Recommended)

We strongly recommend initializing the library context at the start of your application. This provides a centralized configuration for all utilities and ensures consistent behavior across your app.

```typescript
import { config } from '@apx-ui/toolkit';

// Initialize once at app startup
config({
    defaultLanguage: 'en',
    defaultCurrency: 'USD', 
    defaultTimezone: 'America/New_York',
    defaultRegion: 'US',
    persist: 'localStorage', // 'localStorage' | 'sessionStorage' | 'memory' | false
    debug: false
});
```

**Context Benefits:**
- All formatters automatically use your configured settings
- User preferences persist across sessions
- Consistent formatting throughout your application
- Easy to change settings globally

### 3. Basic Usage

```typescript
import { 
    formatCurrencyI18N, 
    formatPhoneNumber, 
    isEmail, 
    scrollToTop 
} from '@apx-ui/toolkit';

// Currency formatting uses context settings
formatCurrencyI18N(1234.56); // Uses context currency & locale

// Phone number formatting
formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS'); // '+1 (234)-567-8901'

// Validation
isEmail('user@example.com'); // true

// Scroll utilities
scrollToTop({ duration: 1000, easing: 'easeInOut' });
```

### 4. Running Examples

The project includes comprehensive examples in the `examples/` directory:

```bash
# Run specific examples
npx ts-node examples/basic-usage.ts
npx ts-node examples/phone-formatting-examples.ts
npx ts-node examples/scroll-utilities-demo.ts
npx ts-node examples/persister-demo.ts
npx ts-node examples/real-world-usage.ts
```

**Available Examples:**
- `basic-usage.ts` - Core utilities overview
- `phone-formatting-examples.ts` - Phone number formatting patterns
- `scroll-utilities-demo.ts` - Smooth scrolling utilities
- `persister-demo.ts` - Storage with TTL functionality
- `real-world-usage.ts` - Production-ready patterns
- `context-demo.ts` - Context system usage
- `i18n-formatters-demo.ts` - Internationalization
- `region-currency-demo.ts` - Currency mapping
- `time-formatter-demo.ts` - Time formatting
- `translations-demo.ts` - Translation utilities

---

## What's Included?

### Validators (Regex-based)

```ts
isEmail(value: string): boolean
isPhone(value: string): boolean
isNumeric(value: string): boolean
isAlphanumeric(value: string): boolean
isValidURL(value: string): boolean
isStrongPassword(value: string): boolean
isCreditCard(value: string): boolean
isIPv4(value: string): boolean
isDate(value: string): boolean
isTime(value: string): boolean
isUUID(value: string): boolean
isPostalCode(value: string): boolean
isSSN(value: string): boolean
isCurrency(value: string): boolean
isHexColor(value: string): boolean
isDomain(value: string): boolean
isUsername(value: string): boolean
hasValidFileExtension(value: string): boolean
validateWithRegex(value: string, pattern: RegexPattern): boolean
```

### Date & Time Utilities

```ts
formatDate(date: Date | string, format?: string): string  // Default: 'YYYY-MM-DD'
getTimeAgo(date: Date | string): string                   // e.g., '3 hours ago'
isSameDay(date1: Date, date2: Date): boolean
isSameMonth(date1: Date, date2: Date): boolean
isSameYear(date1: Date, date2: Date): boolean
toISOStringUTC(date: Date): string
startOfDay(date: Date): Date
endOfDay(date: Date): Date
startOfWeek(date: Date): Date
endOfWeek(date: Date): Date
startOfMonth(date: Date): Date
endOfMonth(date: Date): Date
addDays(date: Date, days: number): Date
addMonths(date: Date, months: number): Date
addYears(date: Date, years: number): Date
getDaysDifference(date1: Date, date2: Date): number
getHoursDifference(date1: Date, date2: Date): number
getMinutesDifference(date1: Date, date2: Date): number
isToday(date: Date): boolean
isYesterday(date: Date): boolean
isTomorrow(date: Date): boolean
isPast(date: Date): boolean
isFuture(date: Date): boolean
getAge(birthDate: Date): number
isLeapYear(year: number): boolean
getDaysInMonth(year: number, month: number): number
formatDateLocale(date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string
```

### Currency & Number Formatters

```ts
formatCurrency(amount: number, currency?: string, locale?: string): string
formatCompactNumber(num: number): string       // e.g., 1.5K, 2M
formatFileSize(bytes: number): string
formatPercentage(value: number, decimals?: number, locale?: string): string
formatNumber(num: number, locale?: string, options?: Intl.NumberFormatOptions): string
formatCreditCard(cardNumber: string, mask?: boolean): string
formatSSN(ssn: string, mask?: boolean): string
formatPostalCode(postalCode: string): string
formatDuration(seconds: number): string
formatRelativeTime(date: Date | string | number): string
formatOrdinal(num: number): string
formatBytes(bytes: number, decimals?: number): string
```

### Phone Number Formatting

```ts
formatPhoneNumber(
  phone: string,
  format: "PPP - EEE SSSS" | "(PPP) - EEE SSSS" | "(PP)  EEE SSSS" | "PP-EEE SSSS" | "PPP-EEE SSSS" | "+C (PPP)-EEE-SSSS" | "+C (PPP) EEESSSS" | string,
  options?: {
    leadingDigitPad?: string
    inputIncludesCountry?: boolean | "autoDetect"
    nationalNumberLength?: number
    originCountry?: keyof typeof COUNTRY_CODES
  }
): string

// Country codes constant
COUNTRY_CODES: {
  IL: 972, US: 1, CA: 1, GB: 44, FR: 33, DE: 49, IT: 39, ES: 34, NL: 31, BE: 32, CH: 41, AT: 43, SE: 46, NO: 47, DK: 45, FI: 358, IE: 353, AU: 61, NZ: 64, AE: 971, SA: 966, JO: 962, EG: 20, TR: 90
}
```

### Context System (Global Configuration)

Initialize the library once with your preferred settings:

```ts
import { config } from '@apx-ui/toolkit';

// Initialize library on app startup
config({
    defaultLanguage: 'en',
    defaultCurrency: 'USD', 
    defaultTimezone: 'America/New_York',
    persist: 'localStorage', // 'localStorage' | 'sessionStorage' | 'memory' | false
    debug: false
});
```

**Context Functions**:
```ts
// Configuration
config(options: ApxContextOptions): void

// Language & Locale
setLanguage(language: string): void
getLanguage(): string
setLocale(locale: string): void
getLocale(): string

// Currency & Timezone  
setCurrency(currency: string): void
getCurrency(): string
setTimezone(timezone: string): void
getTimezone(): string

// Utilities
resetContext(): void
isInitialized(): boolean
isBrowser(): boolean
```

**Storage Options**:
```ts
persist: 'localStorage'    // Persists across browser sessions
persist: 'sessionStorage'  // Persists until tab closes  
persist: 'memory'          // In-memory only (no persistence)
persist: false             // No persistence, always use defaults
```

**Singleton Behavior**:
The context system is a singleton, meaning:
- Initialize once at app startup with `config()`
- Subsequent `config()` calls are ignored if already initialized
- Use `resetContext()` to clear and reinitialize if needed
- Perfect for SPAs where you want settings to persist across route changes

### I18N Formatters (Internationalization)

```ts
formatCurrencyI18N(amount: number, currency?: string, locale?: string): string
formatDateI18N(date: Date | string | number, format?: string, variant?: 'appointment' | 'default', locale?: string): string
formatTimeI18N(value: number, unit: TimeUnit, locale?: string): string
```

**Context-Aware Usage** (Recommended):
```ts
import { config, formatCurrencyI18N, setLanguage } from '@apx-ui/toolkit';

// Initialize once
config({ defaultCurrency: 'USD', defaultLanguage: 'en' });

// Use formatters without parameters - they read from context
formatCurrencyI18N(1234.56); // Uses context currency & locale

// Change context globally
setLanguage('he');
formatCurrencyI18N(1234.56); // Now uses Hebrew locale & context currency

// Override context per call
formatCurrencyI18N(1234.56, 'EUR', 'de-DE'); // German Euro formatting
```

**Legacy Functions** (Deprecated):
```ts
setCurrentLanguage(languageCode: keyof typeof LANGUAGES): void  // Use setLanguage instead
setCurrentLocale(locale: string): void                         // Use setLocale instead  
getCurrentLocale(): string                                     // Use getLocale instead
getCurrentLanguageCode(): keyof typeof LANGUAGES              // Use getLanguage instead
getCurrentLocaleFromStorage(): string | null
isBrowser(): boolean                                           // Use context system instead
```

### Constants

#### Countries
#### Languages & Translations
```ts
// Language codes and locales
LANGUAGES: Record<string, ApxLanguageObject>
RTL_LANGUAGES: string[]

// Translation functions and data
getLocaleConjunction(locale: string): string
getTimeUnitTranslation(locale: string, unit: TimeUnit, value: number): string
getDayTranslation(language: string, day: DayName, format: 'short' | 'long'): string
getMonthTranslation(language: string, month: MonthName, format: 'short' | 'long'): string
getDaysForLanguage(language: string): Record<DayName, DayTranslation>
getMonthsForLanguage(language: string): Record<MonthName, MonthTranslation>

// Translation constants
LOCALE_CONJUNCTIONS: Record<string, string>
TIME_UNIT_TRANSLATIONS: Record<string, Record<TimeUnit, { singular: string; plural: string }>>
DAYS_TRANSLATIONS: Record<string, Record<DayName, DayTranslation>>
MONTHS_TRANSLATIONS: Record<string, Record<MonthName, MonthTranslation>>

// Types
TimeUnit: 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'mo' | 'y'
DayName: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
MonthName: 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'
```

```ts
COUNTRIES = [
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'IL', name: 'Israel', phoneCode: '+972' },
  ...
]

getCountryByCode(code: string): Country | undefined
getCountryByName(name: string): Country | undefined
getCountriesByPhoneCode(phoneCode: string): Country[]
```

#### Languages

```ts
LANGUAGES = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'he', label: 'Hebrew', nativeName: 'עברית' },
  ...
]

getLanguageByCode(code: string): Language | undefined
getLanguageByLabel(label: string): Language | undefined
getSupportedLanguageCodes(): string[]
```

#### Magic Numbers

```ts
SECONDS_IN_MINUTE = 60
MILLISECONDS_IN_SECOND = 1000
MILLISECONDS_IN_MINUTE = 60000
NUMBER_1000 = 1000
// ... and many more time and mathematical constants
```

#### Region & Currency Mapping

```ts
REGION_CURRENCY_MAP: Record<string, string>  // Maps country codes to currency codes
getCurrencyForRegion(region: string): string | undefined
getSupportedRegions(): string[]
getSupportedCurrencies(): string[]

// Examples:
getCurrencyForRegion('US') // 'USD'
getCurrencyForRegion('IL') // 'ILS'
getCurrencyForRegion('GB') // 'GBP'
```

### Regex Patterns

```ts
REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+?\d{1,3})?\d{7,14}$/,
  numeric: /^\d+$/,
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
  strongPassword: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  // ... and many more patterns
}
```

### Generic Helpers

```ts
isEmpty(value: any): boolean
isDefined<T>(val: T | undefined | null): val is T
toNumberSafe(value: any, fallback = 0): number
isString(value: any): value is string
isNumber(value: any): value is number
isBoolean(value: any): value is boolean
isObject(value: any): value is object
isArray(value: any): value is any[]
isFunction(value: any): value is Function
isNull(value: any): value is null
isUndefined(value: any): value is undefined
getValueOrFallback<T>(value: T | null | undefined, fallback: T): T
deepClone<T>(obj: T): T
merge<T extends object>(...objects: Partial<T>[]): T
deepMerge<T extends object>(...objects: Partial<T>[]): T
pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void
throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void
randomString(length?: number): string
randomNumber(min: number, max: number): number
capitalize(str: string): string
toCamelCase(str: string): string
toKebabCase(str: string): string
toSnakeCase(str: string): string
toPascalCase(str: string): string
truncate(str: string, length: number, suffix?: string): string
unique<T>(array: T[]): T[]
groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]>
sortBy<T, K extends keyof T>(array: T[], key: K, order?: 'asc' | 'desc'): T[]
```

### Scroll Utilities

```ts
scrollToTop(options?: ScrollOptions): void
scrollToElement(element: Element, options?: ScrollOptions, offset?: number): void
scrollToPosition(position: number, options?: ScrollOptions): void
isInViewport(element: Element, threshold?: number): boolean
getScrollPosition(target?: Window | Element): number
stopScroll(target?: Window | Element): void

// Types
type ScrollBehavior = 'auto' | 'smooth'
interface ScrollOptions {
  behavior?: ScrollBehavior
  duration?: number
  easing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'
  target?: Window | Element
}
```

### Storage Persister

```ts
// Main Persister class
Persister.setLocalStorage(data: PersisterData): void
Persister.getLocalStorage<T>(key: string): T | null
Persister.removeLocalStorage(key: string): void
Persister.setSessionStorage(data: PersisterData): void
Persister.getSessionStorage<T>(key: string): T | null
Persister.removeSessionStorage(key: string): void
Persister.has(key: string, storageType?: StorageType): boolean
Persister.keys(storageType?: StorageType): string[]
Persister.getStorageSize(storageType?: StorageType): number
Persister.clear(storageType?: StorageType): void
Persister.getRemainingTTL(key: string, storageType?: StorageType): number | null
Persister.cleanupExpiredTTL(storageType?: StorageType): void

// Convenience classes
LocalStorage.set(data: PersisterData): void
LocalStorage.get<T>(key: string): T | null
LocalStorage.remove(key: string): void
LocalStorage.has(key: string): boolean
LocalStorage.keys(): string[]
LocalStorage.clear(): void
LocalStorage.cleanupExpiredTTL(): void
LocalStorage.getRemainingTTL(key: string): number | null

SessionStorage.set(data: PersisterData): void
SessionStorage.get<T>(key: string): T | null
SessionStorage.remove(key: string): void
SessionStorage.has(key: string): boolean
SessionStorage.keys(): string[]
SessionStorage.clear(): void
SessionStorage.cleanupExpiredTTL(): void
SessionStorage.getRemainingTTL(key: string): number | null

// Types
type PersisterData = Record<string, {
  value: any
  encode?: boolean
  ttl?: number
}>
type StorageType = 'localStorage' | 'sessionStorage'
```

---

## Directory Structure

```
src/
├── constants/
│   ├── countries.ts
│   ├── languages.ts
│   ├── magicNumbers.ts
│   ├── days.ts
│   ├── months.ts
│   ├── regions.ts
│   └── translations.ts
├── context/
│   └── index.ts
├── persister/
│   ├── index.ts
│   └── utils.ts
├── regex/
│   └── patterns.ts
├── utils/
│   ├── validators.ts
│   ├── formatters.ts
│   ├── dateUtils.ts
│   ├── generic.ts
│   ├── i18nFormatters.ts
│   ├── phoneNumber.ts
│   └── scrollUtils.ts
├── common-types/
│   └── index.ts
└── index.ts
```

---

## Usage Examples

### Validation

```ts
import { isEmail, validateEmail, isPhone, isStrongPassword } from '@apx-ui/toolkit';

// Simple validation
isEmail('user@example.com'); // true
isPhone('+1234567890'); // true
isStrongPassword('MyPass123!'); // true

// Detailed validation with error messages
const emailResult = validateEmail('invalid-email');
console.log(emailResult); // { valid: false, error: 'Invalid email format' }
```

### Formatting

```ts
import { formatCurrency, formatPhoneNumber, formatCompactNumber } from '@apx-ui/toolkit';

formatCurrency(1234.56, 'USD', 'en-US'); // '$1,234.56'
formatPhoneNumber('+12345678901', '+C (PPP)-EEE-SSSS'); // '+1 (234)-567-8901'
formatPhoneNumber('1234567890', 'PPP - EEE SSSS'); // '123 - 456 7890'
formatCompactNumber(1500); // '1.5K'
```

### Date Utilities

```ts
import { formatDate, getTimeAgo, isToday, addDays } from '@apx-ui/toolkit';

formatDate(new Date(), 'YYYY-MM-DD'); // '2024-01-15'
getTimeAgo(new Date('2024-01-10')); // '5 days ago'
isToday(new Date()); // true
addDays(new Date(), 7); // Date object 7 days from now
```

### Generic Helpers

```ts
import { isEmpty, isDefined, toNumberSafe, deepClone } from '@apx-ui/toolkit';

isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true

isDefined(null); // false
isDefined(undefined); // false
isDefined('hello'); // true

toNumberSafe('123'); // 123
toNumberSafe('abc', 0); // 0

const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj); // Deep copy
```

### Constants

```ts
import { COUNTRIES, LANGUAGES, SECONDS_IN_MINUTE, getCurrencyForRegion } from '@apx-ui/toolkit';

const israel = COUNTRIES.find(c => c.code === 'IL');
console.log(israel); // { code: 'IL', name: 'Israel', phoneCode: '+972' }

const english = LANGUAGES.find(l => l.code === 'en');
console.log(english); // { code: 'en', label: 'English', nativeName: 'English' }

console.log(SECONDS_IN_MINUTE); // 60
console.log(getCurrencyForRegion('US')); // 'USD'
```

### Scroll Utilities

```ts
import { scrollToTop, scrollToElement, isInViewport } from '@apx-ui/toolkit';

// Smooth scroll to top
scrollToTop({ duration: 1000, easing: 'easeInOut' });

// Scroll to element with offset
const element = document.getElementById('section');
scrollToElement(element, { duration: 500 }, 100);

// Check if element is visible
const isVisible = isInViewport(element, 0.5); // 50% threshold
```

### Storage Persister

```ts
import { LocalStorage, SessionStorage } from '@apx-ui/toolkit';

// Store data with TTL (time to live)
LocalStorage.set({
  user: { value: { id: 1, name: 'John' }, ttl: 3600 }, // Expires in 1 hour
  settings: { value: { theme: 'dark' } } // No expiration
});

// Retrieve data
const user = LocalStorage.get('user');
const settings = LocalStorage.get('settings');

// Check if key exists and get remaining TTL
if (LocalStorage.has('user')) {
  const remainingTime = LocalStorage.getRemainingTTL('user'); // seconds
  console.log(`User data expires in ${remainingTime} seconds`);
}

// Clean up expired items
LocalStorage.cleanupExpiredTTL();
```

---

## Testing

```bash
npm test
```

---

## Contributing

1. Clone the repo
2. Install deps: `npm install`
3. Run tests: `npm test`
4. Add your utility to `src/` and export it in `index.ts`

PRs and suggestions are welcome!

---

## License

MIT © 2025 [AppNA.io](https://appna.io)