import * as React from 'react';
import { PureComponent } from 'react';
import AkButton from '@atlaskit/button';
import { akColorB300 } from '@atlaskit/util-shared-styles';
import * as classnames from 'classnames';

import * as styles from './styles';
import { EmojiDescription, EmojiId, OnEmojiEvent } from '../../types';
import Emoji from '../common/Emoji';
import EmojiPlaceholder from '../common/EmojiPlaceholder';
import { PickerContext } from './PickerTypes';

export interface Props {
  id?: string;
  title?: string;
  emojis: EmojiDescription[];
  selectedEmoji?: EmojiId;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  className?: string;
  showUploadPrompt?: boolean;
  onOpenUpload?: () => void;
}

export interface State {
  loadingCount: number;
}

export const addEmojiClassName = 'emoji-picker-add-emoji';

/**
 * Immutable class, that returns a new class on add/remove
 */
// export class InvalidEmojiId {
//   private emojiIds: Set<string>;

//   constructor(emojiIds?: Set<string>) {
//     this.emojiIds = new Set<string>(emojiIds || []);
//   }

//   add(emojiId: EmojiId): InvalidEmojiId {
//     const { id } = emojiId;
//     if (!id) {
//       return this;
//     }
//     const newSet = new Set(this.emojiIds);
//     newSet.add(id);
//     return new InvalidEmojiId(newSet);
//   }

//   remove(emojiId: EmojiId): InvalidEmojiId {
//     const { id } = emojiId;
//     if (!id) {
//       return this;
//     }
//     const newSet = new Set(this.emojiIds);
//     newSet.delete(id);
//     return new InvalidEmojiId(newSet);
//   }

//   has(emojiId: EmojiId): boolean {
//     const { id } = emojiId;
//     if (!id) {
//       return false;
//     }
//     return this.emojiIds.has(id);
//   }
// }

export default class EmojiPickerListSection extends PureComponent<Props, State> {
  static contextTypes = {
      emojiPicker: React.PropTypes.object
  }

  context: PickerContext;

  // private loadingEmoji: Map<string, Promise<EmojiDescription>> = new Map();
  private loadedEmoji: Map<string, EmojiDescription> = new Map();
  private invalidEmoji: Set<string> = new Set();

  constructor(props: Props, context: PickerContext) {
    super(props, context);

    this.state = {
      loadingCount: 0,
    };
  }

  renderUploadPrompt() {
    const { emojis, onOpenUpload, showUploadPrompt } = this.props;

    if (!showUploadPrompt) {
      return undefined;
    }

    if (emojis.length) {
      // Button style
      const addButtonClassNames = classnames([
        styles.addEmoji,
        addEmojiClassName,
      ]);

      return (
        <button className={addButtonClassNames} onClick={onOpenUpload}>
          <svg viewBox={`0 0 30 30`} xmlns="http://www.w3.org/2000/svg" width="28px" height="28px">
            <line x1="15" y1="10" x2="15" y2="20" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="15" x2="20" y2="15" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      );
    }

    // Message style
    return (
      <AkButton
        className={addEmojiClassName}
        appearance="link"
        onClick={onOpenUpload}
      >
        Add your own custom emoji
      </AkButton>
    );
  }

  private onEmojiLoadError = (emojiId: EmojiId, emoji: EmojiDescription) => {
    console.log('Error loading emoji, trying to load from media', emoji, this.context);
    const { emojiProvider } = this.context.emojiPicker;
    const { id } = emojiId;

    if (!id || !emojiProvider) {
      // Can only load emoji supporting the id field
      return;
    }


    // if (this.loadingEmoji.has(id)) {
    //   // already loading
    //   return;
    // }

    // if (this.invalidEmoji.has(id)) {
    //   // was invalid last time we tried, let's not retry...
    //   return;
    // }

    this.invalidEmoji.add(id);
    this.setState({
      loadingCount: this.state.loadingCount + 1
    });

    emojiProvider.then(provider => provider.loadCustomEmoji(emoji))
    .then(emoji => {
      console.log('loaded custom emoji', emoji);
      this.loadedEmoji.set(id, emoji);
      this.invalidEmoji.delete(id);
      this.setState({
        loadingCount: this.state.loadingCount - 1
      });
    }).catch(() => {
      console.log('error loading custom emoji', emoji);
      this.invalidEmoji.add(id);
      this.setState({
        loadingCount: this.state.loadingCount - 1
      });
    });

  }

  render() {
    const { className, emojis, id, onMouseMove, onSelected, selectedEmoji, title } = this.props;
    const sectionClassNames = [
      className,
      styles.emojiPickerSection,
    ];

    return (
      <div
        id={id}
        data-category-id={title}
        className={classnames(sectionClassNames)}
      >
        <div className={styles.emojiCategoryTitle} >
          {title}
        </div>
        <div>
          {emojis.map((emoji) => {
            const selected = selectedEmoji && selectedEmoji.id === emoji.id;
            const { shortName, category, id /*, name*/ } = emoji;
            const key = id || `${shortName}-${category}`;
            let emojiComponent;
            let emojiDescription: EmojiDescription | undefined = emoji;
            if (id) {
              if (this.invalidEmoji.has(id)) {
                console.log('rendering as invalid');
                emojiDescription = undefined;
              } else if (this.loadedEmoji.has(id)) {
                emojiDescription = this.loadedEmoji.get(id);
              }
            }

            if (emojiDescription) {
              emojiComponent = (
                <Emoji
                  emoji={emojiDescription}
                  selected={selected}
                  onSelected={onSelected}
                  onMouseMove={onMouseMove}
                  onLoadError={this.onEmojiLoadError}
                />
              );
            } else {
              emojiComponent = (
                <EmojiPlaceholder shortName={shortName} name={name} />
              );
            }

            return (
              <span
                className={styles.emojiItem}
                key={key}
              >
                {emojiComponent}
              </span>
            );
         })}
         {this.renderUploadPrompt()}
        </div>
      </div>
    );
  }
}
