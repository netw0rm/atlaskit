import React from 'react';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars

import styles from 'style!./styles.less';


class ToggleIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleColor: false,
      toggleFill: false,
    };
  }

  render() {
    return (
      <div>
        <h6 style={{ padding: 0, margin: '10px 5px' }}>
          Click on this icons to see them &#39;check&#39; and &#39;uncheck&#39; itselves
        </h6>
        <div className={styles.iconContainer}>
          {this.props.icons.map(([id, Icon]) => (
            <Icon
              key={id}
              label="Icon which checks and unchecks itself"
              className={this.state.toggleColor ? styles.iconChecked : styles.iconUnchecked}
              onClick={() => {
                this.setState({ toggleColor: !this.state.toggleColor });
              }}
            />
          ))}
        </div>
        <h6 style={{ padding: 0, margin: '10px 5px' }}>
          Click on the icons to see them &#39;reverse&#39; itself while staying &#39;checked&#39;
        </h6>
        <div className={styles.iconContainer}>
          {this.props.icons.map(([id, Icon]) => (
            <Icon
              key={id}
              label="Icon which reverses itself while staying checked"
              className={this.state.toggleFill ? styles.iconReverse : styles.iconChecked}
              onClick={() => {
                this.setState({ toggleFill: !this.state.toggleFill });
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
ToggleIcons.displayName = 'ToggleIcons';
ToggleIcons.propTypes = {
  icons: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ToggleIcons;
