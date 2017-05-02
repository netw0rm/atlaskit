import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance} from '../../index';
import {Ellipsify, Menu, MediaImage, CardLoading, ErrorIcon, getCSSUnitValue} from '../../utils';
import {Href} from '../../utils/href';
import {Details, Wrapper} from '../styled';
import {
  Title,
  Description,
  Footer,
  Link,
  ErrorContainer,
  ErrorHeader
} from './styled';

export interface LinkCardGenericViewProps {
  linkUrl: string;
  title: string;
  site?: string;
  description?: string;
  thumbnailUrl?: string;
  iconUrl?: string;

  appearance?: CardAppearance;
  dimensions?: CardDimensions;

  loading?: boolean;
  error?: string;

  actions?: Array<CardAction>;
  onClick?: (event: Event) => void;
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
    actions: [],
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

    return getCSSUnitValue(width);
  }

  private get height(): string {
    const {dimensions} = this.props;
    const {height} = dimensions || {height: undefined};

    if (!height) {
      return this.isHorizontal ? defaultHorizontalHeight : defaultSquareHeight;
    }

    return getCSSUnitValue(height);
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

    return <MediaImage key="thumbnail" dataURI={thumbnailUrl || ''} onError={this.thumbnailError} />;
  }

  private getIcon = (): JSX.Element | null => {
    const {title, iconUrl} = this.props;

    return (iconUrl && !this.state.iconError)
      ? <img src={iconUrl} alt={title} onError={this.iconError}/>
      : null;
  }

  render() {
    const {appearance} = this.props;
    const cardStyle = {height: this.height, width: this.width};
    const content = this.getContentToRender();

    return (
      <Wrapper style={cardStyle} className={appearance} onClick={this.onClick}>
        {content}
      </Wrapper>
    );
  }

  private getContentToRender = () => {
    const {error, loading} = this.props;

    if (error) {
      return this.renderError(error);
    }

    if (loading) {
      return this.renderLoading();
    }

    return this.renderDetails();
  }

  private renderDetails() {
    const {linkUrl, title, site, description, actions} = this.props;
    const thumbnail = this.getThumbnail();
    const icon = this.getIcon();

    return [
      thumbnail,
      <Details key="details" className="details">
        <Title>
          {title}
        </Title>
        <Description>
          <Ellipsify text={description || ''} lines={2} endLength={0} />
        </Description>

        <Footer>
          <Link>
            {icon}
            <Href linkUrl={linkUrl} underline={true}>
              {site || linkUrl}
            </Href>
          </Link>
          <Menu actions={actions} />
        </Footer>
      </Details>
    ];
  }

  private renderLoading() {
    return <CardLoading mediaItemType="link" iconSize="large"/>;
  }

  private renderError(errorMessage: string) {
    return (
      <ErrorContainer>
        <ErrorHeader>{errorMessage}</ErrorHeader>
        <div>
          <ErrorIcon />
        </div>
      </ErrorContainer>
    );
  }

  private onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event.nativeEvent);
    }
  }
}

export default LinkCardGenericView;
