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
          {ToggleableIcons.map(([id, Icon]) => (
            <div key={id}>
              <h6 style={{ padding: 0, margin: '10px 5px' }}>
                Click on an icon to see it 'check' and 'uncheck' itself
              </h6>
              <Icon
                className={this.state.toggleColor ? styles.iconChecked : styles.iconUnchecked}
                onClick={() => {
                  this.setState({ toggleColor: !this.state.toggleColor });
                }}
              />
              <h6 style={{ padding: 0, margin: '10px 5px' }}>
                Click on an icon to see it 'reverse' itself while staying 'checked'
              </h6>
              <Icon
                className={this.state.toggleFill ? styles.iconReverse : styles.iconChecked}
                onClick={() => {
                  this.setState({ toggleFill: !this.state.toggleFill });
                }}
              />
            </div>
          ))}
        </div>
      );
    }
  }
  return Example;
}
