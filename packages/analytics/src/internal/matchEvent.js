/*
The matchEvent method is responsible for deciding whether a Decorator or
Listener should take action based on the event name and the `match` prop.
*/

export type Matcher = string | RegExp | ((eventName: string) => boolean);

const ENDS_WITH_DOT = /\.$/;

function matchEvent(matcher?: Matcher, name?: string) {
  if (matcher === '*' || name === undefined) {
    return true;
  } else if (typeof matcher === 'string') {
    if (ENDS_WITH_DOT.test(name)) {
      return name.substr(0, matcher.length) === matcher;
    }
    return name === matcher;
  } else if (typeof matcher === 'function') {
    return matcher(name);
  } else if (matcher instanceof RegExp) {
    return matcher.test(name);
  }
  return false;
}

export default matchEvent;
