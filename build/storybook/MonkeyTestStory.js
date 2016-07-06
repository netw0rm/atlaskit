import React from 'react';
import gremlins from 'gremlins.js/src/main.js';

class MonkeyTestStory extends React.Component {
  componentDidMount() {
    this.horde = gremlins.createHorde();
    this.horde.unleash();
  }

  componentWillUnmount() {
    this.horde.stop();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
MonkeyTestStory.displayName = 'MonkeyTestStory';
MonkeyTestStory.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default MonkeyTestStory;
