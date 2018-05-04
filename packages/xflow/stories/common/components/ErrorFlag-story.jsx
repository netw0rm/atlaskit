import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ErrorFlag from '../../../src/common/components/ErrorFlag';

import setupStorybookAnalytics from '../../helpers/setupStorybookAnalytics';

storiesOf('common/ErrorFlag', module)
  .addDecorator(story => setupStorybookAnalytics(story()))
  .add('basic', () =>
    <ErrorFlag
      showFlag
      title="(Title) Oops... Something went wrong"
      description="(description)"
      source="(source)"
    />
  )
  .add('advanced', () =>
    <ErrorFlag
      showFlag
      title="(Title) Oops... Something went wrong"
      description="(description) Let's try again."
      flagActions={[
      { content: 'retry', onClick: action('Flag action') },
      ]}
      source="(source)"
      onDismissed={action('Flag dismissed.')}
    />
  )
  .add('show/hide transitions', () =>
    <TestComponent />
  );

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { showFlag: false };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState(state => ({ showFlag: !state.showFlag }))}>
          {this.state.showFlag ? 'hide' : 'show'}
        </button>
        <ErrorFlag
          showFlag={this.state.showFlag}
          title="(Title) Oops... Something went wrong"
          description="(description)"
          source="(source)"
        />
      </div>
    );
  }
}
