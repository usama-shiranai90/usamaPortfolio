"use client";

import {motion} from "framer-motion"; // For animations
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {Button} from '@/components/ui/Button'
import {Card} from '@/components/ui/Card'
import {Container} from '@/components/ui/Container'
import {
    GitHubIcon, DataCampCommunityIcon, DataCampIcon, KaggleIcon, StackOverflowIcon,
    LinkedInIcon, ArrowDownIcon,
} from '@/components/ui/SocialIcons'
import logoImmentia from '/public/images/logos/immentia.png'
import logoCarecloud from '/public/images/logos/CareCloud_Logo.jpg'
import image1 from '/public/images/photos/image-1.jpg'
import image2 from '/public/images/photos/image-2.jpg'
import image3 from '/public/images/photos/image-3.jpg'
import image4 from '/public/images/photos/image-4.jpg'
import image5 from '/public/images/photos/image-5.jpg'
import {formatDate} from '@/lib/formatDate'
import {LuBriefcaseBusiness} from "react-icons/lu";


import fuiLogo from '/public/images/logos/fui.svg';
import kyushuLogo from '/public/images/logos/kyushu_University.svg';
import avatarImage from "p/images/avatars/avatar_1.jpg";
import kaggleImage from "p/images/logos/STL_BLUE_LOGO.png";
import {FiGithub} from "react-icons/fi";
import {FaGithubAlt, FaKaggle, FaLinkedinIn} from "react-icons/fa";
import {SiDatacamp, SiKaggle, SiStackoverflow} from "react-icons/si";
import {useTheme} from "next-themes";
import {GiTechnoHeart} from "react-icons/gi";


const fadeIn = {
    hidden: {opacity: 0, y: 50},
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {duration: 0.6, delay: i * 0.2},
    }),
};

const fadeScale = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1, transition: {duration: 0.5}},
};


function Education({education}) {
    return (
        <Card as="education" logo={education.logo}>
            <Card.Title href={`#`}>
                {education.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={education.dates} decorate>
                {education.dates}
            </Card.Eyebrow>
            <Card.Description>{education.institution}</Card.Description>
            <Card.Cta>Read education</Card.Cta>
        </Card>
    )
}

function SocialLink({icon: Icon, ...props}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={fadeIn}
        >
            <Link className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
                <Icon
                    className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
            </Link>
        </motion.div>
    )
}


