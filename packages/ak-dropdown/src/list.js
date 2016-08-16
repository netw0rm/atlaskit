import { vdom, prop } from 'skatejs';
import shadowListStyles from './shadow-list.less';
import Layer from 'ak-layer';

const listWidthGap = 10;

export default {
  render(elem) {
    if (!elem.open) {
      return '';
    }
    let target = elem.parentNode.childNodes[0];
    const styles = {
      minWidth: `${target.getBoundingClientRect().width + listWidthGap}px`,
    };

    return (
      <Layer
        position="bottom left"
        target={target}
        ref={(layer) => {
          setTimeout(() => {
            if (elem.open && layer.alignment) {
                // by default dropdown has opacity 0
                // and only with attribute 'positioned' it has opacity 1
                // this behavior is to avoid 'flashing' of dropdown
                // when it's initially positioning itself on a page
              elem.setAttribute('positioned', true);
            }
          }, 100);
        }
        }
      >
        <div className={shadowListStyles.locals.list} style={styles}>
          <style>{shadowListStyles.toString()}</style>
          <slot />
        </div>
      </Layer>
    );
  },
  props: {
    open: prop.boolean({
      attribute: true,
    }),
  },
};
