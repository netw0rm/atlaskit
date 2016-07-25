/** @jsx vdom */
import 'style!./host.less';

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';

const definition = {
  render() {
    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <EditorButton><Icon glyph="link" /></EditorButton>
      </div>
    );
  },
};

export default define('ak-editor-toolbar-hyperlink', definition);
