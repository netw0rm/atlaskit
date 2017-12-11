import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flag, { FlagGroup } from '@atlaskit/flag';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { colors } from '@atlaskit/theme';
import { withAnalytics } from '@atlaskit/analytics';

const Icon = <CheckCircleIcon label="Success icon" primaryColor={colors.G300} />;

class SuccessFlagBase extends Component {
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
      firePrivateAnalyticsEvent(`xflow.${source}.success-flag.displayed`);
    }
    return (
      <FlagGroup onDismissed={onDismissed}>
        {showFlag
          ? <Flag
            icon={Icon}
            actions={flagActions}
            id="SuccessFlag"
            key="SuccessFlag"
            title={title}
            description={description}
          />
          : []}
      </FlagGroup>
    );
  }
}

const SuccessFlag = withAnalytics(SuccessFlagBase);

export default SuccessFlag;
