// Copy this file to local-config.js and customise.
export default {
  url: 'https://emoji-example/custom',
  securityProvider: () => ({
    headers: {
      'X-Bogus-Authorization': 'Bearer token',
    },
  }),
};
