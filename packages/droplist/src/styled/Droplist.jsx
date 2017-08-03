import styled from 'styled-components';
import Theme from './theme';
import { itemHeight } from '../theme/item-theme';

const { borderRadius, spacing } = Theme.$;

/* When dropdown contains more than 9 elements (droplist items, droplist groups),
 * it should have scroll and cut off half of the 10th item to indicate that there are more
 * items then are seen. This was previously calculated by mapping over children, but with
 * the current composed API it is simpler to just assume 9 items. */
const defaultMaxHeight = (9.5 * itemHeight) + (spacing / 2);
const getMaxHeight = ({ isTall, maxHeight }) => {
  if (maxHeight) {
    return `${maxHeight}px`;
  }
  return isTall ? 'none' : `${defaultMaxHeight}px`;
};

export default styled.div`
  display: inline-flex;

  ${props => (props.fit && `
    display: block;
    flex: 1 1 auto;
  `)}
`;

export const Content = styled.div`
  background: ${Theme.Content.background};
  border-radius: ${borderRadius};
  box-shadow: ${Theme.Content.boxShadow};
  box-sizing: border-box;
  overflow: auto;
  padding: ${spacing / 2}px 0;
  max-height: ${getMaxHeight};
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: ${20 * spacing}px;
  padding: ${2.5 * spacing}px;
`;

export const Trigger = styled.div`
  cursor: pointer;
  display: inline-flex;
  transition-duration: 0.2s;
  transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);

  ${props => (props.fit && `
    box-sizing: border-box;
    display: block;
  `)}
`;
