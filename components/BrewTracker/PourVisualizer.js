// @flow
import React from 'react';
import theme from '../../lib/theme';

type Props = {|
  active: boolean,
  width: number,
|};

const PourVisualizer = ({ active, width }: Props) => (
  <>
    <style jsx>{`
      span {
        height: 4px;
        background-color: ${theme.colors.dusty};
      }
      .active {
        background-color: ${theme.colors.peach};
      }
    `}</style>
    <style jsx>{`
      span {
        width: ${Math.round(width)}%;
      }
    `}</style>
    <span className={`dib br3 ${active ? 'active' : ''}`} />
  </>
);

export default PourVisualizer;
