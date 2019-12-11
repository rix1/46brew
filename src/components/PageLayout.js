// @flow
import React from 'react';
import Navigation from './Navigation';

type Props = {|
  children: React$Node,
|};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-column vh-100">
      <header className="tc">
        <h1 className="f1 fw7 ttu tracked relative dib">4:6brew</h1>
        <Navigation />
      </header>

      <div className="ph3">
        <div className="mw8 center">{children}</div>
      </div>

      <footer className="tc f6 moon-gray mb3 mt7">
        Created by{' '}
        <a className="underline silver" href="https://twitter.com/rix1">
          rix1
        </a>{' '}
        a weekend in August 2018
      </footer>
    </div>
  );
};

export default PageLayout;
