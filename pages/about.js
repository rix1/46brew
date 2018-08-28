// @flow
import React from 'react';
import Page from '../components/Page';

export default () => (
  <Page title="About us">
    <div className="measure f4 f3-ns center mv5 black-80">
      <h1>About 4:6</h1>
      <p className="lh-copy">
        This is a simple app I built to make it easier to brew coffee using the
        the 4:6 brewing method. This method was created by Tetsu Kasuya (World
        Brewers Cup 2016 Champion)
      </p>

      <h2>Concept</h2>
      <p className="lh-copy">
        I&apos;ll just let Tetsu explain what this is all about (I reccomend
        enabling subtitles)
      </p>
      <div className="aspect-ratio aspect-ratio--16x9">
        <iframe
          title="A Coffee Brewing Theory '4:6 method' Invented by Tetsu Kasuya_ World Brewers Cup 2016 Champion"
          className="aspect-ratio--object"
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/wmCW8xSWGZY?rel=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  </Page>
);
