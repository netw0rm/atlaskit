import * as React from 'react';
import { Dropdown } from './styles';
import { RenderOnClickHandler } from '../../Addon';
import EditorActions from '../../../actions';

export interface Props {
  onClick: (renderOnClick: RenderOnClickHandler) => void;
  actions: EditorActions;
  togglePopup: () => void;
}

export default class DropdownWrapper extends React.Component<Props, any> {
  render() {
    // adding onClick handler to each DropdownItem component
    const children = React.Children.map(this.props.children, child => (
      React.cloneElement(child as React.ReactElement<any>, {
        onClick: () => {
          this.handleClick(child as React.ReactElement<any>);
        }
      })
    ));

    return (
      <Dropdown>
        {children}
      </Dropdown>
    );
  }

  private handleClick = (dropdownItem: React.ReactElement<any>) => {
    const { action, renderOnClick } = dropdownItem.props;
    if (action) {
      action(this.props.actions);
      this.props.togglePopup();
    } else if (renderOnClick) {
      this.props.onClick(renderOnClick);
    }
  }
}
