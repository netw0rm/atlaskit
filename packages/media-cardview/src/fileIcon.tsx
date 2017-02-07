// declare var require: {
//     <T>(path: string): T;
//     (paths: string[], callback: (...modules: any[]) => void): void;
//     ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };

// declare module '*.less' {
//   interface Styles {
//     locals: { [identifier: string]: any };
//     toString(): string;
//   }
//   const locals: { [identifier: string]: any };
//   export = locals;
// }

declare module '*.less';

import * as React from 'react';
import {Component} from 'react';
// const styles = require('./styles.less');
// import * as styles from './styles.less'; //!style!css!less!
import * as styles from '../styles.less';

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