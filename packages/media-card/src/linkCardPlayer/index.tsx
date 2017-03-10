import * as React from 'react';
import {Component} from 'react';
import * as cx from 'classnames';
import {CardAction} from '@atlaskit/media-core';
import {Wrapper, AnimatedButton, PlayButtonWrapper, Circle} from './styled';
import {LinkCardViewHorizontal} from '../linkCardViewHorizontal/linkCardViewHorizontal';
import PlayButton from './play-button';

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
    const className = cx({
      'is-played': this.state.iframeLoaded,
      'is-loading': this.state.isLoading
    });

    return <Wrapper className={className}>
      {this.renderPlayer()}
      {this.renderLinkCard()}
    </Wrapper>;
  }

  private renderPlayer(): JSX.Element {
    const src = this.state.isPlayed ? `${this.props.playerUrl}&autoplay=1` : '';

    return <iframe src={src} onLoad={this.onIframeLoad}/>;
  }

  onIframeLoad = () => {
    this.setState({iframeLoaded: true, isLoading: false});
  }

  private renderLinkCard(): JSX.Element {
    return <div className="link-info">
      <PlayButtonWrapper onClick={this.onClick}>
        <Circle className="circle"/>
        <AnimatedButton dangerouslySetInnerHTML={{__html: PlayButton}} />
      </PlayButtonWrapper>
      <LinkCardViewHorizontal
        display="square"
        title={this.props.title}
        description={this.props.description}
        linkUrl={this.props.linkUrl}
        thumbnailUrl={this.props.thumbnailUrl}
        iconUrl={this.props.iconUrl}
        menuActions={this.props.menuActions}
      />
    </div>;
  }

  onClick = () => {
    this.setState({isPlayed: true, isLoading: true});
  }
}
