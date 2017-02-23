import * as React from 'react';
import { PureComponent } from 'react';

export type SubSupType = 'sub' | 'sup';

export interface Props extends React.Props<SubSup> {
  attrs: {
    type: SubSupType
  };
}

const isSub = (type: SubSupType): type is 'sub' => {
  return type === 'sub';
};

export default class SubSup extends PureComponent<Props, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const { props } = this;
    const { type } = props.attrs;

    if (isSub(type)) {
      return <sub>{props.children}</sub>;
    }

    return <sup>{props.children}</sup>;
  }
}
