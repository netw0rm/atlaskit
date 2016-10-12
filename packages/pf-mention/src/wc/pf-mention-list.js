import { define, emit, prop, props, vdom } from 'skatejs';

import 'style!../host.less';
import shadowStyles from './pf-mention-list-shadow.less';
import Item from './pf-mention-item';
import Scrollable from './pf-scrollable';
import { whoopsUri } from './icons';
import debug from '../util/logger';
import {
  mentionListRendered as mentionListRenderedEvent,
  selected as selectedEvent,
} from '../internal/index.events';

// FIXME
const defaultAvatar = 'https://dmg75ly2d8uj2.cloudfront.net/assets/img/avatar-all-here@2x.png';
const styles = shadowStyles.locals;

function revealItem(elem, key) {
  const item = elem._items[key];
  if (item && elem._scrollable) {
    elem._scrollable.reveal(item);
  }
}

// Used to prevent invalid mouse move detection on scroll
function actualMouseMove(elem, event) {
  const lastMove = elem._lastMouseMove;
  if (!lastMove || event.clientX !== lastMove.x || event.clientY !== lastMove.y) {
    elem._lastMouseMove = {
      x: event.clientX,
      y: event.clientY,
    };
    return true;
  }
  return false;
}

function leftClick(event) {
  return event.button === 0
    && !event.altKey
    && !event.ctrlKey
    && !event.metaKey
    && !event.shiftKey;
}

function selectIndex(elem, index) {
  props(elem, {
    selectedIndex: index,
    selectedKey: elem.mentions[index].id,
  });
  revealItem(elem, elem.mentions[index].id);
}

function adjustSelection(elem) {
  if (!elem.selectedKey) {
    selectIndex(elem, 0);
    return;
  }
  for (let i = 0; i < elem.mentions.length; i++) {
    if (elem.selectedKey === elem.mentions[i].id) {
      return;
    }
  }
  // existing selection not in results, pick first
  selectIndex(elem, 0);
}

function renderItems(elem) {
  let idx = 0;

  debug('pf-mention-list: rendering', elem.mentions.length, 'mentions');

  if (elem.mentions.length) {
    adjustSelection(elem);

    elem._items = {};

    return (
      <div>
        {elem.mentions.map((mention) => {
          const selected = elem.selectedKey === mention.id;
          const currentIdx = idx;
          const key = mention.id;
          const item = (
            <Item
              {...mention}
              avatarUrl={mention.avatarUrl || defaultAvatar}
              key={key}
              idx={idx}
              selected={selected}
              onmousemove={(event) => {
                if (actualMouseMove(elem, event)) {
                  selectIndex(elem, currentIdx);
                }
              }}
              /* Cannot use onclick, as onblur will close the element, and prevent
               * onClick from firing.
               */
              onmousedown={(event) => {
                if (leftClick(event)) {
                  selectIndex(elem, currentIdx);
                  elem.chooseCurrentSelection();
                  event.preventDefault();
                }
              }}
              ref={(ref) => {
                if (ref) {
                  elem._items[key] = ref;
                } else {
                  delete elem._items[key];
                }
              }}
            />
          );
          idx++;
          return item;
        })}
      </div>
    );
  }
  return null;
}

function wrapIndex(elem, index) {
  const len = elem.mentions.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

export default define('pf-mention-list', {
  prototype: {
    selectNext() {
      const newIndex = wrapIndex(this, this.selectedIndex + 1);
      selectIndex(this, newIndex);
    },

    selectPrevious() {
      const newIndex = wrapIndex(this, this.selectedIndex - 1);
      selectIndex(this, newIndex);
    },

    chooseCurrentSelection() {
      emit(this, selectedEvent, {
        detail: this.mentions[this.selectedIndex],
      });
      debug('pf-mention-list.chooseCurrentSelection', this.mentions[this.selectedIndex]);
    },
  },

  created(elem) {
    elem._items = {};
  },

  render(elem) {
    debug('pf-mention-list.render', elem.mentions.length);

    const classes = [
      styles.list,
    ];
    const scollableClasses = [
      styles.scrollable,
    ];

    const hasMentions = elem.mentions && elem.mentions.length;
    // If we get an error, but existing mentions are displayed, lets
    // just continue to show the existing mentions we have
    const showError = elem.showError && !hasMentions;

    if (!elem.mentions.length && !showError) {
      classes.push(styles.empty);
    }

    if (!elem.mentions.length) {
      scollableClasses.push(styles.empty);
    }

    let errorSection = null;
    if (showError) {
      // TODO add warning icon
      errorSection = (
        <div class={styles.mentionError}>
          <p><img src={whoopsUri} alt="whoops" /></p>
          <p>Something went wrong</p>
        </div>
      );
    }

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={classes}>
          {errorSection}
          <Scrollable
            className={scollableClasses}
            ref={(ref) => { elem._scrollable = ref; }}
          >
            {renderItems(elem)}
          </Scrollable>
        </div>
      </div>
    );
  },

  rendered(elem) {
    emit(elem, mentionListRenderedEvent);
  },

  props: {
    mentions: prop.array(),
    selectedKey: prop.string({ attribute: true }),
    showError: prop.boolean({ attribute: true }),
  },
});
