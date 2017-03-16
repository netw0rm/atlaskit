/**
 * Only used internally ATM
 *
 * TODO: Use this component everywhere in media-* and remove previous solution
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component} from 'react';
import * as cx from 'classnames';

import {ImageViewWrapper, transparentFallbackBackground} from './styled';

export interface MediaImageProps {
  // mediaType: MediaType; // TODO: Do we need to provide a mediaType?
  dataURI: string;
  fadeIn?: boolean;
  crop?: boolean;
  transparentFallback?: boolean;
  width?: string;
  height?: string;
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
    const img = new window.Image();
    img.src = this.props.dataURI;
    img.onload = this.onImageLoad(this);
  }

  componentDidMount() {
    const parent = ReactDOM.findDOMNode(this).parentElement;
    const parentSize = parent.getBoundingClientRect();

    this.setState({
      parentWidth: parentSize.width,
      parentHeight: parentSize.height
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
    const {transparentFallback, width, height} = this.props;
    const implicitNoCrop = width !== '100%' || height !== '100%';
    const isSmallImage = window.parseInt(this.state.maxWidth) < this.state.parentWidth || window.parseInt(this.state.maxHeight) < this.state.parentHeight;
    const backgroundSize = implicitNoCrop ? `${width} ${height}, auto` : (isSmallImage ? `${this.state.maxWidth} ${this.state.maxHeight}, auto` : null);
    const transparentBg = transparentFallback ? `, ${transparentFallbackBackground}` : '';
    const style = {
      backgroundSize,
      backgroundImage: `url(${this.props.dataURI}) ${transparentBg}`
    };
    const className = cx('card-img', {
      'fade-in': this.props.fadeIn,
      crop: this.props.crop && !implicitNoCrop
    });

    return <ImageViewWrapper className={className} style={style} />;
  }
}
