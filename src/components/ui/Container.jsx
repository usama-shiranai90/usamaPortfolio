import { forwardRef } from 'react'
import clsx from 'clsx'

export const ContainerOuter = forwardRef(function OuterContainer(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </div>
  )
})

export const ContainerInner = forwardRef(function InnerContainer(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('relative mx-auto max-w-2xl lg:max-w-5xl', className)}
      {...props}>
      {children}
    </div>
  )
})

export const Container = forwardRef(function Container(
  { children, ...props },
  ref,
) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
})

Container.Outer = ContainerOuter
Container.Inner = ContainerInner
