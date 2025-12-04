"use client";

import { motion } from "framer-motion"; // For animations
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import {
    GitHubIcon,
    DataCampCommunityIcon,
    DataCampIcon,
    KaggleIcon,
    StackOverflowIcon,
    LinkedInIcon,
    ArrowDownIcon, // Retaining ArrowDownIcon as per your original code
} from "@/components/ui/SocialIcons";
import logoImmentia from "/public/images/logos/immentia.png";
import logoCarecloud from "/public/images/logos/CareCloud_Logo.jpg";
import image1 from "/public/images/photos/image-1.jpg";
import image2 from "/public/images/photos/image-2.jpg";
import image3 from "/public/images/photos/image-3.jpg";
import image4 from "/public/images/photos/image-4.jpg";
import image5 from "/public/images/photos/image-5.jpg";
import fuiLogo from "/public/images/logos/fui.svg";
import kyushuLogo from "/public/images/logos/kyushu_University.svg";
import avatarImage from "p/images/avatars/avatar.jpg";

// Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.2 },
    }),
};

const fadeScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// MailIcon Component
function MailIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
    );
}

// SocialLink Component with Animations
function SocialLink({ icon: Icon, ...props }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
        >
            <Link className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
                <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
            </Link>
        </motion.div>
    );
}

// Photos Component with Motion
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
                        viewport={{ once: true }}
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

// Resume Component with ArrowDownIcon
function Resume() {
    const resume = [
        {
            company: "Carecloud",
            title: "Software Engineer",
            logo: logoCarecloud,
            start: "Feb-2023",
            end: "Sept-2023",
        },
        {
            company: "Immentia",
            title: "Software Engineer",
            logo: logoImmentia,
            start: "August-2022",
            end: "Jan-2023",
        },
    ];

    return (
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
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
                        viewport={{ once: true }}
                    >
                        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                            <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
                        </div>
                        <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {role.company}
                            </dd>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
                            <dd
                                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                                aria-label={`${role.start} until ${role.end}`}
                            >
                                {role.start} - {role.end}
                            </dd>
                        </dl>
                    </motion.li>
                ))}
            </ol>
            <motion.div
                className="mt-6 flex items-center justify-center"
                initial="hidden"
                animate="visible"
                variants={fadeScale}
            >
                <Button href="/resume.pdf" download="UsamaBukhari-Resume.pdf" variant="secondary">
                    Download CV
                    <ArrowDownIcon className="ml-2 h-5 w-5 text-teal-500 animate-bounce" />
                </Button>
            </motion.div>
        </div>
    );
}

// Main Home Component
export default function Home() {
    const educations = [
        {
            title: "Research Student",
            institution: "Kyushu University - Ito Campus",
            dates: "2024 - Present",
            logo: kyushuLogo,
        },
        {
            title: "Bachelor of Computer Software Engineering",
            institution: "Foundation University Islamabad - Pakistan",
            dates: "2018 - 2022",
            logo: fuiLogo,
        },
    ];

    return (
        <>
            <Container className="mt-9">
                <motion.div
                    className="relative flex lg:w-full items-center lg:gap-x-32"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        Software Engineer &{" "}
                        <span className="text-teal-500 hover:text-teal-600">Data Science Enthusiast</span>
                    </h1>
                </motion.div>
                <div className="mt-6 flex gap-5">
                    <SocialLink href="https://github.com/usama-shiranai90" icon={GitHubIcon} />
                    <SocialLink href="https://linkedin.com" icon={LinkedInIcon} />
                    <SocialLink href="https://datacamp.com" icon={DataCampIcon} />
                    <SocialLink href="https://stackoverflow.com" icon={StackOverflowIcon} />
                    <SocialLink href="https://kaggle.com" icon={KaggleIcon} />
                </div>
            </Container>
            <Photos />
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

            </Container>
        </>
    );
}
