// @flow

type Props = {|
  activity: Brew$Activity,
|};
const BrewActivity = ({ activity }: Props) => {
  switch (activity) {
    case 'start':
      return 'Wating to start';
    case 'pouring':
      return 'Pour water now';
    case 'waiting':
      return 'Wait, let it rest';
    case 'done':
      return 'Done';
    default:
      return null;
  }
};

export default BrewActivity;
