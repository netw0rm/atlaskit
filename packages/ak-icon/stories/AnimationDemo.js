import { vdom } from 'skatejs';
import sample from 'lodash.sample';
import React from 'react';
import styles from './styles.less';
import componentStyles from '../src/shadow.less';

export default class AnimationDemo extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAnimation = this.toggleAnimation.bind(this);
  }

  randomIcon() {
    const Icon = sample(this.props.components);
    return <Icon className={componentStyles.locals.akIcon} />;
  }

  startAnimating() {
    this.timer = setInterval(() => this.forceUpdate(), 300);
  }

  stopAnimating() {
    clearInterval(this.timer);
  }

  toggleAnimation(e) {
    if (e.target.checked) {
      this.startAnimating();
    } else {
      this.stopAnimating();
    }
  }

  componentDidMount() {
    this.startAnimating();
    this.checkbox.checked = true;
  }

  componentWillUnmount() {
    this.stopAnimating();
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          id="animate"
          onChange={this.toggleAnimation}
          ref={(elem) => (this.checkbox = elem)}
        /> <label htmlFor="animate">Animate</label>
        <hr />
        <div className={styles.locals.container}>
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
        </div>
      </div>
    );
  }
}
