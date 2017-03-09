import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { CardAction } from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';
import AkBadge from '@atlaskit/badge';
import ClockIcon from '@atlaskit/icon/glyph/recent';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';

import { Ellipsify } from '../ellipsify';
import { Dropdown } from '../dropdown/dropdown';
import {
    Lists,
    MemberAvatar,
    Avatars,
    Wrapper,
    HorizontalThumbnail,
    SquareThumbnail,
    Details,
    Title,
    Description,
    Footer,
    Link,
    Menu,
    MenuButton,
    Header
} from './styled';

export type TrelloList = {
    name: string,
    count: number
};

export type TrelloCard = {
    name: string,
    url: string
}

export type TrelloBoard = {
    name: string,
    url: string
}

export interface LinkCardTrelloCardViewProps {
    linkUrl: string;
    thumbnailUrl?: string;
    iconUrl?: string;
    listName: string;
    card: TrelloCard;
    board: TrelloBoard;
    members: Array<{ avatarUrl: string, username: string }>;
}

export interface LinkCardTrelloCardViewState {
}

export class LinkCardTrelloCardView extends Component<LinkCardTrelloCardViewProps, LinkCardTrelloCardViewState> {

    constructor(props: LinkCardTrelloCardViewProps) {
        super(props);
    }

    renderList(): JSX.Element {
        return (
            <div>
                <span>In list </span>
                <span>{this.props.listName} </span>
                <span>on </span>
                <span><a href={this.props.board.url}>{this.props.board.name}</a></span>
            </div>
        )
    }

    render(): JSX.Element {
        const { linkUrl, card, board, thumbnailUrl, iconUrl } = this.props;
        const cardStyle = { width: '435px', height: '116px' };
        const icon = iconUrl ? <img src={iconUrl} alt={card.name} /> : null;
        const memberAvatars = this.props.members.slice(0, 3).map((m, i) => (
            <MemberAvatar src={m.avatarUrl} style={{ right: `${i * 17 + 25}px` }} />
        ));
        const membersOffset = this.props.members.length - 3 > 0 ? `+ ${this.props.members.length - 3}` : null;

        return (
            <Wrapper style={cardStyle}>
                <HorizontalThumbnail src={thumbnailUrl} alt={card.name} />
                <Details className="details">
                    <Header>
                        <a href={card.url}>{card.name}</a>
                        <Avatars>
                            {memberAvatars}
                            {membersOffset}
                        </Avatars>
                    </Header>
                    <Lists>
                        {this.renderList()}
                    </Lists>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ClockIcon
                                label='due'
                                size='small'
                            />
                            <span>Today</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AttachmentIcon
                                label='attachments'
                                size="small" />
                            <span>2</span>
                        </div>
                    </div>
                </Details>
            </Wrapper>
        );
    }
}

export default LinkCardTrelloCardView;
