/* eslint-disable global-require */

const components = {
  avatar: {
    docs: require('../../avatar/docs').default,
    meta: {
      version: '1.0.5',
      status: {
        label: 'published',
        date: Date.now(),
      },
    },
    name: 'Avatar',
    package: require('../../avatar/package'),
  },
  badge: {
    meta: {
      version: '1.0.5',
      status: {
        label: 'published',
        date: Date.now(),
      },
    },
    name: 'Badge',
    docs: require('../../badge/docs'),
    package: require('../../badge/package'),
  },
  banner: {
    meta: {
      version: '1.0.5',
      status: {
        label: 'published',
        date: Date.now(),
      },
    },
    name: 'Banner',
    package: require('../../banner/package'),
  },
  button: {
    docs: require('../../button/docs').default,
    meta: {
      version: '1.0.5',
      status: {
        label: 'published',
        date: Date.now(),
      },
    },
    name: 'Button',
    package: require('../../button/package'),

  },
  toggle: {
    meta: {
      version: '1.0.5',
      status: {
        label: 'published',
        date: Date.now(),
      },
    },
    name: 'Toggle',
    package: require('../../toggle/package'),
  },
};

export default components;
