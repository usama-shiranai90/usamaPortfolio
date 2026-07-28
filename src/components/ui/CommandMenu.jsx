"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Loaded on first open. Keeping cmdk, framer-motion and ~14 icons out of the
// initial bundle matters here because this component is mounted on every page
// by the root layout but is invisible until the user asks for it.
const CommandMenuPanel = dynamic(
    () => import("./CommandMenuPanel").then((m) => m.CommandMenuPanel),
    { ssr: false }
);

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    // Once the panel has been requested it stays mounted, so exit animations
    // and the post-command toast behave exactly as before.
    const [loaded, setLoaded] = useState(false);

    const openMenu = useCallback(() => {
        setLoaded(true);
        setOpen(true);
    }, []);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setLoaded(true);
                setOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        window.addEventListener("open-command-menu", openMenu);

        // Warm the chunk once the browser is idle so the first ⌘K still feels
        // instant without competing with the initial page load.
        const preload = () => import("./CommandMenuPanel");
        const idle = window.requestIdleCallback?.(preload, { timeout: 3000 });
        const timer = idle === undefined ? setTimeout(preload, 2000) : null;

        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-command-menu", openMenu);
            if (idle !== undefined) window.cancelIdleCallback?.(idle);
            if (timer) clearTimeout(timer);
        };
    }, [openMenu]);

    if (!loaded) return null;

    return <CommandMenuPanel open={open} setOpen={setOpen} />;
}
