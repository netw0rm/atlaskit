import * as React from 'react';
import {Component} from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Context, CardAction, LinkItem, LinkDetails} from '@atlaskit/media-core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import {LinkCardViewHorizontal} from '..';

interface LinkFromId {
  readonly id: string;
  readonly collection: string;
}

export interface LinkCardProps {
  readonly context: Context;
  readonly link: string | LinkFromId;

  readonly height?: number;
  readonly width?: number;

  readonly menuActions?: Array<CardAction>;

  readonly type?: 'normal' | 'small';
  readonly onClick?: (event: Event, item: LinkItem) => void;
}

export interface LinkCardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly linkItem?: LinkItem;
  readonly error?: Error;
}

export class LinkCard extends Component <LinkCardProps, LinkCardState> {
  static defaultProps: Partial<LinkCardProps> = {
    width: 435,
    height: 116,
    menuActions: []
  };

  constructor(props: LinkCardProps) {
    super(props);
  }

  componentDidMount(): void {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: LinkCardProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  private shouldUpdateState(nextProps: LinkCardProps): boolean {
    return (nextProps.context !== this.props.context);
  }

  private updateState(props: LinkCardProps): void {
    const isLinkFromId = (link) => (link as LinkFromId).id !== undefined;
    const isLinkItem = (item) => (item as LinkItem).details !== undefined;

    this.unsubscribe();

    const {context, link} = this.props;
    const provider: {subscribe: Function} = isLinkFromId(link)
      ? context.getMediaItemProvider((link as LinkFromId).id, 'link', (link as LinkFromId).collection).observable()
      : context.getUrlPreviewProvider(link as string).observable();

    this.setPartialState({loading: true});

    this.setPartialState({
      subscription: provider.subscribe({
        next: (result) => {
          const linkItem: LinkItem = isLinkItem(result) ? result : {type: 'link', details: {...result}};
          this.setPartialState({linkItem: linkItem, error: undefined, loading: false});
        },
        complete: () => {
          this.setPartialState({loading: false});
        },
        error: (error) => {
          this.setPartialState({error, loading: false});
        }
      })
    });
  }

  private setPartialState(partialState: Partial<LinkCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return {...previousState, ...partialState};
    }, callback);
  }

  private unsubscribe(): void {
    this.state && this.state.subscription && this.state.subscription.unsubscribe();
  }

  render() {
    const {state} = this;
    if (state && state.linkItem) {
      return this.renderLink(state.linkItem.details);
    } else {
      return this.renderNoLinkItem();
    }
  }

  renderLink(linkDetails: LinkDetails): JSX.Element {
    const {url, title, description, resources} = linkDetails;
    const icon = resources ? resources.icon : undefined;
    const thumbnail = resources ? resources.icon : undefined;

    const {height, width, menuActions} = this.props;
    const {loading} = this.state;

    return <LinkCardViewHorizontal
      linkUrl={url}
      title={title}

      description={description}
      thumbnailUrl={thumbnail && thumbnail.url}
      iconUrl={icon && icon.url}

      height={height}
      width={width}

      loading={loading}
      menuActions={menuActions}
    />;
  }

  private renderNoLinkItem() {
    // TODO FIL-3892 FIL-3893 render loading/error state
    return <div>This is the loading/error state</div>;
  }
};

export default LinkCard;
;
