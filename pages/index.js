// @flow
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import Page from '../components/Page';
import Content from '../components/Content';
import ProfileSlider from '../components/ProfileSlider';
import InlineInput from '../components/InlineInput';
import Emoji from '../components/Emoji';

const palette = {
  dusty: 'rgba(217, 229, 214, 1);',
  blue: 'rgba(0, 167, 225, 1);',
  warm: 'rgba(237, 222, 164, 1);',
  peach: 'rgba(247, 160, 114, 1);',
  orange: 'rgba(255, 155, 66, 1);',
};

// dusty: hsla(108%, 22%, 87%, 1);
// blue: hsla(195%, 100%, 44%, 1);
// warm: hsla(48%, 67%, 79%, 1);
// peach: hsla(21%, 89%, 71%, 1);
// orange: hsla(28%, 100%, 63%, 1);

export default () => (
  <ThemeProvider theme={{ ...palette }}>
    <Page>
      <Content>
        <h1>
          <Emoji description="Ready?" emoji="👉" /> Let&apos;s make some coffee
        </h1>
        <p>
          First, lets specify the amount of coffee:{' '}
          <InlineInput type="text" className="ph1" /> grams
        </p>
        <p>Now lets adjust the taste profile:</p>
        <div className="mv4">
          <ProfileSlider />
        </div>
      </Content>
    </Page>
  </ThemeProvider>
);
