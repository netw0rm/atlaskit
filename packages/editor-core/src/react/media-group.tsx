import * as React from 'react';
import { PureComponent } from 'react';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';

export interface Props {
  children?: React.ReactNode;
}

export default class MediaGroupNode extends PureComponent<Props, {}> {
  render() {
    return <FilmStripNavigator>{this.props.children}</FilmStripNavigator>;
  }
}
