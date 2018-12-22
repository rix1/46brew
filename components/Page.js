// @flow
import React, { type Node } from 'react';
import Head from 'next/head';

import { css, keyframes } from 'react-emotion';

type Props = {
  children: Node,
  title?: string,
  description?: string,
};

const leanIn = keyframes`
  from, to {
    transform: translateX(100%) rotate(0deg);
  }
  20%, 80% {
    transform: translateX(90%) rotate(-45deg);
  }
`;

const Page = ({
  children,
  title = "46 Brew | Let's make some coffee",
  description = 'This is a simple app that makes it easier to brew coffee using the the 4:6 brewing method.',
}: Props = {}) => (
  <section className="flex-auto relative overflow-hidden">
    <Head>
      <title>{title}</title>
      <meta key="og:title" property="og:title" content={title} />
      <meta key="description" property="description" content={description} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
    </Head>
    {children}
    <img
      className={css`
        position: absolute;
        z-index: -1;
        right: 0;
        top: 8rem;
        transform: translateX(100%) rotate(0deg);
        transform-origin: bottom left;
        animation: ${leanIn} 4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        animation-delay: 2s;
      `}
      alt="Ole kan laga kaffi"
      src="/static/ole.png"
    />
  </section>
);

export default Page;
