import * as React from 'react';
import { PureComponent } from 'react';

import * as classNames from 'classnames';

import { Mention, OnSelection } from '../../types';
import { MentionProvider, PresenceProvider, PresenceUpdate } from '../../api/MentionResource';
import MentionList from '../MentionList';
import debug from '../../util/logger';
import uniqueId from '../../util/id';

function applyPresence(mentions: Mention[], presences: PresenceUpdate) {
  const updatedMentions: Mention[] = [];
  for (let i = 0; i < mentions.length; i++) {
    // Shallow copy
    const mention = {
      ...mentions[i],
    };
    const presence = presences[mention.id];
    if (presence) {
      mention.presence = presence;
    }
    updatedMentions.push(mention);
  }
  return updatedMentions;
}

function extractPresences(mentions: Mention[]) {
  const presences: PresenceUpdate = {};
  for (let i = 0; i < mentions.length; i++) {
    const mention = mentions[i];
    if (mention.presence) {
      presences[mention.id] = mention.presence;
    }
  }
  return presences;
}

export interface Props {
  resourceProvider: MentionProvider;
  presenceProvider?: PresenceProvider;
  query?: string;
  onSelection?: OnSelection;
}

export interface State {
  showError: boolean;
  mentions: Mention[];
}

export default class ResourcedMentionList extends PureComponent<Props, State> {

  private subscriberKey: string;
  private mentionListRef: MentionList;

  constructor(props) {
    super(props);
    this.subscriberKey = uniqueId('ak-resourced-mention-list');
    this.state = {
      showError: false,
      mentions: [],
    };

    this.applyPropChanges({} as Props, props);
  }

  componentDidMount() {
    this.subscribeMentionProvider(this.props.resourceProvider);
    this.subscribePresenceProvider(this.props.presenceProvider);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPropChanges(this.props, nextProps);
  }

  componentWillUnmount() {
    this.unsubscribeMentionProvider(this.props.resourceProvider);
    this.unsubscribePresenceProvider(this.props.presenceProvider);
  }

  // API
  selectNext = (): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  }

  selectPrevious = (): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectPrevious();
    }
  }

  selectIndex(index: number, callback?: () => any): void {
    if (this.mentionListRef) {
      this.mentionListRef.selectIndex(index, callback);
    }
  }

  selectId(id: string, callback?: () => any): void {
    if (this.mentionListRef) {
      this.mentionListRef.selectId(id, callback);
    }
  }

  chooseCurrentSelection = (): void => {
    if (this.mentionListRef) {
      this.mentionListRef.chooseCurrentSelection();
    }
  }

  mentionsCount(): number {
    if (this.mentionListRef) {
      return this.mentionListRef.mentionsCount();
    }

    return 0;
  }

  // internal
  private subscribeMentionProvider(mentionProvider?: MentionProvider) {
    if (mentionProvider) {
      mentionProvider.subscribe(this.subscriberKey, this.filterChange, this.filterError);
    }
  }

  private subscribePresenceProvider(presenceProvider?: PresenceProvider) {
    if (presenceProvider) {
      presenceProvider.subscribe(this.subscriberKey, this.presenceUpdate);
    }
  }

  private unsubscribeMentionProvider(mentionProvider?: MentionProvider) {
    if (mentionProvider) {
      mentionProvider.unsubscribe(this.subscriberKey);
    }
  }

  private unsubscribePresenceProvider(presenceProvider?: PresenceProvider) {
    if (presenceProvider) {
      presenceProvider.unsubscribe(this.subscriberKey);
    }
  }

  private applyPropChanges(prevProps: Props, nextProps: Props) {
    const oldResourceProvider = prevProps.resourceProvider;
    const oldPresenceProvider = prevProps.presenceProvider;
    const oldQuery = prevProps.query;

    const newResourceProvider = nextProps.resourceProvider;
    const newPresenceProvider = nextProps.presenceProvider;
    const newQuery = nextProps.query;

    const resourceProviderChanged = oldResourceProvider !== newResourceProvider;
    const queryChanged = oldQuery !== newQuery;
    const canFilter = !!((typeof newQuery === 'string') && newResourceProvider);
    const shouldFilter = canFilter && (queryChanged || resourceProviderChanged);

    // resource provider
    if (resourceProviderChanged) {
      this.unsubscribeMentionProvider(oldResourceProvider);
      this.subscribeMentionProvider(newResourceProvider);
    }

    // presence provider
    if (oldPresenceProvider !== newPresenceProvider) {
      this.unsubscribePresenceProvider(oldPresenceProvider);
      this.subscribePresenceProvider(newPresenceProvider);
    }

    if (shouldFilter) {
      newResourceProvider.filter(newQuery);
    }
  }

  private refreshPresences(mentions: Mention[]) {
    if (this.props.presenceProvider) {
      const ids = mentions.map(mention => mention.id);
      this.props.presenceProvider.refreshPresence(ids);
    }
  }

  // internal, used for callbacks
  private filterChange = (mentions: Mention[]) => {
    // Retain known presence
    const currentPresences = extractPresences(this.state.mentions);
    this.setState({
      showError: false,
      mentions: applyPresence(mentions, currentPresences),
    });
    this.refreshPresences(mentions);
  }

  private filterError = (error: Error) => {
    debug('ak-resourced-mentions-list._filterError', error);
    this.setState({
      showError: true,
    } as State);
  }

  private presenceUpdate = (presences: PresenceUpdate): void => {
    this.setState({
      mentions: applyPresence(this.state.mentions, presences),
    } as State);
  }

  private notifySelection = (mention: Mention) => {
    this.props.resourceProvider.recordMentionSelection(mention);
    if (this.props.onSelection) {
      this.props.onSelection(mention);
    }
  }

  render() {
    const { mentions, showError } = this.state;

    const classes = classNames([
      'ak-resourced-mention-list',
    ]);

    return (
      <div className={classes}>
        <MentionList
          mentions={mentions}
          showError={showError}
          onSelection={this.notifySelection}
          ref={(ref) => { this.mentionListRef = ref; }}
        />
      </div>
    );
  }
}
