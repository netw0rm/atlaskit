/* tslint:disable:variable-name */
import styled from 'styled-components';
import Button, {Props} from '@atlaskit/button';
import {akColorN0, akColorB50, akColorB100} from '@atlaskit/util-shared-styles';
import {center} from '../../styles';
import {colorWithAlpha} from '../../utils/colorWithAlpha';

export const Actions = styled.div`
  ${center}
  font-size: 14px;
`;

export interface ActionButtonProps {
  inverse: boolean;
}

const btnHoverState = `
  color: ${akColorN0};
  background-color: ${colorWithAlpha(akColorN0, 0.12)};
`;

const btnActiveState = `
  color: ${akColorB50};
  background-color: ${colorWithAlpha(akColorB100, 0.20)};
`;

const btnFocusState = `
  box-shadow: 0 0 0 2px ${akColorB100};
`;

export const ActionButton = styled(Button)`
  ${({inverse}: ActionButtonProps) => inverse && `
    &&& { /* this selector is a hack to override button styles... slightly nicer than !important??? */

      color: ${akColorN0};
      background-color: ${colorWithAlpha(akColorN0, 0.08)};

      &:hover {
        ${btnHoverState}
      }

      &:active {
        ${btnActiveState}
      }

      &:focus {
        ${btnFocusState}
      }

    }
  ` || ''}
`;

export const ActionsMenuButton = styled(Button)`
  ${({inverse}: ActionButtonProps) => inverse && `
    &&& { /* this selector is a hack to override button styles... slightly nicer than !important??? */

      color: ${akColorN0};

      &:hover {
        ${btnHoverState}
      }

      &:active {
        ${btnActiveState}
      }

      &:focus {
        ${btnFocusState}
      }

    }
  ` || ''}
`;

export const ActionsMenu = styled.div`
  display: flex;
  margin-left: 4px;
`;
