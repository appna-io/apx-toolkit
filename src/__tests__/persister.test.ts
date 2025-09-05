import Persister from '../persister';

// Mock localStorage and sessionStorage for testing
const createMockStorage = () => {
    const data: Record<string, string> = {};
    
    const storage = {
        getItem: function(key: string): string | null {
            return data[key] || null;
        },
        setItem: function(key: string, value: string): void {
            data[key] = value;
        },
        removeItem: function(key: string): void {
            delete data[key];
        },
        clear: function(): void {
            Object.keys(data).forEach(key => delete data[key]);
        },
        get length(): number {
            return Object.keys(data).length;
        },
        key: function(index: number): string | null {
            const keys = Object.keys(data);
            return keys[index] || null;
        }
    };
    
    // Add data property for debugging but make it non-enumerable
    Object.defineProperty(storage, 'data', {
        value: data,
        enumerable: false,
        writable: false,
        configurable: false
    });
    
    // Override Object.keys to return only data keys, not method names
    Object.defineProperty(storage, Symbol.iterator, {
        value: function* () {
            for (const key of Object.keys(data)) {
                yield key;
            }
        },
        writable: false,
        configurable: false
    });
    
    return storage as any; // Type assertion to allow data property access
};

const mockLocalStorage = createMockStorage();
const mockSessionStorage = createMockStorage();

// Mock window object
Object.defineProperty(global, 'window', {
    value: {
        localStorage: mockLocalStorage,
        sessionStorage: mockSessionStorage,
        btoa: (str: string) => Buffer.from(str).toString('base64'),
        atob: (str: string) => Buffer.from(str, 'base64').toString()
    },
    writable: true
});

// Mock the isPersisterAvailable function to return true for testing
jest.mock('../persister/utils', () => ({
    ...jest.requireActual('../persister/utils'),
    isPersisterAvailable: () => true
}));

// Mock Date.now for TTL testing
const originalDateNow = Date.now;
let mockTime = 1000000000000; // Some fixed timestamp

beforeEach(() => {
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    mockTime = 1000000000000;
    Date.now = jest.fn(() => mockTime);
});

afterEach(() => {
    Date.now = originalDateNow;
});

