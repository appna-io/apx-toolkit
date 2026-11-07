import { config, getCurrency, resetContext } from '../src';

console.log('🌍 Region-Based Currency Detection Demo\n');

// Reset context to start fresh
resetContext();

console.log('1️⃣ Priority 1: Config Region');
config({ 
    defaultRegion: 'IL', // Israel
    persist: 'memory'
});
console.log(`   Region: IL → Currency: ${getCurrency()}`); // Should be ILS

resetContext();

console.log('\n2️⃣ Priority 2: Config Locale (extracts region)');
config({ 
    defaultLocale: 'he-IL', // Hebrew Israel
    persist: 'memory'
});
console.log(`   Locale: he-IL → Region: IL → Currency: ${getCurrency()}`); // Should be ILS

resetContext();

console.log('\n3️⃣ Priority 3: Browser Locale Detection');
config({ 
    persist: 'memory'
    // No region or locale provided - will use browser's locale
});
console.log(`   Browser Locale → Currency: ${getCurrency()}`); // Depends on your system

resetContext();

console.log('\n4️⃣ Priority 4: Explicit Currency (overrides all)');
config({ 
    defaultRegion: 'GB', // United Kingdom
    defaultCurrency: 'USD', // But explicitly set USD
    persist: 'memory'
});
console.log(`   Region: GB → Currency: ${getCurrency()}`); // Should be USD (explicit override)

resetContext();

console.log('\n5️⃣ Priority 5: Region over Locale');
config({ 
    defaultRegion: 'JP', // Japan
    defaultLocale: 'he-IL', // Hebrew Israel
    persist: 'memory'
});
console.log(`   Region: JP (priority) → Currency: ${getCurrency()}`); // Should be JPY, not ILS

resetContext();

console.log('\n6️⃣ Fallback to Default');
config({ 
    defaultRegion: 'XX', // Invalid region
    persist: 'memory'
});
console.log(`   Invalid Region: XX → Currency: ${getCurrency()}`); // Should fallback to USD

console.log('\n✅ Demo completed! The system automatically detects the best currency based on:');
console.log('   1. Config region (highest priority)');
console.log('   2. Config locale (extracts region)');
console.log('   3. Browser locale (lowest priority)');
console.log('   4. Fallback to USD (safety net)');
