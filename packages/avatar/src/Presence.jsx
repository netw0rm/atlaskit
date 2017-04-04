import React, { PureComponent, PropTypes } from 'react';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import presences from './internal/icons';
import styles from './styles.less';

// This hack is to make sure that styles.locals exists when style loading is a noop (when we are
// running tests).
// TODO: Remove in AK-2025
styles.locals = styles.locals || {};

export const PRESENCE_TYPE = {
  values: ['none', 'online', 'busy', 'offline'],
  defaultValue: 'none',
};

export default class Presence extends PureComponent {
  static propTypes = {
    /** Content to use as a custom presence indicator (usually not required if
    consuming Presence separate to Avatar) */
    children: PropTypes.element,
    /** Used to override the default border color of the presence indicator.
    Accepts any color argument that the border-color CSS property accepts */
    borderColor: PropTypes.string,
    /** Content to use as a custom presence indicator (usually not required if
    consuming Presence separate to Avatar). */
    presence: PropTypes.oneOf(PRESENCE_TYPE.values),
  }

  static defaultProps = {
    borderColor: akColorPrimary3, // white
    presence: PRESENCE_TYPE.defaultValue,
  }

  render() {
    const wrapperStyles = {
      borderColor: this.props.borderColor,
    };
    const PresenceToDisplay = presences[this.props.presence] || null;

    return (
      <div className={styles.locals.presence} style={wrapperStyles}>
        {
          this.props.children ?
            this.props.children :
            <PresenceToDisplay />
        }
      </div>
    );
  }
}
