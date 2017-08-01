import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance} from '../../index';
// We are being verbose requiring utilities "utils" to avoid circular dependencies
import {ErrorIcon} from '../../utils/errorIcon';
import {Ellipsify} from '../../utils/ellipsify';
import {Menu} from '../../utils/menu';
import {MediaImage} from '../../utils/mediaImage';
import {CardLoading} from '../../utils/cardLoading';
import {getCSSUnitValue} from '../../utils/getCSSUnitValue';
import {breakpointSize, BreakpointSizeValue} from '../../utils/breakpointSize';
import {defaultHorizontalCardDimensions, defaultSquareCardDimensions, maxHorizontalCardDimensions} from '../../utils/cardDimensions';
import {Details, Wrapper} from '../styled';
import {
  Title,
  Description,
  Footer,
  Link,
  ErrorContainer,
  ErrorHeader,
  A
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
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
}

export interface LinkCardGenericViewState {
  thumbnailError?: boolean;
  iconError?: boolean;
}

const breakpointSizes = {
  small: 344,
  large: Infinity
};

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

  get width(): string {
    const {dimensions} = this.props;
    const {width} = dimensions || {width: undefined};
    const defaultWidth = this.isHorizontal ? defaultHorizontalCardDimensions.width : defaultSquareCardDimensions.width;
    const maxWidth = this.isHorizontal ? maxHorizontalCardDimensions.width : Infinity;

    return getCSSUnitValue(
      Math.min(parseInt(`${width}`, 10) || defaultWidth, maxWidth)
    );
  }

  private get height(): string {
    const {dimensions} = this.props;
    const {height} = dimensions || {height: undefined};
    const defaultHeight = this.isHorizontal ? defaultHorizontalCardDimensions.height : defaultSquareCardDimensions.height;

    return getCSSUnitValue(height || defaultHeight);
  }

  get cardSize(): BreakpointSizeValue | undefined {
    return this.isHorizontal ? breakpointSize(this.width, breakpointSizes) : undefined;
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
    const {appearance, onClick, onMouseEnter, linkUrl} = this.props;
    const {height, width, cardSize} = this;
    const cardStyle = {height, width};
    const content = this.getContentToRender();

    return (
      <A linkUrl={linkUrl} onClick={onClick} onMouseEnter={onMouseEnter}>
        <Wrapper style={cardStyle} className={appearance} cardSize={cardSize}>
          {content}
        </Wrapper>
      </A>
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
        <Title className="card-title">
          {title}
        </Title>
        <Description>
          <Ellipsify text={description || ''} lines={2} />
        </Description>

        <Footer>
          <Link>
            {icon}
            <span>
              {site || linkUrl}
            </span>
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
}

export default LinkCardGenericView;
