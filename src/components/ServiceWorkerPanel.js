// @flow
import React, { useEffect, useState } from 'react';
import {
  checkSubscription,
  requestPermission,
  vibrationExample,
  testNotification,
} from '../lib/serviceWorker';
import BlankButton from './BlankButton';

type Props = {};

function renderIcon(value, matchers) {
  const icons = ['✅', '❌', '❓'];
  const index = matchers.indexOf(value);
  return index !== -1 ? icons[index] : icons[2];
}

const ServiceWorkerPanel = (props: Props) => {
  const [permission, setPermission] = useState('unknown');
  const [subscription, setSubscription] = useState();
  useEffect(() => {
    requestPermission().then(result => {
      setPermission(result);
    });

    checkSubscription().then(pushSubscription => {
      setSubscription(pushSubscription ? 'subscribed' : 'unsubscribed');
    });
  }, []);
  return (
    <div className="bg-dusty ph3 mw6 absolute top-0 right-0">
      <pre>Service worker:</pre>
      <BlankButton className="mb3" onClick={checkSubscription}>
        Check subscription
      </BlankButton>{' '}
      {renderIcon(subscription, ['subscribed', 'unsubscribed'])}
      <BlankButton className="mb3" onClick={requestPermission}>
        Request permission:
      </BlankButton>{' '}
      {renderIcon(permission, ['granted', 'blocked', 'unknown'])}
      <BlankButton className="mb3 db" onClick={testNotification}>
        Send test notification
      </BlankButton>
      <BlankButton className="mb3 db" onClick={vibrationExample}>
        Vibrate
      </BlankButton>
    </div>
  );
};

export default ServiceWorkerPanel;
