import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {Ellipsify} from '..';
import {Dropdown} from '../dropdown/dropdown';
import {
  Wrapper,
  Thumbnail,
  Details,
  Title,
  Description,
  Footer,
  Link,
  Menu,
  MenuButton,
  DropdownWrapper
} from './styled';

export interface LinkCardViewHorizontalProps {
  height?: number;
  width?: number;

  linkUrl: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;

  // TODO FIL-3892 implement visual designs for loading state
  loading?: boolean;

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  // TODO FIL-3893 implement visual designs for error state
  error?: string;
}

export interface LinkCardViewHorizontalState {
  isMenuExpanded: boolean;
}

export class LinkCardViewHorizontal extends Component<LinkCardViewHorizontalProps, LinkCardViewHorizontalState> {
  private clickDetector: (e: Event) => void;

  static get defaultProps() {
    const menuActions: Array<CardAction> = [];

    return {
      title: '',
      description: '',
      width: 435,
      height: 116,
      menuActions
    };
  }

  constructor(props: LinkCardViewHorizontalProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  render() {
    const {width, height, linkUrl, title, description, thumbnailUrl, iconUrl} = this.props;
    const cardStyle = {height: `${height}px`, width: `${width}px`};

    const thumbnail = thumbnailUrl ? <Thumbnail src={thumbnailUrl} alt={title} /> : null;
    const icon = iconUrl ? <img src={iconUrl} alt={title} /> : null;

    return (
      <Wrapper style={cardStyle} onClick={this.onClick.bind(this)}>
        {thumbnail}

        <Details>
          <Title>
            <Ellipsify text={title || ''} lines={1} endLength={0} />
          </Title>
          <Description>
            <Ellipsify text={description || ''} lines={2} endLength={0} />
          </Description>

          <Footer>
            <Link>
              {icon}
              <a href={linkUrl} rel="noopener">
                {linkUrl}
              </a>
            </Link>
            <Menu>
              {this.moreBtn()}
              {this.dropdown()}
            </Menu>
          </Footer>
        </Details>
      </Wrapper>
    );
  }

  onClick(event: MouseEvent<HTMLDivElement>) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }

  moreBtn() {
    const actions = this.props.menuActions || [];

    if (!actions.length) {
      return null;
    }

    const {isMenuExpanded} = this.state;
    const moreBtnClasses = ['more-btn'];
    if (isMenuExpanded) {
      moreBtnClasses.push('active');
    }

    return (
      <MenuButton
        className={moreBtnClasses.join(' ')}
        onClick={this.moreBtnClick.bind(this)}
      >
        <MoreIcon label="more"/>
      </MenuButton>
    );
  }

  moreBtnClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    const {isMenuExpanded} = this.state;

    if (isMenuExpanded) {    // we should remove handlers
      document.removeEventListener('click', this.clickDetector);
    } else {    // we should add handlers on clicking outside of element
      this.clickDetector = this.newClickDetector.bind(this);
      document.addEventListener('click', this.clickDetector);
    }

    this.setState({
      isMenuExpanded: !isMenuExpanded
    });
  }

  newClickDetector(e: Event) {
    this.setState({
      isMenuExpanded: false
    });

    document.removeEventListener('click', this.clickDetector);
  }

  dropdown() {
    const {isMenuExpanded} = this.state;

    if (!isMenuExpanded) {
      return null;
    }

    return (
      <DropdownWrapper onClick={this.dropdownClick}>
        <Dropdown items={this.props.menuActions}/>
      </DropdownWrapper>
    );
  }

  dropdownClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }
}

export default LinkCardViewHorizontal;
