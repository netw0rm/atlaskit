import * as chai from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import {
  chaiPlugin,
  fixtures,
  makeEditor,
  sendKeyToPm,
} from '@atlaskit/editor-core/dist/es5/test-helper';
import {
  blockquote,
  doc,
  h1,
  p,
} from './_schema-builder';
import Editor from '../src';
import schema from '../src/schema';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-cq', () => {
  describe('expanded and isExpanded behaviour', () => {
    it('should render collapsed chrome if neither isExpandedByDefault not expanded is set', () => {
      expect(mount(<Editor />).find('ChromeCollapsed')).to.have.length.above(0);
    });

    it('should render expanded chrome if only isExpandedByDefault is set', () => {
      expect(mount(<Editor isExpandedByDefault={true} />).find('ChromeExpanded')).to.have.length.above(0);
    });

    it('should render expanded chrome if only expanded is set', () => {
      expect(mount(<Editor expanded={true} />).find('ChromeExpanded')).to.have.length.above(0);
    });

    it('should have higher priority for expanded over isExpandedByDefault', () => {
      expect(
        mount(<Editor expanded={false} isExpandedByDefault={true} />).find('ChromeCollapsed')
      ).to.have.length.above(0);
    });

    it('should expand chrome if expanded has been changed', () => {
      const node = mount(<Editor isExpandedByDefault={true} />);
      expect(node.find('ChromeExpanded')).to.have.length.above(0);

      node.setProps({ expanded: false });
      expect(node.find('ChromeCollapsed')).to.have.length.above(0);
    });
  });

  describe('ED-1410', () => {
    const fixture = fixtures();
    const editor = (doc: any) => makeEditor({
      doc,
      schema,
      place: fixture()
    });

    it('should split heading when Enter is pressed', () => {
      const { editorView } = editor(doc(h1('text{<>}')));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(h1('text'), p()));
    });

    it('should not break blockquote when Enter is pressed', () => {
      const { editorView } = editor(doc(blockquote(p('text{<>}'))));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'), p())));
    });
  });
});
