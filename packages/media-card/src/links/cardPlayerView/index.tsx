import * as React from 'react';
import {Component} from 'react';
import * as cx from 'classnames';
import {CardAction} from '@atlaskit/media-core';

import PlayButton from './play-button';
import {LinkCardGenericView} from '..';
import {Wrapper, AnimatedButton, PlayButtonWrapper, Circle} from './styled';

export interface LinkCardPlayerProps {
  linkUrl: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;
  menuActions?: Array<CardAction>;
  playerUrl: string;
}

export interface LinkCardPlayerState {
  isPlayed: boolean;
  iframeLoaded: boolean;
  isLoading: boolean;
}

export class LinkCardPlayer extends Component<LinkCardPlayerProps, LinkCardPlayerState> {
  constructor(props) {
    super(props);

    this.state = {
       isPlayed: false,
       iframeLoaded: false,
       isLoading: false
    };
  }

  render() {
    const {iframeLoaded, isLoading} = this.state;
    const classNames = cx({'is-played': iframeLoaded, 'is-loading': isLoading});

    return <Wrapper className={classNames}>
      {this.renderPlayer()}
      {this.renderLinkCard()}
    </Wrapper>;
  }

  private renderPlayer(): JSX.Element {
    const src = this.state.isPlayed ? `${this.props.playerUrl}&autoplay=1` : '';

    return <iframe src={src} onLoad={this.onIframeLoad}/>;
  }

  private onIframeLoad = (): void => {
    this.setState({iframeLoaded: true, isLoading: false, isPlayed: this.state.isPlayed});
  }

  private renderLinkCard(): JSX.Element {
    const {title, description, linkUrl, thumbnailUrl, iconUrl, menuActions} = this.props;

    return (
      <div className="link-info">
        <PlayButtonWrapper className="play-button-wrapper" onClick={this.onClick}>
          <Circle className="circle"/>
          <AnimatedButton dangerouslySetInnerHTML={{__html: PlayButton}} />
        </PlayButtonWrapper>

        <LinkCardGenericView
          display="square"
          title={title}
          description={description}
          linkUrl={linkUrl}
          thumbnailUrl={thumbnailUrl}
          iconUrl={iconUrl}
          menuActions={menuActions}
        />
      </div>
    );
  }

  private onClick = (): void => {
    this.setState({iframeLoaded: this.state.iframeLoaded, isPlayed: true, isLoading: true});
  }
}
