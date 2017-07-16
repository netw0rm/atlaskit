import * as React from 'react';
import {shallow} from 'enzyme';
import {CardAction, CardActions} from '../../src/utils/cardActions';
import {DeleteButton} from '../../src/utils/cardActions/components/DeleteButton';
import {PrimaryButton} from '../../src/utils/cardActions/components/PrimaryButton';
import {Menu} from '../../src/utils/cardActions/components/Menu';

const primaryAction1: CardAction = {type: 'primary', content: 'View', handler: () => {/* noop */}};
const primaryAction2: CardAction = {type: 'primary', content: 'Visit', handler: () => {/* noop */}};
const deleteAction1: CardAction = {type: 'delete', content: 'Delete', handler: () => {/* noop */}};
const deleteAction2: CardAction = {type: 'delete', content: 'Unlink', handler: () => {/* noop */}};
const genericAction1: CardAction = {content: 'Share', handler: () => {/* noop */}};
const genericAction2: CardAction = {content: 'Resolve', handler: () => {/* noop */}};

describe('CardActions', () => {

  describe('.render()', () => {

    it('should not render anything when there are no actions', () => {
      const element = shallow(<CardActions actions={[]}/>);
      expect(element.get(0)).toBeNull();
    });

    describe('PrimaryButton', () => {

      describe('canShowPrimaryButton=false', () => {

        it('should not render the primary button when there are no primary actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={false} actions={[genericAction1, genericAction2]}/>);
          expect(element.find(PrimaryButton).exists()).toBeFalsy();
        });

        it('should not render the primary button when there is a single primary action', () => {
          const element = shallow(<CardActions canShowPrimaryButton={false} actions={[primaryAction1]}/>);
          expect(element.find(PrimaryButton).exists()).toBeFalsy();
        });

        it('should not render the primary button when there is a single primary action amongst other actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={false} actions={[genericAction1, primaryAction1]}/>);
          expect(element.find(PrimaryButton).exists()).toBeFalsy();
        });

        it('should not render the primary button when there are multiple primary actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={false} actions={[primaryAction1, primaryAction2]}/>);
          expect(element.find(PrimaryButton).exists()).toBeFalsy();
        });

      });

      describe('canShowPrimaryButton=true', () => {

        it('should not render the primary button when there are no primary actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={true} actions={[genericAction1, genericAction2]}/>);
          expect(element.find(PrimaryButton).exists()).toBeFalsy();
        });

        it('should render the primary button when there is a single primary action', () => {
          const element = shallow(<CardActions canShowPrimaryButton={true} actions={[primaryAction1]}/>);
          const button = element.find(PrimaryButton);
          expect(button.exists()).toBeTruthy();
          expect(button.props().children).toEqual(primaryAction1.content);
          expect(button.props().onClick).toEqual(primaryAction1.handler);
        });

        it('should render the primary button when there is a single primary action amongst other actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={true} actions={[genericAction1, primaryAction1]}/>);
          const button = element.find(PrimaryButton);
          expect(button.exists()).toBeTruthy();
          expect(button.props().children).toEqual(primaryAction1.content);
          expect(button.props().onClick).toEqual(primaryAction1.handler);
        });

        it('should render the primary button when there are multiple primary actions', () => {
          const element = shallow(<CardActions canShowPrimaryButton={true} actions={[primaryAction1, primaryAction2]}/>);
          const button = element.find(PrimaryButton);
          expect(button.exists()).toBeTruthy();
          expect(button.props().children).toEqual(primaryAction1.content);
          expect(button.props().onClick).toEqual(primaryAction1.handler);
        });

      });

    });

    describe('DeleteButton', () => {

      describe('canShowDeleteButton=false', () => {

        it('should not render the delete button when there are no delete actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={false} actions={[genericAction1, genericAction2]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

        it('should not render the delete button when there is a single delete action', () => {
          const element = shallow(<CardActions canShowDeleteButton={false} actions={[deleteAction1]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

        it('should not render the delete button when there is a single delete action amongst other actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={false} actions={[genericAction1, deleteAction1]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

        it('should not render the delete button when there are multiple delete actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={false} actions={[deleteAction1, deleteAction2]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

      });

      describe('canShowDeleteButton=true', () => {

        it('should not render the delete button when there are no delete actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={true} actions={[genericAction1, genericAction2]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

        it('should render the delete button when there is a single delete action', () => {
          const element = shallow(<CardActions canShowDeleteButton={true} actions={[deleteAction1]}/>);
          const button = element.find(DeleteButton);
          expect(button.exists()).toBeTruthy();
          expect(button.props().onClick).toEqual(deleteAction1.handler);
        });

        it('should not render the delete button when there is a single delete action amongst other actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={true} actions={[genericAction1, deleteAction1]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

        it('should render the delete button when there are multiple delete actions', () => {
          const element = shallow(<CardActions canShowDeleteButton={true} actions={[deleteAction1, deleteAction2]}/>);
          expect(element.find(DeleteButton).exists()).toBeFalsy();
        });

      });

    });

    describe('Menu', () => {

      describe('canShowDeleteButton=false && canShowPrimaryButton=false', () => {

        const otherProps = {
          canShowDeleteButton: false,
          canShowPrimaryButton: false
        };

        it('should render the menu with the delete action when there is a single delete action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should render the menu with the delete action when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should render the menu with the primary action when there is a single primary action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

        it('should render the menu with the primary action when there are mutliple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

      });

      describe('canShowDeleteButton=true && canShowPrimaryButton=false', () => {

        const otherProps = {
          canShowDeleteButton: true,
          canShowPrimaryButton: false
        };

        it('should not render the menu when there is a single delete action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeFalsy();
        });

        it('should render the menu with the delete action when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should render the menu with the primary action when there is a single primary action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

        it('should render the menu with the primary action when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

      });

      describe('canShowDeleteButton=false && canShowPrimaryButton=true', () => {

        const otherProps = {
          canShowDeleteButton: false,
          canShowPrimaryButton: true
        };

        it('should render the menu with the delete action when there is a single delete action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should render the menu with the delete action when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should not render the menu when there is a single primary action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeFalsy();
        });

        it('should render the menu without the primary action when when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).not.toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

      });

      describe('canShowDeleteButton=true && canShowPrimaryButton=true', () => {

        const otherProps = {
          canShowDeleteButton: true,
          canShowPrimaryButton: true
        };

        it('should not render the menu when there is a single delete action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeFalsy();
        });

        it('should render the menu with the delete action when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[deleteAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(2);
          expect(items[0]).toEqual({
            content: deleteAction1.content,
            handler: deleteAction1.handler
          });
        });

        it('should not render the menu when there is a single primary action', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeFalsy();
        });

        it('should render the menu without the primary action when when there are multiple actions', () => {
          const element = shallow(<CardActions {...otherProps} actions={[primaryAction1, genericAction1]}/>);
          const menu = element.find(Menu);
          expect(menu.exists()).toBeTruthy();
          const items = menu.prop('items') || [];
          expect(items).toHaveLength(1);
          expect(items[0]).not.toEqual({
            content: primaryAction1.content,
            handler: primaryAction1.handler
          });
        });

      });

    });

  });

});
