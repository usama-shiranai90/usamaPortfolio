"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
    dark: {
        '--theme-bg': '#000000',
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
    { name: 'Cyan', value: '#06b6d4', rgb: '6, 182, 212' },
    { name: 'Blue', value: '#3b82f6', rgb: '59, 130, 246' },
    { name: 'Indigo', value: '#6366f1', rgb: '99, 102, 241' },
    { name: 'Violet', value: '#8b5cf6', rgb: '139, 92, 246' },
    { name: 'Magenta', value: '#d946ef', rgb: '217, 70, 239' },
    { name: 'Rose', value: '#f43f5e', rgb: '244, 63, 94' },
    { name: 'Orange', value: '#f97316', rgb: '249, 115, 22' },
    { name: 'Emerald', value: '#10b981', rgb: '16, 185, 129' },
    { name: 'Lime', value: '#84cc16', rgb: '132, 204, 22' },
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
