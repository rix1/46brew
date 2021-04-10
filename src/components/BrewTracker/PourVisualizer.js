// @flow

import * as React from 'react';
import theme from '../../lib/theme';

type Props = {|
  active: boolean,
  width: number,
  weight: Brew$Weight,
|};

const PourVisualizer = ({ active, width, weight }: Props): React.Node => {
  return (
    <>
      <style jsx>{`
        .line-wrapper {
          height: 4px;
          background-color: ${theme.colors.dusty};
        }
        .active {
          background-color: ${theme.colors.peach};
        }
      `}</style>
      <style jsx>{`
        .line-wrapper {
          width: ${Math.round(width)}%;
        }
      `}</style>
      <span className={`line-wrapper dib br3 ${active ? 'active' : ''}`}>
        <span className="f6 moon-gray db tc mt3">{weight}g</span>
      </span>
    </>
  );
};

export default PourVisualizer;
