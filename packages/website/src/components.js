/* eslint-disable global-require */

const components = {
  avatar: {
    name: 'Avatar',
    docs: require('../../avatar/docs').default,
    package: require('../../avatar/package'),
  },
  badge: {
    name: 'Badge',
    package: require('../../badge/package'),
  },
  banner: {
    name: 'Banner',
    package: require('../../banner/package'),
  },
  button: {
    name: 'Button',
    docs: require('../../button/docs').default,
    package: require('../../button/package'),
  },
  toggle: {
    name: 'Toggle',
    package: require('../../toggle/package'),
  },
};

export default components;
