import uid from 'uid';

export default function uniqueId(prefix = '') {
  return `${prefix}_${uid()}`;
}
