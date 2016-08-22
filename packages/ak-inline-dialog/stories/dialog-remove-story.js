import reactify from 'akutil-react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import AkInlineDialog from '../src/index';

const { React, ReactDOM } = window;
const { Component } = React;

const Dialog = reactify(AkInlineDialog, {
  React,
  ReactDOM,
});

class ToggleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    let dialog;

    if (this.state.show) {
      dialog = (
        <Dialog
          open
          target="#target"
          position="bottom left"
          hasBlanket={false}
        >
          <div>
            Demo
          </div>
        </Dialog>
      );
    }


    return (
      <div>
        <div><button onClick={this.handleClick} id="target">Show/hide</button></div>
        {dialog}
      </div>
    );
  }
}

storiesOf(`${name} ToggleDemo`, module)
  .add('Toggle add/remove from dom', () => (<ToggleDemo />));
