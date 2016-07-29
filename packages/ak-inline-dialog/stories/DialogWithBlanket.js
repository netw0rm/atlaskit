import reactify from 'akutil-react';
import AkInlineDialog from '../src/index';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import styles from 'style!./../src/host.less';

const { React, ReactDOM } = window;
const { Component } = React;

const Dialog = reactify(AkInlineDialog, {
  React,
  ReactDOM,
});

class DialogWithBlanket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherChecked: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
    this.handleEsqPress = this.handleEsqPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('inline-dialog-escape', this.handleEsqPress);
  }

  componentWillUnmount() {
    window.removeEventListener('inline-dialog-escape', this.handleEsqPress);
  }

  handleClick() {
    this.setState({ open: !this.props.open });
  }

  handleEsqPress() {
    this.setState({ open: this.props.open });
  }

  render() {
    return (
      <div style={this.props.style}>
        <button
          onClick={this.handleClick}
          style={{ border: 0, background: '#dfdfdf' }}
        >
          test button
        </button>
        <Dialog
          className={styles.akInlineDialog}
          open={this.state.open}
          target="#target"
          attachment={this.props.attachTo}
          position={this.props.position}
          hasBlanket={this.props.hasBlanket}
          isBlanketObscure={this.props.blanketObscure}
        >
          <button
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            style={{ border: 0, background: '#dfdfdf' }}
          >
            text inside
          </button>
        </Dialog>
      </div>
    );
  }
}

DialogWithBlanket.propTypes = {
  event: React.PropTypes.string,
  position: React.PropTypes.string,
  style: React.PropTypes.object,
  attachTo: React.PropTypes.string,
  hasBlanket: React.PropTypes.bool,
  blanketObscure: React.PropTypes.bool,
  open: React.PropTypes.bool,
};

export default DialogWithBlanket;
