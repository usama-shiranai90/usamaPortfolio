import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Container} from '../components/Container';
import {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    XIcon,
} from '../components/SocialIcons';
import logoAirbnb from '../images/logos/airbnb.svg';
import logoFacebook from '../images/logos/facebook.svg';
import logoPlanetaria from '../images/logos/planetaria.svg';
import logoStarbucks from '../images/logos/starbucks.svg';
import image1 from '../images/photos/image-1.jpg';
import image2 from '../images/photos/image-2.jpg';
import image3 from '../images/photos/image-3.jpg';
import image4 from '../images/photos/image-4.jpg';
import image5 from '../images/photos/image-5.jpg';
import {formatDate} from '../lib/formatDate';

// Dummy data to replace server-side fetching.
const articlesData = [
    {
        slug: 'article-1',
        title: 'Understanding React.js',
        date: '2023-01-01',
        description: 'A beginner’s guide to building modern web applications.',
    },
    {
        slug: 'article-2',
        title: 'CSS in 2023',
        date: '2023-02-15',
        description: 'New trends and practices in the evolving world of CSS.',
    },
    {
        slug: 'article-3',
        title: 'JavaScript Mastery',
        date: '2023-03-10',
        description: 'Deep dive into advanced JavaScript topics and patterns.',
    },
    {
        slug: 'article-4',
        title: 'Web Accessibility',
        date: '2023-04-05',
        description: 'Creating inclusive web experiences for everyone.',
    },
];

function MailIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true" {...props}>
            <path d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                  className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"/>
            <path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" className="stroke-zinc-400 dark:stroke-zinc-500"/>
        </svg>
    );
}

function Article({article}) {
    return (
        <Card as="article">
            <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
            <Card.Eyebrow as="time" dateTime={article.date} decorate>
                {formatDate(article.date)}
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
        </Card>
    );
}

function SocialLink({icon: Icon, ...props}) {
    return (
        <Link className="group -m-1 p-1" {...props}>
            <Icon
                className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"/>
        </Link>
    );
}

function Newsletter() {
    return (
        <form action="/thank-you" className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <MailIcon className="h-6 w-6 flex-none"/>
                <span className="ml-3">Stay up to date</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Get notified when I publish something new, and
                unsubscribe at any time.</p>
            <div className="mt-6 flex">
                <input type="email" placeholder="Email address" aria-label="Email address" required
                       className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"/>
                <Button type="submit" className="ml-4 flex-none">Join</Button>
            </div>
        </form>
    );
}

function Photos() {
    let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
    const images = [image1, image2, image3, image4, image5];
    return (
        <div className=" lg:block mt-16 sm:mt-20">
            <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
                {images.map((image, imageIndex) => (
                    <div
                        key={image.src}
                        className={clsx(
                            'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                            rotations[imageIndex % rotations.length],
                            // { 'hidden': imageIndex > 1 }
                        )}>
                        <img alt="" loading="lazy" width="3744" height="5616" decoding="async" data-nimg="1"
                             className="absolute inset-0 h-full w-full object-cover"
                             sizes="(min-width: 640px) 18rem, 11rem"
                             src={image}/>

                        {/*<img*/}
                        {/*    src={image}*/}
                        {/*    alt=""*/}
                        {/*    sizes="(min-width: 640px) 18rem, 11rem"*/}
                        {/*    className="absolute inset-0 h-full w-full object-cover"*/}
                        {/*/>*/}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setArticles(articlesData);
    }, []);

    return (
        <>
            <Container className="mt-9">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        Software designer, founder, and amateur astronaut.
                    </h1>
                    <h1 className="font-semibold text-center md:text-left text-4xl md:text-5xl lg:text-6xl text-shaddy-PalatinatePurple capitalize">
                        Web developer &amp; <span className="text-shaddy-DarkPurple">Data science</span> <span
                        className="text-shaddy-lx_MidnightGreenEagleGreen">Enthusiast.</span></h1>

                    <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                        I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and
                        CEO of Planetaria.
                    </p>
                    <div className="mt-6 flex gap-6">
                        <SocialLink href="#" aria-label="Follow on X" icon={XIcon}/>
                        <SocialLink href="#" aria-label="Follow on Instagram" icon={InstagramIcon}/>
                        <SocialLink href="#" aria-label="Follow on GitHub" icon={GitHubIcon}/>
                        <SocialLink href="#" aria-label="Follow on LinkedIn" icon={LinkedInIcon}/>
                    </div>
                </div>
            </Container>
            <Photos/>
            <Container className="mt-24 md:mt-28">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                    <div className="flex flex-col gap-16">
                        {articles.map((article) => (
                            <Article key={article.slug} article={article}/>
                        ))}
                    </div>
                    <div className="space-y-10 lg:pl-16 xl:pl-24">
                        <Newsletter/>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Home;
