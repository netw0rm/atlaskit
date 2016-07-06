import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition as inlineDialog } from '../src/index';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import { name } from '../package.json';

const { React, ReactDOM, uniqueWebComponent } = window;
const { Component } = React;

const Dialog = reactify(uniqueWebComponent(name, inlineDialog, define), {
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
          renderElementTo="#root"
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

class DialogWithInput extends Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange(e) {
    if (e.target.value && e.target.value.length >= 3) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  handleBlur() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <div style={{ border: '1px solid #f0f0f0', marginBottom: '10px', padding: '50px' }}>
          <p>You can watch the cucumber tests via VNC by replacing the `selenium/node-chrome` with `selenium/node-chrome-debug` in `docker-compose-browserstack.yml` and connect to [vnc://0.0.0.0:5900](vnc://0.0.0.0:5900). Password is `secret`. For more information have a look at the [Selenium docker images](https://github.com/SeleniumHQ/docker-selenium).
          </p><p>
          > Hint: Whilst cucumber is running (or after a test failed), you can access the [Storybook](http://0.0.0.0:9001/) instance that the tests were run against.
          </p><p>
          > Hint: If you have problems starting the
          cucumber setup locally, try re-generating the docker images via:
          `npm run cucumber/single my-component -- --force-recreate`
          </p>
        </div>
        <input
          id="target"
          type="text"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          style={{ border: '1px solid #dedede', background: '#fff',
            borderRadius: '4px', padding: '10px',
            width: '100%', boxSizing: 'border-box' }}
        />
        <Dialog
          open={this.state.open}
          target="#target"
          position="top left"
          renderElementTo="#root"
        >
          some text in inline-dialog
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

DialogWithInput.propTypes = {
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
  .add('Dialogs could be constrain to a parent', () => (
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
  ))
  .add('Dialog is showing on input onchange', () => (
    <DialogWithInput />
  ));
