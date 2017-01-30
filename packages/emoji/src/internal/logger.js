let debugEnabled = false;
let stacktracesEnabled = false;

export function enableLogger(enable) {
  debugEnabled = enable;
}

export function enableStacktraces(enable) {
  stacktracesEnabled = enable;
}

export function logStacktrace() {
  if (stacktracesEnabled) {
    console.log(new Error().stack); // eslint-disable-line no-console
  }
}

export default function debug(...args) {
  if (debugEnabled) {
    console.log(...args); // eslint-disable-line no-console
  }
}
