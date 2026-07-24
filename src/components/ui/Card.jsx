import Link from 'next/link'
import clsx from 'clsx'
import Image from "next/image";
import { ChevronRight } from 'lucide-react'

export function Card({as, className, children, logo}) {
    let Component = as ?? 'div'

    if (!logo) {
        return (
            <Component className={clsx(className, 'group relative flex flex-col items-start')}>
                {children}
            </Component>
        )
    }

    return (
        <Component className={clsx(className, 'flex')}>
            <div className={"group relative flex flex-col items-start w-4/5"}>
                {children}
            </div>
            <div className={"relative flex flex-col items-start w-1/5"}>
                <Image
                    src={logo}
                    alt=""
                    className="w-full h-auto object-cover"
                />
            </div>
        </Component>
    )
}

Card.Link = function CardLink({children, ...props}) {
    return (
        <>
            <div
                className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-theme-text/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6"/>
            <Link {...props}>
                <span className="absolute -inset-x-4 -inset-y-6 z-20 rounded-2xl sm:-inset-x-6"/>
                <span className="relative z-10">{children}</span>
            </Link>
        </>
    )
}

Card.Title = function CardTitle({as, href, children}) {
    let Component = as ?? 'h2'

    return (
        <Component className="text-base font-semibold tracking-tight text-theme-text">
            {href ? <Card.Link href={href}>{children}</Card.Link> : children}
        </Component>
    )
}

Card.Description = function CardDescription({children}) {
    return (
        <div className="relative z-10 mt-2 text-sm text-theme-muted">
            {children}
        </div>
    )
}

Card.Cta = function CardCta({children}) {
    return (
        <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-cyan-accent"
        >
            {children}
            <ChevronRight className="ml-1 h-4 w-4" strokeWidth={1.5} aria-hidden="true"/>
        </div>
    )
}

Card.Eyebrow = function CardEyebrow({
                                        as,
                                        decorate = false,
                                        className,
                                        children,
                                        ...props
                                    }) {
    let Component = as ?? 'p'

    return (
        <Component
            className={clsx(
                className,
                'relative z-10 order-first mb-3 flex items-center text-sm text-theme-muted',
                decorate && 'pl-3.5',
            )}
            {...props}
        >
            {decorate && (
                <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                >
          <span className="h-4 w-0.5 rounded-full bg-theme-border"/>
        </span>
            )}
            {children}
        </Component>
    )
}
