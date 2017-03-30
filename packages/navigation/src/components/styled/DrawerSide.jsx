import styled from 'styled-components';
import { globalVerticalPaddingTop, globalOpenWidth } from '../../shared-variables';

export default styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: ${globalVerticalPaddingTop}px 0 ${globalVerticalPaddingTop * 2}px 0;
  width: ${globalOpenWidth};
`;
