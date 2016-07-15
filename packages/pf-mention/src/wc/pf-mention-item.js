import headStyles from 'style!../host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './pf-mention-item-shadow.less';
import { localProp } from './skate-local-props';

import akAvatar from 'ak-avatar'; // eslint-disable-line no-unused-vars
import { define, vdom, prop, emit, state } from 'skatejs'; // eslint-disable-line no-unused-vars


const styles = shadowStyles.locals;

function renderHighlight(className, value, highlights, prefix) {
  const parts = [];
  const prefixText = prefix || '';
  let lastIndex = 0;

  if (highlights) {
    for (let i = 0; i < highlights.length; i++) {
      const h = highlights[i];
      const start = h.start;
      const end = h.end;
      if (start > lastIndex) {
        parts.push({
          v: value.substring(lastIndex, start),
          m: false,
        });
      }
      parts.push({
        v: value.substring(start, end + 1),
        m: true,
      });
      lastIndex = end + 1;
    }
    if (lastIndex < value.length) {
      parts.push({
        v: value.substring(lastIndex, value.length),
        m: false,
      });
    }
  } else {
    parts.push({
      v: value,
      m: false,
    });
  }

  return (
    <span className={className}>
      {prefixText}
      {parts.map(part => {
        if (part.m) {
          return <b>{part.v}</b>;
        }
        return part.v;
      })}
    </span>
  );
}

function renderTime(presence) {
  if (presence && presence.time) {
    return (
      <div className={styles.time}>{presence.time}</div>
    );
  }
  return null;
}

const definition = {

  render(elem) {
    const classes = [
      styles.item,
    ];

    if (elem.selected === 'true') {
      classes.push(styles.selected);
    }

    const nameHighlights = elem.highlight && elem.highlight.name;
    const mentionHighlights = elem.highlight && elem.highlight.mentionName;

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={classes.join(' ')}>
          <div
            className={styles.row}
          >
            <ak-avatar src={elem.avatarUrl} size="medium" />
            <div className={styles.nameSection}>
              {renderHighlight(styles.fullName, elem.name, nameHighlights)}
              {renderHighlight(styles.mentionName, elem.mentionName, mentionHighlights, '@')}
            </div>
            {renderTime(elem.presence)}
          </div>
        </div>
      </div>
    );
  },

  // attached(elem) {
  //   emit(elem, 'attached', {
  //     bubbles: false,
  //   });
  // },

  detached(elem) {
    if (elem.ref) {
      elem.ref(null);
    }
  },

  props: {
    avatarUrl: prop.string({
      attribute: true,
    }),
    // presence: {
    //   attribute: true,
    // },
    // presence: PropTypes.object,
    // FIXME prop.boolean doesn't propogate false changes :/
    selected: prop.string({
      attribute: true,
      default: 'false',
    }),
    idx: prop.number({
      attribute: true,
    }),
    id: prop.string({
      attribute: true,
    }),
    name: prop.string({
      attribute: true,
    }),
    mentionName: prop.string({
      attribute: true,
    }),
    time: prop.string({
      attribute: true,
    }),
    highlight: prop.array(),
    ref: localProp.reference(),
  },
  // emits: {
  //   onSelection: PropTypes.func,
  //   onHover: PropTypes.func,
  // },
};

/* The constructor for our component */
export default define('pf-mention-item', definition);

export { definition };
