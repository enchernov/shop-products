import React, { forwardRef } from 'react'
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'

const defaultProps: Partial<NextLinkProps> = {
  prefetch: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  NextLinkProps

const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const { as, href, prefetch, ...other } = props

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    )
  }
)

interface ILinkPropsBase {
  activeClassName?: string
  innerRef?: React.Ref<HTMLAnchorElement>
  naked?: boolean
}

export type LinkPropsType = ILinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, 'href'> &
  DefaultProps

const Link = (props: LinkPropsType) => {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    )
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href as string}
      {...other}
    />
  )
}

Link.defaultProps = defaultProps

export default forwardRef<HTMLAnchorElement, LinkPropsType>((props, ref) => (
  <Link {...props} innerRef={ref} />
))
