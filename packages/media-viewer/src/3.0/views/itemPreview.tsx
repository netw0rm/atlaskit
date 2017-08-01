import * as React from 'react';
import {Component} from 'react';
import {ItemPreviewWrapper} from './styled';

export interface ItemPreviewProps {

}

export interface ItemPreviewState {
  
}

export class ItemPreview extends Component<ItemPreviewProps, ItemPreviewState> {
  render() {
    return (
      <ItemPreviewWrapper>
        Preview
      </ItemPreviewWrapper>
    );
  }
}