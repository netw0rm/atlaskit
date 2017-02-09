import * as React from 'react';
import {Component} from 'react';
import styled from 'styled-components';
import {MediaTypes} from '@atlaskit/media-domain';

export interface PlaceholderProps {
  mediaType: MediaTypes.MediaType;
}

const Fallback = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAAg0lEQVR4Ae2WsQ0DQQgEKXkb4FzGZZRBF/9l3FVAbuPMer/ESnbGBBCNVhuBxDJFEbUVstR3FNmuS8zjApKvipvoDoKtgtz1EKTAkALT4VcJ3aE7dIfuwCVMvJn10h+rhTthApMSkOOPCePIeTzKwjnwYpy3AgEv8IfdnBHc+OeEfX+eRtkEbLrqLcMAAAAASUVORK5CYII=) no-repeat center;
  background-size: initial;
  width: 100%;
  height: 100%;
`;

// MEDIA-FIX: Does data-uri works here?

const FallbackUnknown = styled(Fallback)`
  background: data-uri("./icons/fallback-unknown.svg") no-repeat center;
`;
const FallbackVideo = styled(Fallback)`
  background: data-uri("./icons/fallback-play.svg") no-repeat center;
`;
const FallbackAudio = styled(Fallback)`
  background: data-uri("./icons/fallback-play.svg") no-repeat center;
`;

export class Placeholder extends Component<PlaceholderProps, {}> {
  render() {
    const Component = this.fallbackforMediaType(this.props.mediaType);

    return (
      <Component />
    );
  }

  fallbackforMediaType(mediaType: MediaTypes.MediaType) {
    switch (mediaType) {
      case 'doc': return FallbackUnknown;
      case 'image': return FallbackUnknown;
      case 'audio': return FallbackAudio;
      case 'video': return FallbackVideo
      case 'unknown': return FallbackUnknown;
      default: return Fallback;
    }
  }
}
