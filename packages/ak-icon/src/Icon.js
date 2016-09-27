import { Component, vdom } from 'skatejs';
import { NotImplementedError } from './internal/exceptions';
import { getGlyphFnSymbol } from './internal/symbols';
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

  /**
  * This method has to be implemented by sublcasses and must return a template function
  * @return {Function} a template function
  */
  [getGlyphFnSymbol]() {
    throw new NotImplementedError('Subclasses need to provide an implementation');
  }

  render(elem) {
    const { title } = elem;
    const Glyph = this[getGlyphFnSymbol]();

    return (
      <div style={{ display: 'flex', width, height }}>
        <div style={{ margin: 'auto' }}>
          <Glyph role="img" title={title} />
        </div>
      </div>
    );
  }
}

export default Icon;
