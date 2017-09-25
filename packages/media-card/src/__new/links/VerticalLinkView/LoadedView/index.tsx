import * as React from 'react';
import {CardAction} from '@atlaskit/media-core';
import {LinkCardGenericView} from '../../../../links/cardGenericView';
import {Anchor} from './styled';

export type Action = CardAction;

export interface LoadedViewProps {
  href?: string;
  site?: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  actions?: Array<Action>;
  onClick?: () => void;
}

// TODO: add other event handlers

export class LoadedView extends React.Component<LoadedViewProps, {}> {
  render() {
    const {
      href = '',
      site = '',
      title = '',
      description = '',
      icon = '',
      image = '',
      actions,
      onClick
    } = this.props;
    // TODO: this anchor needs to live inside the view so we're not duplicating the width logic
    return (
      <Anchor href={href} onClick={onClick}>
        <LinkCardGenericView
          appearance="square"
          isLoading={false}
          linkUrl=""
          site={site}
          title={title}
          description={description}
          iconUrl={icon}
          thumbnailUrl={image}
          actions={actions}
        />
      </Anchor>
    );
  }
}
