import reactify from 'akutil-react';
import AkInlineDialog from '../src/index';
import styles from 'style!./../src/host.less';

import React from 'react';
const { Component } = React;

const Dialog = reactify(AkInlineDialog);

class DialogWithInput extends Component {
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
          className={styles.akInlineDialog}
          open={this.state.open}
          target="#target"
          position="top left"
          hasBlanket={false}
        >
          some text in inline-dialog
        </Dialog>
      </div>
    );
  }
}
DialogWithInput.propTypes = {
};

export default DialogWithInput;
