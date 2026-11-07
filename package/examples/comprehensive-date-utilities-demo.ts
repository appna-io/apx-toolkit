import {
    // Date formatting
    formatDate,
    formatDateLocale,
    
    // Relative time
    getTimeAgo,
    
    // Date comparisons
    isSameDay,
    isSameMonth,
    isSameYear,
    isToday,
    isYesterday,
    isTomorrow,
    isPast,
    isFuture,
    
    // Date calculations
    addDays,
    addMonths,
    addYears,
    getDaysDifference,
    getHoursDifference,
    getMinutesDifference,
    getAge,
    
    // Date boundaries
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    
    // Date utilities
    toISOStringUTC,
    isLeapYear,
    getDaysInMonth,
    
    // I18N date formatting
    formatDateI18N
} from '@apx-ui/toolkit';

/**
 * Comprehensive Date Utilities Demo
 * 
 * This demo showcases all date utility functions available in the toolkit
 * including formatting, comparisons, calculations, and internationalization.
 */

console.log('=== Comprehensive Date Utilities Demo ===\n');

/**
 * 1. Date Formatting
 */
console.log('--- 1. Date Formatting ---');

// Basic date formatting
console.log('📅 Basic Date Formatting:');
const testDate = new Date('2024-01-15T14:30:45');
const dateFormats = [
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD HH:mm:ss',
    'MMM DD, YYYY',
    'dddd, MMMM Do, YYYY'
];

dateFormats.forEach(format => {
    try {
        console.log(`  ${format}: ${formatDate(testDate, format)}`);
    } catch (error) {
        console.log(`  ${format}: Error - ${error.message}`);
    }
});

// Locale-specific date formatting
console.log('\n🌍 Locale-Specific Date Formatting:');
const locales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA', 'ja-JP', 'zh-CN'];
const dateOptions = [
    { year: 'numeric', month: 'long', day: 'numeric' },
    { year: 'numeric', month: 'short', day: 'numeric' },
    { hour: 'numeric', minute: '2-digit', second: '2-digit' },
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    { year: 'numeric', month: 'numeric', day: 'numeric' }
];

locales.forEach(locale => {
    console.log(`  ${locale}:`);
    dateOptions.forEach((options, index) => {
        try {
            const formatted = formatDateLocale(testDate, locale, options);
            console.log(`    Option ${index + 1}: ${formatted}`);
        } catch (error) {
            console.log(`    Option ${index + 1}: Error - ${error.message}`);
        }
    });
    console.log('');
});

// I18N date formatting
console.log('🌐 I18N Date Formatting:');
const i18nLocales = ['en-US', 'de-DE', 'fr-FR', 'he-IL', 'ar-SA'];
const i18nFormats = ['default', 'appointment'];

i18nLocales.forEach(locale => {
    console.log(`  ${locale}:`);
    i18nFormats.forEach(format => {
        try {
            const formatted = formatDateI18N(testDate, undefined, format, locale);
            console.log(`    ${format}: ${formatted}`);
        } catch (error) {
            console.log(`    ${format}: Error - ${error.message}`);
        }
    });
    console.log('');
});

/**
 * 2. Relative Time
 */
console.log('\n--- 2. Relative Time ---');

// Time ago formatting
console.log('⏰ Time Ago Formatting:');
const now = new Date();
const timeAgoTests = [
    new Date(now.getTime() - 30 * 1000), // 30 seconds ago
    new Date(now.getTime() - 2 * 60 * 1000), // 2 minutes ago
    new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
    new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000), // 2 weeks ago
    new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    new Date(now.getTime() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 months ago
    new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
    new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000), // 2 years ago
    new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours in the future
];

timeAgoTests.forEach(date => {
    console.log(`  ${date.toISOString()}: ${getTimeAgo(date)}`);
});

/**
 * 3. Date Comparisons
 */
console.log('\n--- 3. Date Comparisons ---');

