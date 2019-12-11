// @flow
import React from 'react';

type Props = {
  emoji: string,
  description: string,
};

const Emoji = ({ emoji, description }: Props) => (
  <span role="img" aria-label={description} className="lh-solid">
    {emoji}
  </span>
);

export default Emoji;
