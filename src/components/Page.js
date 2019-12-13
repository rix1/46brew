// @flow
import React from 'react';
import Head from 'next/head';

type Props = {|
  children: React$Node,
  title: string,
  description: string,
  enableScroll: boolean,
|};

const Page = ({ children, title, description, enableScroll }: Props) => (
  <section
    className={`relative overflow-y-${enableScroll ? 'scroll' : 'hidden'}`}>
    <style jsx global>{`
      .tnum {
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
      }
      body {
        font-size: 18px;
        font-family: Lato, Helvetica, sans-serif;
      }
    `}</style>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="description" property="description" content={description} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css"
      />
    </Head>
    {children}
  </section>
);

Page.defaultProps = {
  title: "46 Brew | Let's make some coffee",
  enableScroll: true,
  description:
    'This is a simple app that makes it easier to brew coffee using the the 4:6 brewing method.',
};

export default Page;
