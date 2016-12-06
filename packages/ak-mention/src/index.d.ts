import { PureComponent, ReactElement } from 'react';

interface ResourceProvider {
  subscribe: Function;
  unsubscribe: Function;
  filter: Function;
  recordMentionSelection?: Function;
}

interface PresenceProvider {
  subscribe: Function;
  unsubscribe: Function;
  refreshPresence: Function;
}

interface Mention {
  id: string;
  avatarUrl?: string;
  selected?: boolean;
  name?: string;
  mentionName?: string;
  status?: string;
  time?: string;
  highlight?: MentionHighlight;
}

interface MentionHighlight {
  name?: HighlightDetail[];
  mentionName?: HighlightDetail[];
}

interface HighlightDetail {
  start?: number;
  end?: number;
}

declare class MentionPicker extends PureComponent<{
    resourceProvider?: ResourceProvider;
    presenceProvider?: PresenceProvider;
    query?: string;
    onSelection?: Function;
    target?: Node
    position?: string;
  }, {}> {}

declare class AbstractResource {}
declare class AbstractMentionResource extends AbstractResource {
  filter(query: string): void;
  recordMentionSelection(mention: Mention): void;
  _notifyListeners(mentions: Mention[]): void;
  _notifyErrorListeners(error: any): void;
}
declare class AbstractPresenceResource extends AbstractResource {
  _notifyListeners(precenses: any);
}
declare class MentionResource extends AbstractMentionResource {}
declare class MentionList extends PureComponent<{
  mentions?: Mention[];
  showError?: boolean;
  onSelection?: Function;
}, {}> {}
declare class ResourcedMentionList extends PureComponent<{
  resourceProvider?: ResourceProvider,
  presenceProvider?: PresenceProvider,
  query?: string,
  onSelection?: Function
}, {}> {}

export {
  MentionResource,
  AbstractMentionResource,
  AbstractPresenceResource,
  MentionList,
  ResourcedMentionList,
  MentionPicker
}

export default MentionPicker;
