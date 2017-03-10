import * as React from 'react';
import {Component} from 'react';
import {CardAction} from '@atlaskit/media-core';
import AkBadge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import {
  Lists,
  MemberAvatar,
  Avatars,
  Wrapper,
  SquareThumbnail,
  Details,
  Footer,
  Link,
  Header
} from './styled';

export interface LinkCardTrelloViewProps {
  linkUrl: string;
  title: string;
  thumbnailUrl?: string;
  iconUrl?: string;
  height?: number;
  width?: number;
  lists: Array<{name: string, count: number}>;
  members: Array<{avatarUrl: string, username: string}>;
  // TODO FIL-3892 implement visual designs for loading state
  loading?: boolean;
  // TODO FIL-3893 implement visual designs for error state
  error?: string;
}

export interface LinkCardTrelloViewState {
  isMenuExpanded: boolean;
}

export class LinkCardTrelloView extends Component<LinkCardTrelloViewProps, LinkCardTrelloViewState> {
  static get defaultProps() {
    const menuActions: Array<CardAction> = [];

    return {
      title: '',
      width: 435,
      height: 116,
      menuActions
    };
  }

  constructor(props: LinkCardTrelloViewProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  render() {
    const {linkUrl, title, thumbnailUrl, iconUrl} = this.props;
    const cardStyle = {height: `${this.props.height}px`, width: `${this.props.width}px`};
    const thumbnail = thumbnailUrl ? <SquareThumbnail className="square-img" style={{backgroundImage: `url(${thumbnailUrl})`}} /> : null;
    const icon = iconUrl ? <img src={iconUrl} alt={title} /> : null;
    const memberAvatars = this.props.members.slice(0, 3).map((m, i) => (
      <MemberAvatar src={m.avatarUrl} style={{right: `${i * 17 + 25}px`}}/>
    ));
    const membersOffset = this.props.members.length - 3 > 0 ? `+ ${this.props.members.length - 3}` : null;
    const lists = this.props.lists.slice(0, 3).map(l => (
      <li>{l.name} <AkBadge value={l.count} appearance="added"/></li>
    ));

    return (
      <Wrapper style={cardStyle}>
        {thumbnail}
        <Details className="details">
          <Header>
            {this.props.title}
            <Avatars>
              {memberAvatars}
              {membersOffset}
            </Avatars>
          </Header>
          <Lists>
            Lists: <ul>{lists}</ul>
          </Lists>
          <Footer>
            <Link>
              {icon}
              <a href={linkUrl} rel="noopener">
                Trello - Board
              </a>
            </Link>
            <Button>Open board</Button>
          </Footer>
        </Details>
      </Wrapper>
    );
  }
}

export default LinkCardTrelloView;
