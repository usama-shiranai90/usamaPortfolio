import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {Container} from '@/components/Container'
import {
    ArrowDownIcon,
    DataCampIcon,
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    XIcon,
} from '@/components/SocialIcons'
import portraitImage from '/public/images/portrait.jpg'
import {Button} from "@/components/Button";

function SocialLink({className, href, children, icon: Icon}) {
    return (
        <li className={clsx(className, 'flex')}>
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"/>
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    )
}

function MailIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
            />
        </svg>
    )
}

export const metadata = {
    title: 'About',
    description:
        'I’m Usama Bukhari. a software engineer and research student at Kyushu University - Japan.',
}

export default function About() {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <Image
                            src={portraitImage}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        I’m Usama Bukhari. a software engineer and research student at Kyushu University - Japan.
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            I've always loved creating things, and my journey into software development started with web
                            development. During my early years in university, I was all about building interactive
                            websites and mastering front-end design. But everything changed in my 6th semester when I
                            took a course in Data Science and Probability. That's when I discovered my passion for data
                            analysis and algorithms.
                        </p>
                        <p>
                            It started small, with basic probability exercises and understanding data trends, but soon
                            enough, I was deep into machine learning models and advanced algorithms. I found myself
                            staying up late, running endless simulations, tweaking algorithms, and digging into vast
                            datasets just to see what new insights I could discover. The beauty of data — its ability to
                            reveal hidden patterns and tell stories — captivated me in a way I hadn’t expected.
                        </p>
                        <p>
                            I was no longer just building websites; I was building tools to analyze user behavior,
                            predict trends, and optimize performance. Combining my love for web development with the
                            power of data analysis opened up a whole new world for me. I wasn’t just creating; I was
                            learning, evolving, and solving complex problems that could make a real impact.
                        </p>
                        <p>
                            Now, as a software engineer, I combine my love for web development with data science to
                            build solutions that are not just functional but data-driven. I enjoy diving deep into data,
                            finding patterns, and optimizing systems through code. Whether it’s developing websites or
                            creating algorithms, I’m driven by the challenge of solving problems and always excited to
                            learn something new.
                        </p>

                    </div>

                </div>
                <div className="lg:pl-20">
                    <ul role="list" className={"space-y-3.5"}>
                        <SocialLink href="https://github.com/usama-shiranai90" aria-label="Follow on GitHub"
                                    icon={GitHubIcon}>
                            Follow on GitHub
                        </SocialLink>

                        <SocialLink href="https://www.linkedin.com/in/syed-usama-bukhari-0a6373175"
                                    aria-label="Follow on LinkedIn" icon={LinkedInIcon}>
                            Follow on LinkedIn
                        </SocialLink>

                        <SocialLink
                            href="mailto:syedusama843@gmail.com"
                            icon={MailIcon}
                            className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
                            syedusama843@gmail.com
                        </SocialLink>
                    </ul>


                </div>

            </div>

            <div className={"flex items-center justify-center"}>
                <Button href="" download="UsamaBukhari-Resume.pdf" variant="secondary"
                        className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move">
                    View Resume
                    <ArrowDownIcon
                        className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
                </Button>

            </div>

        </Container>
    )
}
