import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-cyan-accent font-semibold text-[var(--theme-bg)] hover:bg-cyan-accent/90 active:bg-cyan-accent shadow-md transition-all duration-200',
  secondary:
    'bg-theme-card border border-theme-text/10 font-medium text-theme-text hover:bg-theme-text/5 hover:border-cyan-accent/50 active:bg-theme-text/10 transition-all duration-200',
}

export function Button({ variant = 'primary', className, ...props }) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
