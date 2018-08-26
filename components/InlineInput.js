// @flow
import React from 'react';
import styled from 'react-emotion';
import { withTheme } from 'emotion-theming';

type Props = {};

const StyledInput = styled.input`
  border: none;
  border-bottom: 2px dotted gray;
  outline: none;
  width: 3em;
  text-align: right;
  &:focus {
    border-bottom: 2px solid ${props => props.theme.blue};
  }
`;

const InlineInput = (props: Props) => <StyledInput {...props} />;

const Wrapped: React$ComponentType<Props> = withTheme(InlineInput);
export default Wrapped;
