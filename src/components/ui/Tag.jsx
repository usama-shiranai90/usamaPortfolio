import clsx from 'clsx'

// The one chip. Replaces the divergent tag/badge implementations across
// project cards, tech stack, timeline, and research cards.
export function Tag({ children, active = false, className, as: Component = 'span', ...props }) {
    return (
        <Component
            className={clsx(
                'inline-flex items-center rounded-full px-3 py-1 font-mono text-xs transition-colors duration-300',
                active
                    ? 'bg-cyan-accent/15 text-cyan-accent ring-1 ring-cyan-accent/40'
                    : 'bg-theme-text/5 text-theme-muted ring-1 ring-theme-border',
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    )
}
