// @flow
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'emotion-theming';

import type { UnitType } from '../FlowTypes';

import BlankButton from '../components/BlankButton';
import BrewTracker from '../components/BrewTracker/BrewTracker';
import Content from '../components/Content';
import SetAmountStep from '../components/SetAmountStep';
import Page from '../components/Page';
import ProfileSlider from '../components/ProfileSlider';
import ResetScaleStep from '../components/ResetScaleStep';
import StepHeading from '../components/StepHeading';
import StepWrapper from '../components/StepWrapper';
import Timer from '../components/Timer';

const colors = {
  dusty: 'rgba(217, 229, 214, 1);',
  blue: 'rgba(0, 167, 225, 1);',
  warm: 'rgba(237, 222, 164, 1);',
  peach: 'rgba(247, 160, 114, 1);',
  orange: 'rgba(255, 155, 66, 1);',
  // dusty: hsla(108%, 22%, 87%, 1);
  // blue: hsla(195%, 100%, 44%, 1);
  // warm: hsla(48%, 67%, 79%, 1);
  // peach: hsla(21%, 89%, 71%, 1);
  // orange: hsla(28%, 100%, 63%, 1);
};

const sizes = {
  lineWidth: '3px',
};

type State = {
  activeStep: 'weight' | 'profile' | 'reset' | 'brew',
  baseMeasurement: ?UnitType,
  baseWeight: ?string,
  resetWeight: ?string,
  strength: ?number,
  taste: ?number,
};

class Index extends PureComponent<*, State> {
  state = {
    activeStep: 'weight',
    baseMeasurement: null,
    baseWeight: null,
    resetWeight: null,
    strength: null,
    taste: null,
  };

  render() {
    const {
      activeStep,
      baseMeasurement,
      baseWeight,
      resetWeight,
      strength,
      taste,
    } = this.state;
    return (
      <ThemeProvider theme={{ colors, sizes }}>
        <Page>
          <Content>
            <StepWrapper
              isActive={
                activeStep === 'weight' || (!!baseMeasurement && !!baseWeight)
              }>
              <StepHeading done={!!baseMeasurement && !!baseWeight}>
                How much?
              </StepHeading>
              <SetAmountStep
                onCompleted={data =>
                  this.setState({
                    baseMeasurement: data.baseMeasurement,
                    baseWeight: data.baseWeight,
                    activeStep: 'profile',
                  })
                }
              />
            </StepWrapper>

            <StepWrapper
              isActive={activeStep === 'profile' || (!!taste && !!strength)}>
              <StepHeading done={!!taste && !!strength}>
                Set taste profile
              </StepHeading>
              <p className="f3">
                Please let me know how much coffee (or water) you are going to
                use:
              </p>
              <div className="mv4">
                <ProfileSlider
                  onComplete={data =>
                    this.setState({
                      taste: data.taste,
                      strength: data.strength,
                      activeStep: 'reset',
                    })
                  }
                />
              </div>
            </StepWrapper>
            <StepWrapper isActive={activeStep === 'reset' || !!resetWeight}>
              <StepHeading done={!!resetWeight}>Get ready</StepHeading>

              <ResetScaleStep
                onCompleted={data =>
                  this.setState({
                    resetWeight: data.resetWeight,
                    activeStep: 'brew',
                  })
                }
              />
            </StepWrapper>

            <Timer>
              {(timeElapsed, isRunning, toggleRunning) => (
                <StepWrapper isActive={activeStep === 'brew'}>
                  <StepHeading done={false}>It&apos;s brew time!</StepHeading>
                  <p>Time: {timeElapsed}</p>
                  <BlankButton onClick={toggleRunning}>
                    {isRunning ? 'Pause' : 'Start'}
                  </BlankButton>
                  <BrewTracker
                    time={timeElapsed}
                    taste={taste || 0}
                    strength={strength || 0}
                    baseWeight={Number(baseWeight) || 0}
                    baseMesurement={baseMeasurement}
                    onFinished={toggleRunning}
                    resetWeight={Number(resetWeight)}
                  />
                </StepWrapper>
              )}
            </Timer>
          </Content>
        </Page>
      </ThemeProvider>
    );
  }
}

export default Index;
