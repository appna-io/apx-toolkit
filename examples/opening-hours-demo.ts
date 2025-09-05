import { formatOpeningHours, type StoreHours } from '@apx-ui/toolkit';

/**
 * Opening Hours Demo
 * 
 * This demo showcases the opening hours formatting functionality
 * with support for multiple languages, time formats, and complex schedules.
 */

console.log('=== Opening Hours Demo ===\n');

/**
 * 1. Basic Opening Hours Examples
 */
console.log('--- 1. Basic Opening Hours Examples ---');

// Standard business hours (Monday-Friday 9-17, Saturday 9-15, Sunday closed)
const standardHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [{ "closed": "17:00", "open": "09:00" }], // Monday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Tuesday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Wednesday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Thursday - 9:00-17:00
    [{ "closed": "17:00", "open": "09:00" }], // Friday - 9:00-17:00
    [{ "closed": "15:00", "open": "09:00" }]  // Saturday - 9:00-15:00
];

console.log('📅 Standard Business Hours:');
const standardFormatted = formatOpeningHours(standardHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

standardFormatted.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 2. Different Time Formats
 */
console.log('\n--- 2. Different Time Formats ---');

// 24-hour format
console.log('🕐 24-Hour Format:');
const format24Hour = formatOpeningHours(standardHours, {
    locale: 'en-US',
    use24Hour: true,
    language: 'en'
});

format24Hour.forEach(line => {
    console.log(`  ${line}`);
});

// 12-hour format (AM/PM)
console.log('\n🕐 12-Hour Format (AM/PM):');
const format12Hour = formatOpeningHours(standardHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

format12Hour.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 3. Multi-Language Support
 */
console.log('\n--- 3. Multi-Language Support ---');

// English
console.log('🇺🇸 English:');
const englishHours = formatOpeningHours(standardHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

englishHours.forEach(line => {
    console.log(`  ${line}`);
});

// Hebrew
console.log('\n🇮🇱 Hebrew:');
const hebrewHours = formatOpeningHours(standardHours, {
    locale: 'he-IL',
    use24Hour: false,
    language: 'he'
});

hebrewHours.forEach(line => {
    console.log(`  ${line}`);
});

// Arabic
console.log('\n🇸🇦 Arabic:');
const arabicHours = formatOpeningHours(standardHours, {
    locale: 'ar-SA',
    use24Hour: true,
    language: 'ar'
});

arabicHours.forEach(line => {
    console.log(`  ${line}`);
});

// Spanish
console.log('\n🇪🇸 Spanish:');
const spanishHours = formatOpeningHours(standardHours, {
    locale: 'es-ES',
    use24Hour: false,
    language: 'es'
});

spanishHours.forEach(line => {
    console.log(`  ${line}`);
});

// French
console.log('\n🇫🇷 French:');
const frenchHours = formatOpeningHours(standardHours, {
    locale: 'fr-FR',
    use24Hour: false,
    language: 'fr'
});

frenchHours.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 4. Complex Schedules
 */
console.log('\n--- 4. Complex Schedules ---');

// Restaurant with lunch break
console.log('🍽️ Restaurant with Lunch Break:');
const restaurantHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "22:00", "open": "17:00" }
    ], // Monday - 11:00-14:00, 17:00-22:00
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "22:00", "open": "17:00" }
    ], // Tuesday - 11:00-14:00, 17:00-22:00
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "22:00", "open": "17:00" }
    ], // Wednesday - 11:00-14:00, 17:00-22:00
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "22:00", "open": "17:00" }
    ], // Thursday - 11:00-14:00, 17:00-22:00
    [
        { "closed": "14:00", "open": "11:00" },
        { "closed": "23:00", "open": "17:00" }
    ], // Friday - 11:00-14:00, 17:00-23:00
    [
        { "closed": "23:00", "open": "12:00" }
    ]  // Saturday - 12:00-23:00
];

