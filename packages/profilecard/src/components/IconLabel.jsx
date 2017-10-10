import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import IconLocation from '@atlaskit/icon/glyph/location';
import IconRecent from '@atlaskit/icon/glyph/recent';
import IconMention from '@atlaskit/icon/glyph/mention';
import { Presence } from '@atlaskit/avatar';

import styles from '../styles/profilecard.less';

const icons = {
  location: IconLocation,
  time: IconRecent,
  mention: IconMention,
  available: () => <Presence presence="online" />,
  unavailable: () => <Presence presence="offline" />,
  busy: () => <Presence presence="busy" />,
};

export default class IconLabel extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  }

  render() {
    if (!this.props.children) { return null; }

    const IconElement = icons[this.props.icon];
    const displayIcon = IconElement ? <IconElement label={`icon ${this.props.icon}`} size="small" /> : null;

    return (
      <div className={styles.detailsLabel}>
        <div className={styles.detailsLabelIcon}>
          {displayIcon}
        </div>
        <span className={styles.label}>{this.props.children}</span>
      </div>
    );
  }
}
