'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

import resumeImage1 from 'p/images/resume/Syed Usama Bukhari Resume_Page_1.png'
import resumeImage2 from 'p/images/resume/Syed Usama Bukhari Resume_Page_2.png'

import resumeImage11 from 'p/images/resume/Syed Usama Bukhari EU_Page_1.png'
import resumeImage12 from 'p/images/resume/Syed Usama Bukhari EU_Page_2.png'

const TABS = [
    { id: 'english', label: 'English Resume', download: '/Usama Bukhari Resume.pdf', filename: 'UsamaBukhari-Resume.pdf' },
    { id: 'japanese', label: 'Japanese Resume', download: '/Syed Usama Bukhari EU.pdf', filename: 'UsamaBukhari-Resume-JP.pdf' },
]

export default function Resume() {
    const [activeTab, setActiveTab] = useState(TABS[0].id)

    const currentTab = TABS.find((tab) => tab.id === activeTab)

    return (
        <Container className="mt-16 sm:mt-32">
            <div className="flex flex-col items-center gap-6 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
                    Curriculum <span className="text-teal-500">Vitae</span>
                </h1>
                <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
                    My professional journey and qualifications. Switch between the English and Japanese versions below.
                </p>

                {/* Custom Tab Switcher */}
                <div className="flex space-x-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800/50">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                'relative rounded-full px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-2',
                                activeTab === tab.id
                                    ? 'text-zinc-900 dark:text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                            )}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-700 dark:ring-white/10 rounded-full"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex w-full max-w-sm justify-center">
                    <Button
                        href={currentTab.download}
                        download={currentTab.filename}
                        variant="primary"
                        className="w-full sm:w-auto"
                    >
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <div className="relative w-full max-w-5xl">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {activeTab === 'english' && (
                                <>
                                    <ResumePageImage src={resumeImage1} alt="English Resume Page 1" priority />
                                    <ResumePageImage src={resumeImage2} alt="English Resume Page 2" />
                                </>
                            )}
                            {activeTab === 'japanese' && (
                                <>
                                    <ResumePageImage src={resumeImage11} alt="Japanese Resume Page 1" priority />
                                    <ResumePageImage src={resumeImage12} alt="Japanese Resume Page 2" />
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Container>
    )
}

function ResumePageImage({ src, alt, priority = false }) {
    return (
        <div className="w-full overflow-hidden rounded-xl bg-zinc-100 shadow-xl ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
            <Image
                src={src}
                alt={alt || "Usama Bukhari Resume Page"}
                className="w-full h-auto"
                sizes="(min-width: 1280px) 50rem, (min-width: 1024px) 45rem, 100vw"
                priority={priority}
            />
        </div>
    )
}

