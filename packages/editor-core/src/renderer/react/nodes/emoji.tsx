import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId } from '@atlaskit/emoji';
import Emoji from '../../../ui/Emoji';
import ProviderFactory from '../../../providerFactory';

export interface EmojiProps extends EmojiId {
  providers?: ProviderFactory;
  dataAttrs?: { [key: string]: string };
  shortName: string;
  id?: string;
  fallback?: string;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    const { dataAttrs, providers, shortName, id, fallback } = this.props;

    if (dataAttrs) {
      return (
        <span
          {...dataAttrs}
        >
          <Emoji
            allowTextFallback={true}
            providers={providers}
            shortName={shortName}
            id={id}
            fallback={fallback}
          />
        </span>
      );
    }

    return (
      <Emoji
        allowTextFallback={true}
        providers={providers}
        shortName={shortName}
        id={id}
        fallback={fallback}
      />
    );
  }
}
