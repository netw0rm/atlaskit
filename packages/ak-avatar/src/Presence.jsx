import React, { PureComponent, PropTypes } from 'react';
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
    borderColor: 'white',
    presence: 'none',
  }

  render() {
    const wrapperStyles = {
      borderColor: this.props.borderColor,
    };
    const PresenceToDisplay = presences[this.props.presence] || null;

    return (<div className={styles.locals.presence} style={wrapperStyles}>
      {
        this.props.children ?
          this.props.children :
          <PresenceToDisplay />
      }
    </div>);
  }
}
