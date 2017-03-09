import * as React from 'react';
import {Component} from 'react';
import PlayButton from '@atlaskit/icon/glyph/play';
import {Wrapper, PlayButtonWrapper} from './styled';
import {LinkCardViewHorizontal} from '../linkCardViewHorizontal/linkCardViewHorizontal';

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
}

export class LinkCardPlayer extends Component<LinkCardPlayerProps, LinkCardPlayerState> {
  constructor(props) {
    super(props);

    this.state = {
       isPlayed: false
    };
  }

  render() {
    if (this.state.isPlayed) {
      return this.renderPlayer();
    } else {
      return this.renderLinkCard();
    }
  }

  private renderPlayer(): JSX.Element {
    return <Wrapper className={'is-played'}>
      <iframe src={this.props.playerUrl}></iframe>
    </Wrapper>;
  }

  private renderLinkCard(): JSX.Element {
    return <Wrapper>
      <PlayButtonWrapper onClick={this.onClick}>
        <PlayButton label="play" />
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
    </Wrapper>;
  }

  onClick = () => {
    this.setState({isPlayed: true});
  }
}
