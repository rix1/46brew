// @flow
import * as React from 'react';
import Head from 'next/head';

import PWATags from './PWATags';

type Props = {|
  children: React.Node,
  title: string,
  description: string,
  enableScroll: boolean,
|};

const Page = ({
  children,
  title,
  description,
  enableScroll,
}: Props): React.Element<'section'> => {
  return (
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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>
        <meta key="og:title" property="og:title" content={title} />
        <meta key="description" property="description" content={description} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />

        <meta property="og:site_name" content="46 Brew" />
        <meta
          property="og:image"
          content="https://46brew.app/static/46-brew-social-card.png"
        />
        <meta property="og:url" content="https://46brew.app" />
        <meta property="twitter:site" content="@rix1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image"
          content="https://46brew.app/static/46-brew-social-card.png"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.11.1/css/tachyons.min.css"
        />
      </Head>
      <PWATags />
      {children}
    </section>
  );
};

Page.defaultProps = {
  title: "46 Brew | Let's make some coffee",
  enableScroll: true,
  description:
    'This is a simple app that makes it easier to brew coffee using the the 4:6 brewing method.',
};

export default Page;
