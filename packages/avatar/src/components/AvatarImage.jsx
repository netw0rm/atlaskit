// @flow
import React, { PureComponent } from 'react';
import { akColorN50, akColorPrimary3 } from '@atlaskit/util-shared-styles';
import { HiddenImage, Span, Svg } from '../styled/AvatarImage';

export function DefaultImage(
  { appearance, size, title }:
  { appearance: string, size: string, title?: string }
) {
  const rectBounds = 128;
  const background: string = akColorN50;
  const foreground: string = akColorPrimary3;

  return (
    <Svg appearance={appearance} size={size} viewBox={`0 0 ${rectBounds} ${rectBounds}`} version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      {!!title && <title>{title}</title>}
      {appearance === 'circle' ? (
        <g>
          <circle cx="64" cy="64" r="64" fill={background} />
          <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" fill={foreground} />
          <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" fill={foreground} />
        </g>
      ) : (
        <g>
          <rect fill={background} x="0" y="0" width={rectBounds} height={rectBounds} />
          <g transform="translate(19.000000, 32.000000)" fill={foreground}>
            <path d="M18.25,32.5 L54.5833333,32.5 L54.5833333,23.4166667 L18.25,23.4166667 L18.25,32.5 Z M9.16666667,18.8331166 C9.16666667,16.3479549 11.236581,14.3333333 13.7195662,14.3333333 L59.1137671,14.3333333 C61.6282641,14.3333333 63.6666667,16.3815123 63.6666667,18.8331166 L63.6666667,41.5833333 L9.16666667,41.5833333 L9.16666667,18.8331166 Z" />
            <path d="M18.25,9.81383682 C18.25,4.7850061 22.3296003,0.708333333 27.3238554,0.708333333 L36.4261446,0.708333333 C41.4374965,0.708333333 45.5,4.76812825 45.5,9.81383682 L45.5,23.4166667 L18.25,23.4166667 L18.25,9.81383682 Z M36.4166667,9.81383682 C36.4166667,9.79803315 36.4184748,9.79303784 36.4207515,9.79166667 L27.3238554,9.79166667 C27.3447224,9.79166667 27.3333333,9.80308059 27.3333333,9.81383682 L27.3333333,14.3333333 L36.4166667,14.3333333 L36.4166667,9.81383682 Z" />
            <path d="M11.4386532,55.2083333 L74.9953562,55.2083333 L79.5452242,41.5833333 L9.80449752,41.5833333 L11.4386532,55.2083333 Z M0.1048547,36.987541 C-0.192399775,34.5091405 1.5865717,32.5 4.09502839,32.5 L87.6264735,32.5 C90.1274401,32.5 91.5225656,34.393506 90.7231047,36.7875656 L82.9702846,60.004101 C82.1795402,62.3720582 79.5279445,64.2916667 76.9985338,64.2916667 L7.91963924,64.2916667 C5.41227673,64.2916667 3.14113571,62.3029555 2.84143097,59.8041257 L0.1048547,36.987541 Z" />
          </g>
        </g>
      )}
    </Svg>
  );
}

type Props = {
  alt?: string,
  appearance: string,
  src?: string,
  size: string,
};

export default class AvatarImage extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  state = {
    hasError: false,
    isLoading: !!this.props.src,
  };
  _isMounted: boolean;

  componentDidMount() {
    this._isMounted = true;
  }
  // handle case where `src` is modified after mount
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.src && this.props.src !== nextProps.src) {
      this.setState({ isLoading: true });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleLoad = (hasError: boolean) => {
    if (this._isMounted) {
      this.setState({ hasError, isLoading: false });
    }
  }
  handleLoadSuccess = () => this.handleLoad(false)
  handleLoadError = () => this.handleLoad(true)

  render() {
    const { alt, src, ...props } = this.props;
    const { hasError, isLoading } = this.state;
    const showDefault = !isLoading && (!src || hasError);
    const spanStyle = src && !isLoading ? { backgroundImage: `url(${src})` } : null;

    return showDefault ? (
      <DefaultImage
        appearance={props.appearance}
        size={props.size}
        title={alt}
      />
    ) : (
      <Span
        aria-label={alt}
        isLoading={isLoading}
        role="img"
        style={spanStyle}
        title={alt}
        {...props}
      >
        <HiddenImage
          aria-hidden="true"
          onLoad={this.handleLoadSuccess}
          onError={this.handleLoadError}
          src={src}
        />
      </Span>
    );
  }
}
