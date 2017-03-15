import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';
import { OnMentionEvent } from '../../types';
import { MentionProvider, PresenceProvider } from '../../api/MentionResource';
import ResourcedMentionList from '../ResourcedMentionList';
import Popup from '../Popup';
import debug from '../../util/logger';
import uniqueId from '../../util/id';

export interface OnOpen {
  (): void;
}

export interface OnClose {
  (): void;
}

export type Position = 'above' | 'below' | 'auto';

export interface Props {
  resourceProvider: MentionProvider;
  presenceProvider?: PresenceProvider;
  query?: string;

  onSelection?: OnMentionEvent;
  onOpen?: OnOpen;
  onClose?: OnClose;

  target?: string;
  position?: Position;
  zIndex?: number | string;
  offsetX?: number;
  offsetY?: number;
}

export interface State {
  visible: boolean;
  info?: string;
}

/**
 * @class MentionPicker
 */
export default class MentionPicker extends PureComponent<Props, State> {

  private subscriberKey: string;
  private mentionListRef: ResourcedMentionList;

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.subscriberKey = uniqueId('ak-mention-picker');
    this.state = {
      visible: false,
    };
    this.applyPropChanges({} as Props, props);
  }

  componentDidMount() {
    this.subscribeResourceProvider(this.props.resourceProvider);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPropChanges(this.props, nextProps);
  }

  componentWillUnmount() {
    this.unsubscribeResourceProvider(this.props.resourceProvider);
  }

  selectNext = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  }

  selectPrevious = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectPrevious();
    }
  }

  selectIndex = (index: number, callback?: () => any): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectIndex(index, callback);
    }
  }

  selectId = (id: string, callback?: () => any): void => {
    if (this.mentionListRef) {
      this.mentionListRef.selectId(id, callback);
    }
  }

  chooseCurrentSelection = () => {
    if (this.mentionListRef) {
      this.mentionListRef.chooseCurrentSelection();
    }
  }

  mentionsCount = (): number => {
    if (this.mentionListRef) {
      return this.mentionListRef.mentionsCount();
    }

    return 0;
  }

  // Internal
  private applyPropChanges(prevProps: Props, nextProps: Props) {
    const oldResourceProvider = prevProps.resourceProvider;
    const newResourceProvider = nextProps.resourceProvider;

    const resourceProviderChanged = oldResourceProvider !== newResourceProvider;

    // resource provider
    if (resourceProviderChanged) {
      this.unsubscribeResourceProvider(oldResourceProvider);
      this.subscribeResourceProvider(newResourceProvider);
    }
  }

  private subscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.subscribe(
        this.subscriberKey,
        this.filterChange,
        this.filterError,
        this.filterInfo
      );
    }
  }

  private unsubscribeResourceProvider(resourceProvider) {
    if (resourceProvider) {
      resourceProvider.unsubscribe(this.subscriberKey);
    }
  }

  // internal, used for callbacks
  private filterChange = (mentions) => {
    debug('ak-mention-picker.filterChange', mentions.length);
    const wasVisible = this.state.visible;
    const visible = mentions.length > 0;
    this.setState({
      visible,
    });
    if (wasVisible !== visible) {
      if (visible) {
        this.props.onOpen && this.props.onOpen();
      } else {
        this.props.onClose && this.props.onClose();
      }
    }
  }

  private filterError = (error) => {
    debug('ak-mention-picker.filterError', error);
    this.setState({
      visible: true,
      info: undefined,
    });
  }

  private filterInfo = (info) => {
    debug('ak-mention-picker.filterInfo', info);
    this.setState({
      info,
    } as State);
  }

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
        ref={(ref) => { this.mentionListRef = ref; }}
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
            relativePosition={position}
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
        <div>
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
