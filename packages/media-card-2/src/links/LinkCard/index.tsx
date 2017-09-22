/* tslint:disable variable-name jsx-no-lambda */
import * as React from 'react';
import {Context, Status, UrlPreview} from '../../types';
import {WithLinkDetails} from '../../loaders/WithLinkDetails';
import {VerticalLinkView} from '../VerticalLinkView';

function hostname(url: string): string | null {
  const match = url.match(/^http(?:s)?:\/\/([^\/:]+)(?::|\/|$)/);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export interface LinkCardProps {
  context: Context;
  id?: string;
  url?: string;
  collection?: string;
  onChange?: (status: Status, details?: UrlPreview) => void;
}

export class LinkCard extends React.PureComponent<LinkCardProps, {}> {

  mapDetailsToProps(status: Status, details?: UrlPreview) {
    if (details) {
      const {url, site, title, description, resources} = details;
      return {
        status,
        href: url,
        icon: resources && resources.icon && resources.icon.url,
        thumbnail: resources && resources.thumbnail && resources.thumbnail.url,
        image: resources && resources.image && resources.image.url,
        site: site || hostname(url) || url,
        title,
        description
      };
    } else {
      return {status};
    }
  }

  render() {
    const {context, id, url, collection, onChange} = this.props;
    return (
      <WithLinkDetails
        context={context}
        id={id}
        url={url}
        collection={collection}
        onChange={onChange}
      >
        {(status, details) => (
          <VerticalLinkView {...this.mapDetailsToProps(status, details)}/>
        )}
      </WithLinkDetails>
    );
  }

}
