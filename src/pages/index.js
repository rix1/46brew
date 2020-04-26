// @flow
import React, { PureComponent, createRef } from 'react';

import SetAmountStep from '../components/SetAmountStep';
import Page from '../components/Page';
import ProfileSlider from '../components/ProfileSlider';
import ResetScaleStep from '../components/ResetScaleStep';
import StepHeading from '../components/StepHeading';
import StepWrapper from '../components/StepWrapper';

import BrewStep from '../components/BrewStep';
import { TimerContextProvider } from '../components/Timer/Timer';
import PageLayout from '../components/PageLayout';

type State = {
  activeStep: 'weight' | 'profile' | 'reset' | 'brew',
  baseWeight: Brew$Weight,
  resetWeight: Brew$Weight,
  strength: Brew$Strength,
  taste: Brew$Taste,
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

class Index extends PureComponent<void, State> {
  state = {
    activeStep: 'weight',
    baseWeight: 0,
    resetWeight: 0,
    strength: 0,
    taste: 0,
  };

  stepRefs: StepTypes = {
    amountStep: createRef(),
    profileStep: createRef(),
    resetScaleStep: createRef(),
    brewTrackerStep: createRef(),
  };

  scrollToStep = (stepName: StepNames) => {
    const stepRef = this.stepRefs[stepName];
    const node = stepRef.current;
    if (node) {
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          node.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }),
      );
    }
  };

  render() {
    const { activeStep, baseWeight, resetWeight, strength, taste } = this.state;
    return (
      <Page enableScroll={activeStep !== 'profile'}>
        <PageLayout>
          <StepWrapper ref={this.stepRefs.amountStep} isActive>
            <StepHeading done={!!baseWeight}>How much?</StepHeading>
            <SetAmountStep
              onCompleted={weight => {
                this.setState({
                  baseWeight: weight,
                  activeStep: 'profile',
                });
                this.scrollToStep('profileStep');
              }}
            />
          </StepWrapper>
          <StepWrapper
            ref={this.stepRefs.profileStep}
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
            ref={this.stepRefs.resetScaleStep}>
            <StepHeading done={!!resetWeight}>Get ready</StepHeading>

            <ResetScaleStep
              onCompleted={weight => {
                this.setState({
                  resetWeight: weight,
                  activeStep: 'brew',
                });
                this.scrollToStep('brewTrackerStep');
              }}
            />
          </StepWrapper>
          <StepWrapper
            ref={this.stepRefs.brewTrackerStep}
            className="mb7"
            isActive={activeStep === 'brew'}>
            <TimerContextProvider>
              <BrewStep
                baseWeight={Number(baseWeight)}
                resetWeight={Number(resetWeight)}
                strength={Number(strength)}
                taste={Number(taste)}
              />
            </TimerContextProvider>
          </StepWrapper>
        </PageLayout>
      </Page>
    );
  }
}

export default Index;
