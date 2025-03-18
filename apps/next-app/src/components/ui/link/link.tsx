"use client"

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/lib/utils';

export type LinkProps = {
  className?: string;
  children: React.ReactNode;
  target?: string;
} & NextLinkProps;

export const Link = ({ className, children, href, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={cn('', className)}
      {...props}
    >
      {children}
    </NextLink>
  );
};