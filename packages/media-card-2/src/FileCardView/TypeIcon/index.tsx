/* tslint:disable:variable-name */
import * as React from 'react';
import audio from '@atlaskit/icon/glyph/audio';
import doc from '@atlaskit/icon/glyph/document';
import image from '@atlaskit/icon/glyph/image';
import video from '@atlaskit/icon/glyph/media-services/video';
import unknown from '@atlaskit/icon/glyph/page';
import {IconWrapper} from './styled';

const icons = {
  audio,
  doc,
  image,
  video,
  unknown
};

export interface TypeIconProps {
  type?: string;
  size?: string;
}

export function TypeIcon({type, size = 'small'}: TypeIconProps) {
  const Icon = type ? icons[type] : icons['unknown'];
  return (
    <IconWrapper type={type || 'unknown'}>
      <Icon label="media-type" size={size}/>
    </IconWrapper>
  );
}
