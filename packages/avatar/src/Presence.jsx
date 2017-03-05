import React, { PureComponent, PropTypes } from 'react';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import presences from './internal/icons';
import values from './internal/presences';
import styles from './styles.less';

export default class Presence extends PureComponent {
  static displayName = 'AkPresence';
  static propTypes = {
    children: PropTypes.element,
    borderColor: PropTypes.string,
    presence: PropTypes.oneOf(values),
  }

  static defaultProps = {
    borderColor: akColorPrimary3, // white
    presence: 'none',
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