const restaurantFormatted = formatOpeningHours(restaurantHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

restaurantFormatted.forEach(line => {
    console.log(`  ${line}`);
});

// 24/7 Store
console.log('\n🏪 24/7 Store:');
const store24_7: StoreHours = [
    [{ "closed": "23:59", "open": "00:00" }], // Sunday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Monday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Tuesday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Wednesday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Thursday - 24/7
    [{ "closed": "23:59", "open": "00:00" }], // Friday - 24/7
    [{ "closed": "23:59", "open": "00:00" }]  // Saturday - 24/7
];

const store24_7Formatted = formatOpeningHours(store24_7, {
    locale: 'en-US',
    use24Hour: true,
    language: 'en'
});

store24_7Formatted.forEach(line => {
    console.log(`  ${line}`);
});

// Part-time business
console.log('\n🏢 Part-time Business (Tuesday, Thursday, Saturday):');
const partTimeHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    { "closed": false, "open": false }, // Monday - Closed
    [{ "closed": "17:00", "open": "09:00" }], // Tuesday - 9:00-17:00
    { "closed": false, "open": false }, // Wednesday - Closed
    [{ "closed": "17:00", "open": "09:00" }], // Thursday - 9:00-17:00
    { "closed": false, "open": false }, // Friday - Closed
    [{ "closed": "15:00", "open": "10:00" }]  // Saturday - 10:00-15:00
];

const partTimeFormatted = formatOpeningHours(partTimeHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

partTimeFormatted.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 5. Edge Cases
 */
console.log('\n--- 5. Edge Cases ---');

// All days closed
console.log('🚫 All Days Closed:');
const allClosed: StoreHours = [
    { "closed": false, "open": false },
    { "closed": false, "open": false },
    { "closed": false, "open": false },
    { "closed": false, "open": false },
    { "closed": false, "open": false },
    { "closed": false, "open": false },
    { "closed": false, "open": false }
];

const allClosedFormatted = formatOpeningHours(allClosed, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

allClosedFormatted.forEach(line => {
    console.log(`  ${line}`);
});

// Same hours every day
console.log('\n🔄 Same Hours Every Day:');
const sameHours: StoreHours = [
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }],
    [{ "closed": "18:00", "open": "09:00" }]
];

const sameHoursFormatted = formatOpeningHours(sameHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

sameHoursFormatted.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 6. Real-World Business Examples
 */
console.log('\n--- 6. Real-World Business Examples ---');

// Coffee shop
console.log('☕ Coffee Shop:');
const coffeeShopHours: StoreHours = [
    [{ "closed": "18:00", "open": "07:00" }], // Sunday - 7:00-18:00
    [{ "closed": "20:00", "open": "06:00" }], // Monday - 6:00-20:00
    [{ "closed": "20:00", "open": "06:00" }], // Tuesday - 6:00-20:00
    [{ "closed": "20:00", "open": "06:00" }], // Wednesday - 6:00-20:00
    [{ "closed": "20:00", "open": "06:00" }], // Thursday - 6:00-20:00
    [{ "closed": "21:00", "open": "06:00" }], // Friday - 6:00-21:00
    [{ "closed": "21:00", "open": "07:00" }]  // Saturday - 7:00-21:00
];

const coffeeShopFormatted = formatOpeningHours(coffeeShopHours, {
    locale: 'en-US',
    use24Hour: false,
    language: 'en'
});

coffeeShopFormatted.forEach(line => {
    console.log(`  ${line}`);
});

// Medical clinic
console.log('\n🏥 Medical Clinic:');
const clinicHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [
        { "closed": "12:00", "open": "08:00" },
        { "closed": "17:00", "open": "14:00" }
    ], // Monday - 8:00-12:00, 14:00-17:00
    [
        { "closed": "12:00", "open": "08:00" },
        { "closed": "17:00", "open": "14:00" }
    ], // Tuesday - 8:00-12:00, 14:00-17:00
    [
        { "closed": "12:00", "open": "08:00" },
        { "closed": "17:00", "open": "14:00" }
    ], // Wednesday - 8:00-12:00, 14:00-17:00
    [
        { "closed": "12:00", "open": "08:00" },
        { "closed": "17:00", "open": "14:00" }
    ], // Thursday - 8:00-12:00, 14:00-17:00
    [
        { "closed": "12:00", "open": "08:00" },
        { "closed": "16:00", "open": "14:00" }
    ], // Friday - 8:00-12:00, 14:00-16:00
    { "closed": false, "open": false }  // Saturday - Closed
];

const clinicFormatted = formatOpeningHours(clinicHours, {
    locale: 'en-US',
    use24Hour: true,
    language: 'en'
});

