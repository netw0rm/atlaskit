import styled from 'styled-components';
import { placeholderStyles } from './mixins';

const Placeholder = styled.span`
  ${placeholderStyles}
`;

Placeholder.displayName = 'SingleSelectPlaceholder';

export default Placeholder;