function Role({role}) {
    let startLabel =
        typeof role.start === 'string' ? role.start : role.start.label
    let startDate =
        typeof role.start === 'string' ? role.start : role.start.dateTime

    let endLabel = typeof role.end === 'string' ? role.end : role.end.label
    let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

    return (
        <li className="flex gap-4">
            <div
                className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image src={role.logo} alt="" className="h-7 w-7" unoptimized/>
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {role.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                    {role.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                    aria-label={`${startLabel} until ${endLabel}`}
                >
                    <time dateTime={startDate}>{startLabel}</time>
                    {' '}
                    <span aria-hidden="true">—</span>{' '}
                    <time dateTime={endDate}>{endLabel}</time>
                </dd>
            </dl>
        </li>
    )
}

function Photos() {
    const images = [image1, image2, image3, image4, image5];
    const rotations = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"];

    return (
        <div className="mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className={clsx(
                            "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800",
                            rotations[index % rotations.length]
                        )}
                        variants={fadeIn}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                    >
                        <Image
                            src={image}
                            alt=""
                            sizes="(min-width: 640px) 18rem, 11rem"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function Resume() {
    let resume = [
        {
            company: 'Carecloud',
            title: 'Software Engineer',
            logo: logoCarecloud,
            start: 'Feb-2023',
            end: 'Sept-2023',
            /*end: {
                label: 'Present',
                dateTime: new Date().getFullYear().toString(),
            },*/
        },
        {
            company: 'Immentia',
            title: 'Software Engineer',
            logo: logoImmentia,
            start: 'August-2022',
            end: 'Jan-2023',
        },
    ]


    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {/*<BriefcaseIcon className="h-6 w-6 flex-none"/>*/}
                <LuBriefcaseBusiness className="h-6 w-6 flex-none"/>

                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {resume.map((role, roleIndex) => (
                    <motion.li
                        key={role.company}
                        className="flex gap-4"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                    >
                        <Role key={roleIndex} role={role}/>
                    </motion.li>
                ))}
            </ol>

            <motion.div
                className="mt-6 flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeScale}
            >
                <Button href="/resume.pdf" download="UsamaBukhari-Resume.pdf" variant="secondary"
                        className="group mt-6 w-full owl-p-button owl-animate-out -dark-side-move">
                    Download CV
                    <ArrowDownIcon
                        className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
                </Button>
            </motion.div>
        </div>
    )
}

export default async function HomePageLayout() {
    // let articles = (await getAllArticles()).slice(0, 4)
    console.log("themeName",)
    const educations = [
        {
            title: 'Research Student',
            institution: 'Kyushu University - Ito Campus',
            dates: '2024 - Present',
            logo: kyushuLogo,
        },
        {
            title: 'Bachelor of Computer Software Engineering',
            institution: 'Foundation University Islamabad - Pakistan',
            dates: '2018 - 2022',
            grade: '3.55/4.00',
            logo: fuiLogo,
        },
        {
            title: 'Japanese Language Certificate',
            institution: 'National University Of Modern Languages',
            dates: '2018',
            grade: '77/100',
            logo: '',
        },
    ];

    return (
        <>
            <Container className="mt-9">
                <motion.div
                    className="relative flex lg:w-full items-center lg:gap-x-32"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}>
                    <svg viewBox="0 0 655 680" fill="none" className="hidden lg:block h-full">
                        <g clip-path="url(#:S1:-clip)" className="group">
                            <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                                <foreignObject width="655" height="680">
                                    <img alt="" loading="lazy"
                                         src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flaptop.22dcb094.jpg&amp;w=3840&amp;q=75"
                                    />
                                    <Image
                                        src={avatarImage}
                                        alt=""
                                        width="2400"
                                        height="3000"
                                        decoding="async"
                                        data-nimg="1"
                                        sizes="(min-width: 1024px) 41rem, 31rem"
                                        className={clsx('w-full bg-neutral-100 object-cover rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
                                        )}
                                        priority
                                    />
                                </foreignObject>
                            </g>
                            <use href="#:S1:-shape" stroke-width="2"
                                 className="stroke-neutral-950/10"></use>
                        </g>
                        <defs>
                            <clipPath id=":S1:-clip">
                                <path id=":S1:-shape"
                                      d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
                                      fill-rule="evenodd" clip-rule="evenodd"></path>
                            </clipPath>
                        </defs>
                    </svg>

                    <div className={"block"}>
                        <h1 className="hidden lg:block text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 text-shaddy-PalatinatePurple capitalize">
                            Software Engineer & <span className={"text-teal-500 hover:text-teal-600"}> Data science Enthusiast </span>
                        </h1>

                        <p className="hidden lg:block mt-28 lg:mt-6 text-base text-zinc-600 dark:text-zinc-400">
                            I&apos;m <span className="text-catalystDark-dark dark:text-zinc-100 italic capitalize">Syed Usama Bukhari</span>,
                            A Web and Desktop
                            Application Developer.
                            Result-oriented individual with a strong aptitude to solve complex problem. Capable of
                            showing
                            firm and
                            positive
                            response to work while under pressure. Firm grip in numerous programming languages incl.
                        </p>
                    </div>


                </motion.div>

                <div className="w-full">
                    <div className="mt-32 md:mt-6 flex items-center justify-center lg:justify-start  gap-5">
                        {/*FiGithub*/}
                        <SocialLink href="https://github.com/usama-shiranai90" aria-label="Follow on GitHub"
                                    icon={FaGithubAlt}/>
                        <SocialLink href="https://www.linkedin.com/in/syed-usama-bukhari-0a6373175"
                                    aria-label="Follow on LinkedIn" icon={FaLinkedinIn}/>
                        <SocialLink href="https://www.datacamp.com/portfolio/syedusamabukhari"
                                    aria-label="Follow on Datacamp" icon={SiDatacamp}/>

                        <SocialLink href="https://stackoverflow.com/users/13632819/usama-bukhari"
                                    aria-label="Follow on Datacamp" icon={SiStackoverflow}/>

                        <SocialLink href="https://www.kaggle.com/usamabukhari"
                                    aria-label="Follow on Datacamp" icon={FaKaggle}/>

                        <SocialLink href="https://socialtech.ait.kyushu-u.ac.jp/rushmore_teams/syed-usama-bukhari/"
                                    aria-label="View STL"
                                    icon={GiTechnoHeart}/>
                    </div>
                </div>

            </Container>
            {/*<Photos/>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {educations.map((edu, index) => (
                            <motion.div
                                key={edu.title}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <h3 className="text-lg font-semibold">{edu.title}</h3>
                                <p className="text-sm text-zinc-500">{edu.institution}</p>
                                <p className="text-xs text-zinc-400">{edu.dates}</p>
                            </motion.div>
                        ))}
                    </div>
                    <Resume />
                </div>

            </Container>*/}
        </>
    )
}
