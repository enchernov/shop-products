import React, {
  FunctionComponent,
  forwardRef,
  AnchorHTMLAttributes,
  Ref,
  ReactNode,
} from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import clsx from 'clsx'

import { useStyles } from './Link.styles'

type NextComposedProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  NextLinkProps

export interface ILinkProps {
  children: ReactNode
  href: string
  as?: string
  className?: string
}

type LinkPropsType = ILinkProps & NextComposedProps

const Link: FunctionComponent<LinkPropsType> = forwardRef(
  (
    { href, children, as, className, ...props },
    ref: Ref<HTMLAnchorElement>
  ) => {
    const classes = useStyles()

    const classesLink = clsx(classes.link, className)

    return (
      <NextLink href={href} as={as} prefetch={false}>
        <a ref={ref} className={classesLink} {...props}>
          {children}
        </a>
      </NextLink>
    )
  }
)

export default Link
