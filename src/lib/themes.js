// Single source of truth for the theme system.
// Server-safe (no 'use client') so the root layout can inline these values
// into the pre-hydration script that prevents un-themed first paint.
//
// Each theme emits both a full color var (--theme-bg, for direct var() use in
// arbitrary values) and an RGB-channel var (--theme-bg-rgb, so Tailwind's
// `<alpha-value>` opacity modifiers like bg-theme-bg/80 actually work).

export const themes = {
    dark: {
        type: 'dark',
        '--theme-bg': '#000000',
        '--theme-bg-rgb': '0 0 0',
        '--theme-text': '#ffffff',
        '--theme-text-rgb': '255 255 255',
        '--theme-card': '#18181b',
        '--theme-card-rgb': '24 24 27',
        '--theme-card-elevated': '#27272a',
        '--theme-card-elevated-rgb': '39 39 42',
    },
    light: {
        type: 'light',
        '--theme-bg': '#ffffff',
        '--theme-bg-rgb': '255 255 255',
        '--theme-text': '#0f0f0f',
        '--theme-text-rgb': '15 15 15',
        '--theme-card': '#f4f4f5',
        '--theme-card-rgb': '244 244 245',
        '--theme-card-elevated': '#ffffff',
        '--theme-card-elevated-rgb': '255 255 255',
    },
    'github-dark': {
        type: 'dark',
        '--theme-bg': '#0d1117',
        '--theme-bg-rgb': '13 17 23',
        '--theme-text': '#c9d1d9',
        '--theme-text-rgb': '201 209 217',
        '--theme-card': '#161b22',
        '--theme-card-rgb': '22 27 34',
        '--theme-card-elevated': '#21262d',
        '--theme-card-elevated-rgb': '33 38 45',
    },
    dracula: {
        type: 'dark',
        '--theme-bg': '#282a36',
        '--theme-bg-rgb': '40 42 54',
        '--theme-text': '#f8f8f2',
        '--theme-text-rgb': '248 248 242',
        '--theme-card': '#44475a',
        '--theme-card-rgb': '68 71 90',
        '--theme-card-elevated': '#565973',
        '--theme-card-elevated-rgb': '86 89 115',
    },
    nord: {
        type: 'dark',
        '--theme-bg': '#2e3440',
        '--theme-bg-rgb': '46 52 64',
        '--theme-text': '#d8dee9',
        '--theme-text-rgb': '216 222 233',
        '--theme-card': '#3b4252',
        '--theme-card-rgb': '59 66 82',
        '--theme-card-elevated': '#434c5e',
        '--theme-card-elevated-rgb': '67 76 94',
    },
    obsidian: {
        type: 'dark',
        '--theme-bg': '#0f0f0f',
        '--theme-bg-rgb': '15 15 15',
        '--theme-text': '#d4d4d4',
        '--theme-text-rgb': '212 212 212',
        '--theme-card': '#1e1e1e',
        '--theme-card-rgb': '30 30 30',
        '--theme-card-elevated': '#2a2a2a',
        '--theme-card-elevated-rgb': '42 42 42',
    },
    paper: { // Researcher Base
        type: 'light',
        '--theme-bg': '#fcfcfc',
        '--theme-bg-rgb': '252 252 252',
        '--theme-text': '#1a1a1a',
        '--theme-text-rgb': '26 26 26',
        '--theme-card': '#f0f0f0',
        '--theme-card-rgb': '240 240 240',
        '--theme-card-elevated': '#ffffff',
        '--theme-card-elevated-rgb': '255 255 255',
    },
    terminal: { // AI Researcher
        type: 'dark',
        '--theme-bg': '#0c0c0c',
        '--theme-bg-rgb': '12 12 12',
        '--theme-text': '#00ff00',
        '--theme-text-rgb': '0 255 0',
        '--theme-card': '#141414',
        '--theme-card-rgb': '20 20 20',
        '--theme-card-elevated': '#1c1c1c',
        '--theme-card-elevated-rgb': '28 28 28',
    },
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

export function isDarkTheme(themeMode) {
    return (themes[themeMode] || themes.dark).type === 'dark';
}

export function applyTheme(root, themeMode, accent) {
    const theme = themes[themeMode] || themes.dark;
    root.classList.toggle('dark', theme.type === 'dark');
    Object.entries(theme).forEach(([key, value]) => {
        if (key.startsWith('--')) root.style.setProperty(key, value);
    });
    root.style.setProperty('--theme-accent', accent.value);
    root.style.setProperty('--theme-accent-rgb', accent.rgb);
}
