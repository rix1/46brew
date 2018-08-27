// @flow

export type UnitType = 'water' | 'coffee';

type ColorTypes = 'dusty' | 'blue' | 'warm' | 'peach' | 'orange';

export type ThemeType = {
  sizes: { lineWidth: string },
  colors: {
    [ColorTypes]: string,
  },
};

export type ThemeProps = {
  theme: ThemeType,
};
