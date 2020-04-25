// @flow

declare type Brew$Activity = 'start' | 'pouring' | 'waiting' | 'done';
declare type Brew$PourNumber = number;
declare type Brew$Strength = number;
declare type Brew$Taste = number;
declare type Brew$Time = number;
declare type Brew$UnitType = 'water' | 'coffee';
declare type Brew$Weight = number;
declare type Brew$WeightSteps = Array<Brew$Weight>;

declare type Brew$State = {|
  activity: Brew$Activity,
  waitingTimeTarget: Brew$Time,
  pouringTimeTarget: Brew$Time,
  pourNumber: number,
  weightSteps: Brew$WeightSteps,
|};

declare type Brew$MachineProps = {|
  baseWeight: Brew$Weight,
  resetWeight?: Brew$Weight,
  strength: Brew$Strength,
  taste: Brew$Taste,
  time: Brew$Time,
|};

declare type Brew$ColorTypes = 'dusty' | 'blue' | 'warm' | 'peach' | 'orange';

declare type Brew$ThemeType = {|
  sizes: { lineWidth: string },
  colors: {
    [Brew$ColorTypes]: string,
  },
|};
