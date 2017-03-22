import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance} from '../../card';
import {Ellipsify, Menu, MediaImage} from '../../utils';
import {Details, Wrapper} from '../styled';
import {
  Title,
  Description,
  Footer,
  Link
} from './styled';

export interface LinkCardGenericViewProps {
  linkUrl: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;

  appearance?: CardAppearance;

  dimensions?: CardDimensions;

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

const defaultHorizontalWidth = '435px';
const defaultHorizontalHeight = '116px';
const defaultSquareWidth = '300px';
const defaultSquareHeight = '300px';

export class LinkCardGenericView extends Component<LinkCardGenericViewProps, LinkCardGenericViewState> {
  static defaultProps = {
    title: '',
    description: '',
    menuActions: [],
    appearance: 'auto'
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

  private get width(): string {
    const {dimensions} = this.props;
    const {width} = dimensions || {width: undefined};

    if (!width) {
      return this.isHorizontal ? defaultHorizontalWidth : defaultSquareWidth;
    }

    return typeof width === 'string' ? width : `${width}px`;
  }

  private get height(): string {
    const {dimensions} = this.props;
    const {height} = dimensions || {height: undefined};

    if (!height) {
      return this.isHorizontal ? defaultHorizontalHeight : defaultSquareHeight;
    }

    return typeof height === 'string' ? height : `${height}px`;
  }

  private get isHorizontal() {
    const {appearance} = this.props;
    return appearance === 'horizontal' || appearance === 'auto';
  }

  private getThumbnail = (): JSX.Element | null => {
    const shouldNotDisplayThumbnail = (thumbnailUrl, thumbnailError): Boolean => {
      return !thumbnailUrl || thumbnailError;
    };

    const {thumbnailUrl} = this.props;
    const {thumbnailError} = this.state;

    if (shouldNotDisplayThumbnail(thumbnailUrl, thumbnailError)) {
      return null;
    }

    return <MediaImage dataURI={thumbnailUrl || ''} onError={this.thumbnailError} />;
  }

  private getIcon = (): JSX.Element | null => {
    const {title, iconUrl} = this.props;

    return (iconUrl && !this.state.iconError)
      ? <img src={iconUrl} alt={title} onError={this.iconError}/>
      : null;
  }

  render() {
    const {linkUrl, title, description, menuActions, appearance} = this.props;
    const cardStyle = {height: this.height, width: this.width};

    const thumbnail = this.getThumbnail();
    const icon = this.getIcon();

    return (
      <Wrapper style={cardStyle} className={appearance} onClick={this.onClick}>
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
