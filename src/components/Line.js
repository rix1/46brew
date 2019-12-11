// @flow
import React from 'react';
import theme from '../lib/theme';

type Props = {
  position: number,
  wrapped: boolean,
};

const Line = ({ position, wrapped }: Props) => (
  <>
    <style jsx>{`
      .vertical-line {
        left: ${position}%;
      }
    `}</style>
    <style jsx>{`
      div {
        width: ${theme.sizes.lineWidth};
      }
      .vertical-line {
        position: absolute;
        height: 100%;
        background-color: ${theme.colors.orange};
      }
    `}</style>
    {wrapped ? (
      <div className="relative z-1">
        <div className="vertical-line" />
      </div>
    ) : (
      <div className="vertical-line" />
    )}
  </>
);
Line.defaultProps = {
  wrapped: false,
};
export default Line;
