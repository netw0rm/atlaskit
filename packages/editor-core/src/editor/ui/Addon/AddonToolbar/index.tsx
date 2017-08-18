import * as React from 'react';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { AddonPopup } from '../';
import { Dropdown, RenderOnClickHandler } from '../';
import WithEditorActions from '../../WithEditorActions';

const POPUP_HEIGHT = 188;
const POPUP_WIDTH = 136;

export interface Props {
  dropdownItems?: React.ReactElement<any> | React.ReactElement<any>[];
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  isOpen: boolean;
  target?: HTMLElement;
  addon?: React.ReactElement<any> | null;
}

export default class AddonToolbar extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    addon: null
  };

  togglePopup = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      addon: null
    });
  }

  handleClickOutside = () => {
    this.setState({ isOpen: false, addon: null });
  }

  handleDropdownClick = (renderOnClick: RenderOnClickHandler) => {
    if (renderOnClick) {
      // popup stays open, we just change its content to the component that is returned from renderOnClick()
      this.setState({ addon: renderOnClick(this.togglePopup) });
    } else {
      // close popup
      this.togglePopup();
    }
  }

  render() {
    const { dropdownItems, popupsMountPoint, popupsBoundariesElement } = this.props;
    const { addon, isOpen } = this.state;

    if (!dropdownItems || (Array.isArray(dropdownItems) && !dropdownItems.length)) {
      return null;
    }

    return (
      <div ref={this.handleRef}>
        <ToolbarButton
          onClick={this.togglePopup}
          title="Insert addon"
          iconBefore={<MoreIcon label="Insert addon" />}
        />
        {isOpen &&
          <AddonPopup
            handleClickOutside={this.handleClickOutside}
            target={this.state.target}
            mountTo={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            fitHeight={POPUP_HEIGHT}
            fitWidth={POPUP_WIDTH}
          >
            {addon
              ? addon
              : <WithEditorActions
                  // tslint:disable-next-line:jsx-no-lambda
                  render={actions =>
                    <Dropdown
                      onClick={this.handleDropdownClick}
                      togglePopup={this.togglePopup}
                      actions={actions}
                    >
                      {dropdownItems}
                    </Dropdown>
                  }
              />
            }
          </AddonPopup>
        }
      </div>
    );
  }

  private handleRef = (target: HTMLElement) => {
    this.setState({ target });
  }
}
