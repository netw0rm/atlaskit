import { Component, vdom } from 'skatejs';
import * as exceptions from './internal/exceptions';
import { width, height } from './internal/defaults';

/**
 * @description Base class for an Icon
 * @class Icon
 */
class Icon extends Component {

  static get props() {
    return {
      /**
       * @description (Required) The icon label
       *              This is a required attribute.
       *              Omitting it will make the icon inaccessible for screen readers, etc..
       *              The text passed will be sanitized, e.g. passed HTML will be represented
       *              as plain text.
       *
       * @memberof Icon
       * @instance
       * @type {string}
       * @example @html <ak-icon-* label="Accessible description of the icon" />
       * @example @js const icon = new Icon();
       * icon.label = 'Accessible description of the icon';
       * document.body.appendChild(icon);
       */
      label: {
        attribute: true,
      },
    };
  }

  static render(elem) {
    const { label, getGlyphFn: getGlyph } = elem;
    const Glyph = getGlyph();

    return (
      <div style={{ display: 'flex', width, height }}>
        <div style={{ margin: 'auto' }}>
          <Glyph role="img" title={label} />
        </div>
      </div>
    );
  }

  /**
  * This method has to be implemented by sublcasses and must return a template function
  *
  * @throws {NotImplementedError} throws an error if the subclass does not override this method
  * @return {Function} a template function
  */
  getGlyphFn() {
    throw new exceptions.NotImplementedError('Subclasses need to provide an implementation');
  }
}

export default Icon;
export const NotImplementedError = exceptions.NotImplementedError;
