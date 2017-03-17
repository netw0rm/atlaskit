/**
 * Only used internally ATM
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import * as cx from 'classnames';

import {ImageViewWrapper, transparentFallbackBackground} from './styled';

export interface MediaImageProps {
  dataURI: string;
  fadeIn?: boolean;
  crop?: boolean;
  transparentFallback?: boolean;
  width?: string;
  height?: string;
  onError?: (this: HTMLElement, ev: ErrorEvent) => any;
}

export interface MediaImageState {
  maxWidth: string;
  maxHeight: string;
  parentWidth: number;
  parentHeight: number;
}

export class MediaImage extends Component<MediaImageProps, MediaImageState> {
  static defaultProps = {
    fadeIn: true,
    crop: true,
    transparentFallback: true,
    width: '100%',
    height: '100%'
  };

  constructor(props) {
    super(props);

    this.state = {
      maxWidth: '100%',
      maxHeight: '100%',
      parentWidth: Infinity,
      parentHeight: Infinity
    };
  }

  componentWillMount() {
    const img = new Image();

    img.src = this.props.dataURI;
    img.onload = this.onImageLoad(this);
    if (this.props.onError) { img.onerror = this.props.onError; }
  }

  componentDidMount() {
    const parent = ReactDOM.findDOMNode(this).parentElement;
    if (!parent) { return; }
    const {width, height} = parent.getBoundingClientRect();

    this.setState({
      parentWidth: width,
      parentHeight: height
    });
  }

  onImageLoad(component) {
    return function () {
      component.setState({
        maxWidth: `${this.width}px`,
        maxHeight: `${this.height}px`
      });
    };
  }

  render() {
    const {transparentFallback, crop, dataURI} = this.props;
    const {implicitNoCrop, backgroundSize} = this;
    const transparentBg = transparentFallback ? `, ${transparentFallbackBackground}` : '';
    const style = {
      backgroundSize,
      backgroundImage: `url(${dataURI})${transparentBg}`
    };
    const className = cx('media-card', {
      'fade-in': this.props.fadeIn,
      crop: crop && !implicitNoCrop
    });

    return <ImageViewWrapper className={className} style={style} />;
  }

  private get isSmall() {
    return parseInt(this.state.maxWidth, 0) < this.state.parentWidth || parseInt(this.state.maxHeight, 0) < this.state.parentHeight;
  }

  private get implicitNoCrop() {
    return this.props.width !== '100%' || this.props.height !== '100%';
  }

  private get backgroundSize() {
    const {width, height} = this.props;
    const {maxWidth, maxHeight} = this.state;

    return this.implicitNoCrop ? `${width} ${height}, auto` : (this.isSmall ? `${maxWidth} ${maxHeight}, auto` : null);
  }
}
