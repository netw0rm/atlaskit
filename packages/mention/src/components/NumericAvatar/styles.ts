import styled from 'styled-components';
import { akGridSizeUnitless, akColorN80 } from '@atlaskit/util-shared-styles';

/**
 * Avatar's are always rendered as medium in the MentionItem. The '4' multiplier matches the 'medium' size setting.
 */
const getDimensions = () => `
  height: ${akGridSizeUnitless * 4}px;
  line-height: ${akGridSizeUnitless * 4}px;
  width: ${akGridSizeUnitless * 4}px;
`;

// tslint:disable:next-line variable-name
export const NumericAvatarStyle = styled.span`
  align-content: center;
  align-items: center;
  background-color: ${akColorN80};
  border-radius: 100%;
  color: white;
  display: inline-block;
  font-size: 13px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  ${getDimensions}
`;
