import React from 'react';
import App, { Container } from 'next/app';

import Navigation from '../components/Navigation';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <div className="flex flex-column vh-100">
          <header className="tc">
            <h1 className="f1 fw7 ttu tracked">4:6brew</h1>
            <Navigation />
          </header>

          <Component {...pageProps} />

          <footer className="tc f6 moon-gray mb3">
            Created by rix1 a 25 August 2018
          </footer>
        </div>
      </Container>
    );
  }
}
