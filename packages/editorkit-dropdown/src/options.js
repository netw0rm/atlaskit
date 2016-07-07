import { vdom, define, state, prop, emit } from 'skatejs';
import classnames from 'classnames';
import styles from './options.less';

export const optionsFactory = (name, font, readableName) => {
  return define(name, {
    render(elem) {
      return (
        <div>
          <style>{styles.toString()}</style>
          <a className={classnames(
            styles.locals[font],
            styles.locals.selectOptions, {
              [styles.locals.active]: state(elem).active === true
            }
          )}
          >{readableName}</a>
        </div>
      );
    },
    ready(elem) {
      elem.readableName = readableName;
      const button = elem.querySelector('a');
      button.addEventListener('mouseup', _ => button.blur());
      button.addEventListener('click', _ => {
        emit(elem, 'selected');
      });
    },
    props: {
      active: prop.boolean({
        attribute: true,
        default: font === 'paragraph' ? true : false
      }),
    },
  });
};

export const optionParagraph = optionsFactory('editorkit-option-paragraph', 'paragraph', 'Paragraph');
export const optionHeading1 = optionsFactory('editorkit-option-heading1', 'heading1', 'Heading 1');
export const optionHeading2 = optionsFactory('editorkit-option-heading2', 'heading2', 'Heading 2');
export const optionHeading3 = optionsFactory('editorkit-option-heading3', 'heading3', 'Heading 3');
export const optionMonospace = optionsFactory('editorkit-option-monospace', 'monospace', 'Monospace');
