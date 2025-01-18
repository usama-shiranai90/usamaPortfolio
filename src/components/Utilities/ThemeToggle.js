import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import {GiBarbedSun, GiMoonBats} from "react-icons/gi";

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleTheme = () => {
        setIsAnimating(true); // Start animation
        setTimeout(() => {
            setTheme(otherTheme);
            setIsAnimating(false); // End animation after transition
        }, 1000); // Match the animation duration
    };

    return (
        <>
            {/* Full-Screen Transition Animation */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-white dark:bg-black flex items-center justify-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1, ease: "easeInOut"}}
                    >
                        {/* Loader Animation */}
                        <motion.div
                            className="text-zinc-500 dark:text-zinc-300"
                            initial={{scale: 0, rotate: 0}}
                            animate={{scale: 1, rotate: 360}}
                            exit={{scale: 0}}
                            transition={{duration: 1, ease: "easeInOut"}}
                        >
                            {resolvedTheme === "dark" ? (
                                <GiMoonBats className="h-12 w-12"/>

                            ) : (
                                <GiBarbedSun className="h-12 w-12"/>
                            )}
                        </motion.div>
                        <span className={"font-semibold text-teal-700"}>Owling</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Theme Toggle Button */}
            <button
                type="button"
                aria-label={`Switch to ${otherTheme} theme`}
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition hover:ring-zinc-300 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                onClick={toggleTheme}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {resolvedTheme === "dark" ? (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <GiMoonBats className="h-6 w-6 text-zinc-500 dark:text-zinc-300" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <GiBarbedSun className="h-6 w-6 text-zinc-500 dark:text-zinc-300" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </>
    );
}

export default ThemeToggle;
