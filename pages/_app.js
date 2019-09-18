import React from 'react';
import App, { Container } from 'next/app';

import Navigation from '../components/Navigation';
import Link from '../components/Link';

export default class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <div className="flex flex-column vh-100">
          <header className="tc">
            <h1 className="f1 fw7 ttu tracked relative dib">4:6brew</h1>
            <Navigation />
          </header>
          <div>
            <Component />
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
