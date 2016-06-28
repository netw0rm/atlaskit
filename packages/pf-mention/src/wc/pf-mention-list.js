import headStyles from 'style!../host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './pf-mention-list-shadow.less';
import mentionItem from './pf-mention-item'; // eslint-disable-line no-unused-vars
import scrollable from './pf-scrollable'; // eslint-disable-line no-unused-vars
import { localProp } from './skate-local-props';

import { define, vdom, prop, emit, state } from 'skatejs'; // eslint-disable-line no-unused-vars

const defaultAvatar = 'https://dmg75ly2d8uj2.cloudfront.net/assets/img/avatar-all-here@2x.png';

const styles = shadowStyles.locals;

function revealItem(elem, key) {
  const item = elem._items[key];
  if (item && elem._scrollable) {
    elem._scrollable.reveal(item);
  }
}

function selectIndex(elem, index) {
  state(elem, {
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

  if (elem.mentions.length) {
    adjustSelection(elem);

    elem._items = {};

    return (
      <div>
        {elem.mentions.map(mention => {
          const selected = (elem.selectedKey === mention.id) ? 'true' : 'false';
          const currentIdx = idx;
          const key = mention.id;
          const item = (
            <pf-mention-item
              {...mention}
              avatarUrl={mention.avatarUrl || defaultAvatar}
              key={key}
              idx={idx}
              selected={selected}
              onmouseenter={() => { selectIndex(elem, currentIdx); }}
              onmousedown={(event) => {
                elem.chooseCurrentSelection();
                event.preventDefault();
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

const definition = {

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
      // this._notifySelection(this.state.selectedMention);
      console.log('chooseCurrentSelection', this.selectedKey);
      emit(this, 'selected', {
        detail: this.mentions[this.selectedIndex],
      });
    },
  },

  created(elem) {
    elem._items = {};
  },

  detached(elem) {
    if (elem.ref) {
      elem.ref(null);
    }
  },

  render(elem) {
    const classes = [
      styles.list,
    ];

    if (!elem.mentions.length) {
      classes.push(styles.empty);
    }

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={classes}>
          <div className={styles.innerList}>
            <pf-scrollable
              className={styles.scrollable}
              ref={(ref) => { elem._scrollable = ref; }}
            >
              {renderItems(elem)}
            </pf-scrollable>
          </div>
        </div>
      </div>
    );
  },

  props: {
    mentions: prop.array(),
    selectedKey: prop.string({
      attribute: true,
    }),
    ref: localProp.reference(),
  },
};

/* The constructor for our component */
export default define('pf-mention-list', definition);

export { definition };
