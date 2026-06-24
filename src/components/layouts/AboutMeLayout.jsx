'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });

import { Container } from '@/components/ui/Container';
import portraitImage from 'p/images/avatars/portrait.jpg';
import { Button } from '@/components/ui/Button';


function SocialLink({ className, href, children, icon: Icon }) {
    return (
        <motion.li
            className={clsx(className, 'flex')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-cyan-accent dark:text-zinc-200 dark:hover:text-cyan-accent"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-cyan-accent" />
                <span className="ml-4">{children}</span>
            </Link>
        </motion.li>
    );
}

export const metadata = {
    title: 'About',
    description:
        'I’m Usama Bukhari. a software engineer and research student at Kyushu University - Japan.',
};

export default function AboutMeLayout() {
    const text1 = `I've always loved creating things, and my journey into software development started with web development. During my early years in university, I was all about building interactive websites and mastering front-end design. But everything changed in my 6th semester when I took a course in Data Science and Probability. That's when I discovered my passion for data analysis and algorithms.`;
    const text2 = `It started small, with basic probability exercises and understanding data trends, but soon enough, I was deep into machine learning models and advanced algorithms. I found myself staying up late, running endless simulations, tweaking algorithms, and digging into vast datasets just to see what new insights I could discover. The beauty of data — its ability to reveal hidden patterns and tell stories — captivated me in a way I hadn’t expected.`;
    const text3 = `I was no longer just building websites; I was building tools to analyze user behavior, predict trends, and optimize performance. Combining my love for web development with the power of data analysis opened up a whole new world for me. I wasn’t just creating; I was learning, evolving, and solving complex problems that could make a real impact.`;
    const text4 = `Now, as a software engineer, I combine my love for web development with data science to build solutions that are not just functional but data-driven. I enjoy diving deep into data, finding patterns, and optimizing systems through code. Whether it’s developing websites or creating algorithms, I’m driven by the challenge of solving problems and always excited to learn something new.`;


    return (
        <Container className="mt-16 sm:mt-32">
            <motion.div
                className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div className="lg:pl-20" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}>
                    <h2 className="owl-ni-title font-heading text-zinc-800 dark:text-zinc-100 mb-5">
                        Who am <span className="text-cyan-accent">I</span>?
                    </h2>
                    <motion.div
                        className="max-w-xs px-2.5 lg:max-w-none"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 3 }}
                        transition={{ type: 'spring', stiffness: 120 }}
                    >
                        <Image
                            src={portraitImage}
                            alt="Portrait of Usama Bukhari"
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </motion.div>
                </motion.div>
                <motion.div className="lg:order-first lg:row-span-2" initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl font-bold font-heading tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        I’m <span className="text-cyan-accent capitalize">Usama Bukhari</span>.
                    </h1>
                    <h2 className="text-2xl font-bold font-heading tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100 capitalize">
                        A software engineer and research student at Kyushu University - Japan.
                    </h2>

                    <motion.div 
                        className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.p variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="leading-relaxed">
                            {text1}
                        </motion.p>
                        <motion.p variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="leading-relaxed">
                            {text2}
                        </motion.p>
                        <motion.p variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="leading-relaxed">
                            {text3}
                        </motion.p>
                        <motion.p variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="leading-relaxed">
                            {text4}
                        </motion.p>
                    </motion.div>
                </motion.div>
                <motion.div className="lg:pl-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}>
                    <ul role="list" className="space-y-3.5">
                        <SocialLink
                            href="https://github.com/usama-shiranai90"
                            aria-label="Follow on GitHub"
                            icon={Github}
                        >
                            Follow on GitHub
                        </SocialLink>

                        <SocialLink
                            href="https://www.linkedin.com/in/syed-usama-bukhari-0a6373175"
                            aria-label="Follow on LinkedIn"
                            icon={Linkedin}
                        >
                            Follow on LinkedIn
                        </SocialLink>

                        <SocialLink
                            href="mailto:bukhari.453@s.kyushu-u.ac.jp"
                            icon={Mail}
                            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                        >
                            bukhari.453@s.kyushu-u.ac.jp
                        </SocialLink>
                    </ul>
                </motion.div>
            </motion.div>

            <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Button href="/resume" download="UsamaBukhari-Resume.pdf" variant="secondary"
                    className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move">
                    View Resume
                    <ArrowDown
                        className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
                </Button>

            </motion.div>
        </Container>
    );
}
