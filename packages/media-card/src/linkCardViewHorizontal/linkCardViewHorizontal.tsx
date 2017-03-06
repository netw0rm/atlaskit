import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';
import MoreIcon from '@atlaskit/icon/glyph/more';

import {Wrapper, Image, Details, Title, Description, Footer, Link} from './styled';
import {Ellipsify} from '..';
import {MoreBtn, DropdownWrapper} from '../cardOverlay/styled';
import {Dropdown} from '../dropdown/dropdown';

export interface LinkCardViewHorizontalProps {
  height?: number;
  width?: number;

  title?: string;
  description?: string;
  linkUrl?: string;
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
    const {width, height, title, description, linkUrl, thumbnailUrl, iconUrl} = this.props;
    const cardStyle = {height: `${height}px`, width: `${width}px`};

    return (
      <Wrapper style={cardStyle} >
        <Image src={thumbnailUrl} alt={title} />

        <Details>
          <Title>
            <Ellipsify text={title} lines={1} endLength={0} />
          </Title>
          <Description>
            <Ellipsify text={description} lines={2} endLength={0} />
          </Description>

          <Footer>
            <Link>
              <img src={iconUrl} alt={iconUrl} />
              <a href={linkUrl} rel="noopener">
                {linkUrl}
              </a>
            </Link>
            {this.moreBtn()}
            {this.dropdown()}
          </Footer>
        </Details>
      </Wrapper>
    );
  }

  moreBtn() {
    const actions = this.props.menuActions;
    const {isMenuExpanded} = this.state;

    if (!actions.length) {
      return null;
    }

    const moreBtnClasses = ['more-btn'];
    if (isMenuExpanded) {
      moreBtnClasses.push('active');
    }

    return (
      <MoreBtn className={moreBtnClasses.join(' ')} onClick={this.moreBtnClick.bind(this)}>
        <MoreIcon label="more"/>
      </MoreBtn>
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
