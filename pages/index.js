// @flow
import React, { PureComponent, createRef } from 'react';
import { ThemeProvider } from 'emotion-theming';

import Content from '../components/Content';
import SetAmountStep from '../components/SetAmountStep';
import Page from '../components/Page';
import ProfileSlider from '../components/ProfileSlider';
import ResetScaleStep from '../components/ResetScaleStep';
import StepHeading from '../components/StepHeading';
import StepWrapper from '../components/StepWrapper';

import BrewStep from '../components/BrewStep';
import { TimerContextProvider } from '../components/Timer/Timer';

const colors = {
  dusty: 'rgba(217, 229, 214, 1);',
  blue: 'rgba(0, 167, 225, 1);',
  warm: 'rgba(237, 222, 164, 1);',
  peach: 'rgba(247, 160, 114, 1);',
  orange: 'rgba(255, 155, 66, 1);',
};

const sizes = {
  lineWidth: '3px',
};

type State = {
  activeStep: 'weight' | 'profile' | 'reset' | 'brew',
  baseMeasurement: ?Brew$UnitType,
  baseWeight: ?string,
  resetWeight: ?string,
  strength: ?number,
  taste: ?number,
};
type StepNames =
  | 'amountStep'
  | 'profileStep'
  | 'resetScaleStep'
  | 'brewTrackerStep';

type StepTypes = {
  amountStep: { current: null | HTMLDivElement },
  profileStep: { current: null | HTMLDivElement },
  resetScaleStep: { current: null | HTMLDivElement },
  brewTrackerStep: { current: null | HTMLDivElement },
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

  stepRefs: StepTypes = {
    amountStep: createRef(),
    profileStep: createRef(),
    resetScaleStep: createRef(),
    brewTrackerStep: createRef(),
  };

  scrollToStep = (stepName: StepNames) => {
    const stepRef = this.stepRefs[stepName];
    if (stepRef.current) {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          if (stepRef.current) {
            stepRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }),
      );
    }
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
            <StepWrapper forwardRef={this.stepRefs.amountStep} isActive>
              <StepHeading done={!!baseMeasurement && !!baseWeight}>
                How much?
              </StepHeading>
              <SetAmountStep
                onCompleted={data => {
                  this.setState({
                    baseMeasurement: data.baseMeasurement,
                    baseWeight: data.baseWeight,
                    activeStep: 'profile',
                  });

                  this.scrollToStep('profileStep');
                }}
              />
            </StepWrapper>
            <StepWrapper
              forwardRef={this.stepRefs.profileStep}
              isActive={activeStep === 'profile' || (!!taste && !!strength)}>
              <StepHeading done={!!taste && !!strength}>
                Set taste profile
              </StepHeading>
              <p className="lh-copy gray">
                Use the two sliders below to adjust taste profile.
              </p>
              <div className="mv4">
                <ProfileSlider
                  onComplete={data => {
                    this.setState({
                      taste: data.taste,
                      strength: data.strength,
                      activeStep: 'reset',
                    });
                    this.scrollToStep('resetScaleStep');
                  }}
                />
              </div>
            </StepWrapper>
            <StepWrapper
              isActive={activeStep === 'reset' || !!resetWeight}
              forwardRef={this.stepRefs.resetScaleStep}>
              <StepHeading done={!!resetWeight}>Get ready</StepHeading>

              <ResetScaleStep
                onCompleted={data => {
                  this.setState({
                    resetWeight: data.resetWeight,
                    activeStep: 'brew',
                  });
                  this.scrollToStep('brewTrackerStep');
                }}
              />
            </StepWrapper>
            <StepWrapper
              forwardRef={this.stepRefs.brewTrackerStep}
              className="mb7"
              isActive={activeStep === 'brew'}>
              <TimerContextProvider>
                <BrewStep
                  baseMeasurement={baseMeasurement}
                  baseWeight={Number(baseWeight)}
                  resetWeight={Number(resetWeight)}
                  strength={Number(strength)}
                  taste={Number(taste)}
                />
              </TimerContextProvider>
            </StepWrapper>
          </Content>
        </Page>
      </ThemeProvider>
    );
  }
}

export default Index;
