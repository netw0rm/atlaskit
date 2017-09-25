import * as React from 'react';
import {Context} from '../../types';
import {WithLinkDetails, LinkStatus, LinkDetails} from '../WithLinkDetails';
import {VerticalLinkView, VerticalLinkViewProps} from '../VerticalLinkView';

export interface LinkCardProps {
  context: Context;
  id?: string;
  url?: string;
  collection?: string;
  onClick?: (status: LinkStatus, details?: LinkDetails) => void;
  onUpdate?: (status: LinkStatus, details?: LinkDetails) => void;
}

// TODO: these utility functions probably will get reused across the numerous components - share them!

function getIcon(details?: LinkDetails): string | undefined {
  if (details && details.resources && details.resources.icon) {
    return details.resources.icon.url;
  } else {
    return undefined;
  }
}

function getThumbnail(details?: LinkDetails): string | undefined {
  if (details && details.resources && details.resources.thumbnail) {
    return details.resources.thumbnail.url;
  } else {
    return undefined;
  }
}

function getImage(details?: LinkDetails): string | undefined {
  if (details && details.resources && details.resources.image) {
    return details.resources.image.url;
  } else {
    return undefined;
  }
}

function getHostname(url: string): string | undefined {
  const match = url.match(/^https?:\/\/([^:\/]+)/);
  if (match) {
    return match[1];
  }
}

// would be awesome for this logic to be moved to a BFF, providing the same data consistently for iOS, Android and web!
function mapToVerticalLinkViewProps(status: LinkStatus, details?: LinkDetails): VerticalLinkViewProps {
  if (details) {
    const {
      url,
      site,
      title,
      description
    } = details;
    return {
      status,
      href: url,
      site: site || getHostname(url) || url,
      title,
      description,
      icon: getIcon(details),
      image: getImage(details) || getThumbnail(details)
    };
  } else {
    return {status};
  }
}

function shouldCelebrateImage(status: LinkStatus, details?: LinkDetails): boolean {
  return true; // TODO: I THINK Scotty wanted to show the HorizontalLinkView if there's no decent image to show
}

export class LinkCard extends React.Component<LinkCardProps, {}> {

  createClickHandler(status: LinkStatus, details?: LinkDetails) {
    const {onClick} = this.props;
    if (onClick) {
      return () => onClick(status, details);
    } else {
      return undefined;
    }
  }

  renderView = (status: LinkStatus, details?: LinkDetails): JSX.Element => {

    // TODO: render EmbedLinkView or AppLinkView also
    // if (isEmbed(status, details)) {
    // } else if (isApp(status, details)) {
    // }

    if (shouldCelebrateImage(status, details)) {
      return (
        <VerticalLinkView
          onClick={this.createClickHandler(status, details)}
          {...mapToVerticalLinkViewProps(status, details)}
        />
      );
    } else {
      throw new Error('View not supported at this time.');
    }
  }

  render() {
    const {context, id, url, collection, onUpdate} = this.props;
    return (
      <WithLinkDetails
        context={context}
        id={id}
        url={url}
        collection={collection}
        render={this.renderView}
        onUpdate={onUpdate}
      />
    );
  }
}
