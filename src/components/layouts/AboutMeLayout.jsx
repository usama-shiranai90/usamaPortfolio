'use client'; // Add this at the very top of the file

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {ssr: false});


import {Container} from '@/components/ui/Container';
import {
    ArrowDownIcon,
    GitHubIcon,
    LinkedInIcon,
    StackOverflowIcon,
    XIcon,
} from '@/components/ui/SocialIcons';
import portraitImage from 'p/images/avatars/portrait.jpg';
import {Button} from '@/components/ui/Button';
import {FaGithubAlt, FaLinkedinIn} from 'react-icons/fa';
import {IoMailOutline} from 'react-icons/io5';
import TypingEffect from "@/components/utilities/TypingEffect";

function SocialLink({className, href, children, icon: Icon}) {
    return (
        <motion.li
            className={clsx(className, 'flex')}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
        >
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"/>
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
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6}}
            >
                <motion.div className="lg:pl-20" initial={{x: -50, opacity: 0}} animate={{x: 0, opacity: 1}}
                            transition={{duration: 0.6}}>
                    <h2 className="owl-ni-title text-zinc-800 dark:text-zinc-100 mb-5">
                        Who am <span className="text-shaddy-lx_MidnightGreenEagleGreen text-teal-500">I</span>?
                    </h2>
                    <motion.div
                        className="max-w-xs px-2.5 lg:max-w-none"
                        initial={{rotate: 0}}
                        animate={{rotate: 3}}
                        transition={{type: 'spring', stiffness: 120}}
                    >
                        <Image
                            src={portraitImage}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </motion.div>
                </motion.div>
                <motion.div className="lg:order-first lg:row-span-2" initial={{x: 50, opacity: 0}}
                            animate={{x: 0, opacity: 1}} transition={{duration: 0.6}}>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        I’m <span className="text-teal-500 dark:text-teal-700 capitalize">Usama Bukhari</span>.
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100 capitalize">
                        A software engineer and research student at Kyushu University - Japan.
                    </h2>

                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            <TypingEffect text={text1} speed={10}/>
                        </p>
                        <p>
                            <TypingEffect text={text2} speed={20}/>
                        </p>
                        <p>
                            <TypingEffect text={text3} speed={30}/>
                        </p>
                        <p>
                            <TypingEffect text={text4} speed={40}/>
                        </p>

                    </div>
                </motion.div>
                <motion.div className="lg:pl-20" initial={{opacity: 0}} animate={{opacity: 1}}
                            transition={{duration: 0.8}}>
                    <ul role="list" className="space-y-3.5">
                        <SocialLink
                            href="https://github.com/usama-shiranai90"
                            aria-label="Follow on GitHub"
                            icon={FaGithubAlt}
                        >
                            Follow on GitHub
                        </SocialLink>

                        <SocialLink
                            href="https://www.linkedin.com/in/syed-usama-bukhari-0a6373175"
                            aria-label="Follow on LinkedIn"
                            icon={FaLinkedinIn}
                        >
                            Follow on LinkedIn
                        </SocialLink>

                        <SocialLink
                            href="mailto:bukhari.453@s.kyushu-u.ac.jp"
                            icon={IoMailOutline}
                            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                        >
                            bukhari.453@s.kyushu-u.ac.jp
                        </SocialLink>
                    </ul>
                </motion.div>
            </motion.div>

            <motion.div
                className="flex items-center justify-center"
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.5}}
            >
                <Button href="/resume" download="UsamaBukhari-Resume.pdf" variant="secondary"
                        className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move">
                    View Resume
                    <ArrowDownIcon
                        className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
                </Button>

            </motion.div>
        </Container>
    );
}