// Basic date comparisons
console.log('📊 Date Comparisons:');
const comparisonDate = new Date('2024-01-15T14:30:45');
const comparisonTests = [
    { date: new Date('2024-01-15T10:30:45'), label: 'Same day, different time' },
    { date: new Date('2024-01-16T14:30:45'), label: 'Next day, same time' },
    { date: new Date('2024-02-15T14:30:45'), label: 'Same day, next month' },
    { date: new Date('2025-01-15T14:30:45'), label: 'Same day, next year' },
    { date: new Date('2024-01-14T14:30:45'), label: 'Previous day' },
    { date: new Date('2024-01-15T14:30:45'), label: 'Exact same date' }
];

comparisonTests.forEach(({ date, label }) => {
    console.log(`  ${label}:`);
    console.log(`    isSameDay: ${isSameDay(comparisonDate, date)}`);
    console.log(`    isSameMonth: ${isSameMonth(comparisonDate, date)}`);
    console.log(`    isSameYear: ${isSameYear(comparisonDate, date)}`);
    console.log('');
});

// Today, yesterday, tomorrow checks
console.log('📅 Today, Yesterday, Tomorrow Checks:');
const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const pastDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const dateChecks = [
    { date: today, label: 'Today' },
    { date: yesterday, label: 'Yesterday' },
    { date: tomorrow, label: 'Tomorrow' },
    { date: pastDate, label: 'Past date (1 week ago)' },
    { date: futureDate, label: 'Future date (1 week from now)' }
];

dateChecks.forEach(({ date, label }) => {
    console.log(`  ${label}:`);
    console.log(`    isToday: ${isToday(date)}`);
    console.log(`    isYesterday: ${isYesterday(date)}`);
    console.log(`    isTomorrow: ${isTomorrow(date)}`);
    console.log(`    isPast: ${isPast(date)}`);
    console.log(`    isFuture: ${isFuture(date)}`);
    console.log('');
});

/**
 * 4. Date Calculations
 */
console.log('\n--- 4. Date Calculations ---');

// Adding time to dates
console.log('➕ Adding Time to Dates:');
const baseDate = new Date('2024-01-15T14:30:45');

console.log(`  Base date: ${baseDate.toISOString()}`);
console.log(`  +7 days: ${addDays(baseDate, 7).toISOString()}`);
console.log(`  +1 month: ${addMonths(baseDate, 1).toISOString()}`);
console.log(`  +3 months: ${addMonths(baseDate, 3).toISOString()}`);
console.log(`  +1 year: ${addYears(baseDate, 1).toISOString()}`);
console.log(`  +2 years: ${addYears(baseDate, 2).toISOString()}`);

// Date differences
console.log('\n📏 Date Differences:');
const date1 = new Date('2024-01-01T00:00:00');
const date2 = new Date('2024-01-15T12:30:45');

console.log(`  Date 1: ${date1.toISOString()}`);
console.log(`  Date 2: ${date2.toISOString()}`);
console.log(`  Days difference: ${getDaysDifference(date1, date2)}`);
console.log(`  Hours difference: ${getHoursDifference(date1, date2)}`);
console.log(`  Minutes difference: ${getMinutesDifference(date1, date2)}`);

// Age calculation
console.log('\n🎂 Age Calculation:');
const birthDates = [
    new Date('1990-01-15'),
    new Date('2000-06-30'),
    new Date('2010-12-25'),
    new Date('2020-03-10')
];

birthDates.forEach(birthDate => {
    const age = getAge(birthDate);
    console.log(`  Born: ${birthDate.toISOString().split('T')[0]} - Age: ${age}`);
});

/**
 * 5. Date Boundaries
 */
console.log('\n--- 5. Date Boundaries ---');

// Start and end of day
console.log('🌅 Start and End of Day:');
const testDateForBoundaries = new Date('2024-01-15T14:30:45');
console.log(`  Original: ${testDateForBoundaries.toISOString()}`);
console.log(`  Start of day: ${startOfDay(testDateForBoundaries).toISOString()}`);
console.log(`  End of day: ${endOfDay(testDateForBoundaries).toISOString()}`);

