// src/api.ts


export const isTauri = (): boolean => {
    return Boolean(window.TAURI);
};

export const getApiBaseUrl = (): string => {
    return isTauri() ? '/tauri-api' : '/api';
};