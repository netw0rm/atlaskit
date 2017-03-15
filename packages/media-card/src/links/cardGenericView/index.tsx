import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {Ellipsify, Menu} from '../../utils';
import {
  Wrapper,
  HorizontalThumbnail,
  SquareThumbnail,
  Details,
  Title,
  Description,
  Footer,
  Link
} from './styled';

export type LinkCardDisplay = 'horizontal' | 'square';

export interface LinkCardGenericViewProps {
  linkUrl: string;
  title: string;
  display?: LinkCardDisplay;
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

export interface LinkCardGenericViewState {
  thumbnailError?: boolean;
  iconError?: boolean;
}

const defaultHorizontalWidth = 435;
const defaultHorizontalHeight = 116;
const defaultSquareWidth = 300;
const defaultSquareHeight = 300;

export class LinkCardGenericView extends Component<LinkCardGenericViewProps, LinkCardGenericViewState> {
  static defaultProps = {
    title: '',
    description: '',
    menuActions: [],
    display: 'horizontal'
  };

  constructor(props: LinkCardGenericViewProps) {
    super(props);

    this.state = {
      thumbnailError: false,
      iconError: false
    };

    this.thumbnailError = this.thumbnailError.bind(this);
    this.iconError = this.iconError.bind(this);
  }

  private thumbnailError() {
    this.setState({
      thumbnailError: true,
    });
  }

  private iconError() {
    this.setState({
      iconError: true,
    });
  }

  private get width() {
    return this.props.width ? this.props.width : (
      this.props.display === 'horizontal' ? defaultHorizontalWidth : defaultSquareWidth
    );
  }

  private get height() {
    return this.props.height ? this.props.height : (
      this.props.display === 'horizontal' ? defaultHorizontalHeight : defaultSquareHeight
    );
  }

  private get isHorizontal() {
    return this.props.display === 'horizontal';
  }

  private getThumbnail = (): JSX.Element | null => {
    const shouldNotDisplayThumbnail = (thumbnailUrl, thumbnailError): Boolean => {
      return !thumbnailUrl || thumbnailError;
    };

    const {title, thumbnailUrl} = this.props;
    const {thumbnailError} = this.state;

    if (shouldNotDisplayThumbnail(thumbnailUrl, thumbnailError)) {
      return null;
    }

    return this.isHorizontal
      ? <HorizontalThumbnail src={thumbnailUrl} alt={title} onError={this.thumbnailError}/>
      : <SquareThumbnail className="square-img" style={{backgroundImage: `url(${thumbnailUrl})`}} />;
  }

  private getIcon = (): JSX.Element | null => {
    const {title, iconUrl} = this.props;

    return (iconUrl && !this.state.iconError)
      ? <img src={iconUrl} alt={title} onError={this.iconError}/>
      : null;
  }

  render() {
    const {linkUrl, title, description, menuActions, display} = this.props;
    const cardStyle = {height: `${this.height}px`, width: `${this.width}px`};

    const thumbnail = this.getThumbnail();
    const icon = this.getIcon();

    return (
      <Wrapper style={cardStyle} className={display} onClick={this.onClick}>
        {thumbnail}

        <Details className="details">
          <Title>
            {title}
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
            <Menu actions={menuActions} />
          </Footer>
        </Details>
      </Wrapper>
    );
  }

  private onClick = (event: MouseEvent<HTMLDivElement>) => {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  }
}

export default LinkCardGenericView;
