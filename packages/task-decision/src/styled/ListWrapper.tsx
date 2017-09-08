import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const ListWrapper = styled.ol`
  list-style-type: none;
  margin: 0 ${props => props.theme.appearance === 'elevated' ? '2px' : 0};
  padding-left: 0;
`;

export default ListWrapper;
