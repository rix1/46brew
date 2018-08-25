// @flow
import React from 'react';
import styled, { hydrate, css } from 'react-emotion';
import Page from '../components/Page';
import Content from '../components/Content';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
// if (typeof window !== 'undefined') {
//   hydrate(window.__NEXT_DATA__.ids); // eslint-disable-line
// }

export default () => (
  <Page>
    <Content>
      <div
        className={css`
          background: hotpink;
          &:hover {
            background: #ffff00;
          }
        `}>
        Hello World
      </div>
    </Content>
  </Page>
);
