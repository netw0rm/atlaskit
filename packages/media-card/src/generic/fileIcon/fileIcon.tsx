/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import audio from '@atlaskit/icon/glyph/audio';
import doc from '@atlaskit/icon/glyph/document';
import image from '@atlaskit/icon/glyph/image';
import video from '@atlaskit/icon/glyph/video';
import unknown from '@atlaskit/icon/glyph/page';
import {FileTypeIcon} from '../../cardOverlay/styled';

export interface FileIconProps {
  mediaType?: string;
  style?: any;
}

export class FileIcon extends Component<FileIconProps, {}> {
  render() {
    const type = this.props.mediaType || 'unknown';
    const fileTypeIconClass = `file-type-icon ${type}`;
    const icons = {
      audio,
      doc,
      image,
      video,
      unknown
    };
    const Icon = icons[type] || icons['unknown'];

    return <FileTypeIcon style={this.props.style} className={fileTypeIconClass}>
             <Icon className={fileTypeIconClass} size="small" label="fileIcon"/>
           </FileTypeIcon>;
  }
}
