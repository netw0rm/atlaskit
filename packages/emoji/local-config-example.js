// Copy this file to local-config.js and customise.
export default {
  recordConfig: {
    url: 'https://emoji-example/',
  },
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
