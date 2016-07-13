import reactify from 'akutil-react';
import definition from '../src/index';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import { name } from '../package.json';
import styles from 'style!./../src/host.less'; // eslint-disable-line import/no-unresolved

const { React, ReactDOM, uniqueWebComponent } = window;
const { Component } = React;

const Dialog = reactify(uniqueWebComponent(name, definition, define), {
  React,
  ReactDOM,
});

class DialogWithButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherChecked: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  handleClick() {
    if (this.props.event === 'click') {
      this.setState({ open: !this.state.open });
    }
  }

  handleMouseOver() {
    if (this.props.event === 'hover') {
      this.setState({ open: true });
    }
  }

  handleMouseOut() {
    if (this.props.event === 'hover') {
      this.setState({ open: false });
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <button
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          style={{ border: 0, background: '#dfdfdf' }}
        >
          {this.props.position}
        </button>
        <Dialog
          className={styles.akInlineDialog}
          open={this.state.open}
          target="#target"
          attachment={this.props.attachTo}
          position={this.props.position}
        >
          <button
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            style={{ border: 0, background: '#dfdfdf' }}
          >
            {this.props.position}
          </button>
        </Dialog>
      </div>
    );
  }
}
DialogWithButton.propTypes = {
  event: React.PropTypes.string,
  position: React.PropTypes.string,
  style: React.PropTypes.object,
  attachTo: React.PropTypes.string,
};

export default DialogWithButton;
