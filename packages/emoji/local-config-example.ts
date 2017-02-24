import { EmojiResourceConfig } from './src/api/EmojiResource';

// Copy this file to local-config.js and customise.
const sampleConfig: EmojiResourceConfig = {
  url: 'https://emoji-example/',
  providers: [
    {
      url: 'https://emoji-example/standard',
    },
    {
      url: 'https://emoji-example/custom',
      securityProvider: () => ({
        headers: {
          Authorization: 'Bearer token',
        },
      }),
    },
  ],
};

export default sampleConfig;
