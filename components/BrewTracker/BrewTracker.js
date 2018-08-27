// @flow
import React, { Fragment, PureComponent } from 'react';
import { type UnitType } from '../../FlowTypes';
import { sumArrayTo, TIME_BETWEEN_POURS } from './utils';
import stateMachine from './brewStateMachine';

// eslint doesnt seem to understand getDerivedStateFromProps...

export type Props = {
  onFinished: () => void,
  time: number,
  taste: number, // eslint-disable-line
  strength: number, // eslint-disable-line
  baseWeight: number, // eslint-disable-line
  baseMesurement: ?UnitType, // eslint-disable-line
  resetWeight?: number,
};

export type State = {
  currentIndex: number,
  pouringTimeTarget: number,
  waitingTimeTarget: number,
  weightSteps: Array<number>,
  activity: 'start' | 'pouring' | 'waiting' | 'done',
};

class BrewTracker extends PureComponent<Props, State> {
  static defaultProps = {
    resetWeight: 0,
  };

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): State | null {
    return stateMachine(nextProps, prevState);
  }

  state = {
    currentIndex: 0,
    pouringTimeTarget: 10, // eslint-disable-line
    waitingTimeTarget: TIME_BETWEEN_POURS, // eslint-disable-line
    weightSteps: [],
    activity: 'start',
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { onFinished } = this.props;
    const { activity } = this.state;

    if (activity === 'done' && prevState.activity !== 'done') {
      onFinished();
    }
  }

  render() {
    const { time, resetWeight } = this.props;
    const { activity, currentIndex, weightSteps } = this.state;

    return (
      <Fragment>
        <p>
          <span className="mv3 db">
            <strong>Time:</strong> {time}
          </span>
          <span className="mv3 db">
            <strong>Activity:</strong> {activity}
          </span>
          <span className="mv3 db">
            <strong>Current weight:</strong>{' '}
            {sumArrayTo(weightSteps, currentIndex) + resetWeight}
          </span>
          <span className="mv3 db">
            <strong>Next target weight:</strong>{' '}
            {sumArrayTo(weightSteps, currentIndex + 1) + resetWeight}
          </span>
        </p>
      </Fragment>
    );
  }
}

export default BrewTracker;
