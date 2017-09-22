/* tslint:disable: variable-name */
import * as React from 'react';
import 'rxjs/add/operator/map';
import {
  Context,
  ImageResizeMode
} from '@atlaskit/media-core';
import {

} from '../../types';

// TODO: add logic to lazy load in here

export interface WithFileImageProps {
  context: Context;
  id: string;
  width: number;
  height: number;
  mode?: ImageResizeMode;
  children: (url?: string) => JSX.Element;
}

export interface WithFileImageState {
  url?: string;
  err?: Error;
}

export class WithFileImage extends React.PureComponent<WithFileImageProps, WithFileImageState> {

  state: WithFileImageState = {
  };

  fetch(): void {
    const {context, id, width, height, mode} = this.props;
    this.setState(
      {
        url: undefined,
        err: undefined
      },
      () => {
        context.getDataUriService().fetchImageDataUri(
          {type: 'file', details: {id}},
          width,
          height,
          mode
        ).then(
          url => this.setState({url}),
          err => this.setState({err})
        );
      }
    );
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.fetch();
  }

  componentDidUpdate(prevProps, prevState) {
    const {context: prevContext, id: prevId, width: prevWidth, width: prevHeight, mode: prevMode} = prevProps;
    const {context: currContext, id: currId, width: currWidth, width: currHeight, mode: currMode} = this.props;
    if (
      prevContext !== currContext || prevId !== currId ||
      prevWidth !== currWidth || prevHeight !== currHeight || prevMode !== currMode
    ) {
      this.fetch();
    }
  }

  render() {
    const {children} = this.props;
    const {url} = this.state;
    return children(url);
  }

}
