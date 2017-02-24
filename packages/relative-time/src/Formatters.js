import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import esStrings from 'react-timeago/lib/language-strings/es';
import deStrings from 'react-timeago/lib/language-strings/de';
import frStrings from 'react-timeago/lib/language-strings/fr';
import jaStrings from 'react-timeago/lib/language-strings/ja';
import koStrings from 'react-timeago/lib/language-strings/ko';
import ptStrings from 'react-timeago/lib/language-strings/pt';
import ruStrings from 'react-timeago/lib/language-strings/ru';
import enStrings from './formatters/en-formatter';

const en = buildFormatter(enStrings);
const es = buildFormatter(esStrings);
const de = buildFormatter(deStrings);
const fr = buildFormatter(frStrings);
const ja = buildFormatter(jaStrings);
const ko = buildFormatter(koStrings);
const pt = buildFormatter(ptStrings);
const ru = buildFormatter(ruStrings);

export default {
  en,
  es,
  de,
  fr,
  ja,
  ko,
  pt,
  ru,
};
