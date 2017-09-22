/* tslint:disable variable-name jsx-no-lambda */
import * as React from 'react';
import {Context, Status, FileDetails} from '../../types';
import {WithFileDetails} from '../../loaders/WithFileDetails';
import {WithFileImage} from '../../loaders/WithFileImage';
import {FileView} from '../FileView';

export interface FileCardProps {
  context: Context;
  id: string;
  collection?: string;
  onChange?: (status: Status, details?: FileDetails) => void;
}

export class FileCard extends React.PureComponent<FileCardProps, {}> {

  mapDetailsToProps(status: Status, details?: FileDetails) {
    if (details) {
      const {name, size, mediaType} = details;
      return {
        status,
        name,
        size,
        type: mediaType
      };
    } else {
      return {status};
    }
  }

  render() {
    const {context, id, collection, onChange} = this.props;
    return (
      <WithFileDetails
        context={context}
        id={id}
        collection={collection}
        onChange={onChange}
      >
        {(status, details) => (
          <WithFileImage
            context={context}
            id={id}
            width={156}
            height={116}
          >
            {(url) => (
              <FileView {...this.mapDetailsToProps(status, details)} thumbnailURI={url}/>
            )}
          </WithFileImage>
        )}
      </WithFileDetails>
    );
  }

}

