import '../types';
import { define, prop } from 'skatejs';
import { MentionPicker as PfMentionPicker, AbstractMentionResource } from 'pf-mention';
import MentionsPlugin, { MentionsPluginState } from 'ak-editor-plugin-mentions';

import Component from '../component';

// typescript removes unused var if we import it :(
const { vdom } = require('skatejs');

export default class MentionPicker extends Component {

  // Declare JSX interface
  props: {
    plugin: MentionsPluginState
    resourceProvider: AbstractMentionResource
  };

  // Mirror Skate props
  plugin: MentionsPluginState;
  resourceProvider: AbstractMentionResource;
  _dirty: number;
  _mentionPicker: any;

  static get props() {
    return {
      // JSX
      plugin: {
        set: (elem: MentionPicker, data: {
          newValue?: MentionsPluginState,
          oldValue?: MentionsPluginState
        }) => {
          const oldPlugin = data.oldValue;

          if (oldPlugin) {
            oldPlugin.unsubscribe(elem.onChange);
          }

          const newPlugin = data.newValue;
        
          if (newPlugin) {
            newPlugin.subscribe((state: MentionsPluginState) => elem.onChange(state));
          }
        }
      },

      resourceProvider: {},

      // Private
      _dirty: {}
    };
  }

  private onChange(state: MentionsPluginState) {
    this._dirty++;
  }

  static render(elem: MentionPicker) {
    const {
      query,
      anchorElement,
    } = elem.plugin;

    if (!query) {
      return null;
    }

    return (
      <PfMentionPicker
          resourceProvider={elem.resourceProvider}
          onSelected={(e: any) => elem._handleSelectedMention(e)}
          query={query}
          ref={(ref: HTMLElement) => { elem._mentionPicker = ref; }}
          style={elem._getMentionPickerPosition(anchorElement)}
        />
    )
  }

  _getMentionPickerPosition(anchorElement: HTMLElement | null): string {
    if (anchorElement) {
      const rect = anchorElement.getBoundingClientRect();
      return `display: block; position: absolute; left: ${rect.left - 17}px; top: ${rect.top}px;`;
    }

    return 'display: none';
  }

  _handleSelectedMention(e: Event) {
    this.plugin.handleSelectedMention(e);
  }

  static rendered(elem: MentionPicker) {
    elem.plugin.onSelectPrevious = () => {
      elem._mentionPicker.selectPrevious();
    };

    elem.plugin.onSelectNext = () => {
      elem._mentionPicker.selectNext();
    };

    elem.plugin.onSelectCurrent = () => {
      elem._mentionPicker.chooseCurrentSelection();
    }
  }
}

define('ak-editor-ui-mention-picker', MentionPicker);
