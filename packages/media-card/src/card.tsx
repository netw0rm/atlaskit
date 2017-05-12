import * as React from 'react';
import {Component} from 'react';
import * as deepEqual from 'deep-equal';
import {Context, MediaItemType, MediaItemProvider, UrlPreviewProvider, DataUriService} from '@atlaskit/media-core';

import {SharedCardProps, CardEventProps, CardEvent} from '.';
import {MediaCard} from './mediaCard';

export type Identifier = UrlPreviewIdentifier | MediaIdentifier;
export type Provider = MediaItemProvider | UrlPreviewProvider;

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface UrlPreviewIdentifier {
  readonly mediaItemType: 'link';
  readonly url: string;
}

export interface CardProps extends SharedCardProps, CardEventProps {
  readonly context: Context;
  readonly identifier: Identifier;
}

export interface CardState {
  selected: boolean;
}

export class Card extends Component<CardProps, CardState> {
  static defaultProps = {
    appearance: 'auto'
  };

  private provider: Provider;
  private dataURIService?: DataUriService;

  constructor(props) {
    super(props);
    const {context, identifier, selectable, selected} = props;

    this.updateProvider(context, identifier);
    this.updateDataUriService(context, identifier);

    if (selectable) {
      this.state = { selected };
    } else {
      this.state = { selected: false };
    }
  }

  componentWillReceiveProps(nextProps) {
    const {context: currentContext, identifier: currentIdentifier} = this.props;
    const {context: nextContext, identifier: nextIdenfifier, selectable: nextSelectable, selected: nextSelectedState} = nextProps;

    if (currentContext !== nextContext || !deepEqual(currentIdentifier, nextIdenfifier)) {
      this.updateProvider(nextContext, nextIdenfifier);
      this.updateDataUriService(nextContext, nextIdenfifier);
    }

    if (nextSelectable && nextSelectedState !== this.state.selected) {
      this.setState({selected: nextSelectedState});
    }
  }

  private isUrlPreviewIdentifier(identifier: Identifier): identifier is UrlPreviewIdentifier {
    const preview = identifier as UrlPreviewIdentifier;
    return preview && preview.url !== undefined;
  }

  private updateProvider(context: Context, identifier: Identifier): void {
    if (this.isUrlPreviewIdentifier(identifier)) {
      this.provider = context.getUrlPreviewProvider(identifier.url);
    } else {
      const {id, mediaItemType, collectionName} = identifier;
      this.provider = context.getMediaItemProvider(id, mediaItemType, collectionName);
    }
  }

  private updateDataUriService(context: Context, identifier: Identifier): void {
    if (!this.isUrlPreviewIdentifier(identifier)) {
      this.dataURIService = context.getDataUriService(identifier.collectionName);
    } else {
      this.dataURIService = undefined;
    }
  }

  render() {
    const {context, identifier, ...otherProps} = this.props;
    const {selected} = this.state;
    const {mediaItemType} = identifier;

    return <MediaCard
      {...otherProps}
      mediaItemType={mediaItemType}
      provider={this.provider}
      dataURIService={this.dataURIService}

      selected={selected}
      onClick={this.onClick}
    />;
  }

  private onClick = (result: CardEvent): void => {
    const {selected} = this.state;

    this.fireOnClickToConsumer(result);
    this.fireOnSelectChangeToConsumer(result, !selected);
    this.updateCardSelectedState();
  }

  private fireOnClickToConsumer = (result: CardEvent): void => {
    const {onClick} = this.props;
    if (onClick) {
      onClick(result);
    }
  }

  private fireOnSelectChangeToConsumer = (result: CardEvent, newSelectedState: boolean): void => {
    const {selectable, onSelectChange} = this.props;
    const {mediaItemDetails} = result;

    if (selectable && onSelectChange) {
      onSelectChange({selected: newSelectedState, mediaItemDetails});
    }
  }

  private updateCardSelectedState = () => {
    const {selectable} = this.props;

    if (selectable) {
      this.setState((prevState, props) => {
        return {selected: !prevState.selected};
      });
    }
  }
}

