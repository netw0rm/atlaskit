import * as React from 'react';
import {Status} from '../../types';
import {LoadingView} from './LoadingView';
import {LoadedView, Action} from './LoadedView';
import {ErroredView} from './ErroredView';

export interface VerticalLinkViewProps {
  status: Status;
  href?: string;
  site?: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  actions?: Array<Action>;
  onClick?: () => void;
}

export class VerticalLinkView extends React.Component<VerticalLinkViewProps, {}> {
  render(): JSX.Element {
    const {status} = this.props;
    switch (status) {

      case 'creating':
      case 'loading':
        return (
          <LoadingView/>
        );

      case 'waiting':
      case 'loaded':
        return (
          <LoadedView {...this.props}/>
        );

      case 'errored':
        return (
          <ErroredView/>
        );

      default:
        throw new Error(`Unsupported status "${status}".`); // WHY TYPESCRIPT?!

    }
  }
}
