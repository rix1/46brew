// @flow

declare type Brew$UnitType = 'water' | 'coffee';

declare type Brew$PourNumber = number;
declare type Brew$WeightSteps = Array<number>;
declare type Brew$Activity = 'start' | 'pouring' | 'waiting' | 'done';

declare type Brew$ColorTypes = 'dusty' | 'blue' | 'warm' | 'peach' | 'orange';

declare type Brew$ThemeType = {
  sizes: { lineWidth: string },
  colors: {
    [Brew$ColorTypes]: string,
  },
};
