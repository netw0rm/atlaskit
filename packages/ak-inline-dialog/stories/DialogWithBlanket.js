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
    this.handleDialogClosed = this.handleDialogClosed.bind(this);
  }

  componentDidMount() {
    window.addEventListener('ak-after-close', this.handleDialogClosed);
  }

  componentWillUnmount() {
    window.removeEventListener('ak-after-close', this.handleDialogClosed);
  }

  handleClick() {
    this.setState({ open: true });
  }

  handleDialogClosed() {
    // if the dialog was closed from the inside
    // for example by pressing esc button or by clicking on the blanket
    // this.state will be out of sync with the dialog's open property
    // unless we manually sync it again
    if (this.props.open !== this.state.open) {
      this.setState({ open: false });
    }
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
          isBlanketTinted={this.props.blanketTinted}
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
  blanketTinted: React.PropTypes.bool,
  open: React.PropTypes.bool,
};

export default DialogWithBlanket;
