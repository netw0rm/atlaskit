import * as React from 'react';
import { PureComponent } from 'react';
import { Context, MediaItem } from '@atlaskit/media-core';
import Spinner from '@atlaskit/spinner';
import { Header } from './header';
import { Footer } from './footer';
import { Viewer } from './viewer';
// import { Navigation } from './navigation';
import { Error } from './messages/error';
import {FullMediaViewer} from './styled';

export interface Props {
  mediaItem?: MediaItem;
  collectionName?: string;
  context: Context;
}

export interface State {
  metadata: any; // TODO
  error: any; // TODO
}

export default class MediaViewer extends PureComponent<Props, State> {

  private subscription: any; // TODO

  constructor(props) {
    super(props);
    this.state = {
      metadata: undefined,
      error: undefined
    };
  }

  componentDidMount(): void {
    console.log('mediaviewer mounted');
    const { context, mediaItem, collectionName } = this.props;
    if (!mediaItem || !mediaItem.details || !mediaItem.details.id) {
      console.log('no media item');
      this.setState({error: 'No media item provided'});
    } else {
      const provider = context.getMediaItemProvider(mediaItem.details.id, mediaItem.type, collectionName);
      this.subscription = provider.observable().subscribe({
        next: (metadata: MediaItem) => {
          this.setState({ metadata });
        },
        error: (error) => {
          this.setState({error});
        }
      });
    }
  }

  componentWillUnmount(): void {
    // this.subscription.unsubscribe();
  }

  onPrev = () => {
    alert('prev!');
  }

  onNext = () => {
    alert('next!');
  }

  render() {
    const { context } = this.props;
    const { metadata, error } = this.state;
    console.log(this.state);
    if (error) {
      return <Error />;
    }
    if (!metadata) {
      return <Spinner size="large" />;
    }
    return (
      <FullMediaViewer>

        <Header
          mediaItem={metadata} />

        <Viewer
          context={context}
          collectionName={this.props.collectionName}
          mediaItem={metadata}/>

        {/*<Navigation
          onPrev={this.onPrev}
          onNext={this.onNext}/>*/}

        <Footer
          mediaItem={metadata}/>

      </FullMediaViewer>
    );
  }
}
