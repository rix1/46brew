// @flow
import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      body {
        font-size: 18px;
        font-family: Lato, Helvetica, sans-serif;
      }

      .tnum {
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
      }
      .bg-dusty {
        background-color: rgba(217, 229, 214, 1);
      }
      .bg-blue {
        background-color: rgba(0, 167, 225, 1);
      }
      .bg-warm {
        background-color: rgba(237, 222, 164, 1);
      }
      .bg-peach {
        background-color: rgba(247, 160, 114, 1);
      }
      .bg-orange {
        background-color: rgba(255, 155, 66, 1);
      }
    `}</style>
  );
};

export default GlobalStyles;