clinicFormatted.forEach(line => {
    console.log(`  ${line}`);
});

// Gym with extended hours
console.log('\n💪 Gym with Extended Hours:');
const gymHours: StoreHours = [
    [{ "closed": "22:00", "open": "08:00" }], // Sunday - 8:00-22:00
    [{ "closed": "23:00", "open": "05:00" }], // Monday - 5:00-23:00
    [{ "closed": "23:00", "open": "05:00" }], // Tuesday - 5:00-23:00
    [{ "closed": "23:00", "open": "05:00" }], // Wednesday - 5:00-23:00
    [{ "closed": "23:00", "open": "05:00" }], // Thursday - 5:00-23:00
    [{ "closed": "23:00", "open": "05:00" }], // Friday - 5:00-23:00
    [{ "closed": "22:00", "open": "08:00" }]  // Saturday - 8:00-22:00
];

const gymFormatted = formatOpeningHours(gymHours, {
    locale: 'en-US',
    use24Hour: true,
    language: 'en'
});

gymFormatted.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 7. International Business Hours
 */
console.log('\n--- 7. International Business Hours ---');

// Middle East business (Sunday-Thursday)
console.log('🌍 Middle East Business (Sunday-Thursday):');
const middleEastHours: StoreHours = [
    [{ "closed": "18:00", "open": "09:00" }], // Sunday - 9:00-18:00
    [{ "closed": "18:00", "open": "09:00" }], // Monday - 9:00-18:00
    [{ "closed": "18:00", "open": "09:00" }], // Tuesday - 9:00-18:00
    [{ "closed": "18:00", "open": "09:00" }], // Wednesday - 9:00-18:00
    [{ "closed": "18:00", "open": "09:00" }], // Thursday - 9:00-18:00
    { "closed": false, "open": false }, // Friday - Closed
    { "closed": false, "open": false }  // Saturday - Closed
];

const middleEastFormatted = formatOpeningHours(middleEastHours, {
    locale: 'ar-SA',
    use24Hour: true,
    language: 'ar'
});

middleEastFormatted.forEach(line => {
    console.log(`  ${line}`);
});

// European business with siesta
console.log('\n🇪🇸 European Business with Siesta:');
const europeanHours: StoreHours = [
    { "closed": false, "open": false }, // Sunday - Closed
    [
        { "closed": "14:00", "open": "09:00" },
        { "closed": "18:00", "open": "16:00" }
    ], // Monday - 9:00-14:00, 16:00-18:00
    [
        { "closed": "14:00", "open": "09:00" },
        { "closed": "18:00", "open": "16:00" }
    ], // Tuesday - 9:00-14:00, 16:00-18:00
    [
        { "closed": "14:00", "open": "09:00" },
        { "closed": "18:00", "open": "16:00" }
    ], // Wednesday - 9:00-14:00, 16:00-18:00
    [
        { "closed": "14:00", "open": "09:00" },
        { "closed": "18:00", "open": "16:00" }
    ], // Thursday - 9:00-14:00, 16:00-18:00
    [
        { "closed": "14:00", "open": "09:00" },
        { "closed": "17:00", "open": "16:00" }
    ], // Friday - 9:00-14:00, 16:00-17:00
    { "closed": false, "open": false }  // Saturday - Closed
];

const europeanFormatted = formatOpeningHours(europeanHours, {
    locale: 'es-ES',
    use24Hour: false,
    language: 'es'
});

europeanFormatted.forEach(line => {
    console.log(`  ${line}`);
});

/**
 * 8. Default Options
 */
console.log('\n--- 8. Default Options ---');

// Using default options
console.log('⚙️ Using Default Options:');
const defaultFormatted = formatOpeningHours(standardHours);

defaultFormatted.forEach(line => {
    console.log(`  ${line}`);
});

console.log('\n=== Opening Hours Demo Complete ===');
console.log('Key Features:');
console.log('✅ Multi-language support (English, Hebrew, Arabic, Spanish, French)');
console.log('✅ 12-hour and 24-hour time formats');
console.log('✅ Complex schedules with multiple periods per day');
console.log('✅ Support for closed days and 24/7 operations');
console.log('✅ Real-world business hour examples');
console.log('✅ International business hour patterns');
console.log('✅ Edge case handling (all closed, same hours, etc.)');
console.log('✅ Default options for quick setup');
