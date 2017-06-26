import {
  EmojiResponse,
} from '../types';

import { denormaliseEmojiServiceResponse, EmojiLoaderConfig, emojiRequest } from './EmojiUtils';

/**
 * Emoji providers should return JSON in the format defined by EmojiServiceResponse.
 */
export default class EmojiLoader {

  private config: EmojiLoaderConfig;

  constructor(config: EmojiLoaderConfig) {
    this.config = config;
  }

  /**
   * Returns a promise with an array of Emoji from all providers.
   */
  loadEmoji(): Promise<EmojiResponse> {
    const emojisPromise = emojiRequest(this.config);
    return emojisPromise.then(emojiServiceResponse => {
      const newEmojiServiceResponse = {
        ...emojiServiceResponse
      };
      if (emojiServiceResponse.meta && emojiServiceResponse.meta.mediaApiToken) {
        // filter site emoji
        newEmojiServiceResponse.emojis = emojiServiceResponse.emojis; //.slice(0, 20);
      }
      return denormaliseEmojiServiceResponse(newEmojiServiceResponse);
    });
  }
}
