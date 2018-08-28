// @flow
import React, { type Node } from 'react';
import NextLink from 'next/link';

type LinkProps = {
  children: Node,
  href: string,
};

const Link = ({ children, href, ...rest }: LinkProps) => (
  <NextLink href={href}>
    <a className="f5 fw4 dim link near-black pv1" {...rest}>
      {children}
    </a>
  </NextLink>
);

export default Link;
