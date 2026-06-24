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
    },
    'github-dark': {
        '--theme-bg': '#0d1117',
        '--theme-text': '#c9d1d9',
        '--theme-card': '#161b22',
    },
    dracula: {
        '--theme-bg': '#282a36',
        '--theme-text': '#f8f8f2',
        '--theme-card': '#44475a',
    },
    nord: {
        '--theme-bg': '#2e3440',
        '--theme-text': '#d8dee9',
        '--theme-card': '#3b4252',
    },
    obsidian: {
        '--theme-bg': '#0f0f0f',
        '--theme-text': '#d4d4d4',
        '--theme-card': '#1e1e1e',
    },
    paper: { // Researcher Base
        '--theme-bg': '#fcfcfc',
        '--theme-text': '#1a1a1a',
        '--theme-card': '#f0f0f0',
    },
    terminal: { // AI Researcher
        '--theme-bg': '#0c0c0c',
        '--theme-text': '#00ff00',
        '--theme-card': '#141414',
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

export const backgroundStyles = [
    { id: 'scientific', name: 'Neuro-Symbolic' },
    { id: 'ai-network', name: 'AI Network' },
    { id: 'particles', name: 'Particles' },
    { id: 'grid', name: 'Cyber Grid' },
    { id: 'blueprint', name: 'Engineering' },
    { id: 'algorithm', name: 'Algorithm' },
    { id: 'research', name: 'Researcher' },
    { id: 'minimal', name: 'Minimal' },
];

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState('dark');
    const [accent, setAccent] = useState(accents[0]);
    const [backgroundStyle, setBackgroundStyle] = useState('scientific');
    const [language, setLanguage] = useState('en');
    const [mounted, setMounted] = useState(false);

    // Derived state for backward compatibility
    const isDark = themeMode !== 'light';

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('themeMode');
        const savedAccentVal = localStorage.getItem('accent');
        const savedBg = localStorage.getItem('backgroundStyle');
        const savedLanguage = localStorage.getItem('language');

        if (savedTheme && themes[savedTheme]) setThemeMode(savedTheme);

        if (savedAccentVal) {
            try {
                const parsedAccent = JSON.parse(savedAccentVal);
                const found = accents.find(a => a.value === parsedAccent.value);
                if (found) setAccent(found);
            } catch (e) {
                console.error("Failed to parse accent from localStorage", e);
            }
        }

        if (savedBg) setBackgroundStyle(savedBg);
        if (savedLanguage) setLanguage(savedLanguage);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        // Fallback to dark if undefined
        const themeColors = themes[themeMode] || themes.dark;

        // Toggle Dark Class
        if (themeMode !== 'light') {
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
        root.style.setProperty('--theme-accent-rgb', accent.rgb);

        // Save preferences
        localStorage.setItem('themeMode', themeMode);
        localStorage.setItem('accent', JSON.stringify(accent));
        localStorage.setItem('backgroundStyle', backgroundStyle);
        localStorage.setItem('language', language);

    }, [themeMode, accent, backgroundStyle, language, mounted]);

    return (
        <ThemeContext.Provider value={{
            themeMode, setThemeMode,
            isDark, // Exported for compatibility
            accent, setAccent,
            backgroundStyle, setBackgroundStyle,
            language, setLanguage,
            mounted,
            themes,
            accents,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);

