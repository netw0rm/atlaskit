/* eslint-disable react/prop-types */
import classNames from 'classnames';
import storyStyles from 'style!./stories.less';

const { React } = window;
const { Component } = React;

const boxClass = storyStyles.box;

/* This is a simple component used to consume an animation from shared-styles */
class AnimatedBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.animationDone = this.animationDone.bind(this);
  }
  componentDidMount() {
    const elem = this.refs.animated;
    elem.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    const elem = this.refs.animated;
    elem.removeEventListener('animationend', this.animationDone);
  }
  handleClick() {
    this.setState({ animating: true });
  }

  animationDone() {
    this.setState({ animating: false });
  }

  render() {
    const className = classNames({
      [boxClass]: true,
      [storyStyles[this.props.boxStyle]]: true,
      [storyStyles[this.props.animationClass]]: this.state.animating,
    });
    return (
      <div className={className} onClick={this.handleClick} ref="animated">
        <span>{this.props.children}</span>
      </div>
    );
  }
}

export default AnimatedBox;
/* eslint-enable react/prop-types */
