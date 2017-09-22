/* tslint:disable: variable-name */
import * as React from 'react';
import {WithDetails} from '../WithDetails';

import {
  Context,
  Status,
  Details,
  UrlPreview,
  FileDetails
} from '../../types';

function isFileDetails(details: Details): details is FileDetails {
  return details && (details as UrlPreview).url === undefined;
}

export interface WithFileDetailsProps {
  context: Context;
  id: string;
  collection?: string;
  initialDetails?: FileDetails;
  onChange?: (status: Status, details?: FileDetails) => void;
  children: (status: Status, details?: FileDetails) => JSX.Element;
}

export class WithFileDetails extends React.PureComponent<WithFileDetailsProps, {}> {

  renderChildren = (status: Status, details: Details): JSX.Element => {
    const {children} = this.props;
    if (typeof details === 'undefined' || isFileDetails(details)) {
      return children(status, details);
    } else {
      throw new Error('Expected some file details but got something else??!');
    }
  }

  render() {
    const {context, id, collection, initialDetails, onChange} = this.props;
    return (
      <WithDetails
        context={context}
        identifier={{
          type: 'file',
          id,
          collection
        }}
        initialDetails={initialDetails}
        onChange={onChange}
      >
        {this.renderChildren}
      </WithDetails>
    );
  }

}
