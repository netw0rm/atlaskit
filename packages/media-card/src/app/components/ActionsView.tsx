/* tslint:disable:variable-name */
import * as React from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import MeatballIcon from '@atlaskit/icon/glyph/more';
import {Action} from '../model';
import {Actions, ActionButton, ActionsMenuButton, ActionsMenu} from '../styled/ActionsView';

export interface ActionsViewProps {
  actions: Action[];
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
        ? <ActionButton onClick={primary.handler} inverse={inverse}>{primary.title}</ActionButton>
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
              <ActionsMenuButton appearance="subtle" iconBefore={<MeatballIcon label="actions" size="medium"/>} inverse={inverse}/>
            </DropdownMenu>
          </ActionsMenu>
        )
        : null
      }
    </Actions>
  );
};
