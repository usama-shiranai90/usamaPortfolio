"use client";

import { useEffect, createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

export function LenisProvider({ children }) {
    const lenisRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth decay
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Smooth scroll handling for internal anchor links (e.g. href="/#about")
        const handleAnchorClick = (e) => {
            const target = e.target.closest("a");
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href) return;

            // Check if it's an anchor link for current page or root page
            if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
                const targetId = href.replace(/^\/#?/, "");
                if (targetId) {
                    const element = document.getElementById(targetId);
                    if (element) {
                        e.preventDefault();
                        lenis.scrollTo(element, {
                            offset: -20,
                            duration: 1.2,
                        });
                    }
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", handleAnchorClick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [pathname]);

    // Scroll to top on route change (except when hash is present)
    useEffect(() => {
        if (lenisRef.current && !window.location.hash) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}