// Start and end of week
console.log('\n📅 Start and End of Week:');
console.log(`  Start of week: ${startOfWeek(testDateForBoundaries).toISOString()}`);
console.log(`  End of week: ${endOfWeek(testDateForBoundaries).toISOString()}`);

// Start and end of month
console.log('\n📆 Start and End of Month:');
console.log(`  Start of month: ${startOfMonth(testDateForBoundaries).toISOString()}`);
console.log(`  End of month: ${endOfMonth(testDateForBoundaries).toISOString()}`);

/**
 * 6. Date Utilities
 */
console.log('\n--- 6. Date Utilities ---');

// ISO string conversion
console.log('🌐 ISO String Conversion:');
const utcDate = new Date('2024-01-15T14:30:45Z');
console.log(`  UTC date: ${utcDate.toISOString()}`);
console.log(`  ISO string UTC: ${toISOStringUTC(utcDate)}`);

// Leap year checks
console.log('\n🐸 Leap Year Checks:');
const years = [2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 1900, 2100, 2023, 2025];

years.forEach(year => {
    console.log(`  ${year}: ${isLeapYear(year) ? 'Leap year' : 'Not leap year'}`);
});

// Days in month
console.log('\n📅 Days in Month:');
const months = [
    { year: 2024, month: 0 }, // January
    { year: 2024, month: 1 }, // February (leap year)
    { year: 2023, month: 1 }, // February (not leap year)
    { year: 2024, month: 3 }, // April
    { year: 2024, month: 11 } // December
];

months.forEach(({ year, month }) => {
    const days = getDaysInMonth(year, month);
    const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' });
    console.log(`  ${monthName} ${year}: ${days} days`);
});

/**
 * 7. Real-World Date Scenarios
 */
console.log('\n--- 7. Real-World Date Scenarios ---');

// Event scheduling
console.log('📅 Event Scheduling:');
interface Event {
    name: string;
    startDate: Date;
    endDate: Date;
    isRecurring: boolean;
    recurrenceInterval: number; // days
}

const events: Event[] = [
    {
        name: 'Team Meeting',
        startDate: new Date('2024-01-15T10:00:00'),
        endDate: new Date('2024-01-15T11:00:00'),
        isRecurring: true,
        recurrenceInterval: 7
    },
    {
        name: 'Project Deadline',
        startDate: new Date('2024-02-15T17:00:00'),
        endDate: new Date('2024-02-15T17:00:00'),
        isRecurring: false,
        recurrenceInterval: 0
    },
    {
        name: 'Conference',
        startDate: new Date('2024-06-01T09:00:00'),
        endDate: new Date('2024-06-03T17:00:00'),
        isRecurring: false,
        recurrenceInterval: 0
    }
];

events.forEach(event => {
    console.log(`  ${event.name}:`);
    console.log(`    Start: ${formatDate(event.startDate, 'MMM DD, YYYY HH:mm')}`);
    console.log(`    End: ${formatDate(event.endDate, 'MMM DD, YYYY HH:mm')}`);
    console.log(`    Duration: ${getHoursDifference(event.startDate, event.endDate)} hours`);
    console.log(`    Days until: ${getDaysDifference(new Date(), event.startDate)}`);
    console.log(`    Is in future: ${isFuture(event.startDate)}`);
    
    if (event.isRecurring) {
        const nextOccurrence = addDays(event.startDate, event.recurrenceInterval);
        console.log(`    Next occurrence: ${formatDate(nextOccurrence, 'MMM DD, YYYY')}`);
    }
    console.log('');
});

// User activity tracking
console.log('👤 User Activity Tracking:');
interface UserActivity {
    userId: string;
    lastLogin: Date;
    registrationDate: Date;
    lastActive: Date;
    sessionDuration: number; // minutes
}

