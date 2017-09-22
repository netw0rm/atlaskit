/* tslint:disable: variable-name */
import * as React from 'react';

import {
  Context,
  Status,
  Details,
  UrlPreview,
  LinkIdentifier,
  LinkPreviewIdentifier
} from '../../types';

import {WithDetails} from '../WithDetails';

function isLinkDetails(details: Details): details is UrlPreview {
  return details && (details as UrlPreview).url !== undefined;
}

export interface WithLinkDetailsProps {
  context: Context;
  id?: string;
  url?: string;
  collection?: string;
  initialDetails: UrlPreview;
  onChange?: (status: Status, details?: UrlPreview) => void;
  children: (status: Status, details?: UrlPreview) => JSX.Element;
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

  renderChildren = (status: Status, details: Details): JSX.Element => {
    const {children} = this.props;
    if (typeof details === 'undefined' || isLinkDetails(details)) {
      return children(status, details);
    } else {
      throw new Error('Expected some file details but got something else??!');
    }
  }

  render() {
    const {context, initialDetails, onChange} = this.props;
    return (
      <WithDetails
        context={context}
        identifier={this.identifier}
        initialDetails={initialDetails}
        onChange={onChange}
      >
        {this.renderChildren}
      </WithDetails>
    );
  }

}
