/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';
import HyperlinkPopup from 'ak-editor-hyperlink-popup';

const definition = {
  render() {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <EditorButton
          className="link-button"
          onClick={this.handleClick}
        ><Icon glyph="link" /></EditorButton>
        <HyperlinkPopup />
      </div>
    );
  },
};

export default define('ak-editor-toolbar-hyperlink', definition);
