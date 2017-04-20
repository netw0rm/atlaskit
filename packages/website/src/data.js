/* eslint-disable global-require */

const NOW = new Date();

const components = {
  avatar: {
    docs: require('../../avatar/docs').default,
    status: {
      label: 'published',
      date: NOW,
    },
    name: 'Avatar',
    package: require('../../avatar/package'),
  },
  badge: {
    status: {
      label: 'published',
      date: NOW,
    },
    name: 'Badge',
    docs: require('../../badge/docs'),
    package: require('../../badge/package'),
  },
  banner: {
    status: {
      label: 'published',
      date: NOW,
    },
    name: 'Banner',
    package: require('../../banner/package'),
  },
  button: {
    docs: require('../../button/docs').default,
    status: {
      label: 'published',
      date: NOW,
    },
    name: 'Button',
    package: require('../../button/package'),

  },
  toggle: {
    status: {
      label: 'published',
      date: NOW,
    },
    name: 'Toggle',
    package: require('../../toggle/package'),
  },
};

export default components;
