// @flow
import React, { type Node } from 'react';
import Head from 'next/head';

type Props = {
  children: Node,
  title?: string,
};

export default ({
  children,
  title = 'This is the default title',
}: Props = {}) => (
  <section className="flex-auto">
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </section>
);
