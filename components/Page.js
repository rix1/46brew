// @flow
import React from 'react';
import Head from 'next/head';

type Props = {
  children: React$Node,
  title: string,
  description: string,
};

const Page = ({ children, title, description }: Props) => (
  <section className="flex-auto relative overflow-hidden">
    <style jsx global>{`
      .tnum {
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
      }
    `}</style>
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

Page.defaultProps = {
  title: "46 Brew | Let's make some coffee",
  description:
    'This is a simple app that makes it easier to brew coffee using the the 4:6 brewing method.',
};

export default Page;
