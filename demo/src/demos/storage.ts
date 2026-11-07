/**
 * The Persister — localStorage/sessionStorage with optional base64 encoding
 * and per-key TTL.
 *
 * Every card here writes to your real browser storage. Open DevTools →
 * Application → Local Storage alongside this page: an encoded value is stored
 * with the `apx&` marker, and `getLocalStorage` decodes it back on read.
 */
import { Persister, type StorageType } from '@apx-ui/toolkit';
import type { ApiSpec, SelectOption } from '../lib/api';

const STORAGE_OPTIONS: SelectOption[] = [
    { label: 'localStorage', value: 'localStorage' },
    { label: 'sessionStorage', value: 'sessionStorage' }
];

const DEMO_KEY = 'apxDemoScratch';

export const STORAGE_APIS: ApiSpec[] = [
    {
        name: 'Persister.isAvailable',
        signature: 'Persister.isAvailable(): boolean',
        summary: 'Whether Web Storage can actually be used — false in private modes that block it.',
        run: () => Persister.isAvailable()
    },
    {
        name: 'Persister.setLocalStorage',
        signature: 'Persister.setLocalStorage(data: PersisterData): void',
        summary: 'Writes one or more keys, each with its own encoding and TTL.',
        imperative: true,
        args: [
            { name: 'key', type: 'text', value: DEMO_KEY },
            { name: 'value', type: 'text', value: 'hello from the playground' },
            { name: 'encode', type: 'boolean', value: true, hint: 'base64 with the apx& marker' },
            { name: 'ttl', type: 'number', value: 60, hint: 'seconds; 0 means no expiry' }
        ],
        code: ([key, value, encode, ttl]) =>
            `Persister.setLocalStorage({\n  '${key}': {\n    value: '${value}',\n    encode: ${encode}${Number(ttl) > 0 ? `,\n    ttl: ${ttl}` : ''}\n  }\n})`,
        run: ([key, value, encode, ttl]) => {
            Persister.setLocalStorage({
                [String(key)]: {
                    value: String(value),
                    encode: Boolean(encode),
                    ttl: Number(ttl) > 0 ? Number(ttl) : undefined
                }
            });
            return `wrote ${key} — raw value in storage: ${window.localStorage.getItem(String(key))}`;
        },
        note: 'The returned line is the *raw* stored string, so you can see the encoding for yourself.'
    },
    {
        name: 'Persister.getLocalStorage',
        signature: 'Persister.getLocalStorage<T>(key: string): T | null',
        summary: 'Reads and decodes, returning null once a TTL has passed.',
        imperative: true,
        args: [{ name: 'key', type: 'text', value: DEMO_KEY, span: 2 }],
        code: ([key]) => `Persister.getLocalStorage('${key}')`,
        run: ([key]) => Persister.getLocalStorage(String(key))
    },
    {
        name: 'Persister.getRemainingTTL',
        signature: "Persister.getRemainingTTL(key: string, storageType = 'localStorage'): number | null",
        summary: 'Seconds left before the key expires; null when it has no TTL.',
        imperative: true,
        args: [
            { name: 'key', type: 'text', value: DEMO_KEY },
            { name: 'storageType', type: 'select', value: 'localStorage', options: STORAGE_OPTIONS }
        ],
        code: ([key, storageType]) =>
            `Persister.getRemainingTTL('${key}', '${storageType}')`,
        run: ([key, storageType]) =>
            Persister.getRemainingTTL(String(key), storageType as StorageType),
        note: 'Write a key with a TTL above, then press Run here a few times.'
    },
    {
        name: 'Persister.has',
        signature: "Persister.has(key: string, storageType = 'localStorage'): boolean",
        summary: 'Presence check that also respects expiry.',
        imperative: true,
        args: [
            { name: 'key', type: 'text', value: DEMO_KEY },
            { name: 'storageType', type: 'select', value: 'localStorage', options: STORAGE_OPTIONS }
        ],
        code: ([key, storageType]) => `Persister.has('${key}', '${storageType}')`,
        run: ([key, storageType]) => Persister.has(String(key), storageType as StorageType)
    },
    {
        name: 'Persister.keys',
        signature: "Persister.keys(storageType = 'localStorage'): string[]",
        summary: 'Every key currently held.',
        imperative: true,
        args: [
            {
                name: 'storageType',
                type: 'select',
                value: 'localStorage',
                options: STORAGE_OPTIONS,
                span: 2
            }
        ],
        code: ([storageType]) => `Persister.keys('${storageType}')`,
        run: ([storageType]) => Persister.keys(storageType as StorageType),
        note: 'You should see apxConfig and apxDemoSettings here — the context and this playground both persist through the same API.'
    },
    {
        name: 'Persister.getStorageSize',
        signature: "Persister.getStorageSize(storageType = 'localStorage'): number",
        summary: 'Approximate bytes used.',
        imperative: true,
        args: [
            {
                name: 'storageType',
                type: 'select',
                value: 'localStorage',
                options: STORAGE_OPTIONS,
                span: 2
            }
        ],
        code: ([storageType]) => `Persister.getStorageSize('${storageType}')`,
        run: ([storageType]) => Persister.getStorageSize(storageType as StorageType)
    },
    {
        name: 'Persister.removeLocalStorage',
        signature: 'Persister.removeLocalStorage(key: string): void',
        summary: 'Deletes one key.',
        imperative: true,
        args: [{ name: 'key', type: 'text', value: DEMO_KEY, span: 2 }],
        code: ([key]) => `Persister.removeLocalStorage('${key}')`,
        run: ([key]) => {
            Persister.removeLocalStorage(String(key));
            return `removed ${key}`;
        }
    },
    {
        name: 'Persister.setSessionStorage',
        signature: 'Persister.setSessionStorage(data: PersisterData): void',
        summary: 'Same contract against sessionStorage — cleared when the tab closes.',
        imperative: true,
        args: [
            { name: 'key', type: 'text', value: 'apxDemoSession' },
            { name: 'value', type: 'text', value: 'this dies with the tab' }
        ],
        code: ([key, value]) =>
            `Persister.setSessionStorage({ '${key}': { value: '${value}' } })`,
        run: ([key, value]) => {
            Persister.setSessionStorage({ [String(key)]: { value: String(value) } });
            return Persister.getSessionStorage(String(key));
        }
    },
    {
        name: 'Persister.cleanupExpiredTTL',
        signature: "Persister.cleanupExpiredTTL(storageType = 'localStorage'): void",
        summary: 'Sweeps out every expired key — what ApxContext runs on init.',
        imperative: true,
        args: [
            {
                name: 'storageType',
                type: 'select',
                value: 'localStorage',
                options: STORAGE_OPTIONS,
                span: 2
            }
        ],
        code: ([storageType]) => `Persister.cleanupExpiredTTL('${storageType}')`,
        run: ([storageType]) => {
            const before = Persister.keys(storageType as StorageType).length;
            Persister.cleanupExpiredTTL(storageType as StorageType);
            const after = Persister.keys(storageType as StorageType).length;
            return `${before - after} expired key(s) removed — ${after} remain`;
        }
    },
    {
        name: 'Persister.clear',
        signature: "Persister.clear(storageType = 'localStorage'): void",
        summary: 'Empties the store entirely.',
        imperative: true,
        args: [
            {
                name: 'storageType',
                type: 'select',
                value: 'sessionStorage',
                options: STORAGE_OPTIONS,
                span: 2,
                hint: 'Clearing localStorage also resets this playground’s own settings.'
            }
        ],
        code: ([storageType]) => `Persister.clear('${storageType}')`,
        run: ([storageType]) => {
            Persister.clear(storageType as StorageType);
            return `${storageType} cleared`;
        }
    }
];
