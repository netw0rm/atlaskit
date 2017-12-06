import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { InitializingScreenBase } from '../../../src/common/components/InitializingScreen';
import { AtlassianLogo } from '@atlaskit/logo';

storiesOf('common/InitializingScreen')
  .add('raw', () => <InitializingScreenBase isOpen />)
  .add('with header', () => (
    <InitializingScreenBase isOpen productLogo={<AtlassianLogo />} />
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
        <InitializingScreenBase isOpen={this.state.isLoading} />
        {!this.state.isLoading && <p>Ready!</p>}
      </div>
    );
  }
}
