// Define metadata for the layout
import React, {createContext, useEffect, useRef, useState} from "react";

const metadata = {
    title: {
        template: '%s - Spencer Sharp', default: 'Spencer Sharp - Software designer, founder, and amateur astronaut',
    },
    description: 'I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.',
};

// Create context for App
export const AppContext = createContext({});

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

// Theme Context and Provider for managing themes
const ThemeContext = createContext();

function ThemeProvider({children}) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check system preference and update the theme if needed
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme || 'dark'); // Set to dark if no system preference is found

        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return (<ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>);
}

function usePathname() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const handlePathChange = () => setPathname(window.location.pathname);

        window.addEventListener('popstate', handlePathChange);
        return () => window.removeEventListener('popstate', handlePathChange);
    }, []);

    return pathname;
}

export function Providers({children}) {
    const pathname = usePathname();
    const previousPathname = usePrevious(pathname);

    return (<AppContext.Provider value={{previousPathname}}>
            <ThemeProvider>{children}</ThemeProvider>
        </AppContext.Provider>);
}