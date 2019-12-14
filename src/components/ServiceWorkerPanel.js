// @flow
import React, { useEffect } from 'react';
import {
  checkSubscription,
  requestPermission,
  testNotification,
} from '../lib/serviceWorker';
import BlankButton from './BlankButton';

type Props = {};

const ServiceWorkerPanel = (props: Props) => {
  useEffect(() => {
    console.log('Showing test notification in 3 seconds...');
    setTimeout(() => {
      testNotification();
    }, 3000);
  }, []);
  return (
    <div className="bg-dusty ph3 mw6 absolute top-0 right-0">
      <pre>Service worker debug</pre>
      <BlankButton className="mb3 db" onClick={checkSubscription}>
        Check subscription
      </BlankButton>
      <BlankButton className="mb3 db" onClick={requestPermission}>
        Request permission
      </BlankButton>
      <BlankButton className="mb3 db" onClick={testNotification}>
        Send test notification
      </BlankButton>
    </div>
  );
};

export default ServiceWorkerPanel;
