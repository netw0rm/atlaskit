import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {Ellipsify} from '../ellipsify';
import {Dropdown} from '../dropdown/dropdown';
import {
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
  DropdownWrapper
} from './styled';

export interface LinkCardViewHorizontalProps {
  linkUrl: string;
  title: string;
  display?: 'horizontal' | 'square';
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;

  height?: number;
  width?: number;

  // TODO FIL-3892 implement visual designs for loading state
  loading?: boolean;

  menuActions?: Array<CardAction>;
  onClick?: (event: Event) => void;

  // TODO FIL-3893 implement visual designs for error state
  error?: string;
}

export interface LinkCardViewHorizontalState {
  isMenuExpanded?: boolean;
  thumbnailError?: boolean;
  iconError?: boolean;
}

export class LinkCardViewHorizontal extends Component<LinkCardViewHorizontalProps, LinkCardViewHorizontalState> {
  private clickDetector: (e: Event) => void;

  static get defaultProps() {
    const menuActions: Array<CardAction> = [];

    return {
      title: '',
      description: '',
      menuActions,
      display: 'horizontal'
    };
  }

  constructor(props: LinkCardViewHorizontalProps) {
    super(props);

    this.state = {
      isMenuExpanded: false,
      thumbnailError: false,
      iconError: false
    };

    this.thumbnailError = this.thumbnailError.bind(this);
    this.iconError = this.iconError.bind(this);
  }

  thumbnailError() {
    this.setState({
      thumbnailError: true,
    });
  }

  iconError() {
    this.setState({
      iconError: true,
    });
  }

  private get width() {
    return this.props.width ? this.props.width : (
      this.props.display === 'horizontal' ? 435 : 300
    );
  }

  private get height() {
    return this.props.height ? this.props.height : (
      this.props.display === 'horizontal' ? 116 : 300
    );
  }

  private get isHorizontal() {
    return this.props.display === 'horizontal';
  }

  render() {
    const {linkUrl, title, description, thumbnailUrl, iconUrl} = this.props;
    const cardStyle = {height: `${this.height}px`, width: `${this.width}px`};
    const thumbnail = thumbnailUrl && !this.state.thumbnailError ? (this.isHorizontal ?
      <HorizontalThumbnail src={thumbnailUrl} alt={title} onError={this.thumbnailError}/> :
      <SquareThumbnail className="square-img" style={{backgroundImage: `url(${thumbnailUrl})`}} />) : null;
    const icon = (iconUrl && !this.state.iconError) ?
      <img
        src={iconUrl}
        alt={title}
        onError={this.iconError}
      /> : null;

    return (
      <Wrapper style={cardStyle} className={this.props.display} onClick={this.onClick.bind(this)}>
        {thumbnail}

        <Details className="details">
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
