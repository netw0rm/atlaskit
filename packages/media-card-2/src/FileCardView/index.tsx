import * as React from 'react';
import {FileViewModel} from '../types';
import {FileView} from '../views/FileView';

export interface FileCardViewProps extends FileViewModel {
}

export class FileCardView extends React.Component<FileCardViewProps, {}> {

  /*
    There's nothing fancy going on here. Unlike links, we only have one view for a file
  */
  render() {
    return (
      <FileView {...this.props}/>
    );
  }

}
