import * as React from 'react';
import {Component} from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import ArrowRight from '@atlaskit/icon/glyph/arrow-right';
import {ArrowLeftWrapper, ArrowRightWrapper} from './styled';
import {MediaIdentifier} from '../domain';

export interface NavigationProps {
  list: Array<MediaIdentifier>;
  selected: MediaIdentifier;

  onNext?: (item: MediaIdentifier) => void;
  onPrev?: (item: MediaIdentifier) => void;
}

export interface NavigationState {

}

export class Navigation extends Component<NavigationProps, NavigationState> {

  captureKeys = (ev) => {
    const right = this.navigate('right');
    const left = this.navigate('left');

    if (ev.code === 'ArrowRight' && this.canNavigateRight) {
      right();
    } else if (ev.code === 'ArrowLeft' && this.canNavigateLeft) {
      left();
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.captureKeys, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.captureKeys, false);
  }

  render() {
   const {canNavigateLeft, canNavigateRight} = this;

   return (<div>
    {canNavigateLeft ? <ArrowLeftWrapper className="visible-on-hover" onClick={this.navigate('left')}><ArrowLeft size="large" label="navigate left" /></ArrowLeftWrapper> : null}
    {canNavigateRight ? <ArrowRightWrapper className="visible-on-hover" onClick={this.navigate('right')}><ArrowRight size="large" label="navigate right" /></ArrowRightWrapper> : null}
   </div>);
  }

  navigate = (direction) => {
    return () => {
      const {list, onPrev, onNext} = this.props;
      const handler = direction === 'left' ? onPrev : onNext;
      const nextIndex = direction === 'left' ? -1 : 1;

      if (handler) {
        const item = list[this.currentIndex + nextIndex];
        if (item) {
          handler(item);
        }
      }
    };
  }

  get currentIndex(): number {
    const {list, selected} = this.props;
    return list.indexOf(selected);
  }

  get canNavigateLeft(): boolean {
    const {list} = this.props;
    const {currentIndex} = this;

    return list.length ? currentIndex > 0 : false;
  }

  get canNavigateRight(): boolean {
    const {currentIndex} = this;
    const {list} = this.props;

    return list.length ? currentIndex + 1 < list.length : false;
  }
}
