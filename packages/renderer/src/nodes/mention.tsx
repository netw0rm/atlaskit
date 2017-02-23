import * as React from 'react';
import { PureComponent } from 'react';
import { Mention as AKMention } from '@atlaskit/mention';

export interface Props extends React.Props<Mention> {
  attrs?: {
    id: string;
    text?: string;
    displayName?: string;
  };
  text?: string;
}

export default class Mention extends PureComponent<Props, {}> {
  render() {
    const { props } = this;
    const { attrs } = props;
    const { id } = attrs || { id: 'unknown '};

    let text;
    if (attrs) {
      text = attrs.text || attrs.displayName;
    }

    if (!text) {
      text = props.text || '@unkown';
    }

    return <AKMention id={id} text={text} />;
  }
}
