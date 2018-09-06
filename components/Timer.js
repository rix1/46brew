// @flow
import { PureComponent } from 'react';

type Props = {
  multiplier: number,
  children: (number, boolean, () => void) => React$Node,
};

type State = {
  timeElapsed: number,
  isRunning: boolean,
  lastTickAt: ?Date,
};

class Timer extends PureComponent<Props, State> {
  animationFrameId: number;

  static defaultProps = {
    multiplier: 1,
  };

  state = {
    timeElapsed: 0,
    isRunning: false,
    lastTickAt: null,
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { isRunning } = this.state;
    const isJustStarting = !prevState.isRunning && isRunning;

    if (isJustStarting) {
      this.start();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  start = () =>
    this.setState(
      {
        isRunning: true,
        lastTickAt: new Date(),
      },
      this.tick,
    );

  tick = () => {
    if (window) {
      this.animationFrameId = window.requestAnimationFrame(() => {
        const { multiplier } = this.props;
        const { timeElapsed, isRunning, lastTickAt } = this.state;
        if (!isRunning || !lastTickAt) {
          return;
        }
        const currentTime = new Date();
        const timeSinceLastTick = (currentTime - lastTickAt) * multiplier;
        this.setState(
          {
            timeElapsed: timeElapsed + timeSinceLastTick,
            lastTickAt: currentTime,
          },
          this.tick,
        );
      });
    }
  };

  toggleRunning = () =>
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }));

  render() {
    const { isRunning, timeElapsed } = this.state;
    const { children } = this.props;
    if (typeof children !== 'function') {
      throw new Error(
        'This component uses render props, children must therefore be invokable',
      );
    }
    return children(
      Math.round(timeElapsed / 1000),
      isRunning,
      this.toggleRunning,
    );
  }
}

export default Timer;
