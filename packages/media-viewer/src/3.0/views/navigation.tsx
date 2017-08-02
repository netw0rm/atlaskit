import * as React from 'react';
import {Component} from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrowleft';
import ArrowRight from '@atlaskit/icon/glyph/arrowright';
import {ArrowLeftWrapper, ArrowRightWrapper} from './styled';
import {MediaIdentifier} from '..';

export interface NavigationProps {
  list: Array<MediaIdentifier>;
  selected: MediaIdentifier;

  onNext?: (item: MediaIdentifier) => void;
  onPrev?: (item: MediaIdentifier) => void;
}

export interface NavigationState {

}

export class Navigation extends Component<NavigationProps, NavigationState> {

  render() {
   const {canNavigateLeft, canNavigateRight} = this;

   return (<div>
    {canNavigateLeft ? <ArrowLeftWrapper onClick={this.navigate('left')}><ArrowLeft size="large" label="navigate left" /></ArrowLeftWrapper> : null}
    {canNavigateRight ? <ArrowRightWrapper onClick={this.navigate('right')}><ArrowRight size="large" label="navigate right" /></ArrowRightWrapper> : null}
   </div>);
  }

  navigate = (direction) => {
    return () => {
      const {list, onPrev, onNext} = this.props;
      const handler = direction === 'left' ? onPrev : onNext; 
      const nextIndex = direction === 'left' ? -1 : 1;

      if (handler) {
        console.log(this.props.list, this.currentIndex)
        const item = list[this.currentIndex + nextIndex];
        handler(item);
      }
    };
  }

  get currentIndex(): number {
    const {list, selected} = this.props;

    return list.indexOf(selected);
  }

  get canNavigateLeft(): boolean {
    const {currentIndex} = this;

    return currentIndex > 0;
  }

  get canNavigateRight(): boolean {
    const {currentIndex} = this;
    const {list} = this.props;

    return currentIndex < list.length;
  }
}