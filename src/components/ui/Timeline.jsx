"use client";

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Tag } from '@/components/ui/Tag'
import { VIEWPORT, fadeIn, fadeUp, staggerContainer } from '@/lib/motion'
import { Building2, MapPin } from 'lucide-react'

// A record sheet, not a viewer: every field of every entry is on the page at first
// paint. Interaction may only emphasise — it may never hide — so what you print is
// what exists. Nothing here unmounts, collapses, or scrolls internally.

// YEAR must stay non-global. A single /g regex reused for both .test() and .match()
// is stateful through lastIndex and would intermittently misclassify a dated set.
const YEAR = /\b(?:19|20)\d{2}\b/
const YEAR_ALL = /\b(?:19|20)\d{2}\b/g
const ONGOING = /\b(present|continue|continuing|current|ongoing|now)\b/i

const pad = (n) => String(n).padStart(2, '0')

// Only the experience dataset carries `id`. `period` is deliberately excluded from the
// fallback key because the projects dataset repeats it ("SocialTech Lab" appears three
// times), and two experience entries share the role "Software Engineer" — so company
// and the index are both required to stay unique.
const keyOf = (item, i) => item.id ?? `${item.company}::${item.role}::${i}`

export function Timeline({ items, label, className }) {
    // Memoised so the derivation below has a stable dependency even when a call site
    // passes a non-array (the fallback would otherwise be a new [] every render).
    const rows = useMemo(() => (Array.isArray(items) ? items : []), [items])
    const [focus, setFocus] = useState(null)

    const { temporal, categories, readout } = useMemo(() => {
        // `.every`, not `.some`: one undated entry demotes the whole set, so the
        // component never invents a chronology it does not have. Project periods are
        // organisation labels ("Semester Project"), not dates.
        const isTemporal = rows.length > 0 && rows.every((r) => YEAR.test(r.period ?? ''))
        const cats = [...new Set(rows.map((r) => r.category).filter(Boolean))]
        const n = rows.length
        const noun = n === 1 ? 'ENTRY' : 'ENTRIES'

        let range = ''
        if (isTemporal) {
            const years = rows.flatMap((r) => (r.period?.match(YEAR_ALL) ?? []).map(Number))
            const anyOngoing = rows.some((r) => ONGOING.test(r.period ?? ''))
            if (years.length > 0) {
                const from = Math.min(...years)
                const to = anyOngoing ? 'PRESENT' : Math.max(...years)
                range = from === to ? String(from) : `${from} → ${to}`
            }
        } else {
            const contexts = new Set(rows.map((r) => r.period).filter(Boolean)).size
            if (contexts > 0) range = `${pad(contexts)} CONTEXTS`
        }

        return {
            temporal: isTemporal,
            categories: cats,
            readout: { lead: `${pad(n)} ${noun}`, range },
        }
    }, [rows])

    // Every hook runs above this guard. The previous implementation returned early
    // before its hooks and only worked because the item count never changed.
    if (rows.length === 0) return null

    const showFocus = categories.length >= 2
    const isMatch = (r) => !focus || r.category === focus
    const hits = rows.filter(isMatch).length
    const ariaLabel = label ? `${label}, ${rows.length} records` : `${rows.length} records`

    return (
        <div
            className={clsx(
                'w-full',
                // Print ink. Overriding these channel vars re-inks text, muted text,
                // borders, divides and the accent together, because every theme colour
                // is rgb(var(--channel) / <alpha-value>). That is why there is not a
                // single print:text-black in this file — and why the accent is forced to
                // grey rather than kept as hue: Lime and Orange are selectable accents
                // and both fall near 2:1 on white paper.
                'print:[--theme-text-rgb:24_24_27] print:[--theme-bg-rgb:255_255_255]',
                'print:[--theme-card-rgb:255_255_255] print:[--theme-card-elevated-rgb:255_255_255]',
                'print:[--theme-accent-rgb:63,63,70] print:[color-scheme:light]',
                className,
            )}
        >
            <p aria-live="polite" className="sr-only">
                {focus
                    ? `${focus}: ${hits} of ${rows.length} records highlighted`
                    : `Focus cleared, ${rows.length} records shown`}
            </p>

            {/* The entire chrome budget: one hairline rule carrying a derived readout,
                plus the focus chips when the data actually has domains to focus by. */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-theme-border pb-3 print:hidden"
            >
                <p className="font-mono text-[11px] leading-4 uppercase tracking-[0.2em] text-theme-muted">
                    [ {readout.lead}
                    {readout.range && (
                        <>
                            {' · '}
                            <span className="text-cyan-accent">{readout.range}</span>
                        </>
                    )}
                    {' ]'}
                </p>

                {showFocus && (
                    <div
                        role="group"
                        aria-label="Focus records by domain"
                        className="flex flex-wrap items-center gap-2"
                    >
                        <span className="font-mono text-[10px] leading-4 uppercase tracking-[0.2em] text-theme-muted">
                            [ FOCUS ]
                        </span>

                        <Tag
                            as="button"
                            type="button"
                            active={focus === null}
                            aria-pressed={focus === null}
                            onClick={() => setFocus(null)}
                            className="cursor-pointer"
                        >
                            ALL
                        </Tag>

                        {categories.map((cat) => (
                            <Tag
                                key={cat}
                                as="button"
                                type="button"
                                active={focus === cat}
                                aria-pressed={focus === cat}
                                onClick={() => setFocus(focus === cat ? null : cat)}
                                className="cursor-pointer"
                            >
                                {cat}
                            </Tag>
                        ))}

                        {focus && (
                            <span className="font-mono text-[10px] leading-4 tabular-nums tracking-[0.18em] text-theme-muted">
                                {pad(hits)} / {pad(rows.length)} MATCHED
                            </span>
                        )}
                    </div>
                )}
            </motion.div>

            {/* role="list" is required: Tailwind preflight sets list-style:none, which
                strips list semantics in Safari/VoiceOver and would drop the item count.
                The translucent scrim is the only surface in the component — it exists
                because the home page renders this over an animated canvas where 13px
                mono is otherwise illegible. It is not a card. */}
            <motion.ol
                role="list"
                aria-label={ariaLabel}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="divide-y divide-theme-border border-y border-theme-border bg-theme-bg/60 backdrop-blur-sm print:bg-transparent print:backdrop-blur-none"
            >
                {rows.map((item, i) => {
                    const hit = Boolean(focus) && isMatch(item)
                    const ongoing = temporal && ONGOING.test(item.period ?? '')
                    const ongoingLabel = ongoing
                        ? item.period.match(ONGOING)[0].toUpperCase()
                        : null

                    return (
                        <motion.li
                            key={keyOf(item, i)}
                            variants={fadeUp}
                            // whileInView leaves opacity:0/translateY(24px) as INLINE
                            // styles until the list enters the viewport, and @media print
                            // runs no IntersectionObserver. Without these two important
                            // overrides every unscrolled record prints blank. The `!` is
                            // not optional — a plain class cannot beat an inline style.
                            className="print:!opacity-100 print:!transform-none print:break-inside-avoid"
                        >
                            {/* The motion.li owns opacity and transform; this inner div
                                owns geometry and every state colour. Never move a colour
                                class up onto the li — framer holds opacity:1 inline once
                                fadeUp settles, so it would silently do nothing. */}
                            <div
                                className={clsx(
                                    'flex flex-wrap gap-x-6 gap-y-4 border-l-2 py-7 pl-4 pr-4 transition-colors duration-300',
                                    'lg:py-9 lg:pl-5 lg:pr-5',
                                    'print:border-l-0 print:bg-transparent print:py-3 print:pl-0 print:pr-0',
                                    hit
                                        ? 'border-l-cyan-accent bg-cyan-accent/[0.04]'
                                        : 'border-l-transparent hover:bg-theme-text/[0.02]',
                                )}
                            >
                                {/* A · rail. Fixed basis at lg is what holds the ordinals
                                    and periods in a true vertical column across records. */}
                                <div className="flex basis-full shrink-0 grow-0 flex-wrap items-baseline gap-x-3 gap-y-1 font-mono lg:basis-[7.5rem] lg:flex-col lg:items-start lg:gap-y-2">
                                    <span
                                        aria-hidden="true"
                                        className={clsx(
                                            'text-xs leading-4 tabular-nums print:text-[7.5pt]',
                                            hit ? 'text-cyan-accent' : 'text-theme-text/30',
                                        )}
                                    >
                                        {pad(i + 1)}
                                    </span>

                                    {/* Rendered verbatim. Never split, never parsed, never
                                        given a Calendar icon — for projects this reads
                                        "SocialTech Lab". The separator differs per dataset
                                        (en dash vs hyphen vs none), so no code touches it. */}
                                    <span
                                        className={clsx(
                                            'text-xs leading-5 text-theme-text print:text-[9pt]',
                                            temporal && 'tabular-nums',
                                        )}
                                    >
                                        <span className="sr-only">
                                            {temporal ? 'Period: ' : 'Context: '}
                                        </span>
                                        {item.period}
                                    </span>

                                    {ongoing && (
                                        // The dot carries the accent; the word itself uses the
                                        // text token. The accent is user-configurable and
                                        // several choices (Lime, Orange, Teal) fall near
                                        // 2.4:1 on the light themes' near-white background,
                                        // so it may decorate but never be the sole carrier.
                                        <span className="inline-flex items-baseline gap-1.5 text-[10px] leading-4 uppercase tracking-[0.2em] text-theme-text print:text-[7.5pt]">
                                            <span
                                                aria-hidden="true"
                                                className="h-1.5 w-1.5 self-center rounded-full bg-cyan-accent motion-safe:animate-pulse print:animate-none"
                                            />
                                            {ongoingLabel}
                                            <span className="sr-only"> (ongoing)</span>
                                        </span>
                                    )}

                                    {item.category && (
                                        <span className="text-[10px] leading-4 uppercase tracking-[0.18em] text-theme-text/45 print:text-[7.5pt]">
                                            <span className="sr-only">Domain: </span>
                                            {item.category}
                                        </span>
                                    )}

                                    {item.location && (
                                        <span className="inline-flex items-start gap-1 text-[11px] leading-4 text-theme-muted print:text-[7.5pt]">
                                            <MapPin
                                                aria-hidden="true"
                                                className="mt-[0.15rem] h-3 w-3 shrink-0"
                                            />
                                            <span className="sr-only">Location: </span>
                                            {item.location}
                                        </span>
                                    )}
                                </div>

                                {/* B · record */}
                                <div className="min-w-0 basis-[26rem] grow space-y-3">
                                    {/* The heading holds the title and nothing else, so the
                                        screen-reader heading rotor stays a usable index. */}
                                    <h3 className="text-balance font-heading text-lg font-semibold leading-snug tracking-tight text-theme-text lg:text-xl print:text-[12.5pt]">
                                        {item.role}
                                    </h3>

                                    {/* The company is primary content, so it takes the text
                                        token and only the icon stays accent — measured at
                                        2.43:1 against the `paper` theme when the name itself
                                        was accent-coloured. */}
                                    <p className="inline-flex items-center gap-1.5 font-mono text-xs leading-5 text-theme-text print:text-[9.5pt]">
                                        <Building2
                                            aria-hidden="true"
                                            className="h-3.5 w-3.5 shrink-0 text-cyan-accent"
                                        />
                                        {item.company}
                                    </p>

                                    {item.summary && (
                                        <p className="max-w-[62ch] text-sm font-light leading-relaxed text-theme-text/80 print:text-[10pt]">
                                            {item.summary}
                                        </p>
                                    )}

                                    {Array.isArray(item.description) && item.description.length > 0 && (
                                        <ul className="space-y-2">
                                            {item.description.map((line, b) => (
                                                <li
                                                    key={b}
                                                    className="grid grid-cols-[1.25rem_1fr] items-baseline"
                                                >
                                                    {/* A numeric index, deliberately not a
                                                        check icon: a checkmark asserts
                                                        "achievement", which is wrong for
                                                        entries like "Developing advanced
                                                        courses…". aria-hidden, so nothing
                                                        is announced as ranked. */}
                                                    <span
                                                        aria-hidden="true"
                                                        className="font-mono text-[10px] leading-5 tabular-nums text-cyan-accent/60 print:text-[7.5pt]"
                                                    >
                                                        {pad(b + 1)}
                                                    </span>
                                                    <span className="max-w-[62ch] break-words text-sm leading-relaxed text-theme-text/80 print:text-[9.5pt]">
                                                        {line}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* C · keywords. "Keywords" rather than "Technologies":
                                    education tags are research terms, not tech. */}
                                {Array.isArray(item.tags) && item.tags.length > 0 && (
                                    <ul
                                        aria-label="Keywords"
                                        className="flex basis-[15rem] grow flex-wrap gap-1.5 lg:content-start"
                                    >
                                        {item.tags.map((tag, t) => (
                                            <li key={`${tag}::${t}`}>
                                                {/* Only cursor/print-variant classes are
                                                    safe on Tag: it composes with clsx, not
                                                    tailwind-merge, so any px/py/text-size
                                                    override silently loses to its base. */}
                                                <Tag className="print:text-theme-text">{tag}</Tag>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.li>
                    )
                })}
            </motion.ol>
        </div>
    )
}
