import * as React from 'react';
import Component = React.Component;
import styles from 'style!./styles.less';

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