/** @jsx React.createElement */

import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import InlineDialog from '../src/index';
import { define } from 'skatejs';
import { name } from '../package.json';

const { React, ReactDOM, uniqueWebComponentOld } = window;
const { Component } = React;

const Dialog = reactify(uniqueWebComponentOld(InlineDialog, define), {
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
          open={this.state.open}
          target="#target"
          attachment={this.props.attachTo}
          position={this.props.position}
        >
            {this.props.position}
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

storiesOf(name, module)
  .add('All dialogs together, open on click', () => (
    <div
      id="target"
      style={{
        width: '320px',
        height: '200px',
        background: '#ccc',
        margin: '100px auto',
        position: 'relative',
        padding: '0px',
      }}
    >
      <DialogWithButton
        event="click"
        position="top left"
        style={{ position: 'absolute', top: 0, left: '50px', width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="click"
        position="top center"
        style={{ position: 'absolute', top: 0, left: '50%', width: '50px', marginLeft: '-25px' }}
      />
      <DialogWithButton
        event="click"
        position="top right"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-100px' }}
      />
      <DialogWithButton
        event="click"
        position="right top"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-50px', marginTop: '30px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="right middle"
        style={{ position: 'absolute', top: '50%', left: '100%', width: '50px', marginTop: '-15px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="right bottom"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginTop: '-60px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom left"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginLeft: '50px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom center"
        style={{ position: 'absolute', top: '100%', left: '50%', width: '50px', marginLeft: '-25px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom right"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginLeft: '-100px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="left top"
        style={{ position: 'absolute', top: '30px', left: 0, width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="click"
        position="left middle"
        style={{ position: 'absolute', top: '50%', left: 0, width: '50px', marginTop: '-15px' }}
      />
      <DialogWithButton
        event="click"
        position="left bottom"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginTop: '-60px' }}
      />
    </div>
  ))
  .add('All dialogs together, open on hover', () => (
    <div
      id="target"
      style={{
        width: '320px',
        height: '200px',
        background: '#ccc',
        margin: '100px auto',
        position: 'relative',
        padding: '0px' }}
    >
      <DialogWithButton
        event="hover"
        position="top left"
        style={{ position: 'absolute', top: 0, left: '50px', width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="hover"
        position="top center"
        style={{ position: 'absolute', top: 0, left: '50%', width: '50px', marginLeft: '-25px' }}
      />
      <DialogWithButton
        event="hover"
        position="top right"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-100px' }}
      />
      <DialogWithButton
        event="hover"
        position="right top"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-50px', marginTop: '30px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="right middle"
        style={{ position: 'absolute', top: '50%', left: '100%', width: '50px', marginTop: '-15px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="right bottom"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginTop: '-60px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom left"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginLeft: '50px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom center"
        style={{ position: 'absolute', top: '100%', left: '50%', width: '50px', marginLeft: '-25px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom right"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginLeft: '-100px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="left top"
        style={{ position: 'absolute', top: '30px', left: 0, width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="hover"
        position="left middle"
        style={{ position: 'absolute', top: '50%', left: 0, width: '50px', marginTop: '-15px' }}
      />
      <DialogWithButton
        event="hover"
        position="left bottom"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginTop: '-60px' }}
      />
    </div>
  ))
  .add('Dialogs could be flipped', () => (
    <div
      style={{
        width: '60%',
        height: '350px',
        background: '#ccc',
        margin: '10px auto',
        position: 'relative',
        overflow: 'auto',
        padding: '0px',
      }}
    >
      <div
        style={{
          width: '2000px',
          height: '2000px',
          border: '1px solid red',
        }}
      >
      </div>
      <div
        id="target"
        style={{ position: 'absolute', top: '150px', left: '150px', width: '150px', height: '50px', background: '#ff0000' }} // eslint-disable-line max-len
      >
        <DialogWithButton event="click" position="top left" attachTo="scrollParent" />
      </div>
    </div>
  ));
