import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import RelativeTime from '../src/';

storiesOf(name, module)
  .add('test', () => (
    <RelativeTime timestamp={new Date().getTime() + (1000 * 60)} />
  ))
  .add('table', () => {
    const locales = [
      'en',
      'es',
      'af',
      'de',
      'fr',
      'ja',
      'ko',
      'ru',
      'sv',
      'sw',
      'zh-cn',
    ];

    const now = new Date().getTime();
    const times = [
      { name: '10yr ago', timestamp: now - (1000 * 60 * 60 * 24 * 365 * 10) },
      { name: '1yr ago', timestamp: now - (1000 * 60 * 60 * 24 * 365) },
      { name: '6mth ago', timestamp: now - (1000 * 60 * 60 * 24 * 30 * 6) },
      { name: '1mth ago', timestamp: now - (1000 * 60 * 60 * 24 * 30) },
      { name: '10d ago', timestamp: now - (1000 * 60 * 60 * 24 * 10) },
      { name: '1d ago', timestamp: now - (1000 * 60 * 60 * 24) },
      { name: '2h ago', timestamp: now - (1000 * 60 * 60 * 2) },
      { name: '1h ago', timestamp: now - (1000 * 60 * 60) },
      { name: '10m ago', timestamp: now - (1000 * 60 * 10) },
      { name: '1m ago', timestamp: now - (1000 * 60) },
      { name: '1s ago', timestamp: now - (1000) },
      { name: 'now', timestamp: now },
      { name: 'in 1s', timestamp: now + 1000 },
      { name: 'in 1m', timestamp: now + (1000 * 60) },
      { name: 'in 10m', timestamp: now + (1000 * 60 * 10) },
      { name: 'in 1h', timestamp: now + (1000 * 60 * 60) },
      { name: 'in 2h', timestamp: now + (1000 * 60 * 60 * 2) },
      { name: 'in 1d', timestamp: now + (1000 * 60 * 60 * 24) },
      { name: 'in 10d', timestamp: now + (1000 * 60 * 60 * 24 * 10) },
      { name: 'in 1mth', timestamp: now + (1000 * 60 * 60 * 24 * 30) },
      { name: 'in 6mth', timestamp: now + (1000 * 60 * 60 * 24 * 30 * 6) },
      { name: 'in 1yr', timestamp: now + (1000 * 60 * 60 * 24 * 365) },
      { name: 'in 10yr', timestamp: now + (1000 * 60 * 60 * 24 * 365 * 10) },
    ];

    return (
      <div>
        <table>
          <tr>
            <th>locale</th>
            {times.map(time => (
              <th>{time.name}</th>
            ))}
          </tr>
          <tr>
            <td />
            {times.map(time => (
              <td>{`${new Date(time.timestamp)}`}</td>
            ))}
          </tr>
          {locales.map(locale => (
            <tr>
              <td><b>{locale}</b></td>
              {times.map(time => (
                <td><RelativeTime timestamp={time.timestamp} locale={locale} /></td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  });
