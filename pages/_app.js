import React from 'react';
import App, { Container } from 'next/app';

import { css } from 'emotion';
import Navigation from '../components/Navigation';
import Link from '../components/Link';

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
            <h1 className="f1 fw7 ttu tracked relative dib">
              Oles brygg!
              <span
                className={css`
                  line-height: 1;
                  transform: translate3d(40%, 75%, 0) rotate(-25deg);
                  position: absolute;
                  font-size: 60%;
                  right: 0;
                  text-align: center;
                  font-family: Lobster, sans-serif;
                  color: #e34b4c;
                  letter-spacing: normal;
                  text-transform: none;
                `}>
                Christmas
                <br />
                Edition
              </span>
            </h1>
            <Navigation />
          </header>
          <div>
            <Component {...pageProps} />
          </div>

          <footer className="tc f6 moon-gray mb3 mt7">
            Created by{' '}
            <Link className="underline silver" href="https://twitter.com/rix1">
              rix1
            </Link>{' '}
            a weekend in August 2018
          </footer>
        </div>
      </Container>
    );
  }
}
