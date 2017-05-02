import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import OutsideClickable from '../OutsideClickable';
import Popper, { IPopper } from './../../popper';
import * as styles from './styles';
import { akEditorFloatingPanelZIndex } from '../../styles';
export type Coordniates = { left: number, right: number, top: number, bottom: number };

export interface Props {
  autoPosition?: boolean;
  align?: 'left' | 'center' | 'right';
  onOutsideClick?: () => void;
  target?: HTMLElement;
  spacing?: 'none';
  onExtractStyle?: (state: any) => Coordniates | undefined;
}

export interface State {
  position?: string;
  transform?: string;
}

export default class FloatingToolbar extends PureComponent<Props, State> {
  state: State = {};
  popper?: IPopper;
  content?: HTMLElement;

  componentDidMount() {
    this.applyPopper(this.props);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = undefined;
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.applyPopper(nextProps);
  }

  extractStyles = (state: any) => {
    if (state) {
      const { onExtractStyle } = this.props;
      const { left, top } = (onExtractStyle && onExtractStyle(state)) || state.offsets.popper;
      this.setState({
        position: state.offsets.popper.position,
        transform: `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0px)`,
      });
    }
  }

  private applyPopper(props: Props): void {
    const target = props.target || ReactDOM.findDOMNode(this).parentElement!;
    const boundary = this.findBoundary(target);

    if (target && boundary && this.content instanceof HTMLElement) {
      if (this.popper) {
        this.popper.destroy();
      }

      this.popper = new Popper(target, this.content, {
        onCreate: this.extractStyles,
        onUpdate: this.extractStyles,
        placement: this.popperPlacement(),
        boundariesElement: boundary,
        modifiers: {
          applyStyle: {
            enabled: false,
          },
          offset: {
            enabled: true,
            offset: '0 3px',
          },
          hide: {
            enabled: false
          },
          flip: {
            enabled: this.props.autoPosition,
            flipVariations: true,
          },
          preventOverflow: {
            enabled: this.props.autoPosition,
            moveWithTarget: true,
          },
        },
      });
    }
  }

  render() {
    const { position, transform } = this.state;
    const padding = this.props.spacing === 'none'
      ? '0'
      : undefined;

    return (
      <OutsideClickable onClick={this.props.onOutsideClick}>
        <div
          ref={ref => {this.content = ref; }}
          style={{ top: 0, left: 0, position, transform, padding, zIndex: akEditorFloatingPanelZIndex }}
          className={styles.container}
        >
          {this.props.children}
        </div>
      </OutsideClickable>
    );
  }

  private findBoundary(elem: HTMLElement): HTMLElement {
    while (elem.parentElement) {
      elem = elem.parentElement;
      if (elem.dataset['editorChrome']) {
        return elem;
      }
    }
    return elem;
  }

  private popperPlacement() {
    const align = this.props.align || 'left';
    switch (align) {
      case 'left':
        return 'bottom-start';
      case 'center':
        return 'bottom';
      case 'right':
        return 'bottom-end';
    }
  }
}
