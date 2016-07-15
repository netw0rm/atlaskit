import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import MentionResource, { AbstractMentionResource } from './api/pf-mention-resource';
import MentionList from './wc/pf-mention-list';
import ResourcedMentionList from './wc/pf-resourced-mention-list';
import MentionPicker from './wc/pf-mention-picker';

export {
  MentionResource,
  AbstractMentionResource,
  MentionList,
  ResourcedMentionList,
  MentionPicker,
};

export default MentionPicker;
