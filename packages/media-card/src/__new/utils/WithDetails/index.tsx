/* tslint:disable: variable-name */
import * as React from 'react';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/operator/map';
import {
  Context,
  MediaItemProvider,
  UrlPreviewProvider,
  MediaItem,
  UrlPreview
} from '@atlaskit/media-core';
import {
  Identifier,
  LinkPreviewIdentifier,
  Status,
  Details
} from '../../types';

// TODO: add logic to lazy load in here

/*
  I ended up using a normal component here instead of a HoC because typing them is waaaay easier since you don't
  need to care about pass-thru props... also its probably easier to use
  https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
 */

export interface WithDetailsProps {
  context: Context;
  identifier: Identifier;
  initialDetails?: Details;
  onUpdate?: (status: Status, details?: Details) => void;
  render: (status: Status, details?: Details) => JSX.Element; // TODO: use `children` when typescript is updated
}

export interface WithDetailsState {
  status: Status;
  error?: any;
  details?: Details;
}

export class WithDetails extends React.Component<WithDetailsProps, WithDetailsState> {

  state: WithDetailsState;
  subscription: Subscription;

  constructor(props, context) {
    super(props, context);
    const {initialDetails} = props;
    this.state = {
      status: initialDetails ? 'loaded' : 'loading', // TODO: if file is pending this should be "waiting"
      details: initialDetails
    };

  }

  isLinkPreviewIdentifier(identifier: Identifier): identifier is LinkPreviewIdentifier {
    const preview = identifier as LinkPreviewIdentifier;
    return preview && preview.url !== undefined;
  }

  isMediaItem(item: MediaItem | UrlPreview): item is MediaItem {
    return item && (item as MediaItem).details !== undefined;
  }

  provider(): UrlPreviewProvider | MediaItemProvider {
    const {context, identifier} = this.props;
    if (this.isLinkPreviewIdentifier(identifier)) {
      const {url} = identifier;
      return context.getUrlPreviewProvider(url);
    } else {
      const {id, type, collection} = identifier;
      return context.getMediaItemProvider(id, type, collection);
    }
  }

  observable(): Observable<Details> {
    return this.provider().observable()
      .map((result: MediaItem | UrlPreview) => {
        if (this.isMediaItem(result)) {
          return result.details;
        } else {
          return result;
        }
      })
    ;
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  subscribe() {
    this.unsubscribe();
    this.setState(
      {status: 'loading', details: undefined, error: undefined},
      () => {
        this.subscription = this.observable().subscribe({
          next: details => {
            this.setState({status: 'waiting', details, error: undefined});
          },
          complete: () => {
            this.setState({status: 'loaded', error: undefined});
          },
          error: (error) => {
            this.setState({status: 'errored', details: undefined, error});
          }
        });
      }
    );
  }

  handleUpdate() {
    const {onUpdate} = this.props;
    const {status, details} = this.state;
    if (onUpdate) {
      onUpdate(status, details);
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(prevProps, prevState) {

    // re-subscribe when the context or identifier changes
    const {context: prevContext, identifier: prevIdentifier} = prevProps;
    const {context: currContext, identifier: currIdentifier} = this.props;
    if (currContext !== prevContext || currIdentifier !== prevIdentifier) {
      this.subscribe();
    }

    // call the onUpdate callback when the data has changed
    const {status: prevStatus, details: prevDetails} = prevState;
    const {status: currStatus, details: currDetails} = this.state;
    if (currStatus !== prevStatus || currDetails !== prevDetails) {
      this.handleUpdate();
    }

  }

  render() {
    const {render} = this.props;
    const {status, details} = this.state;
    return render(status, details);
  }

}
