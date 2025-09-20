# @apx-ui/toolkit

[![Apx Toolkit](https://img.shields.io/badge/apx-toolkit-blue.svg)](https://github.com/appna-io/apx-toolkit)
[![AppNA.io](https://img.shields.io/badge/appna.io--UX/UI-orange.svg)](https://appna.io)
[![apx-ui](https://img.shields.io/badge/tag-apx--ui-purple.svg)](https://github.com/appna-io/apx-toolkit)
[![apx-ui](https://img.shields.io/badge/tag-AllInOne--Utility-purple.svg)](https://github.com/appna-io/apx-toolkit)
[![220 test cases passed](https://img.shields.io/badge/passed-220--Tests-passed--green.svg)](https://github.com/appna-io/apx-toolkit/tree/main/src/__tests__)

A modern utility SDK for frontend web applications.  
Includes regex-based validators, generic helpers, formatting utilities, date tools, magic constants, phone number formatting, scroll utilities, storage persister, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#1-installation)
  - [Initialize Context](#2-initialize-context-recommended)
  - [Basic Usage](#3-basic-usage)
  - [Running Examples](#4-running-examples)
- [What's Included?](#whats-included)
  - [Validators (Regex-based)](#validators-regex-based)
  - [Date & Time Utilities](#date--time-utilities)
  - [Currency & Number Formatters](#currency--number-formatters)
  - [Phone Number Formatting](#phone-number-formatting)
  - [Context System (Global Configuration)](#context-system-global-configuration)
  - [I18N Formatters (Internationalization)](#i18n-formatters-internationalization)
  - [Constants](#constants)
  - [Regex Patterns](#regex-patterns)
  - [Generic Helpers](#generic-helpers)
  - [Scroll Utilities](#scroll-utilities)
  - [Credit Card Utilities](#credit-card-utilities)
  - [Opening Hours Formatter](#opening-hours-formatter)
  - [Storage Persister](#storage-persister)
- [Directory Structure](#directory-structure)
- [Usage Examples](#usage-examples)
  - [Validation](#validation)
  - [Formatting](#formatting)
  - [Date Utilities](#date-utilities)
  - [Generic Helpers](#generic-helpers-1)
  - [Constants](#constants-1)
  - [Scroll Utilities](#scroll-utilities-1)
  - [Storage Persister](#storage-persister-1)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

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
- `comprehensive-validators-demo.ts` - All validation functions with examples
- `comprehensive-formatters-demo.ts` - All formatting functions with examples
- `comprehensive-date-utilities-demo.ts` - All date utilities with examples
- `comprehensive-generic-utilities-demo.ts` - All generic helper functions with examples
- `credit-card-demo.ts` - Credit card utilities with formatting, validation, and dummy generation
- `opening-hours-demo.ts` - Opening hours formatting with multi-language support
- `phone-formatting-examples.ts` - Phone number formatting patterns
- `phone-number-demo.ts` - Phone number utility demo
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

// Validation with detailed results
validateEmail(email: string): ValidationResult
validatePhone(phone: string): ValidationResult
validateURL(url: string): ValidationResult
validatePassword(password: string): ValidationResult
```

**Comprehensive Examples:**
```ts
// Basic validation
isEmail('user@example.com'); // true
isPhone('+1234567890'); // true
isValidURL('https://example.com'); // true
isStrongPassword('MyPass123!'); // true

// Advanced validation
isCreditCard('4111111111111111'); // true (Visa)
isIPv4('192.168.1.1'); // true
isUUID('550e8400-e29b-41d4-a716-446655440000'); // true
isHexColor('#FF0000'); // true
isDomain('example.com'); // true

// Validation with detailed results
const emailResult = validateEmail('invalid-email');
console.log(emailResult); // { valid: false, error: 'Invalid email format' }

const passwordResult = validatePassword('weak');
console.log(passwordResult); // { valid: false, error: 'Password must be at least 8 characters long' }

// Form validation example
const formData = {
    email: 'user@example.com',
    phone: '+1234567890',
    password: 'MyPass123!',
    website: 'https://example.com'
};

const validation = {
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    password: validatePassword(formData.password),
    website: validateURL(formData.website)
};

// Check all validations
const isFormValid = Object.values(validation).every(result => result.valid);
```

**Available Regex Patterns:**
```ts
REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+?\d{1,3})?\d{7,14}$/,
    numeric: /^\d+$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
    strongPassword: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    postalCode: /^\d{5}(-\d{4})?$/,
    ssn: /^\d{3}-\d{2}-\d{4}$/,
    currency: /^\$?\d+(\.\d{2})?$/,
    hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    domain: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    fileExtension: /\.(jpg|jpeg|png|gif|pdf|doc|docx|txt|zip|rar)$/i
}
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

**Comprehensive Examples:**
```ts
// Currency formatting
formatCurrency(1234.56); // $1,234.56
formatCurrency(1234.56, 'EUR', 'de-DE'); // 1.234,56 €
formatCurrency(1234.56, 'JPY', 'ja-JP'); // ¥1,235

// Compact number formatting
formatCompactNumber(1500); // 1.5K
formatCompactNumber(2000000); // 2.0M
formatCompactNumber(1500000000); // 1.5B

// File size formatting
formatFileSize(1024); // 1 KB
formatFileSize(1048576); // 1 MB
formatBytes(1024, 2); // 1.00 KB

// Percentage formatting
formatPercentage(12.5); // 12.50%
formatPercentage(0.5, 1); // 0.5%

// Personal data formatting
formatCreditCard('4111111111111111', true); // ************1111
formatSSN('123456789', true); // ***-**-6789
formatPostalCode('123456789'); // 12345-6789

// Time formatting
formatDuration(3661); // 1h 1m 1s
formatRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000)); // 2 hours ago
formatOrdinal(21); // 21st
formatOrdinal(22); // 22nd

// Number formatting with options
formatNumber(1234.56, 'en-US', { 
    style: 'currency', 
    currency: 'USD' 
}); // $1,234.56

formatNumber(0.1234, 'en-US', { 
    style: 'percent' 
}); // 12%
```

**Real-World Usage:**
```ts
// E-commerce product display
const product = {
    name: 'Premium Headphones',
    price: 299.99,
    discount: 15,
    fileSize: 1048576,
    rating: 4.5
};

console.log(`Product: ${product.name}`);
console.log(`Price: ${formatCurrency(product.price, 'USD')}`);
console.log(`Discount: ${formatPercentage(product.discount)}`);
console.log(`Final Price: ${formatCurrency(product.price * (1 - product.discount / 100), 'USD')}`);
console.log(`File Size: ${formatFileSize(product.fileSize)}`);
console.log(`Rating: ${formatNumber(product.rating, 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/5`);
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

**Comprehensive Examples:**
```ts
// Type checking
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty('hello'); // false

isDefined(null); // false
isDefined(undefined); // false
isDefined('hello'); // true

isString('hello'); // true
isNumber(123); // true
isBoolean(true); // true
isArray([1, 2, 3]); // true
isObject({}); // true

// Safe value conversion
toNumberSafe('123'); // 123
toNumberSafe('abc', 0); // 0
toNumberSafe(null, 999); // 999

getValueOrFallback(null, 'default'); // 'default'
getValueOrFallback('hello', 'default'); // 'hello'

// Object manipulation
const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };

const userBasic = pick(user, ['name', 'email']); // { name: 'John', email: 'john@example.com' }
const userWithoutId = omit(user, ['id', 'age']); // { name: 'John', email: 'john@example.com' }

// Deep cloning
const original = { user: { name: 'John' }, items: [1, 2, 3] };
const cloned = deepClone(original);
cloned.user.name = 'Jane';
console.log(original.user.name); // 'John' (unchanged)

// String utilities
capitalize('hello world'); // 'Hello world'
toCamelCase('hello-world'); // 'helloWorld'
toKebabCase('helloWorld'); // 'hello-world'
toSnakeCase('helloWorld'); // 'hello_world'
toPascalCase('hello world'); // 'HelloWorld'
truncate('This is a very long string', 20, '...'); // 'This is a very long...'

// Array utilities
unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]

const users = [
    { name: 'John', department: 'Engineering', age: 30 },
    { name: 'Jane', department: 'Marketing', age: 25 },
    { name: 'Bob', department: 'Engineering', age: 35 }
];

groupBy(users, 'department');
// { Engineering: [{ name: 'John', ... }, { name: 'Bob', ... }], Marketing: [{ name: 'Jane', ... }] }

sortBy(users, 'age'); // Sort by age ascending
sortBy(users, 'age', 'desc'); // Sort by age descending
```

```javascript
// Performance Utility

// Debounce

// JS Example:
const debouncedSearch = debounce((query: string) => {
    console.log('Searching for:', query);
}, 300);

// React onClick example:

<button onClick={debounce(() => console.log("Clicked!"), 500)}>
  Click me
</button>
/**
 * 
 * If the user clicks 5 times rapidly:
 - All previous timers get canceled.
 - After 500ms of no further clicks, the callback fires once.
 
 * Effect: “Only run after the last click in a burst.”
 */


// Throttle

// JS Example:
const throttledScroll = throttle(() => {
    console.log('Scroll event');
}, 100);

// React onClick example:
<button onClick={throttle(() => console.log("Clicked!"), 1000)}>
  Click me
</button>

/**
 * 
 * If the user clicks 5 times rapidly:
   - First click triggers immediately.
  - Next clicks within 1000ms are ignored.
  - After 1000ms, another click will be accepted.

 * Effect: “Run immediately, then ignore until delay passes.”
*/
```

```javascript
// Random utilities
randomString(10); // 'aB3xY9mK2p'
randomNumber(1, 100); // Random number between 1 and 100
```


**Real-World Usage:**
```ts
// Form data sanitization
const sanitizeFormData = (data: any) => {
    return {
        name: data.name?.trim() || '',
        email: data.email?.trim() || '',
        age: toNumberSafe(data.age, 0),
        phone: data.phone?.replace(/\D/g, '') || '',
        bio: truncate(data.bio?.trim() || '', 100, '...')
    };
};

// Data processing pipeline
const processUsers = (users: any[]) => {
    // Filter out invalid users
    const validUsers = users.filter(user => 
        isDefined(user.name) && 
        isDefined(user.email) && 
        !isEmpty(user.name)
    );
    
    // Group by department
    const byDepartment = groupBy(validUsers, 'department');
    
    // Sort by name
    const sorted = sortBy(validUsers, 'name');
    
    return { validUsers, byDepartment, sorted };
};

// API response handling
const handleApiResponse = (response: any) => {
    const data = getValueOrFallback(response.data, []);
    const error = getValueOrFallback(response.error, null);
    
    if (isDefined(error)) {
        console.error('API Error:', error);
        return [];
    }
    
    return isArray(data) ? data : [];
};
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

### Credit Card Utilities

```ts
// Credit card formatting
formatCreditCard(cardNumber: string, options?: CreditCardFormatOptions): string
getCreditCardType(cardNumber: string): CreditCardType | null
getLast4Digits(cardNumber: string): string
maskCreditCard(cardNumber: string, maskChar?: string): string

// Credit card validation
isValidCreditCardNumber(cardNumber: string): boolean

// Dummy card generation
getRandomDummyCreditCard(type?: CreditCardType): string

// Credit card information
getCreditCardInfo(cardNumber: string, options?: CreditCardFormatOptions): CreditCardInfo
getAvailableCreditCardTypes(): Array<{ type: CreditCardType; name: string; format: string }>

// Types
type CreditCardType = 'VISA' | 'MASTERCARD' | 'AMERICAN_EXPRESS' | 'DISCOVER' | 'DINERS_CLUB' | 'JCB' | 'UNIONPAY'
type CreditCardFormatOptions = {
  mask?: boolean
  format?: string
  maskChar?: string
}
type CreditCardInfo = {
  type: CreditCardType | null
  typeName: string | null
  number: string
  formatted: string
  last4: string
  isValid: boolean
  length: number
}
```

**Comprehensive Examples:**
```ts
// Basic formatting
formatCreditCard('4111111111111111'); // '4111 1111 1111 1111'

// Custom format with placeholders
formatCreditCard('4111111111111111', { 
  format: 'AAAA-BBBB-CCCC-DDDD' 
}); // '4111-1111-1111-1111'

// Masked formatting
formatCreditCard('4111111111111111', { 
  mask: true 
}); // '************1111'

// Custom mask character
formatCreditCard('4111111111111111', { 
  mask: true, 
  maskChar: 'X' 
}); // 'XXXXXXXXXXXX1111'

// Credit card type detection
getCreditCardType('4111111111111111'); // 'VISA'
getCreditCardType('5555555555554444'); // 'MASTERCARD'

// Last 4 digits
getLast4Digits('4111111111111111'); // '1111'

// Validation
isValidCreditCardNumber('4111111111111111'); // true
isValidCreditCardNumber('1234567890123456'); // false

// Dummy card generation
getRandomDummyCreditCard('VISA'); // '4111111111111111'
getRandomDummyCreditCard(); // Random card of any type

// Complete card information
const info = getCreditCardInfo('4111111111111111');
console.log(info);
// {
//   type: 'VISA',
//   typeName: 'Visa',
//   number: '4111111111111111',
//   formatted: '4111 1111 1111 1111',
//   last4: '1111',
//   isValid: true,
//   length: 16
// }
```

**Supported Credit Card Types:**
- **Visa**: 4xxx (13, 16, 19 digits)
- **MasterCard**: 5xxx (16 digits)
- **American Express**: 3x (15 digits)
- **Discover**: 6xxx (16 digits)
- **Diners Club**: 3xxx (14 digits)
- **JCB**: 3xxx (15, 16 digits)
- **UnionPay**: 62xx (16-19 digits)

**Real-World Usage:**
```ts
// Payment form validation
const validatePaymentForm = (cardNumber: string) => {
  const info = getCreditCardInfo(cardNumber);
  
  if (!info.isValid) {
    return { valid: false, error: 'Invalid credit card number' };
  }
  
  return {
    valid: true,
    type: info.typeName,
    last4: info.last4,
    formatted: info.formatted
  };
};

// Display saved cards
const displaySavedCards = (cards: string[]) => {
  return cards.map(card => {
    const info = getCreditCardInfo(card);
    return {
      type: info.typeName,
      last4: info.last4,
      masked: maskCreditCard(card)
    };
  });
};

// Test card generation for development
const generateTestCards = () => {
  return {
    visa: getRandomDummyCreditCard('VISA'),
    mastercard: getRandomDummyCreditCard('MASTERCARD'),
    amex: getRandomDummyCreditCard('AMERICAN_EXPRESS')
  };
};
```

### Opening Hours Formatter

```ts
formatOpeningHours(
  storeHours: StoreHours,
  options?: {
    locale?: string
    use24Hour?: boolean
    language?: string
  }
): string[]

// Types
type StoreHours = Array<{
  open: string | false
  closed: string | false
} | Array<{
  open: string
  closed: string
}>>
```

**Comprehensive Examples:**
```ts
// Standard business hours
const standardHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [{ "closed": "17:00", "open": "09:00" }], // Monday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Tuesday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Wednesday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Thursday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Friday - 9:00-17:00
    [{ "closed": "15:00", "open": "09:00" }]  // Saturday - 9:00-15:00
];

// English with 12-hour format
const englishHours = formatOpeningHours(standardHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});
// ['Sunday, Saturday: 9:00 AM - 6:00 PM', 'Monday - Friday: 9:00 AM - 5:00 PM']

// Hebrew with 12-hour format
const hebrewHours = formatOpeningHours(standardHours, {
    locale: 'he-IL',
    use24Hour: false,
    language: 'he'
});
// ['ראשון, שבת: 9:00 AM - 6:00 PM', 'שני - שישי: 9:00 AM - 5:00 PM']

// Arabic with 24-hour format
const arabicHours = formatOpeningHours(standardHours, {
    locale: 'ar-SA',
    use24Hour: true,
    language: 'ar'
});
// ['الأحد, السبت: ٠٩:٠٠ - ١٨:٠٠', 'الاثنين - الجمعة: ٠٩:٠٠ - ١٧:٠٠']

// Restaurant with lunch break
const restaurantHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "22:00", "open": "17:00" }
    ], // Monday - 11:00-14:00, 17:00-22:00
    // ... similar for other days
];

const restaurantFormatted = formatOpeningHours(restaurantHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});
// ['Monday - Saturday: 11:00 AM - 2:00 PM, 5:00 PM - 10:00 PM', 'Sunday: Closed']

// 24/7 Store
const store24_7: StoreHours = [
    [{ "closed": "23:59", "open": "00:00" }], // Sunday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Monday - 24/7
    // ... similar for all days
];

const store24_7Formatted = formatOpeningHours(store24_7, {
    locale: 'en-US',
    use24Hour: true,
    language: 'en'
});
// ['Sunday - Saturday: 00:00 - 23:59']
```

**Real-World Usage:**
```ts
// Business hours display component
const BusinessHoursDisplay = ({ hours, locale = 'en-US' }: { hours: StoreHours, locale?: string }) => {
    const formattedHours = formatOpeningHours(hours, {
        locale,
        use24Hour: false,
        language: locale.split('-')[0]
    });
    
    return (
        <div className="business-hours">
            <h3>Opening Hours</h3>
            {formattedHours.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
};

// Multi-language support
const getBusinessHours = (language: string) => {
    const hours = getStoreHours(); // Your business hours data
    
    return formatOpeningHours(hours, {
        locale: `${language}-${getCountryCode(language)}`,
        use24Hour: language === 'ar' || language === 'he', // Use 24-hour for Arabic/Hebrew
        language
    });
};
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