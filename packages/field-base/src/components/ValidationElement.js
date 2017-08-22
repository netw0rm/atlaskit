import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@atlaskit/spinner';
import Icon from '@atlaskit/icon/glyph/warning';
import theme from '../styled/theme';

// exported for testing
export const WarningIcon = styled.div`
  align-items: center;
  color: ${theme.icon.color};
  display: flex;
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
