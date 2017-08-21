import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';
import Icon from '@atlaskit/icon/glyph/warning';

// exported for testing
export const WarningIcon = styled.div`
  align-items: center;
  color: ${colors.Y300};
  display: flex;
  /* Height is set to center it within the field. The original value of
  lineHeight pushed it up from center */
  height: 18px;
`;

const ValidationElement = ({ isDisabled, isInvalid, isLoading }) => {
  if (!isDisabled && isInvalid) {
    return (
      <WarningIcon>
        <Icon label="warning" size="medium" />
      </WarningIcon>
    );
  }

  return isLoading ? <Spinner /> : null;
};

ValidationElement.propTypes = {
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ValidationElement;
