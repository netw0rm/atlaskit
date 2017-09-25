/* tslint:disable: variable-name */
import * as React from 'react';
import {WithDetails} from '../../utils/WithDetails';

import {
  Context,
  Status,
  Details,
  LinkPreviewDetails,
  FileDetails
} from '../../types';

function isFileDetails(details: Details): details is FileDetails {
  return details && (details as LinkPreviewDetails).url === undefined;
}

export interface WithFileDetailsProps {
  context: Context;
  id: string;
  collection?: string;
  initialDetails?: FileDetails;
  onUpdate?: (status: Status, details?: FileDetails) => void;
  render: (status: Status, details?: FileDetails) => JSX.Element; // TODO: use `children` when typescript is updated
}

export class WithFileDetails extends React.PureComponent<WithFileDetailsProps, {}> {

  renderChildren = (status: Status, details: Details): JSX.Element => {
    const {render} = this.props;
    if (typeof details === 'undefined' || isFileDetails(details)) {
      return render(status, details);
    } else {
      throw new Error('Expected some file details but got something else??!');
    }
  }

  render() {
    const {context, id, collection, initialDetails, onUpdate} = this.props;
    return (
      <WithDetails
        context={context}
        identifier={{
          type: 'file',
          id,
          collection
        }}
        initialDetails={initialDetails}
        onUpdate={onUpdate}
        render={this.renderChildren}
      />
    );
  }

}
