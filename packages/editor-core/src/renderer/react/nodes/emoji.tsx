import * as React from 'react';
import { PureComponent } from 'react';
import ProviderFactory from '../../../providerFactory';
import { Attributes as EmojiAttributes } from '../../../schema/nodes/emoji';
import Emoji from '../../../ui/Emoji';

export interface EmojiProps extends EmojiAttributes {
  providers?: ProviderFactory;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    const { id, shortName, text } = this.props;

    return (
      <Emoji
        allowTextFallback={true}
        id={id}
        shortName={shortName}
        fallback={text}
      />
    );
  }
}
