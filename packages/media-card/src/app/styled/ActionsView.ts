/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akColorR400} from '@atlaskit/util-shared-styles';
import {center} from '../../styles';

export interface MessageProps {
  tryAgain?: boolean;
}

export const Actions = styled.div`
  ${center}
  font-size: 14px;
`;

export const ActionsMenu = styled.div`
  display: flex;
  margin-left: ${akGridSizeUnitless / 2}px;
`;

const Message = styled.span`
  margin-right: ${({tryAgain}: MessageProps) => tryAgain ? 0 : 5}px;
`;

export const FailureMessageBlock = styled.div`
`;

export const FailureMessage = styled(Message)`
  color: ${akColorR400};
  vertical-align: middle;
  margin-left: 5px;
` as any;

export const SuccessMessage = styled(Message)`
`;

export const ActionButtonWrapper = styled.div`
  margin-left: 5px;
`;
