// @flow
import ReactGA from 'react-ga';

export const initGA = (config: Brew$AppConfig) => {
  if (!config.ANALYTICS_ENABLED) {
    return null;
  }

  if (!config.ANALYTICS_GA_ID) {
    return console.info('ANALYTICS_GA_ID missing. Analytics is disabled.');
  }

  ReactGA.initialize(config.ANALYTICS_GA_ID, {
    debug: config.ENV === 'development',
    titleCase: false,
  });
  ReactGA.set({ anonymizeIp: true });
  ReactGA.set({ appName: config.NAME });
  ReactGA.set({ appVersion: config.VERSION });

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
