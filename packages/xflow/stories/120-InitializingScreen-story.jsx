import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import InitializingScreen from '../src/common/components/InitializingScreen';

storiesOf('common/InitializingScreen')
  .add('raw', () => <InitializingScreen isOpen />)
  .add('real case (2s loading)', () => <TestComponent />);

class TestComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 2000);
  }

  render() {
    return (
      <div>
        <InitializingScreen isOpen={this.state.isLoading} />
        {!this.state.isLoading && <p>Ready!</p>}
      </div>
    );
  }
}
