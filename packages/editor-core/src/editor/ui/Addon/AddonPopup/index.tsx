import * as React from 'react';
import Popup from '../../../../ui/Popup';

export interface Props {
  handleClickOutside: () => void;
  fitWidth?: number;
  fitHeight?: number;
  target?: HTMLElement;
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
}

export interface State {
  popupClicked: boolean;
}

export default class AddonPopup extends React.Component<Props, State> {
  state: State = {
    popupClicked: false
  };

  ref?: HTMLElement;

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  render() {
    const {
      mountTo,
      boundariesElement,
      target,
      fitHeight,
      fitWidth
    } = this.props;

    return (
      <Popup
        target={target}
        mountTo={mountTo}
        boundariesElement={boundariesElement}
        fitHeight={fitHeight}
        fitWidth={fitWidth}
      >
        <span ref={this.handleRef} onClick={this.togglePopupClicked}>
          {this.props.children}
        </span>
      </Popup>
    );
  }

  private handleRef = (ref?: HTMLElement) => {
    this.ref = ref;
  }

  private handleClickOutside = (event) => {
    if (this.state.popupClicked) {
      this.togglePopupClicked();
    } else {
      if (!this.ref || (event.target instanceof HTMLElement && !this.ref.contains(event.target))) {
        this.props.handleClickOutside();
      }
    }
  }

  private togglePopupClicked = () => {
    this.setState({ popupClicked: !this.state.popupClicked});
  }
}
