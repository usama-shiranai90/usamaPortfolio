
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {Container} from '@/components/Container'
import {ArrowDownIcon} from '@/components/SocialIcons'
import resumeImage1 from 'p/images/Syed Usama Bukhari Resume_Page_1.png'
import resumeImage2 from 'p/images/Syed Usama Bukhari Resume_Page_2.png'
import {Button} from "@/components/Button";
import PDFViewer from "@/components/PDFViewer";


export const metadata = {
    title: 'About',
    description:
        'I’m Usama Bukhari, a software engineer and research student at Kyushu University - Japan.',
}

export default function Resume() {


    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="text-center flex flex-col items-center gap-5">
                    <h1
                        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl text-shaddy-PalatinatePurple dark:text-zinc-200 capitalize">
                        Curriculum <span className="text-shaddy-DarkPurple">Vitae</span></h1>

                    <Button href="" download="UsamaBukhari-Resume.pdf" variant="secondary"
                            className="group mt-6 w-1/2 owl-p-button owl-animate-out -dark-side-move owl-p-button owl-animate-out w-1/2 md:w-2/12">
                        Download
                    </Button>


                </div>

                <div className="lg:pl-20">
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
            </div>

        </Container>
    )
}
