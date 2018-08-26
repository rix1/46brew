// @flow
import React from 'react';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';

const LINE_WIDTH = '3px';

type Props = {
  position: number,
  contained?: boolean,
};

const StyledLine = styled.div`
  position: absolute;
  width: ${LINE_WIDTH};
  background-color: ${props => props.theme.orange};
  height: 100%;
  left: ${props => props.position}%;
`;

const Line = ({ position, contained = false, ...rest }: Props = {}) => {
  if (contained) {
    return (
      <div
        className={css`
          width: ${LINE_WIDTH};
          position: relative;
          z-index: 1;
        `}>
        <StyledLine position={position} {...rest} />
      </div>
    );
  }
  return <StyledLine position={position} {...rest} />;
};

const Wrapped: React$ComponentType<Props> = withTheme(Line);
export default Wrapped;