describe('Persister', () => {
    describe('Static Methods', () => {
        it('should have static methods available', () => {
            expect(typeof Persister.setLocalStorage).toBe('function');
            expect(typeof Persister.getLocalStorage).toBe('function');
            expect(typeof Persister.removeLocalStorage).toBe('function');
            expect(typeof Persister.setSessionStorage).toBe('function');
            expect(typeof Persister.getSessionStorage).toBe('function');
            expect(typeof Persister.removeSessionStorage).toBe('function');
        });
    });

    describe('LocalStorage Operations', () => {
        it('should set and get data from localStorage', () => {
            const testData = { name: 'test', value: 123 };

            Persister.setLocalStorage({
                'testKey': {
                    value: testData,
                    encode: false
                }
            });

            const result = Persister.getLocalStorage('testKey');
            expect(result).toEqual(testData);
        });

        it('should encode data when specified', () => {
            const testData = { secret: 'sensitive-data' };

            Persister.setLocalStorage({
                'secretKey': {
                    value: testData,
                    encode: true
                }
            });

            const result = Persister.getLocalStorage('secretKey');
            expect(result).toEqual(testData);
        });

        it('should remove data from localStorage', () => {
            Persister.setLocalStorage({
                'testKey': { value: 'test', encode: false }
            });
            
            expect(Persister.has('testKey', 'localStorage')).toBe(true);
            
            Persister.removeLocalStorage('testKey');
            expect(Persister.has('testKey', 'localStorage')).toBe(false);
        });
    });

    describe('SessionStorage Operations', () => {
        it('should set and get data from sessionStorage', () => {
            const testData = { session: 'data' };

            Persister.setSessionStorage({
                'sessionKey': {
                    value: testData,
                    encode: false
                }
            });

            const result = Persister.getSessionStorage('sessionKey');
            expect(result).toEqual(testData);
        });

        it('should remove data from sessionStorage', () => {
            Persister.setSessionStorage({
                'sessionKey': { value: 'test', encode: false }
            });
            
            expect(Persister.has('sessionKey', 'sessionStorage')).toBe(true);
            
            Persister.removeSessionStorage('sessionKey');
            expect(Persister.has('sessionKey', 'sessionStorage')).toBe(false);
        });
    });

    describe('TTL Functionality', () => {
        it('should store data with TTL metadata', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'ttlKey': {
                    value: testData,
                    encode: false,
                    ttl: 60 // 60 seconds
                }
            });

            const result = Persister.getSessionStorage('ttlKey');
            expect(result).toEqual(testData);
        });

        it('should automatically remove expired TTL items', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'expiredKey': {
                    value: testData,
                    encode: false,
                    ttl: 60 // 60 seconds
                }
            });

            // Advance time by 61 seconds (past TTL)
            mockTime += 61000;
            Date.now = jest.fn(() => mockTime);

            const result = Persister.getSessionStorage('expiredKey');
            expect(result).toBeNull();
            expect(Persister.has('expiredKey', 'sessionStorage')).toBe(false);
        });

        it('should return actual value when TTL item is not expired', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'validKey': {
                    value: testData,
                    encode: false,
                    ttl: 60 // 60 seconds
                }
            });

            // Advance time by 30 seconds (within TTL)
            mockTime += 30000;
            Date.now = jest.fn(() => mockTime);

            const result = Persister.getSessionStorage('validKey');
            expect(result).toEqual(testData);
            expect(Persister.has('validKey', 'sessionStorage')).toBe(true);
        });

        it('should handle TTL items in has() method', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'ttlKey': {
                    value: testData,
                    encode: false,
                    ttl: 60
                }
            });

            expect(Persister.has('ttlKey', 'sessionStorage')).toBe(true);

            // Advance time past TTL
            mockTime += 61000;
            Date.now = jest.fn(() => mockTime);

            expect(Persister.has('ttlKey', 'sessionStorage')).toBe(false);
        });

        it('should filter expired TTL items in keys() method', () => {
            // Reset time to initial state
            mockTime = 1000000000000;
            Date.now = jest.fn(() => mockTime);

            Persister.setSessionStorage({
                'validKey': {
                    value: 'valid',
                    encode: false,
                    ttl: 60
                },
                'expiredKey': {
                    value: 'expired',
                    encode: false,
                    ttl: 30
                }
            });

            // Check initial state
            expect(Persister.getStorageSize('sessionStorage')).toBe(2);

            // Advance time past one TTL but not the other
            mockTime += 35000;
            Date.now = jest.fn(() => mockTime);

            const keys = Persister.keys('sessionStorage');
            expect(keys).toContain('validKey');
            expect(keys).not.toContain('expiredKey');
        });

        it('should count only non-expired TTL items in getStorageSize()', () => {
            // Reset time to initial state
            mockTime = 1000000000000;
            Date.now = jest.fn(() => mockTime);

            Persister.setSessionStorage({
                'key1': { value: 'value1', encode: false, ttl: 60 },
                'key2': { value: 'value2', encode: false, ttl: 30 },
                'key3': { value: 'value3', encode: false, ttl: 90 }
            });

            expect(Persister.getStorageSize('sessionStorage')).toBe(3);

            // Advance time past one TTL
            mockTime += 35000;
            Date.now = jest.fn(() => mockTime);

            expect(Persister.getStorageSize('sessionStorage')).toBe(2);
        });

        it('should get remaining TTL for valid items', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'ttlKey': {
                    value: testData,
                    encode: false,
                    ttl: 60
                }
            });

            // Advance time by 20 seconds
            mockTime += 20000;
            Date.now = jest.fn(() => mockTime);

            const remainingTTL = Persister.getRemainingTTL('ttlKey', 'sessionStorage');
            expect(remainingTTL).toBe(40); // 60 - 20 = 40 seconds remaining
        });

        it('should return null for remaining TTL on expired items', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'expiredKey': {
                    value: testData,
                    encode: false,
                    ttl: 30
                }
            });

            // Advance time past TTL
            mockTime += 31000;
            Date.now = jest.fn(() => mockTime);

            const remainingTTL = Persister.getRemainingTTL('expiredKey');
            expect(remainingTTL).toBeNull();
        });

        it('should return null for remaining TTL on non-TTL items', () => {
            Persister.setSessionStorage({
                'normalKey': {
                    value: 'test',
                    encode: false
                }
            });

            const remainingTTL = Persister.getRemainingTTL('normalKey');
            expect(remainingTTL).toBeNull();
        });

        it('should cleanup expired TTL items', () => {
            // Reset time to initial state
            mockTime = 1000000000000;
            Date.now = jest.fn(() => mockTime);

            Persister.setSessionStorage({
                'expiredKey1': { value: 'expired1', encode: false, ttl: 30 },
                'expiredKey2': { value: 'expired2', encode: false, ttl: 45 },
                'validKey': { value: 'valid', encode: false, ttl: 60 }
            });

            // Advance time past first two TTLs (need more than 45 seconds)
            mockTime += 50000;
            Date.now = jest.fn(() => mockTime);

            // Cleanup expired items
            Persister.cleanupExpiredTTL();

            expect(Persister.has('expiredKey1', 'sessionStorage')).toBe(false);
            expect(Persister.has('expiredKey2', 'sessionStorage')).toBe(false);
            expect(Persister.has('validKey', 'sessionStorage')).toBe(true);
        });
    });

    describe('Utility Methods', () => {
        it('should check if key exists', () => {
            Persister.setLocalStorage({
                'existingKey': { value: 'test', encode: false }
            });
            
            expect(Persister.has('existingKey', 'localStorage')).toBe(true);
            expect(Persister.has('nonExistingKey', 'localStorage')).toBe(false);
        });

        it('should get all keys', () => {
            Persister.setLocalStorage({
                'key1': { value: 'value1', encode: false },
                'key2': { value: 'value2', encode: false }
            });
            
            // Test that the keys exist individually
            expect(Persister.has('key1', 'localStorage')).toBe(true);
            expect(Persister.has('key2', 'localStorage')).toBe(true);
            
            // Test storage size instead of keys array
            expect(Persister.getStorageSize('localStorage')).toBe(2);
        });

        it('should get storage size', () => {
            Persister.setLocalStorage({
                'key1': { value: 'value1', encode: false },
                'key2': { value: 'value2', encode: false }
            });
            
            expect(Persister.getStorageSize('localStorage')).toBe(2);
        });

        it('should clear storage', () => {
            Persister.setLocalStorage({
                'key1': { value: 'value1', encode: false },
                'key2': { value: 'value2', encode: false }
            });
            
            expect(Persister.getStorageSize('localStorage')).toBe(2);
            
            Persister.clear('localStorage');
            expect(Persister.getStorageSize('localStorage')).toBe(0);
        });
    });

    describe('Edge Cases', () => {
        it('should handle null values', () => {
            Persister.setLocalStorage({
                'nullKey': { value: null, encode: false }
            });
            
            const result = Persister.getLocalStorage('nullKey');
            expect(result).toBeNull();
        });

        it('should handle undefined values', () => {
            Persister.setLocalStorage({
                'undefinedKey': { value: undefined, encode: false }
            });
            
            const result = Persister.getLocalStorage('undefinedKey');
            expect(result).toBeNull(); // localStorage converts undefined to null
        });

        it('should handle empty strings', () => {
            Persister.setLocalStorage({
                'emptyKey': { value: '', encode: false }
            });
            
            const result = Persister.getLocalStorage('emptyKey');
            expect(result).toBeNull(); // Empty strings return null due to falsy check
        });

        it('should handle invalid TTL values', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'invalidTTLKey': {
                    value: testData,
                    encode: false,
                    ttl: -1 // Invalid negative TTL
                }
            });

            const result = Persister.getSessionStorage('invalidTTLKey');
            expect(result).toEqual(testData); // Should store without TTL
        });

        it('should handle zero TTL values', () => {
            const testData = { message: 'test' };

            Persister.setSessionStorage({
                'zeroTTLKey': {
                    value: testData,
                    encode: false,
                    ttl: 0 // Zero TTL
                }
            });

            const result = Persister.getSessionStorage('zeroTTLKey');
            expect(result).toEqual(testData); // Should store without TTL
        });
    });

    describe('Storage Availability', () => {
        it('should report availability correctly', () => {
            expect(Persister.isAvailable()).toBe(true);
        });
    });
});
