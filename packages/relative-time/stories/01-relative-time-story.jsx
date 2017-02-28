import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import fr from 'react-intl/locale-data/fr';
import ja from 'react-intl/locale-data/ja';
import ko from 'react-intl/locale-data/ko';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';

import { name } from '../package.json';
import RelativeTime from '../src/';

addLocaleData([...en, ...es, ...de, ...fr, ...ja, ...ko, ...pt, ...ru]);

storiesOf(name, module)
  .add('relative-time for 1 minute from now', () => (
    <IntlProvider locale="en">
      <RelativeTime timestamp={new Date().getTime() + (1000 * 60)} />
    </IntlProvider>
  ))
  .add('relative-time for 1 minute before with no wrapper', () => (
    <RelativeTime timestamp={new Date() - (1000 * 60)} />
  ))
  .add('relative-time with i18n', () => {
    const locales = [
      { name: 'en', locale: 'en' },
      { name: 'es', locale: 'es' },
      { name: 'de', locale: 'de' },
      { name: 'fr', locale: 'fr' },
      { name: 'ja', locale: 'ja' },
      { name: 'ko', locale: 'ko' },
      { name: 'pt', locale: 'pt' },
      { name: 'ru', locale: 'ru' },
    ];

    const now = new Date().getTime();
    const times = [
      { name: '-10yr', timestamp: now - (1000 * 60 * 60 * 24 * 365 * 10) },
      { name: '-1yr', timestamp: now - (1000 * 60 * 60 * 24 * 365) },
      { name: '-6mth', timestamp: now - (1000 * 60 * 60 * 24 * 30 * 6) },
      { name: '-1mth', timestamp: now - (1000 * 60 * 60 * 24 * 30) },
      { name: '-10d', timestamp: now - (1000 * 60 * 60 * 24 * 10) },
      { name: '-1d', timestamp: now - (1000 * 60 * 60 * 24) },
      { name: '-2h', timestamp: now - (1000 * 60 * 60 * 2) },
      { name: '-1h', timestamp: now - (1000 * 60 * 60) },
      { name: '-10m', timestamp: now - (1000 * 60 * 10) },
      { name: '-1m', timestamp: now - (1000 * 60) },
      { name: '-10s', timestamp: now - (1000 * 10) },
      { name: 'now', timestamp: now },
      { name: '+10s', timestamp: now + (1000 * 10) },
      { name: '+1m', timestamp: now + (1000 * 60) },
      { name: '+10m', timestamp: now + (1000 * 60 * 10) },
      { name: '+1h', timestamp: now + (1000 * 60 * 60) },
      { name: '+2h', timestamp: now + (1000 * 60 * 60 * 2) },
      { name: '+1d', timestamp: now + (1000 * 60 * 60 * 24) },
      { name: '+10d', timestamp: now + (1000 * 60 * 60 * 24 * 10) },
      { name: '+1mth', timestamp: now + (1000 * 60 * 60 * 24 * 30) },
      { name: '+6mth', timestamp: now + (1000 * 60 * 60 * 24 * 30 * 6) },
      { name: '+1yr', timestamp: now + (1000 * 60 * 60 * 24 * 365) },
      { name: '+10yr', timestamp: now + (1000 * 60 * 60 * 24 * 365 * 10) },
    ];

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th />
              {times.map((time, index) => (
                <th key={index}>{time.name}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {locales.map((locale, index) => (
              <IntlProvider key={index} locale={locale.locale}>
                <tr>
                  <td><b>{locale.name}</b></td>
                  {times.map((time, i) => (
                    <td key={i}>
                      <RelativeTime timestamp={time.timestamp} />
                    </td>
                    ))}
                </tr>
              </IntlProvider>
              ))}
          </tbody>
        </table>
      </div>
    );
  });
