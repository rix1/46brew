// @flow
import React from 'react';
import styled, { css } from 'react-emotion';
import { withTheme } from 'emotion-theming';

type Props = {
  position: number,
  contained: boolean,
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
  contained,
  theme,
  ...rest
}: Props & Brew$ThemeProps) => {
  if (contained) {
    return (
      <div
        className={css`
          width: ${theme.sizes.lineWidth};
          position: relative;
          z-index: 1;
        `}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <StyledLine theme={theme} position={position} {...rest} />
      </div>
    );
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledLine theme={theme} position={position} {...rest} />;
};

const Wrapped: React$ComponentType<Props> = withTheme(Line);

Wrapped.defaultProps = {
  contained: false,
};

export default Wrapped;
