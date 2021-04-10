// @flow
import * as React from 'react';
import Navigation from './Navigation';

type Props = {|
  children: React.Node,
|};

const GithubCommitLink = () => {
  if (!process.env.VERCEL_GITHUB_COMMIT_SHA) {
    return null;
  }
  const latestCommit = process.env.VERCEL_GITHUB_COMMIT_SHA;

  return (
    <span>
      -
      <a
        className="underline silver"
        href={`https://github.com/rix1/46brew/commits/${latestCommit}`}>
        {latestCommit.slice(0, 4)}
      </a>
    </span>
  );
};

const PageLayout = ({ children }: Props): React.Element<'div'> => {
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
        <span className="db mt2">
          v{process.env.VERSION}
          <GithubCommitLink />
        </span>
      </footer>
    </div>
  );
};

export default PageLayout;
