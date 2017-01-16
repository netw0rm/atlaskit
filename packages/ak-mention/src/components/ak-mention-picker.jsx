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
    onOpen: PropTypes.func,
    onClose: PropTypes.func,

    // ak-inline-dialog
    /**
     * id of element to target the picker against.
     * if not specified the picker is rendered inline.
     */
    target: PropTypes.string,
    position: PropTypes.string,
    zIndex: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
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
      resourceProvider.subscribe(
        this._subscriberKey,
        this._filterChange,
        this._filterError,
        this._filterInfo
      );
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
    const wasVisible = this.state.visible;
    const visible = mentions.length > 0;
    this.setState({
      visible,
    });
    if (wasVisible !== visible) {
      if (visible) {
        this.props.onOpen();
      } else {
        this.props.onClose();
      }
    }
  }

  _filterError = (error) => {
    debug('ak-mention-picker._filterError', error);
    this.setState({
      visible: true,
      info: undefined,
    });
  }

  _filterInfo = (info) => {
    debug('ak-mention-picker._filterInfo', info);
    this.setState({
      info,
    });
  };

  render() {
    const { resourceProvider, presenceProvider, onSelection, query,
      target, position, zIndex, offsetX, offsetY } = this.props;
    const { visible, info } = this.state;
    const style = {
      display: visible || info ? 'block' : 'none',
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

    const infoContent = info && !visible ? (
      <div className={styles.akMentionPickerInfo}>
        <p>{info}</p>
      </div>
     ) : null;

    let content;

    if (position) {
      debug('target, position', target, position);
      if (target) {
        content = (
          <Popup
            target={target}
            position={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            <div>
              {resourceMentionList}
              {infoContent}
            </div>
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
          {infoContent}
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
