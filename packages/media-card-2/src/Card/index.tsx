/* tslint:disable variable-name jsx-no-lambda */
import * as React from 'react';
import {Context, Identifier, Status, FileDetails, UrlPreview} from '../types';
import {WithDetails} from '../loaders/WithDetails';
import {FileCardView} from '../FileCardView';
import {LinkCardView} from '../LinkCardView';

export interface CardProps {
  context: Context;
  identifier: Identifier;
}

export interface CardState {
}

export class Card extends React.PureComponent<CardProps, CardState> {

  renderFileDetails(status: Status, details: FileDetails) {
    if (details) {
      const {name, size, mediaType} = details;
      return (
        <FileCardView
          status={status}
          type={mediaType}
          name={name}
          size={size}
        />
      );
    } else {
      return <FileCardView status={status}/>;
    }
  }

  renderLinkDetails(status: Status, details: UrlPreview) {
    if (details) {
      const {title} = details;
      return (
        <LinkCardView
          status={status}
          title={title}
        />
      );
    } else {
      return <LinkCardView status={status}/>;
    }
  }

  render() {
    const {context, identifier} = this.props;

    switch(identifier.type) {

      case 'file':
        return (
          <WithDetails
            context={context}
            identifier={identifier}
            render={this.renderFileDetails}
          />
        );

      case 'link':
        return (
          <WithDetails
            context={context}
            identifier={identifier}
            render={this.renderLinkDetails}
          />
        );

      default:
        throw new Error('Card type is not supported.');

    }
  }
}

