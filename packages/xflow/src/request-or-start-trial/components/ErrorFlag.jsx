import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';

const Icon = <ErrorIcon label="Error icon" primaryColor={colors.R200} />;

export default class ErrorFlag extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    showFlag: PropTypes.bool,
    onDismissed: PropTypes.func,
    flagRetry: PropTypes.bool,
    flagActions: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    return (
      <FlagGroup onDismissed={this.props.onDismissed}>
        {this.props.showFlag
          ? <Flag
            icon={Icon}
            actions={this.props.flagRetry && this.props.flagActions}
            id="ErrorFlag"
            key="ErrorFlag"
            title={this.props.title}
            description={this.props.description}
          />
          : []}
      </FlagGroup>
    );
  }
}
