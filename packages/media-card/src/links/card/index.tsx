import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Context, CardAction, TrelloBoardLinkApp, UrlPreview } from '@atlaskit/media-core';

import { CardProps, CardProcessingStatus } from '../../index';
import { LinkCardGenericView } from '../cardGenericView';
import { LinkCardPlayer } from '../cardPlayerView';
import { LinkCardTrelloBoardView } from '../apps/trello';
import { LinkCardViewSmall } from '../cardViewSmall';

export interface LinkCardProps extends CardProps {
  urlPreview: UrlPreview;
  cardProcessingStatus: CardProcessingStatus;
}

export class LinkCard extends Component<LinkCardProps, {}> {

  render(): JSX.Element | null {
    const {urlPreview, appearance} = this.props;

    if (urlPreview) {
      const {resources} = urlPreview;

      if (resources && resources.app) {
        return this.renderApplicationLink(urlPreview);
      } else if (resources && resources.player) {
        return this.renderPlayerLink(urlPreview);
      }

      if (appearance === 'small') {
        return this.renderSmallLink(urlPreview);
      }

      return this.renderGenericLink(urlPreview);
    } else {
      // TODO FIL-3893 render loading/error state 
      return null;
    }
  }

  private renderApplicationLink(urlPreview: UrlPreview): JSX.Element {
    const {app, icon} = urlPreview.resources;

    switch (app && app.type) {
      case 'trello_board':
        return this.renderTrelloBoard(app as TrelloBoardLinkApp, icon && icon.url);
      default:
        return this.renderGenericLink(urlPreview);
    }
  }

  private renderTrelloBoard(app: TrelloBoardLinkApp, iconUrl?: string): JSX.Element {
    return <LinkCardTrelloBoardView
      linkUrl={app.url}
      title={app.name}
      thumbnailUrl={app.background}
      iconUrl={iconUrl}
      lists={app.lists}
      members={app.member}
    />;
  }

  private renderPlayerLink(urlPreview: UrlPreview): JSX.Element {
    const { title, site,  description, resources } = urlPreview;
    const { thumbnail, icon, player } = resources;

    const playerUrl = player && player.url ? player.url : '';
    const iconUrl = icon && icon.url;
    const thumbnailUrl = thumbnail && thumbnail.url;

    return <LinkCardPlayer
      linkUrl={playerUrl}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={thumbnailUrl}
      iconUrl={iconUrl}
      playerUrl={playerUrl}
    />;
  }

  private renderGenericLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, site, description, resources } = urlPreview;
    const icon = resources ? resources.icon : undefined;
    const thumbnail = resources ? resources.icon : undefined;

    const {dimensions, actions, appearance, cardProcessingStatus} = this.props;

    return <LinkCardGenericView
      linkUrl={url}
      title={title}

      site={site}
      description={description}
      thumbnailUrl={thumbnail && thumbnail.url}
      iconUrl={icon && icon.url}

      dimensions={dimensions}

      appearance={appearance}
      loading={cardProcessingStatus === 'loading'}
      actions={actions}
    />;
  }

  private renderSmallLink(urlPreview: UrlPreview): JSX.Element {
    const { url, title, site, resources } = urlPreview;
    const thumbnail = resources ? resources.icon : undefined;

    const {dimensions, actions, cardProcessingStatus} = this.props;

    return <LinkCardViewSmall
      linkUrl={url}
      title={title}
      site={site}

      thumbnailUrl={thumbnail && thumbnail.url}
      width={dimensions && dimensions.width}

      loading={cardProcessingStatus === 'loading'}
      actions={actions}
    />;
  }
};

export default LinkCard;
