import * as React from 'react';
import { EmojiAttributes } from '@atlaskit/editor-common';
import { PureComponent } from 'react';
import { ProviderFactory } from '@atlaskit/editor-core';
import Emoji from '../../../../editor-core/src/ui/Emoji'; // @TODO

export interface EmojiProps extends EmojiAttributes {
  providers?: ProviderFactory;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    const { id, providers, shortName, text } = this.props;

    return (
      <Emoji
        allowTextFallback={true}
        id={id}
        shortName={shortName}
        fallback={text}
        providers={providers}
      />
    );
  }
}
