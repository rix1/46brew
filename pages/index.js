// @flow
import React from 'react';
import styled, { css } from 'react-emotion';
import Page from '../components/Page';
import Content from '../components/Content';
import ProfileSlider from '../components/ProfileSlider';

const palette = {
  dust: 'rgba(217, 229, 214, 1);',
  blue: 'rgba(0, 167, 225, 1);',
  warm: 'rgba(237, 222, 164, 1);',
  peach: 'rgba(247, 160, 114, 1);',
  orange: 'rgba(255, 155, 66, 1);',
};

const InlineInput = styled.input`
  border: none;
  border-bottom: 2px dotted gray;
  outline: none;
  width: 3em;
  text-align: right;
  &:focus {
    border-bottom: 3px solid ${palette.blue};
  }
`;

// type InlineInputProps = {
//   // children: Node,
// };

// const InlineInput = ({ }: InlineInputProps) => (
//   <input type="number" className="" />
// );

export default () => (
  <Page
    className={css`
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `}>
    <Content>
      <h1>Let's make some coffee</h1>
      <p>
        First, lets specify the amount of coffee:{' '}
        <InlineInput type="text" className="ph1" /> grams
      </p>
      <p>Now lets adjust the taste profile:</p>
      <ProfileSlider />
    </Content>
  </Page>
);
