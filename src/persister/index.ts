import { setItem, getItem, removeItem, isPersisterAvailable } from './utils.js';

export type PersisterData = Record<string, {
    value: any;
    encode?: boolean;
    ttl?: number;
}>;

export type StorageType = 'localStorage' | 'sessionStorage';

export default class Persister {
    /**
     * Set data in localStorage with optional encoding and TTL
     */
    public static setLocalStorage(data: PersisterData): void {
        if (!isPersisterAvailable()) {
            return;
        }

        Object.entries(data).forEach(([key, { value, encode, ttl }]) => {
            let finalValue = value;
            if (ttl && typeof ttl === 'number' && ttl > 0) {
                const expiryTime = Date.now() + (ttl * 1000);
                finalValue = {
                    value: value,
                    _ttl: expiryTime
                };
            }
            
            setItem(window.localStorage, key, finalValue, encode);
        });
    }

    /**
     * Get data from localStorage with TTL validation
     */
    public static getLocalStorage<T>(key: string): T | null {
        if (!isPersisterAvailable()) {
            return null;
        }
        
        const item = getItem<any>(window.localStorage, key);
        
        if (!item) {
            return null;
        }
        
        if (item._ttl && typeof item._ttl === 'number') {
            if (Date.now() > item._ttl) {
                return null;
            }
            return item.value;
        }
        
        return item;
    }

    /**
     * Remove data from localStorage
     */
    public static removeLocalStorage(key: string): void {
        if (!isPersisterAvailable()) {
            return;
        }
        removeItem(window.localStorage, key);
    }

    /**
     * Set data in sessionStorage with optional encoding and TTL
     */
    public static setSessionStorage(data: PersisterData): void {
        if (!isPersisterAvailable()) {
            return;
        }

        Object.entries(data).forEach(([key, { value, encode, ttl }]) => {
            let finalValue = value;
            if (ttl && typeof ttl === 'number' && ttl > 0) {
                const expiryTime = Date.now() + (ttl * 1000);
                finalValue = {
                    value: value,
                    _ttl: expiryTime
                };
            }
            
            setItem(window.sessionStorage, key, finalValue, encode);
        });
    }

    /**
     * Get data from sessionStorage with TTL validation
     */
    public static getSessionStorage<T>(key: string): T | null {
        if (!isPersisterAvailable()) {
            return null;
        }
        
        const item = getItem<any>(window.sessionStorage, key);
        
        if (!item) {
            return null;
        }
        
        if (item._ttl && typeof item._ttl === 'number') {
            if (Date.now() > item._ttl) {
                return null;
            }
            return item.value;
        }
        
        return item;
    }

    /**
     * Remove data from sessionStorage
     */
    public static removeSessionStorage(key: string): void {
        if (!isPersisterAvailable()) {
            return;
        }
        removeItem(window.sessionStorage, key);
    }

    /**
     * Check if a key exists in the specified storage type
     */
    public static has(key: string, storageType: StorageType = 'localStorage'): boolean {
        if (!isPersisterAvailable()) {
            return false;
        }

        switch (storageType) {
            case 'localStorage':
                const localItem = window.localStorage.getItem(key);
                if (!localItem) return false;
                
                try {
                    const parsedLocalItem = JSON.parse(localItem);
                    if (parsedLocalItem._ttl && typeof parsedLocalItem._ttl === 'number') {
                        if (Date.now() > parsedLocalItem._ttl) {
                            return false;
                        }
                    }
                    return true;
                } catch {
                    return true;
                }
            case 'sessionStorage':
                const sessionItem = window.sessionStorage.getItem(key);
                if (!sessionItem) return false;
                
                try {
                    const parsedSessionItem = JSON.parse(sessionItem);
                    if (parsedSessionItem._ttl && typeof parsedSessionItem._ttl === 'number') {
                        if (Date.now() > parsedSessionItem._ttl) {
                            return false;
                        }
                    }
                    return true;
                } catch {
                    return true;
                }
            default:
                return false;
        }
    }

    /**
     * Get all keys from the specified storage type
     */
    public static keys(storageType: StorageType = 'localStorage'): string[] {
        if (!isPersisterAvailable()) {
            return [];
        }

        switch (storageType) {
            case 'localStorage':
                const localKeys: string[] = [];
                const localLength = window.localStorage.length;
                
                for (let i = 0; i < localLength; i++) {
                    const key = window.localStorage.key(i);
                    if (key) {
                        localKeys.push(key);
                    }
                }
                
                const filteredLocalKeys = localKeys.filter(key => {
                    const item = window.localStorage.getItem(key);
                    if (!item) return false;
                    
                    try {
                        const parsedItem = JSON.parse(item);
                        if (parsedItem._ttl && typeof parsedItem._ttl === 'number') {
                            const isExpired = Date.now() > parsedItem._ttl;
                            return !isExpired;
                        }
                        return true;
                    } catch (error) {
                        return true;
                    }
                });
                
                return filteredLocalKeys;
            case 'sessionStorage':
                const sessionKeys: string[] = [];
                const sessionLength = window.sessionStorage.length;
                
                for (let i = 0; i < sessionLength; i++) {
                    const key = window.sessionStorage.key(i);
                    if (key) {
                        sessionKeys.push(key);
                    }
                }
                
                const filteredSessionKeys = sessionKeys.filter(key => {
                    const item = window.sessionStorage.getItem(key);
                    if (!item) return false;
                    
                    try {
                        const parsedItem = JSON.parse(item);
                        if (parsedItem._ttl && typeof parsedItem._ttl === 'number') {
                            const isExpired = Date.now() > parsedItem._ttl;
                            return !isExpired;
                        }
                        return true;
                    } catch (error) {
                        return true;
                    }
                });
                
                return filteredSessionKeys;
            default:
                return [];
        }
    }

