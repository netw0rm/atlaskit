import getMeta from './getMeta';

export default () => getMeta('ajs-remote-user') || getMeta('remote-username');
