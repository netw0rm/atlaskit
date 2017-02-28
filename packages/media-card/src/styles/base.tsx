/* tslint:disable:variable-name */
import styled from 'styled-components';

export * from './mixins';
export * from './easing';

export const Root = styled.div`
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

export const cardShadow = () => `
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
`;

export default Root;
