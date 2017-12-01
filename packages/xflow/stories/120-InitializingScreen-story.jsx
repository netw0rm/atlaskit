import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import InitializingScreen from '../src/common/components/InitializingScreen';
import mockXFlowProviderFactory from './helpers/mockXFlowProviderFactory';
import JiraToJSWXFlowProvider from '../src/product-xflow-providers/JiraToJSWXFlowProvider';

const MockXFlowProvider = mockXFlowProviderFactory(JiraToJSWXFlowProvider);

storiesOf('common/InitializingScreen')
  .add('raw', () => <InitializingScreen isOpen />)
  .add('with header', () => (
    <MockXFlowProvider>
      <InitializingScreen isOpen />
    </MockXFlowProvider>
  ))
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
