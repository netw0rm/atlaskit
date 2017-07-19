import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { EmojiSearchResult } from '../../api/EmojiRepository';
import { EmojiProvider, OnEmojiProviderChange } from '../../api/EmojiResource';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import EmojiList from './EmojiTypeAheadList';
import { EmojiContext } from '../common/internal-types';
import debug from '../../util/logger';
import { toEmojiId } from '../../type-helpers';

export const defaultListLimit = 50;

export interface OnLifecycle {
  (): void;
}

export interface EmojiTypeAheadBaseProps {
  onSelection?: OnEmojiEvent;
  query?: string;
  listLimit?: number;

  onOpen?: OnLifecycle;
  onClose?: OnLifecycle;
}

export interface Props extends EmojiTypeAheadBaseProps {
  emojiProvider: EmojiProvider;
}

export interface State {
  visible: boolean;
  emojis: EmojiDescription[];
  loading: boolean;
}

const isFullShortName = (query?: string) => query && query.length > 1 && query.charAt(0) === ':' && query.charAt(query.length-1) === ':';

const uniqueExactShortNameMatchIndex = (searchResult: EmojiSearchResult, query?: string): number | undefined => {
  if (!query) {
    return undefined;
  }
  query = query.toLowerCase();
  let matchIndex: number | undefined;
  searchResult.emojis.forEach((emoji, index) => {
    if (query && emoji.shortName.toLowerCase() === query) {
      if (matchIndex === undefined) {
        matchIndex = index;
      } else {
        matchIndex = undefined;
        return;
      }
    }
  });
  return matchIndex;
};

export default class EmojiTypeAheadComponent extends PureComponent<Props, State> {
  static childContextTypes = {
    emoji: React.PropTypes.object
  };

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
    listLimit: defaultListLimit,
  };

  private emojiListRef: EmojiList;

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      emojis: [],
      loading: true,
    };
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  getChildContext(): EmojiContext {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider
      }
    };
  }

  componentDidMount() {
    const { emojiProvider } = this.props;
    emojiProvider.subscribe(this.onProviderChange);
    this.onSearch(this.props.query);
  }

  componentWillUnmount() {
    const { emojiProvider } = this.props;
    emojiProvider.unsubscribe(this.onProviderChange);
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      prevEmojiProvider.unsubscribe(this.onProviderChange);
      nextEmojiProvider.subscribe(this.onProviderChange);
      this.onSearch(nextProps.query);
    } else if (this.props.query !== nextProps.query) {
      this.onSearch(nextProps.query);
    }
  }

  selectNext = () => {
    if (this.emojiListRef) {
      this.emojiListRef.selectNext();
    }
  }

  selectPrevious = () => {
    if (this.emojiListRef) {
      this.emojiListRef.selectPrevious();
    }
  }

  chooseCurrentSelection = () => {
    if (this.emojiListRef) {
      this.emojiListRef.chooseCurrentSelection();
    }
  }

  count = (): number => {
    const { emojis } = this.state;
    return emojis && emojis.length || 0;
  }

  private onSearch(query?: string) {
    const { emojiProvider, listLimit } = this.props;
    emojiProvider.filter(query, {
      limit: listLimit || defaultListLimit,
    });
  }

  private onSearchResult = (result: EmojiSearchResult): void => {
    const { emojis } = result;
    const { query } = this.props;
    const wasVisible = this.state.visible;
    const visible = emojis.length > 0;
    debug('emoji-typeahead.applyPropChanges', emojis.length, wasVisible, visible);

    this.setState({
      emojis: emojis,
      visible,
      loading: false,
    });

    if (isFullShortName(query)) {
      const matchIndex = uniqueExactShortNameMatchIndex(result, query);
      if (matchIndex !== undefined && this.props.onSelection) {
        this.props.onSelection(toEmojiId(result.emojis[matchIndex]), result.emojis[matchIndex]);
      }
    }

    if (wasVisible !== visible) {
      if (visible) {
        if (this.props.onOpen) {
          this.props.onOpen();
        }
      } else {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    }
  }

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  private onEmojiListRef = (ref) => {
    this.emojiListRef = ref;
  }

  render() {
    const { onSelection } = this.props;
    const { visible, emojis, loading } = this.state;
    const style = {
      display: visible ? 'block' : 'none',
    };

    const classes = classNames([
      'ak-emoji-typeahead',
      styles.emojiTypeAhead,
    ]);

    return (
      <div style={style} className={classes}>
        <EmojiList
          emojis={emojis}
          onEmojiSelected={onSelection}
          ref={this.onEmojiListRef}
          loading={loading}
        />
      </div>
    );
  }
}
