import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';

const Icon = <ErrorIcon label="Error icon" primaryColor="#ff7451" />;

export default class ErrorFlag extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    showFlag: PropTypes.bool,
    onDismissed: PropTypes.func,
  };

  render() {
    return (
      <FlagGroup onDismissed={this.props.onDismissed}>
        {this.props.showFlag
          ? <Flag
            icon={Icon}
            id="ErrorFlag"
            key="ErrorFlag"
            title={this.props.title}
            description={this.props.description}
          />
          : null}
      </FlagGroup>
    );
  }
}
