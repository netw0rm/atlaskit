import uid from 'uid';

export default (prefix = '') => `${prefix}_${uid()}`;
