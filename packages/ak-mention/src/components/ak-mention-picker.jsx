import styles from 'style!./ak-mention-picker.less';

import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import ResourcedMentionList from './ak-resourced-mention-list';
import Popup from './ak-popup';
import MentionPropTypes from '../internal/ak-mention-prop-types';
import debug from '../util/logger';
import uniqueId from '../util/id';

/**
* @class MentionPicker
*/
export default class MentionPicker extends PureComponent {

  static propTypes = {
    // ak-resourced-mention-list
    resourceProvider: MentionPropTypes.resourceProvider,
    presenceProvider: MentionPropTypes.presenceProvider,
    query: PropTypes.string,
    onSelection: PropTypes.func,

    // ak-inline-dialog
    target: PropTypes.node,
    position: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this._subscriberKey = uniqueId('ak-mention-picker');
    this.state = {
      visible: false,
    };
    this._applyPropChanges({}, props);
  }

  componentDidMount() {
    this._subscribeResourceProvider(this.props.resourceProvider);
  }

  componentWillReceiveProps(nextProps) {
    this._applyPropChanges(this.props, nextProps);
  }

  componentWillUnmount() {
    if (this.resourceProvider) {
      this.resourceProvider.unsubscribe(this._subscriberKey);
    }
    this._unsubscribeResourceProvider(this.props.resourceProvider);
  }

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

  // Internal
  _applyPropChanges(prevProps, nextProps) {
    const oldResourceProvider = prevProps.resourceProvider;
    const newResourceProvider = nextProps.resourceProvider;

    const resourceProviderChanged = oldResourceProvider !== newResourceProvider;

    // resource provider
    if (resourceProviderChanged) {
      this._unsubscribeResourceProvider(oldResourceProvider);
      this._subscribeResourceProvider(newResourceProvider);
    }
  }

  _subscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.subscribe(this._subscriberKey, this._filterChange, this._filterError);
    }
  }

  _unsubscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.unsubscribe(this._subscriberKey);
    }
  }

  // internal, used for callbacks
  _filterChange = (mentions) => {
    debug('ak-mention-picker._filterChange', mentions.length);
    this.setState({
      visible: mentions.length > 0,
    });
  }

  _filterError = (error) => {
    debug('ak-mention-picker._filterError', error);
    this.setState({
      visible: true,
    });
  }

  render() {
    const { resourceProvider, presenceProvider, onSelection, query, target, position } = this.props;
    const { visible } = this.state;
    const style = {
      display: visible ? 'block' : 'none',
    };

    const classes = classNames([
      'ak-mention-picker',
      styles.akMentionPicker,
    ]);

    const resourceMentionList = (
      <ResourcedMentionList
        resourceProvider={resourceProvider}
        presenceProvider={presenceProvider}
        onSelection={onSelection}
        query={query}
        ref={(ref) => { this._mentionListRef = ref; }}
      />
    );

    let content;

    if (position) {
      debug('target, position', target, position);
      if (target) {
        content = (
          <Popup
            attachTo={target}
            position={position}
            ref={(ref) => { this._dialog = ref; }}
          >
            {resourceMentionList}
          </Popup>
        );
      } else {
        // don't show if we have a position, but no target yet
        content = null;
      }
    } else {
      content = (
        <div className={styles.noDialogContainer}>
          {resourceMentionList}
        </div>
      );
    }

    return (
      <div style={style} className={classes}>
        {content}
      </div>
    );
  }
}
