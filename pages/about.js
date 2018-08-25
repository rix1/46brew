// @flow
import React from 'react';
import Page from '../components/Page';
import Content from '../components/Content';

export default () => (
  <Page title="About us">
    <Content>
      <h1>About 4:6</h1>
      <p>
        The 4:6 brewing method was created by Tetsu Kasuya (World Brewers Cup
        2016 Champion)
      </p>

      <h2 className="mt4">Concept</h2>
      <p>Anyone can make delicious coffee</p>
    </Content>
  </Page>
);
