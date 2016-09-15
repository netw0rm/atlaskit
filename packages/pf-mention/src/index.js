import 'style!./host.less';

import MentionResource, { AbstractMentionResource } from './api/pf-mention-resource';
import MentionList from './wc/pf-mention-list';
import ResourcedMentionList from './wc/pf-resourced-mention-list';
import MentionPicker from './wc/pf-mention-picker';
import * as events from './internal/index.events';

export {
  MentionResource,
  AbstractMentionResource,
  MentionList,
  ResourcedMentionList,
  MentionPicker,
};

export default MentionPicker;

export { events };