const userActivities: UserActivity[] = [
    {
        userId: 'user1',
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        registrationDate: new Date('2023-06-15T09:00:00'),
        lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        sessionDuration: 45
    },
    {
        userId: 'user2',
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        registrationDate: new Date('2022-12-01T14:30:00'),
        lastActive: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
        sessionDuration: 120
    },
    {
        userId: 'user3',
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        registrationDate: new Date('2021-03-20T11:15:00'),
        lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        sessionDuration: 30
    }
];

userActivities.forEach(activity => {
    const userAge = getAge(activity.registrationDate);
    const timeSinceLogin = getTimeAgo(activity.lastLogin);
    const timeSinceActive = getTimeAgo(activity.lastActive);
    const isActiveToday = isToday(activity.lastActive);
    const isActiveYesterday = isYesterday(activity.lastActive);
    
    console.log(`  User ${activity.userId}:`);
    console.log(`    Account age: ${userAge} years`);
    console.log(`    Last login: ${timeSinceLogin}`);
    console.log(`    Last active: ${timeSinceActive}`);
    console.log(`    Active today: ${isActiveToday}`);
    console.log(`    Active yesterday: ${isActiveYesterday}`);
    console.log(`    Session duration: ${activity.sessionDuration} minutes`);
    console.log('');
});

// Business hours calculation
console.log('🏢 Business Hours Calculation:');
interface BusinessHours {
    dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
    openTime: string; // "09:00"
    closeTime: string; // "17:00"
    isOpen: boolean;
}

const businessHours: BusinessHours[] = [
    { dayOfWeek: 0, openTime: "10:00", closeTime: "16:00", isOpen: true }, // Sunday
    { dayOfWeek: 1, openTime: "09:00", closeTime: "17:00", isOpen: true }, // Monday
    { dayOfWeek: 2, openTime: "09:00", closeTime: "17:00", isOpen: true }, // Tuesday
    { dayOfWeek: 3, openTime: "09:00", closeTime: "17:00", isOpen: true }, // Wednesday
    { dayOfWeek: 4, openTime: "09:00", closeTime: "17:00", isOpen: true }, // Thursday
    { dayOfWeek: 5, openTime: "09:00", closeTime: "16:00", isOpen: true }, // Friday
    { dayOfWeek: 6, openTime: "10:00", closeTime: "16:00", isOpen: true }  // Saturday
];

const currentDate = new Date();
const currentDay = currentDate.getDay();
const currentTime = formatDate(currentDate, 'HH:mm');

console.log(`  Current time: ${currentTime} on ${currentDate.toLocaleDateString('en-US', { weekday: 'long' })}`);

const todayHours = businessHours.find(hours => hours.dayOfWeek === currentDay);
if (todayHours) {
    const isCurrentlyOpen = todayHours.isOpen && 
                           currentTime >= todayHours.openTime && 
                           currentTime <= todayHours.closeTime;
    
    console.log(`  Today's hours: ${todayHours.openTime} - ${todayHours.closeTime}`);
    console.log(`  Currently open: ${isCurrentlyOpen ? 'Yes' : 'No'}`);
    
    if (!isCurrentlyOpen && todayHours.isOpen) {
        if (currentTime < todayHours.openTime) {
            console.log(`  Opens at: ${todayHours.openTime}`);
        } else {
            console.log(`  Closed at: ${todayHours.closeTime}`);
        }
    }
}

console.log('\n=== Comprehensive Date Utilities Demo Complete ===');
console.log('Key Features:');
console.log('✅ 20+ date utility functions');
console.log('✅ Date formatting with custom formats');
console.log('✅ Locale-specific date formatting');
console.log('✅ Relative time formatting');
console.log('✅ Date comparisons and calculations');
console.log('✅ Date boundary calculations');
console.log('✅ Leap year and month utilities');
console.log('✅ Real-world usage scenarios');
console.log('✅ Internationalization support');
