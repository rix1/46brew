// @flow
import React, { type Node } from 'react';
import Head from 'next/head';

type Props = {
  children: Node,
  title?: string,
  description?: string,
};

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
  </section>
);

export default Page;
