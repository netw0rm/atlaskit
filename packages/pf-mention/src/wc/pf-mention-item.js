import 'style!../host.less';
import shadowStyles from './pf-mention-item-shadow.less';
import { localProp } from './skate-local-props';
import { define, vdom, prop } from 'skatejs';
import Avatar from 'ak-avatar';

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
    <span class={className}>
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
      <div class={styles.time}>{presence.time}</div>
    );
  }
  return null;
}

export default define('pf-mention-item', {
  render(elem) {
    const classes = [
      styles.item,
    ];

    if (elem.selected) {
      classes.push(styles.selected);
    }

    const nameHighlights = elem.highlight && elem.highlight.name;
    const mentionHighlights = elem.highlight && elem.highlight.mentionName;

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div class={classes.join(' ')}>
          <div class={styles.row}>
            <Avatar src={elem.avatarUrl} size="medium" />
            <div class={styles.nameSection}>
              {renderHighlight(styles.fullName, elem.name, nameHighlights)}
              {renderHighlight(styles.mentionName, elem.mentionName, mentionHighlights, '@')}
            </div>
            {renderTime(elem.presence)}
          </div>
        </div>
      </div>
    );
  },

  detached(elem) {
    if (elem.ref) {
      elem.ref(null);
    }
  },

  props: {
    avatarUrl: prop.string({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
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
});
