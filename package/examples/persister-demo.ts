import Persister, { LocalStorage, SessionStorage } from '../src/persister';

/**
 * Persister Utility Demo
 * 
 * This demo showcases the Persister utility with TTL functionality
 * for both localStorage and sessionStorage, including automatic cleanup
 * during context initialization.
 */

console.log('🚀 Starting Persister Demo...\n');

/**
 * Example 1: Basic localStorage and sessionStorage operations
 */
console.log('=== Basic Storage Operations ===');
Persister.setLocalStorage({
    'userName': {
        value: 'John Doe',
        encode: false
    },
    'userSettings': {
        value: { theme: 'dark', notifications: true },
        encode: true
    }
});

Persister.setSessionStorage({
    'sessionId': {
        value: 'abc123xyz',
        encode: true
    }
});

const userName = Persister.getLocalStorage('userName');
const userSettings = Persister.getLocalStorage('userSettings');
const sessionId = Persister.getSessionStorage('sessionId');

console.log('User name:', userName);
console.log('User settings:', userSettings);
console.log('Session ID:', sessionId);

/**
 * Example 2: Session storage with TTL (Time To Live)
 */
console.log('\n=== Session Storage with TTL Example ===');
Persister.setSessionStorage({
    'userSession': {
        value: { userId: 123, permissions: ['read', 'write'] },
        encode: true,
        ttl: 30
    },
    'tempData': {
        value: { temp: 'This will expire quickly' },
        encode: false,
        ttl: 10
    }
});

const userSession = Persister.getSessionStorage('userSession');
const tempData = Persister.getSessionStorage('tempData');
console.log('User session:', userSession);
console.log('Temp data:', tempData);

const sessionTTL = Persister.getRemainingTTL('userSession', 'sessionStorage');
const tempTTL = Persister.getRemainingTTL('tempData', 'sessionStorage');
console.log('Session TTL remaining:', sessionTTL, 'seconds');
console.log('Temp data TTL remaining:', tempTTL, 'seconds');

/**
 * Example 2b: LocalStorage with TTL (NEW!)
 */
console.log('\n=== LocalStorage with TTL Example ===');
Persister.setLocalStorage({
    'userPreferences': {
        value: { theme: 'dark', language: 'en', lastUpdated: Date.now() },
        encode: true,
        ttl: 86400
    },
    'cachedData': {
        value: { apiResponse: 'cached-data', timestamp: Date.now() },
        encode: false,
        ttl: 3600
    }
});

const userPrefsWithTTL = Persister.getLocalStorage('userPreferences');
const cachedData = Persister.getLocalStorage('cachedData');
console.log('User preferences:', userPrefsWithTTL);
console.log('Cached data:', cachedData);

const prefsTTL = Persister.getRemainingTTL('userPreferences', 'localStorage');
const cacheTTL = Persister.getRemainingTTL('cachedData', 'localStorage');
console.log('Preferences TTL remaining:', prefsTTL, 'seconds');
console.log('Cache TTL remaining:', cacheTTL, 'seconds');

/**
 * Example 3: Using convenience classes
 */
console.log('\n=== Convenience Classes Example ===');
LocalStorage.set({
    'appConfig': {
        value: { version: '1.0.0', environment: 'production' },
        encode: true
    }
});

SessionStorage.set({
    'userToken': {
        value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        encode: true
    }
});

const appConfig = LocalStorage.get('appConfig');
const userToken = SessionStorage.get('userToken');
console.log('App config:', appConfig);
console.log('User token:', userToken);

/**
 * Example 4: Storage management
 */
console.log('\n=== Storage Management ===');
console.log('LocalStorage keys:', LocalStorage.keys());
console.log('SessionStorage keys:', SessionStorage.keys());
console.log('LocalStorage size:', LocalStorage.getStorageSize());
console.log('SessionStorage size:', SessionStorage.getStorageSize());

/**
 * Example 5: TTL expiration simulation
 */
console.log('\n=== TTL Expiration Simulation ===');
console.log('Setting item with 5-second TTL...');
SessionStorage.set({
    'expiringItem': {
        value: 'This will expire in 5 seconds',
        ttl: 5
    }
});

console.log('Item exists:', SessionStorage.has('expiringItem'));
console.log('Remaining TTL:', SessionStorage.getRemainingTTL('expiringItem'), 'seconds');

console.log('\nWaiting 6 seconds for TTL expiration...');
setTimeout(() => {
    console.log('After 6 seconds:');
    console.log('Item exists:', SessionStorage.has('expiringItem'));
    console.log('Item value:', SessionStorage.get('expiringItem'));
    console.log('Remaining TTL:', SessionStorage.getRemainingTTL('expiringItem'), 'seconds');
}, 6000);

/**
 * Example 6: Manual TTL cleanup (if needed)
 */
console.log('\n=== Manual TTL Cleanup ===');
console.log('Session storage size before cleanup:', SessionStorage.getStorageSize());
console.log('LocalStorage size before cleanup:', LocalStorage.getStorageSize());

SessionStorage.cleanupExpiredTTL();
LocalStorage.cleanupExpiredTTL();

console.log('Session storage size after cleanup:', SessionStorage.getStorageSize());
console.log('LocalStorage size after cleanup:', LocalStorage.getStorageSize());

/**
 * Example 6b: TTL management with convenience classes
 */
console.log('\n=== TTL Management with Convenience Classes ===');

LocalStorage.set({
    'featureFlag': {
        value: { enabled: true, version: '1.0.0' },
        ttl: 7200
    }
});

SessionStorage.set({
    'authToken': {
        value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        encode: true,
        ttl: 1800
    }
});

const featureFlagTTL = LocalStorage.getRemainingTTL('featureFlag');
const authTokenTTL = SessionStorage.getRemainingTTL('authToken');

console.log('Feature flag TTL remaining:', featureFlagTTL, 'seconds');
console.log('Auth token TTL remaining:', authTokenTTL, 'seconds');

/**
 * Example 7: TTL expiration simulation
 */
console.log('\n=== TTL Expiration Simulation ===');
console.log('Setting item with 5-second TTL...');
SessionStorage.set({
    'expiringItem': {
        value: 'This will expire in 5 seconds',
        ttl: 5
    }
});

console.log('Item exists:', SessionStorage.has('expiringItem'));
console.log('Remaining TTL:', SessionStorage.getRemainingTTL('expiringItem'), 'seconds');

console.log('\nWaiting 6 seconds for TTL expiration...');
setTimeout(() => {
    console.log('After 6 seconds:');
    console.log('Item exists:', SessionStorage.has('expiringItem'));
    console.log('Item value:', SessionStorage.get('expiringItem'));
    console.log('Remaining TTL:', SessionStorage.getRemainingTTL('expiringItem'), 'seconds');
}, 6000);

/**
 * Example 8: Context integration benefits
 */
console.log('\n=== Context Integration Benefits ===');
console.log('✅ Automatic TTL cleanup during context initialization');
console.log('✅ TTL support for BOTH localStorage AND sessionStorage');
console.log('✅ No manual cleanup required');
console.log('✅ Expired items are automatically filtered out');
console.log('✅ Perfect for session management, caching, and temporary data');
console.log('✅ Unified API for both storage types');

console.log('\n=== Persister Demo Complete ===');
console.log('Key Benefits:');
console.log('✅ Automatic TTL cleanup during context initialization');
console.log('✅ TTL support for BOTH localStorage AND sessionStorage');
console.log('✅ No manual cleanup required');
console.log('✅ Expired items are automatically filtered out');
console.log('✅ Perfect for session management, caching, and temporary data');
console.log('✅ Unified API for both storage types');
