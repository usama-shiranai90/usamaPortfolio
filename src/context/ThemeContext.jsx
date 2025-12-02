"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
    dark: {
        '--theme-bg': '#0f0f0f',
        '--theme-text': '#ffffff',
        '--theme-card': '#18181b',
    },
    light: {
        '--theme-bg': '#ffffff',
        '--theme-text': '#0f0f0f',
        '--theme-card': '#f4f4f5',
    }
};

export const accents = [
    { name: 'Teal', value: '#14b8a6', rgb: '20, 184, 166' },
    { name: 'Cyan', value: '#00d8ff', rgb: '0, 216, 255' },
    { name: 'Green', value: '#00ff9d', rgb: '0, 255, 157' },
    { name: 'Purple', value: '#bd00ff', rgb: '189, 0, 255' },
    { name: 'Orange', value: '#ff9100', rgb: '255, 145, 0' },
    { name: 'Red', value: '#ff0055', rgb: '255, 0, 85' },
];

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const [accent, setAccent] = useState(accents[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme-mode');
        const savedAccentVal = localStorage.getItem('theme-accent');

        if (savedTheme) setIsDark(savedTheme === 'dark');
        if (savedAccentVal) {
            const found = accents.find(a => a.value === savedAccentVal);
            if (found) setAccent(found);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        const themeColors = isDark ? themes.dark : themes.light;

        // Toggle Dark Class
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Apply Base Colors
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Apply Accent
        root.style.setProperty('--theme-accent', accent.value);

        // Save preferences
        localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
        localStorage.setItem('theme-accent', accent.value);

    }, [isDark, accent, mounted]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, accent, setAccent, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
