/* tslint:disable: variable-name */
import * as React from 'react';
import {
  Context,
  Status,
  Details,
  LinkPreviewDetails,
  LinkIdentifier,
  LinkPreviewIdentifier
} from '../../types';
import {WithDetails} from '../../utils/WithDetails';

export type LinkStatus = Status;
export type LinkDetails = LinkPreviewDetails;

function isLinkDetails(details: Details): details is LinkDetails {
  return details && (details as LinkDetails).url !== undefined;
}

export interface WithLinkDetailsProps {
  context: Context;
  id?: string;
  url?: string;
  collection?: string;
  initialDetails?: LinkDetails;
  onUpdate?: (status: LinkStatus, details?: LinkDetails) => void;
  render: (status: LinkStatus, details?: LinkDetails) => JSX.Element; // TODO: use `children` when typescript is updated
}

export class WithLinkDetails extends React.PureComponent<WithLinkDetailsProps, {}> {

  get identifier(): LinkIdentifier | LinkPreviewIdentifier {
    const {id, url, collection} = this.props;
    if (id && collection) {
      return {
        type: 'link',
        id,
        collection
      };
    } else if (url) {
      return {
        type: 'link',
        url
      };
    } else {
      throw new Error('A link must have an ID and a collection or URL.');
    }
  }

  renderChildren = (status, details) => {
    const {render} = this.props;
    if (typeof details === 'undefined' || isLinkDetails(details)) {
      return render(status, details);
    } else {
      throw new Error('Expected some file details but got something else??!');
    }
  }

  render() {
    const {context, initialDetails, onUpdate} = this.props;
    return (
      <WithDetails
        context={context}
        identifier={this.identifier}
        initialDetails={initialDetails}
        onUpdate={onUpdate}
        render={this.renderChildren}
      />
    );
  }

}
