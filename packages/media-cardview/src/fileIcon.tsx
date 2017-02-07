import * as React from 'react';
import {Component} from 'react';
import * as styles from './styles.less';

interface FileIconProps {
  mediaType: string;
}

export class FileIcon extends Component<FileIconProps, {}> {
  render() {
    const fileTypeIconClass = `${styles['fileTypeIcon']} ${styles[this.props.mediaType]}`;
    return (
      <div className={fileTypeIconClass} />
    );
  }
}