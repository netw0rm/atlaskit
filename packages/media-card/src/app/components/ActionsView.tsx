/* tslint:disable:variable-name */
import * as React from 'react';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import MeatballIcon from '@atlaskit/icon/glyph/more';
import {AppCardAction} from '../model';
import {Actions, ActionsMenu} from '../styled/ActionsView';

export interface ActionsViewProps {
  actions: AppCardAction[];
  inverse: boolean;
}

function handleDropDownAction({item}) {
  item.handler();
}

export const ActionsView = (props: ActionsViewProps) => {
  const {actions, inverse} = props;

  const primary = actions && actions[0];
  const secondary = actions && actions.slice(1) || [];

  return (
    <Actions>
      {primary
        ? <Button onClick={primary.handler} theme={inverse && 'dark' || 'default'}>{primary.title}</Button>
        : null
      }
      {secondary.length
        ? (
          <ActionsMenu>
            {/* FIXME: dropdown trigger is 1px larger cause display: flex-inline on the trigger and wrapped in divs from popper - need to change something upstream */}
            <DropdownMenu
              items={[{
                items: secondary.map(action => ({
                  content: action.title,
                  handler: action.handler
                }))
              }]}
              onItemActivated={handleDropDownAction}
            >
              <Button appearance="subtle" iconBefore={<MeatballIcon label="actions" size="medium"/>} theme={inverse && 'dark' || 'default'}/>
            </DropdownMenu>
          </ActionsMenu>
        )
        : null
      }
    </Actions>
  );
};
