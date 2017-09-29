import * as React from 'react';
import ProviderFactory from '../../../providerFactory';
import { Attributes as EmojiAttributes } from '../../../schema/nodes/emoji';
import Emoji from '../../../ui/Emoji';

export interface EmojiProps extends EmojiAttributes {
  providers?: ProviderFactory;
}

export default function EmojiItem(props, params) {
  const { id, providers, shortName, text } = props;

  return (
    <Emoji
      key={params.key}
      allowTextFallback={true}
      id={id}
      shortName={shortName}
      fallback={text}
      providers={providers}
    />
  );
}
