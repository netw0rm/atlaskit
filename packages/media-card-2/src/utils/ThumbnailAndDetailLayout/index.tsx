import * as React from 'react';
import {Wrapper, ThumbnailWrapper, DetailWrapper} from './styled';

export function ThumbnailAndDetailLayout(props) {
  const {thumbnail, detail} = props;
  return (
    <Wrapper>
      <ThumbnailWrapper>{thumbnail}</ThumbnailWrapper>
      <DetailWrapper>{detail}</DetailWrapper>
    </Wrapper>
  );
}
