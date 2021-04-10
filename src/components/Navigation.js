// @flow
import * as React from 'react';
import Link from './Link';

const Navigation = (): React.Element<'nav'> => (
  <nav>
    <Link href="/">Home</Link> | <Link href="/about">About</Link>
  </nav>
);

export default Navigation;
