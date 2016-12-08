import styles from 'style!./ak-resourced-mention-list.less';

import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';

import MentionList from './ak-mention-list';
import MentionPropTypes from '../internal/ak-mention-prop-types';
import debug from '../util/logger';
import uniqueId from '../util/id';

function applyPresence(mentions, presences) {
  const updatedMentions = [];
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

function extractPresences(mentions) {
  const presences = {};
  for (let i = 0; i < mentions.length; i++) {
    const mention = mentions[i];
    if (mention.presence) {
      presences[mention.id] = mention.presence;
    }
  }
  return presences;
}

export default class ResourcedMentionList extends PureComponent {

  static propTypes = {
    resourceProvider: MentionPropTypes.resourceProvider,
    presenceProvider: MentionPropTypes.presenceProvider,
    // Used in _applyPropChanges
    // eslint-disable-next-line react/no-unused-prop-types
    query: PropTypes.string,
    onSelection: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._subscriberKey = uniqueId('ak-resourced-mention-list');
    this.state = {
      showError: false,
      mentions: [],
    };

    this._applyPropChanges({}, props);
  }

  componentDidMount() {
    this._subscribeResourceProvider(this.props.resourceProvider);
    this._subscribePresenceProvider(this.props.presenceProvider);
  }

  componentWillReceiveProps(nextProps) {
    this._applyPropChanges(this.props, nextProps);
  }

  componentWillUnmount() {
    this._unsubscribeResourceProvider(this.props.resourceProvider);
    this._unsubscribePresenceProvider(this.props.presenceProvider);
  }

  // API
  selectNext = () => {
    if (this._mentionListRef) {
      this._mentionListRef.selectNext();
    }
  }

  selectPrevious = () => {
    if (this._mentionListRef) {
      this._mentionListRef.selectPrevious();
    }
  }

  chooseCurrentSelection = () => {
    if (this._mentionListRef) {
      this._mentionListRef.chooseCurrentSelection();
    }
  }

  // internal
  _subscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.subscribe(this._subscriberKey, this._filterChange, this._filterError);
    }
  }

  _subscribePresenceProvider(presenceProvider) {
    if (presenceProvider) {
      presenceProvider.subscribe(this._subscriberKey, this._presenceUpdate);
    }
  }

  _unsubscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.unsubscribe(this._subscriberKey);
    }
  }

  _unsubscribePresenceProvider(presenceProvider) {
    if (presenceProvider) {
      presenceProvider.unsubscribe(this._subscriberKey);
    }
  }

  _applyPropChanges(prevProps, nextProps) {
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
      this._unsubscribeResourceProvider(oldResourceProvider);
      this._subscribeResourceProvider(newResourceProvider);
    }

    // presence provider
    if (oldPresenceProvider !== newPresenceProvider) {
      this._unsubscribePresenceProvider(oldPresenceProvider);
      this._subscribePresenceProvider(newPresenceProvider);
    }

    if (shouldFilter) {
      newResourceProvider.filter(newQuery);
    }
  }

  _refreshPresences(mentions) {
    if (this.props.presenceProvider) {
      const ids = mentions.map(mention => mention.id);
      this.props.presenceProvider.refreshPresence(ids);
    }
  }

  // internal, used for callbacks
  _filterChange = (mentions) => {
    // Retain known presence
    const currentPresences = extractPresences(this.state.mentions);
    this.setState({
      showError: false,
      mentions: applyPresence(mentions, currentPresences),
    });
    this._refreshPresences(mentions);
  }

  _filterError = (error) => {
    debug('ak-resourced-mentions-list._filterError', error);
    this.setState({
      showError: true,
    });
  }

  _presenceUpdate = (presences) => {
    this.setState({
      mentions: applyPresence(this.state.mentions, presences),
    });
  }

  _notifySelection = (mention) => {
    this.props.resourceProvider.recordMentionSelection(mention);
    if (this.props.onSelection) {
      this.props.onSelection(mention);
    }
  }

  render() {
    const { mentions, showError } = this.state;

    const classes = classNames([
      'ak-resourced-mention-list',
      styles.akResourcedMentionList,
    ]);

    return (
      <div className={classes}>
        <MentionList
          mentions={mentions}
          showError={showError}
          onSelection={this._notifySelection}
          ref={(ref) => { this._mentionListRef = ref; }}
        />
      </div>
    );
  }
}
