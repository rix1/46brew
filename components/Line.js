// @flow
import React from 'react';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';
import type { ThemeProps } from '../FlowTypes';

type Props = {
  position: number,
  contained?: boolean,
};

const StyledLine = styled.div`
  position: absolute;
  width: ${props => props.theme.sizes.lineWidth};
  background-color: ${props => props.theme.colors.orange};
  height: 100%;
  left: ${props => props.position}%;
`;

const Line = ({
  position,
  contained = false,
  theme,
  ...rest
}: Props & ThemeProps = {}) => {
  if (contained) {
    return (
      <div
        className={css`
          width: ${theme.sizes.lineWidth};
          position: relative;
          z-index: 1;
        `}>
        <StyledLine theme={theme} position={position} {...rest} />
      </div>
    );
  }
  return <StyledLine theme={theme} position={position} {...rest} />;
};

const Wrapped: React$ComponentType<Props> = withTheme(Line);
export default Wrapped;
