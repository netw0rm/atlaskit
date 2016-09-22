import { vdom } from 'skatejs';
import styles from 'style!./styles.less';

export default function toggleIcons(dependencies) {
  const { React, ToggleableIcons } = dependencies;

  class Example extends React.Component {
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
            Click on this icons to see them 'check' and 'uncheck' itselves
          </h6>
          <div className={styles.iconContainer}>
            {ToggleableIcons.map(([id, Icon]) => (
              <Icon
                key={id}
                className={this.state.toggleColor ? styles.iconChecked : styles.iconUnchecked}
                onClick={() => {
                  this.setState({ toggleColor: !this.state.toggleColor });
                }}
              />
            ))}
          </div>
          <h6 style={{ padding: 0, margin: '10px 5px' }}>
            Click on the icons to see them 'reverse' itself while staying 'checked'
          </h6>
          <div className={styles.iconContainer}>
            {ToggleableIcons.map(([id, Icon]) => (
              <Icon
                key={id}
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
  return Example;
}
