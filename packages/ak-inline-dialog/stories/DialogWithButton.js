import reactify from 'akutil-react';
import AkInlineDialog from '../src/index';
import styles from '../src/shadow.less';

import React from 'react';
const { Component } = React;

const Dialog = reactify(AkInlineDialog);

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
          className={styles.locals.akInlineDialog}
          open={this.state.open}
          target="#target"
          attachment={this.props.attachTo}
          position={this.props.position}
          hasBlanket={false}
          boundariesElement={this.props.boundariesElement}
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
  boundariesElement: React.PropTypes.string,
};

export default DialogWithButton;
