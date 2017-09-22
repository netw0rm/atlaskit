import * as React from 'react';
import {Status} from '../../types';
import {LoadedView} from './LoadedView';
import {ErroredView} from './ErroredView';

export interface VerticalLinkViewProps {
  status: Status;
  href?: string;
  icon?: string;
  image?: string;
  site?: string;
  title?: string;
  description?: string;
}

export class VerticalLinkView extends React.Component<VerticalLinkViewProps, {}> {

  renderLoading(): JSX.Element {
    return <div>Loading</div>;
  }

  renderLoaded(): JSX.Element {
    const {href, icon, image, site, title, description} = this.props;
    return (
      <LoadedView
        href={href}
        icon={icon}
        image={image}
        site={site}
        title={title}
        description={description}
      />
    );
  }

  renderErrored(): JSX.Element {
    return <ErroredView/>;
  }

  render(): JSX.Element {
    const {status} = this.props;
    switch (status) {

      case 'uploading':
        throw new Error('Not implemented');

      case 'loading':
        return this.renderLoading();

      case 'waiting':
      case 'loaded':
        return this.renderLoaded();

      case 'errored':
        return this.renderErrored();

    }
  }

}
