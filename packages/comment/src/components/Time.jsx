import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@atlaskit/tooltip';
import Field from './Field';

export default class Time extends PureComponent {
  static propTypes = {
    /** The time of the comment. */
    children: PropTypes.node,
    /** The URL of the link. If not provided, the element will be rendered as text. */
    href: PropTypes.string,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
    /** An optional timestamp. If set, the children prop will be ignored and this value will be
     * used to display a relative date. */
    timestamp: PropTypes.number,
  }

  /**
   * Abbreviated month names defined {@link https://extranet.atlassian.com/pages/viewpage.action?pageId=3040185617|here}.
   */
  static getAbsoluteTime(timestamp) {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  /**
   * Past event descriptions defined {@link https://extranet.atlassian.com/pages/viewpage.action?pageId=3040185617|here}.
   ------------------------------------------------------------------
   | DESCRIPTION                  | DISPLAYED VALUE                 |
   |------------------------------|---------------------------------|
   | Within the last few seconds  | just now                        |
   | Within the last minute       | a minute ago                    |
   | Within 59 minutes            | x minutes ago                   |
   | 60 minutes ago               | 1 hour ago                      |
   | x hours ago                  | x hours ago                     |
   | 1 day ago                    | yesterday                       |
   | 2 days ago < 7 days          | x days ago                      |
   | 7 days ago                   | 1 week ago                      |
   | > 7 days ago                 | Date stamp: i.e. "20 Dec 2013"  |
   ------------------------------------------------------------------
   */
  static getRelativeTime(timestamp, relativeTo = Date.now()) {
    const deltaTime = relativeTo - timestamp;
    const oneSecond = 1000;
    const oneMinute = 60 * oneSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;

    // Within the last 5 seconds
    if (deltaTime <= 5 * oneSecond) {
      return 'just now';
    }

    // Within the last minute
    if (deltaTime <= oneMinute) {
      return 'a minute ago';
    }

    // Within the last hour
    if (deltaTime < oneHour) {
      const minutes = Math.floor(deltaTime / oneMinute);
      return minutes > 1 ? (
        `${minutes} minutes ago`
      ) : (
        'a minute ago'
      );
    }

    const timezoneOffset = (new Date()).getTimezoneOffset() * oneMinute;
    const timeToLastMidnight = relativeTo
      - (Math.round(relativeTo / oneDay) * oneDay)
      - timezoneOffset;

    // Within the last day
    if (deltaTime < timeToLastMidnight) {
      const hours = Math.floor(deltaTime / oneHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    // Yesterday
    if (deltaTime < timeToLastMidnight + oneDay) {
      return 'yesterday';
    }

    // Within the last week
    if (deltaTime < timeToLastMidnight + oneWeek) {
      const days = Math.floor(deltaTime / (oneDay));
      return days < 7 ? (
        `${days} day${days > 1 ? 's' : ''} ago`
      ) : (
        '1 week ago'
      );
    }

    // Return false if it falls beyond our bounds for relative times
    return false;
  }

  renderTime() {
    const { children, timestamp } = this.props;

    if (!timestamp) {
      return children;
    }

    const relativeTime = Time.getRelativeTime(timestamp);
    const absoluteTime = Time.getAbsoluteTime(timestamp);

    if (relativeTime) {
      return (
        <Tooltip description={absoluteTime} position="top">
          <span>{relativeTime}</span>
        </Tooltip>
      );
    }

    return absoluteTime;
  }

  render() {
    const { href, onClick, onFocus, onMouseOver } = this.props;

    return (
      <Field
        href={href}
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {this.renderTime()}
      </Field>
    );
  }
}
