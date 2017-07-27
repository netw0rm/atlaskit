const Observable = require('rxjs').Observable;
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const transformFile = require('babel-core').transformFile;

const getFileName$ = Observable.bindNodeCallback(glob);
const transformFile$ = Observable.bindNodeCallback(transformFile);

// Accepts an optional argument indicating the app directory for which to extract i18n
// Default to the entire 'src' if no argument is specified
const directoryArg = process.argv[2] || '';

const SRC_PATH = path.resolve(__dirname, '../src/');
const APP_PATH = path.resolve(SRC_PATH, directoryArg);
const OUTPUT_PATH = path.resolve(APP_PATH, 'extracted-i18n-strings.json');

getFileName$(
  path.join(APP_PATH, '/**/*.{js,jsx}'), {
    ignore: [
      path.join(APP_PATH, '/**/*test.js'),
      path.join(APP_PATH, '/**/story.js'),
    ],
  })

  // create an observable that emits each filename so we can operate on each file
  .mergeMap(fileNames => Observable.from(fileNames))

  // run babel over all the files with the react-intl plugin
  .mergeMap(fileName => transformFile$(fileName, {
    plugins: ['react-intl'],
  }))
  .map(meta => meta.metadata['react-intl'].messages)

  // accumalate the messages into a single map, checking for duplicates
  .reduce((messagesSoFar, currentFileMessages) => {
    currentFileMessages.forEach((message) => {
      if (messagesSoFar[message.id]) {
        const errorMessage = `duplicate i18n id found: ${message.id}`;
        throw new Error(errorMessage);
      }
      // eslint-disable-next-line no-param-reassign
      messagesSoFar[message.id] = message.defaultMessage;
    });
    return messagesSoFar;
  }, {})

  // write the extracted i18n strings to OUTPUT_PATH
  .subscribe((messages) => {
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(messages, null, 2));
    console.log(`Wrote ${Object.keys(messages).length} strings to ${OUTPUT_PATH}`); // eslint-disable-line no-console
  });
