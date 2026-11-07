export const DECODE_KEY = 'apx&';

export const encodeItemValue = (value: string): string => {
    return `${DECODE_KEY}${btoa(value)}`;
};

export const decodeItemValue = (value: string): string => {
    if (value.startsWith(DECODE_KEY)) {
        return atob(value.slice(DECODE_KEY.length));
    }
    return value;
};

export const parseItemValue = (value: string): any => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export const setItem = (storage: Storage, key: string, valueArg: any, encode?: boolean): void => {
    if (!isPersisterAvailable()) {
        return;
    }
    let value = valueArg;
    if (typeof valueArg !== 'string') {
        value = JSON.stringify(valueArg);
    }
    if (encode) {
        value = encodeItemValue(value);
    }
    storage.setItem(key, value);
};

export const getItem = <T>(storage: Storage, key: string): T | null => {
    if (!isPersisterAvailable()) {
        return null;
    }
    let value = storage.getItem(key);
    if (!value) {
        return null;
    }
    if (value.startsWith(DECODE_KEY)) {
        value = decodeItemValue(value);
    }
    return parseItemValue(value) as T;
};

export const removeItem = (storage: Storage, key: string): void => {
    if (!isPersisterAvailable()) {
        return;
    }
    storage.removeItem(key);
};

export const isPersisterAvailable = (): boolean => {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' && typeof window.sessionStorage !== 'undefined';
};