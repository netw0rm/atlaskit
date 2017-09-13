/**
 * This component is responsible for rendering all the "buttons" the user can interact with
 */

import * as React from 'react';
import {ReactNode} from 'react';
import {PrimaryButton} from './PrimaryButton';
import {DeleteButton} from './DeleteButton';
import {Menu} from './Menu';
import {Wrapper} from './styled';

function findFirstInArray<T>(array: T[], match: (t: T) => boolean) {
  for (let i=0; i<array.length; ++i) {
    if (match(array[i])) {
      return array[i];
    }
  }
  return null;
}

export interface Action {
  type?: 'delete' | 'primary';
  label: ReactNode;
  handler: () => void;
}

export interface ActionsProps {

  /**
   * The theme
   *  - light - icons and text are white
   *  - dark (default) - icons and text are dark
   */
  theme?: 'light' | 'dark';

  /**
   * The size and padding applied to the buttons
   *  - true (default) - heights and paddings are smaller
   *  - false - heights and paddings are larger
   */
  compact?: boolean;

  /**
   * Whether the action button can be shown
   *  - true (default) - the primary button is shown WHEN the `actions` prop contains an action with
   *    a type of `primary`
   *  - false - the primary button is NEVER shown and the primary action appears as a normal menu
   *    action in its original ordering
   */
  canShowPrimaryButton?: boolean;

  /**
   * Whether the delete button can be shown
   *  - true (default) - the delete button is shown WHEN the `actions` prop contains an action with
   *   a type of `delete` AND there are no other actions to display in the menu
   *  - false - the delete button is NEVER shown and the delete action appears as a normal menu
   *   action in its original ordering
   */
  canShowDeleteButton?: boolean;

  /**
   * The actions to display in a button and/or in a menu
   */
  actions?: Action[];

  /**
   * A callback called when the user causes the menu visibility to change
   */
  onToggleMenu?: () => void;

}

export interface ActionsState {
}

export class Actions extends React.Component<ActionsProps, ActionsState> {

   static defaultProps: Partial<ActionsProps> = {
    theme: 'dark',
    compact: false,
    canShowDeleteButton: true,
    canShowPrimaryButton: true,
    actions: []
  };

  private get buttonTheme() {
    const {theme} = this.props;
    return theme === 'dark' ? 'default' : 'dark'; // our theme is the reverse of @atlaskit/Button's
  }

  get primaryAction(): Action | null {
    const {canShowPrimaryButton, actions = []} = this.props;

    // check we're allowed to display the primary button
    if (!canShowPrimaryButton) {
      return null;
    }

    return findFirstInArray<Action>(actions, action => action.type === 'primary');
  }

  get deleteAction(): Action | null {
    const {canShowDeleteButton, actions = []} = this.props;
    const {primaryAction} = this;

    // check we're allowed to display the delete button
    if (!canShowDeleteButton) {
      return null;
    }

    // check if there are any more actions that need to be displayed in the menu
    if ((primaryAction && actions.length > 2) || (!primaryAction && actions.length > 1)) {
      return null;
    }

    return findFirstInArray<Action>(actions, action => action.type === 'delete');
  }

  get menuActions(): Action[] {
    const {actions = []} = this.props;
    const {deleteAction, primaryAction} = this;

    return actions.filter(action => {

      // exclude this exact delete action
      // (the user could have accidentally specified multiple)
      if (action === deleteAction) {
        return false;
      }

      // exclude this exact primary action
      // (the user could have accidentally specified multiple)
      if (action === primaryAction) {
        return false;
      }

      return true;
    });
  }

  private renderPrimaryButton() {
    const {compact} = this.props;
    const {primaryAction} = this;

    if (!primaryAction) {
      return null;
    }

    return (
      <PrimaryButton theme={this.buttonTheme} compact={compact} onClick={primaryAction.handler}>
        {primaryAction.label}
      </PrimaryButton>
    );
  }

  private renderDeleteButton() {
    const {compact} = this.props;
    const {deleteAction} = this;

    if (!deleteAction) {
      return null;
    }

    return (
      <DeleteButton theme={this.buttonTheme} compact={compact} onClick={deleteAction.handler}/>
    );
  }

  private renderMenu() {
    const {compact, onToggleMenu} = this.props;
    const {menuActions} = this;

    if (!menuActions.length) {
      return null;
    }

    const menuItems = menuActions.map(({label, handler}) => ({content: label, handler}));
    return (
      <Menu theme={this.buttonTheme} compact={compact} items={menuItems} onOpenChange={onToggleMenu}/>
    );
  }

  render() {
    const {actions = []} = this.props;

    if (!actions.length) {
      return null;
    }

    return (
      <Wrapper>
        {this.renderDeleteButton()}
        {this.renderPrimaryButton()}
        {this.renderMenu()}
      </Wrapper>
    );

  }

}

