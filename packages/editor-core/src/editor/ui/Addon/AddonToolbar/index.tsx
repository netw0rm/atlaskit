import * as React from 'react';
import MoreIcon from '@atlaskit/icon/glyph/more';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { Dropdown, RenderOnClickHandler } from '../';
import WithEditorActions from '../../WithEditorActions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import Popup from '../../../../ui/Popup';

// tslint:disable-next-line:variable-name
const AddonPopup = withOuterListeners(Popup);

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
            handleClickOutside={this.togglePopup}
            handleEscapeKeydown={this.togglePopup}
            target={this.state.target}
            mountTo={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            fitHeight={POPUP_HEIGHT}
            fitWidth={POPUP_WIDTH}
          >
            <span onClick={this.handlePopupClick}>
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
            </span>
          </AddonPopup>
        }
      </div>
    );
  }

  private handleRef = (target: HTMLElement) => {
    this.setState({ target });
  }

  // cancel bubbling to fix clickOutside logic:
  // popup re-renders its content before the click event bubbles up to the document
  // therefore click target element would be different from the popup content
  private handlePopupClick = event => event.nativeEvent.stopImmediatePropagation();
}
