import React from 'react';
import ar from 'date-fns/locale/ar';
import de from 'date-fns/locale/de';
import el from 'date-fns/locale/el';
import en from 'date-fns/locale/en';
import eo from 'date-fns/locale/eo';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import ko from 'date-fns/locale/ko';
import ja from 'date-fns/locale/ja';
import ru from 'date-fns/locale/ru';
import zh_cn from 'date-fns/locale/zh_cn';  // eslint-disable-line camelcase
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import RelativeTime from '../src/';

storiesOf(name, module)
  .add('test', () => (
    <RelativeTime timestamp={new Date().getTime() + (1000 * 60)} />
  ))
  .add('table', () => {
    const locales = [
      { name: 'ar', locale: ar },
      { name: 'de', locale: de },
      { name: 'el', locale: el },
      { name: 'en', locale: en },
      { name: 'eo', locale: eo },
      { name: 'es', locale: es },
      { name: 'fr', locale: fr },
      { name: 'ja', locale: ja },
      { name: 'ko', locale: ko },
      { name: 'ru', locale: ru },
      { name: 'zh_cn', locale: zh_cn },
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
          <thead>
            <tr>
              <th>locale</th>
              {times.map((time, index) => (
                <th key={index}>{time.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {locales.map((locale, index) => (
              <tr key={index}>
                <td><b>{locale.name}</b></td>
                {times.map((time, i) => (
                  <td key={i}>
                    <RelativeTime timestamp={time.timestamp} locale={locale.locale} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
