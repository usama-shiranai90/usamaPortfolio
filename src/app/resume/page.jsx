import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {Container} from '@/components/Container'

import resumeImage1 from 'p/images/Syed Usama Bukhari Resume_Page_1.png'
import resumeImage2 from 'p/images/Syed Usama Bukhari Resume_Page_2.png'

import resumeImage11 from 'p/images/Syed Usama Bukhari EU_Page_1.png'
import resumeImage12 from 'p/images/Syed Usama Bukhari EU_Page_2.png'

import {Button} from "@/components/Button";


export const metadata = {
    title: 'About',
    description:
        'I’m Usama Bukhari, a software engineer and research student at Kyushu University - Japan.',
}

export default function Resume() {


    return (
        <Container className="mt-16 sm:mt-32">
            <div className="text-center flex flex-col items-center gap-2 my-2">
                <h1
                    className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl text-shaddy-PalatinatePurple dark:text-zinc-200 capitalize">
                    Curriculum <span className="text-teal-500">Vitae</span></h1>
            </div>

            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="flex flex-col items-center gap-y-2 justify-center">
                    {/*md:w-2/12*/}
                    <Button href="/Usama Bukhari Resume.pdf" download="UsamaBukhari-Resume.pdf" variant="secondary"
                            className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move owl-p-button owl-animate-out w-1/2">
                        Download
                    </Button>
                    {/*<PDFViewer file={resumeImage1} />*/}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <Image
                            src={resumeImage1}
                            alt=""
                            sizes="(min-width: 1024px) "
                            className="relative rounded-lg shadow-lg dark:bg-zinc-800"/>
                        <Image
                            src={resumeImage2}
                            alt=""
                            sizes="(min-width: 1024px) "
                            className="relative rounded-lg shadow-lg dark:bg-zinc-800"/>

                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-2 justify-center">
                    <Button href="/Syed Usama Bukhari EU.pdf" download="UsamaBukhari-Resume.pdf" variant="secondary"
                            className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move owl-p-button owl-animate-out w-1/2">
                        Download
                    </Button>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <Image
                            src={resumeImage11}
                            alt=""
                            sizes="(min-width: 1024px) "
                            className="relative rounded-lg shadow-lg dark:bg-zinc-800"/>
                        <Image
                            src={resumeImage12}
                            alt=""
                            sizes="(min-width: 1024px) "
                            className="relative rounded-lg shadow-lg dark:bg-zinc-800 -mt-5"/>

                    </div>
                </div>


            </div>


            {/*<button
                type="button"
                aria-label="Next image"
                className="group h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition dark:bg-zinc-800 dark:ring-white/10 dark:hover:ring-white/20">
                <ArrowRightIcon
                    className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"/>
            </button>
            <button
                type="button"
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20">
                <ArrowLeftIcon
                    className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"/>
            </button>*/}


        </Container>
    )
}
// Dummy ArrowLeftIcon and ArrowRightIcon components
const ArrowLeftIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
</svg>;

const ArrowRightIcon = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
</svg>;
