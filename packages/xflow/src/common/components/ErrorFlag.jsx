import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
import { withAnalytics } from '@atlaskit/analytics';

const Icon = <ErrorIcon label="Error icon" primaryColor={colors.R200} />;

class ErrorFlagBase extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    showFlag: PropTypes.bool,
    source: PropTypes.string,
    flagActions: PropTypes.arrayOf(PropTypes.object),

    onDismissed: PropTypes.func,

    firePrivateAnalyticsEvent: PropTypes.func,
  };

  render() {
    const {
      description,
      firePrivateAnalyticsEvent,
      flagActions,
      onDismissed,
      showFlag,
      source,
      title,
    } = this.props;
    if (showFlag) {
      firePrivateAnalyticsEvent(`xflow.${source}.error-flag.displayed`);
    }
    return (
      <FlagGroup onDismissed={onDismissed}>
        {showFlag
          ? <Flag
            icon={Icon}
            actions={flagActions}
            id="ErrorFlag"
            key="ErrorFlag"
            title={title}
            description={description}
          />
          : []}
      </FlagGroup>
    );
  }
}

const ErrorFlag = withAnalytics(ErrorFlagBase);

export default ErrorFlag;
