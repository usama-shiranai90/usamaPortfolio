"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }) {
    const lenisRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        // Respect prefers-reduced-motion — also skips downloading Lenis entirely.
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        let cancelled = false;
        let cleanup = null;

        // Loaded on demand so Lenis stays out of the initial bundle; smooth
        // scrolling is a progressive enhancement, not first-paint content.
        import("lenis").then(({ default: Lenis }) => {
            if (cancelled) return;

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
                rafId = requestAnimationFrame(raf);
            }

            let rafId = requestAnimationFrame(raf);

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

            // Route changed while the chunk was still loading — land at the top.
            if (!window.location.hash) {
                lenis.scrollTo(0, { immediate: true });
            }

            cleanup = () => {
                cancelAnimationFrame(rafId);
                document.removeEventListener("click", handleAnchorClick);
                lenis.destroy();
                lenisRef.current = null;
            };
        });

        return () => {
            cancelled = true;
            cleanup?.();
        };
    }, [pathname]);

    // Scroll to top on route change (except when hash is present)
    useEffect(() => {
        if (lenisRef.current && !window.location.hash) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return children;
}
