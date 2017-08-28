import styled, { css } from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import placeholderStyles from './placeholderStyles';

/* Placeholder has been temporarily inlined until we have a helper library for such things */
const placeholderTemp = styles => (
  css`
    &::-webkit-input-placeholder {
      ${styles}
    }
    &:-moz-placeholder {
      ${styles}
    }
    &::-moz-placeholder {
      ${styles}
    }
    &:-ms-input-placeholder {
      ${styles}
    }
  `
);

const AutocompleteWrapper = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  padding: 0 ${gridSize}px;
`;
AutocompleteWrapper.displayName = 'SingleSelectAutocompleteWrapper';

const AutocompleteInput = styled.input`
  background: none;
  border: 0;
  color: ${colors.heading};
  font-size: 14px;
  margin: 0;
  min-height: ${gridSize() * 4.5}px;
  outline: 0;
  padding: 0;
  width: 100%;

  ${placeholderTemp(placeholderStyles)}
`;
AutocompleteInput.displayName = 'SingleSelectAutocompleteInput';

export default AutocompleteInput;
export {
  AutocompleteInput,
  AutocompleteWrapper,
};
