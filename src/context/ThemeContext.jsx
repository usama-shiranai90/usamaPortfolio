"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { themes, accents, backgroundStyles, isDarkTheme, applyTheme } from '@/lib/themes';

const ThemeContext = createContext();

// Re-exported so existing `import { accents } from '@/context/ThemeContext'` call sites keep working.
export { accents, backgroundStyles };

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState('dark');
    const [accent, setAccent] = useState(accents[0]);
    const [backgroundStyle, setBackgroundStyle] = useState('scientific');
    const [language, setLanguage] = useState('en');
    const [mounted, setMounted] = useState(false);

    // 'paper' is a light theme despite not being named 'light' — type lives on the theme itself.
    const isDark = isDarkTheme(themeMode);

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

        applyTheme(document.documentElement, themeMode, accent);

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
