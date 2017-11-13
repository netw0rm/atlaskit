import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';
import Icon from '@atlaskit/icon/glyph/warning';

// exported for testing
export const WarningIcon = styled.div`
  align-items: center;
  color: ${colors.yellow};
  display: flex;
  flex-shrink: 0;
`;

// Spinner needs set height to avoid height jumping
// Also needs a margin so there is space between it and preceding text
const SpinnerParent = styled.div`
  height: 20px;
  margin-left: 10px;
`;

const ValidationElement = ({ isDisabled, isInvalid, isLoading }) => {
  if (!isDisabled && isInvalid) {
    return (
      <WarningIcon>
        <Icon label="warning" />
      </WarningIcon>
    );
  }

  return isLoading ? (
    <SpinnerParent>
      <Spinner size="small" />
    </SpinnerParent>
  ) : null;
};

ValidationElement.propTypes = {
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ValidationElement;
