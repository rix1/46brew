import React from 'react';
import Head from 'next/head';

const PWATags = () => {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#F39F55" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="apple-touch-startup-image" href="/static/logo_512x512.png" />
      {/* <!-- icon in the highest resolution we need it for --> */}
      <link rel="icon" sizes="512x512" href="/static/logo_512x512.png" />

      {/* <!-- reuse same icon for Safari --> */}
      <link rel="apple-touch-icon" href="/static/logo_512x512.png" />

      {/* <!-- multiple icons for IE --> */}
      <meta
        name="msapplication-square310x310logo"
        content="/static/logo_512x512.png"
      />
    </Head>
  );
};

export default PWATags;
