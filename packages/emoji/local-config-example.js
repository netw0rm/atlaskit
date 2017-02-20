// Copy this file to local-config.js and customise.
export default {
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

