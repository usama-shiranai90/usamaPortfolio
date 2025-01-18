'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Partials/Container'
import avatarImage from 'p/images/avatar.jpg'

import ThemeToggle from "@/components/Utilities/ThemeToggle";

/* -------------------------------------------------------------------------- */
/*                                  ICONS                                     */
/* -------------------------------------------------------------------------- */
function CloseIcon(props) {
  return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
            d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  )
}

function ChevronDownIcon(props) {
  return (
      <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
        <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
  )
}


/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                    */
/* -------------------------------------------------------------------------- */
function clamp(number, a, b) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

/* -------------------------------------------------------------------------- */
/*                          REUSABLE SUB-COMPONENTS                           */
/* -------------------------------------------------------------------------- */

function MobileNavItem({ href, children }) {
  return (
      <li>
        <PopoverButton
            as={Link}
            href={href}
            className="block py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
        >
          {children}
        </PopoverButton>
      </li>
  )
}

function MobileNavigation({ className }) {
  return (
      <Popover className={className}>
        <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
          Menu
          <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
        </PopoverButton>

        <PopoverBackdrop
            transition
            className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in dark:bg-black/80"
        />
        <PopoverPanel
            focus
            transition
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div className="flex flex-row-reverse items-center justify-between">
            <PopoverButton
                aria-label="Close menu"
                className="-m-1 p-1 hover:text-teal-500 dark:hover:text-teal-400"
            >
              <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </PopoverButton>
            <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Navigation
            </h2>
          </div>
          <nav className="mt-6">
            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
              <MobileNavItem href="/about">About</MobileNavItem>
              <MobileNavItem href="/projects">Projects</MobileNavItem>
              <MobileNavItem href="/resume">Resume</MobileNavItem>
              {/*<MobileNavItem href="/uses">Uses</MobileNavItem>*/}
            </ul>
          </nav>
        </PopoverPanel>
      </Popover>
  )
}

function NavItem({ href, children }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
      <li>
        <Link
            href={href}
            className={clsx(
                'relative block px-3 py-2 transition',
                isActive
                    ? 'text-teal-500 dark:text-teal-400'
                    : 'hover:text-teal-500 dark:hover:text-teal-400'
            )}
        >
          {children}
          {isActive && (
              <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
          )}
        </Link>
      </li>
  )
}

function DesktopNavigation({ className }) {
  return (
      <nav className={className}>
        <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          <NavItem href="/about">About</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/resume">Resume</NavItem>
          {/*<NavItem href="/uses">Uses</NavItem>*/}
        </ul>
      </nav>
  )
}


function AvatarContainer({ className, ...props }) {
  return (
      <div
          className={clsx(
              className,
              'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
          )}
          {...props}
      />
  )
}

function Avatar({ large = false, className, ...props }) {
  return (
      <Link
          href="/"
          aria-label="Home"
          className={clsx(className, 'pointer-events-auto')}
          {...props}
      >
        <Image
            src={avatarImage}
            alt=""
            sizes={large ? '4rem' : '2.25rem'}
            className={clsx(
                'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
                large ? 'h-16 w-32' : 'h-9 w-9'
            )}
            priority
        />
      </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 MAIN HEADER                                */
/* -------------------------------------------------------------------------- */
export function HeaderLayout() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const isHomePage = usePathname() === '/'

  const headerRef = useRef(null)
  const avatarRef = useRef(null)
  const isInitial = useRef(true)

  useEffect(() => {
    if (!isHomePage) return

    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property, value) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) return

      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
          window.scrollY,
          0,
          document.body.scrollHeight - window.innerHeight
      )

      // For initial load
      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        // Scrolled past the avatar
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        // Stuck at the top
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      // Only applies on home page
      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY
      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
          '--avatar-image-transform',
          `translate3d(${x}rem, 0, 0) scale(${scale})`
      )

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
      <>
        {/* Banner at bottom (dismissible) */}
        {bannerVisible && (
            <div className="fixed inset-x-0 bottom-0 z-[9999] sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
              <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                <p className="text-sm leading-6 text-white">
                  <strong className="font-semibold">Owl's</strong>
                  <svg
                      viewBox="0 0 2 2"
                      aria-hidden="true"
                      className="mx-2 inline h-0.5 w-0.5 fill-current"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  website is under development <span aria-hidden="true">→</span>
                </p>
                <button
                    type="button"
                    onClick={() => setBannerVisible(false)}
                    className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                      className="h-5 w-5 text-white dark:text-zinc-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586
                     l4.293-4.293a1 1 0 111.414 1.414L11.414
                     10l4.293 4.293a1 1 0 01-1.414 1.414L10
                     11.414l-4.293 4.293a1 1 0
                     01-1.414-1.414L8.586 10 4.293 5.707a1
                     1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
        )}

        {/* Main Header */}
        <header
            className="pointer-events-none relative z-50 flex flex-none flex-col"
            style={{
              height: 'var(--header-height)',
              marginBottom: 'var(--header-mb)',
            }}
        >
          {isHomePage && (
              <>
                <div
                    ref={avatarRef}
                    className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
                />
                <Container
                    className="top-0 order-last -mb-3 pt-3"
                    style={{
                      position: 'var(--header-position)',
                    }}
                >
                  <div
                      className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                      style={{
                        position: 'var(--header-inner-position)',
                      }}
                  >
                      <div className={""}>
                          <div className="">
                              <AvatarContainer
                                  className="left-0 top-3 origin-left transition-opacity"
                                  style={{
                                      opacity: 'var(--avatar-border-opacity, 0)',
                                      transform: 'var(--avatar-border-transform)',
                                  }}
                              />
                              <div className={"lg:hidden"}>
                                  <Avatar
                                  large
                                  className="block h-16 w-16 origin-left"
                                  style={{transform: 'var(--avatar-image-transform)'}}/>

                                  <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 text-shaddy-PalatinatePurple capitalize">
                                      Software Engineer & <span className={"text-teal-500 hover:text-teal-600"}> Data science Enthusiast </span>
                                  </h1>

                              </div>


                          </div>
                      </div>

                  </div>
                </Container>
              </>
          )}

            <div
                ref={headerRef}
                className="top-0 z-10 h-16 pt-6"
                style={{
                    position: 'var(--header-position)',
                }}
            >
                <Container
                    className="top-[var(--header-top,theme(spacing.6))] w-full"
                    style={{
                        position: 'var(--header-inner-position)',
                    }}
                >
                    <div className="relative flex gap-4">
                        {/* Left Section (Avatar if not home) */}
                        <div className="flex flex-1">
                            {!isHomePage && (
                                <AvatarContainer>
                                    <Avatar/>
                                </AvatarContainer>
                            )}
                        </div>

                        {/* Center Section (Navigation) */}
                        <div className="flex flex-1 justify-end md:justify-center">
                            <MobileNavigation className="pointer-events-auto md:hidden"/>
                            <DesktopNavigation className="pointer-events-auto hidden md:block"/>
                        </div>

                        {/* Right Section (Theme Toggle) */}
                        <div className="flex justify-end md:flex-1">
                            <div className="pointer-events-auto">
                                <ThemeToggle/>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </header>

          {/* Spacer for content offset on homepage */}
          {isHomePage && (
              <div className="flex-none" style={{height: 'var(--content-offset)'}}/>
          )}
      </>
  )
}
