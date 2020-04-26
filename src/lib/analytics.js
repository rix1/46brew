// @flow
import ReactGA from 'react-ga';

export const initGA = () => {
  if (!process.env.ANALYTICS_ENABLED) {
    return null;
  }

  if (!process.env.ANALYTICS_GA_ID) {
    return console.info('ANALYTICS_GA_ID missing. Analytics is disabled.');
  }

  ReactGA.initialize(process.env.ANALYTICS_GA_ID, {
    debug: process.env.NODE_ENV === 'development',
    titleCase: false,
  });
  ReactGA.set({ anonymizeIp: true });
  ReactGA.set({ appName: process.env.NAME });
  ReactGA.set({ appVersion: process.env.VERSION });

  window.GA_INITIALIZED = true;

  if (window.performance) {
    // Gets the number of milliseconds since page load
    // (and rounds the result since the value must be an integer).
    const timeSincePageLoad = Math.round(performance.now());

    ReactGA.timing({
      category: 'JS Libraries',
      variable: 'load',
      value: timeSincePageLoad,
    });
  }
  return null;
};

export const logPageView = () => {
  if (window.GA_INITIALIZED) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category: string, action: string) => {
  if (window.GA_INITIALIZED) {
    ReactGA.event({
      category, // e.g. user
      action, // e.g. stated brewing
    });
  }
};