    /**
     * Get storage size (approximate)
     */
    public static getStorageSize(storageType: StorageType = 'localStorage'): number {
        if (!isPersisterAvailable()) {
            return 0;
        }

        switch (storageType) {
            case 'localStorage':
                return this.keys('localStorage').length;
            case 'sessionStorage':
                return this.keys('sessionStorage').length;
            default:
                return 0;
        }
    }

    /**
     * Clear all data from the specified storage type
     */
    public static clear(storageType: StorageType = 'localStorage'): void {
        if (!isPersisterAvailable()) {
            return;
        }

        switch (storageType) {
            case 'localStorage':
                window.localStorage.clear();
                break;
            case 'sessionStorage':
                window.sessionStorage.clear();
                break;
            default:
                return;
        }
    }

    /**
     * Check if persister is available
     */
    public static isAvailable(): boolean {
        return isPersisterAvailable();
    }

    /**
     * Get remaining TTL for a storage item in seconds
     */
    public static getRemainingTTL(key: string, storageType: StorageType = 'localStorage'): number | null {
        if (!isPersisterAvailable()) {
            return null;
        }

        let item: any;
        switch (storageType) {
            case 'localStorage':
                item = getItem<any>(window.localStorage, key);
                break;
            case 'sessionStorage':
                item = getItem<any>(window.sessionStorage, key);
                break;
            default:
                return null;
        }

        if (!item || !item._ttl || typeof item._ttl !== 'number') {
            return null;
        }

        const remaining = item._ttl - Date.now();
        if (remaining <= 0) {
            return null;
        }
        
        return Math.ceil(remaining / 1000);
    }

    /**
     * Clean up all expired TTL items in the specified storage
     */
    public static cleanupExpiredTTL(storageType: StorageType = 'localStorage'): void {
        if (!isPersisterAvailable()) {
            return;
        }

        const keys: string[] = [];
        let length: number;
        let storage: Storage;

        switch (storageType) {
            case 'localStorage':
                storage = window.localStorage;
                length = window.localStorage.length;
                break;
            case 'sessionStorage':
                storage = window.sessionStorage;
                length = window.sessionStorage.length;
                break;
            default:
                return;
        }

        for (let i = 0; i < length; i++) {
            const key = storage.key(i);
            if (key) {
                keys.push(key);
            }
        }
        
        keys.forEach(key => {
            const item = storage.getItem(key);
            if (item) {
                try {
                    const parsedItem = JSON.parse(item);
                    if (parsedItem._ttl && typeof parsedItem._ttl === 'number' && Date.now() > parsedItem._ttl) {
                        if (storageType === 'localStorage') {
                            this.removeLocalStorage(key);
                        } else {
                            this.removeSessionStorage(key);
                        }
                    }
                } catch (error) {
                }
            }
        });
    }
}

export class LocalStorage {
    public static set(data: PersisterData): void {
        Persister.setLocalStorage(data);
    }

    public static get<T>(key: string): T | null {
        return Persister.getLocalStorage<T>(key);
    }

    public static remove(key: string): void {
        Persister.removeLocalStorage(key);
    }

    public static has(key: string): boolean {
        return Persister.has(key, 'localStorage');
    }

    public static keys(): string[] {
        return Persister.keys('localStorage');
    }

    public static getStorageSize(): number {
        return Persister.getStorageSize('localStorage');
    }

    public static clear(): void {
        Persister.clear('localStorage');
    }

    /**
     * Clean up all expired TTL items
     */
    public static cleanupExpiredTTL(): void {
        Persister.cleanupExpiredTTL('localStorage');
    }

    /**
     * Get remaining TTL for an item in seconds
     */
    public static getRemainingTTL(key: string): number | null {
        return Persister.getRemainingTTL(key, 'localStorage');
    }
}

export class SessionStorage {
    public static set(data: PersisterData): void {
        Persister.setSessionStorage(data);
    }

    public static get<T>(key: string): T | null {
        return Persister.getSessionStorage<T>(key);
    }

    public static remove(key: string): void {
        Persister.removeSessionStorage(key);
    }

    public static has(key: string): boolean {
        return Persister.has(key, 'sessionStorage');
    }

    public static keys(): string[] {
        return Persister.keys('sessionStorage');
    }

    public static getStorageSize(): number {
        return Persister.getStorageSize('sessionStorage');
    }

    public static clear(): void {
        Persister.clear('sessionStorage');
    }

    /**
     * Clean up all expired TTL items
     */
    public static cleanupExpiredTTL(): void {
        Persister.cleanupExpiredTTL('sessionStorage');
    }

    /**
     * Get remaining TTL for an item in seconds
     */
    public static getRemainingTTL(key: string): number | null {
        return Persister.getRemainingTTL(key, 'sessionStorage');
    }
}

export { setItem, getItem, removeItem, isPersisterAvailable } from './utils.js';