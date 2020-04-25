import React from 'react';
import Link from '../components/Link';
import Page from '../components/Page';

function ErrorPage() {
  return (
    <Page>
      <div className="flex justify-center tc">
        <div className="">
          <h1>404 - Nothing to see here</h1>
          <Link href="/">Go back home</Link>
        </div>
      </div>
    </Page>
  );
}
export default ErrorPage;
