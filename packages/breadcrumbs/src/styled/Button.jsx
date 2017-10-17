// @flow
import Button from '@atlaskit/button';
import styled from 'styled-components';

const ButtonElement = styled(Button)`
  flex-shrink: 1;
  min-width: 0
`;

const ShortButton = styled(Button)`
  max-width: ${({ truncationWidth }: { truncationWidth: number }) => truncationWidth}px !important;
`;

export { ButtonElement as Button, ShortButton };
