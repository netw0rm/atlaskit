import React, { FormEvent, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import * as styles from './styles.global.less';
import OutsideClickable from '../OutsideClickable';
import Popper from 'popper.js';

interface Props {
  autoPosition?: boolean;
  align?: 'left' | 'center' | 'right';
  onOutsideClick?: () => void;
  target?: HTMLElement;
  spacing?: 'none';
}

interface State {
  position?: string;
  transform?: string;
}

export default class Panel extends PureComponent<Props, State> {
  state: State = {};
  popper?: Popper;

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

  private applyPopper(props: Props): void {
    const { content } = this.refs;
    const target = props.target || ReactDOM.findDOMNode(this).parentElement;
    const boundary = this.findBoundary(target);

    if (target && boundary && content instanceof HTMLElement) {
      if (this.popper) {
        this.popper.destroy();
      }

      this.popper = new Popper(target, content, {
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
            flipVariations: false
          },
          preventOverflow: {
            enabled: this.props.autoPosition,
            moveWithTarget: true,
          },
        },
      });

      const extractStyles = (state: any) => {
        if (state) {
          const left = Math.round(state.offsets.popper.left);
          const top = Math.round(state.offsets.popper.top);

          this.setState({
            position: state.offsets.popper.position,
            transform: `translate3d(${left}px, ${top}px, 0px)`,
          });
        }
      };

      this.popper.onCreate(extractStyles);
      this.popper.onUpdate(extractStyles);
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
          ref='content'
          style={{ top: 0, left: 0, position, transform, padding }}
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
