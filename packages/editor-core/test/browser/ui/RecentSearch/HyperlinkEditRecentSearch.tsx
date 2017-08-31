import { ActivityResource, ActivityItem } from '@atlaskit/activity';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import hyperlinkPlugins, { HyperlinkState } from '../../../../src/plugins/hyperlink';
import HyperlinkEdit from '../../../../src/editor/plugins/hyperlink/ui/HyperlinkEdit';
import PanelTextInput from '../../../../src/ui/PanelTextInput';
import RecentSearch from '../../../../src/ui/RecentSearch';
import RecentItem from '../../../../src/ui/RecentSearch/RecentItem';
import {
  doc, p as paragraph, a as link, makeEditor
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

/**
 * Provides sample data for this suite of tests.
 */
class MockActivityResource extends ActivityResource {
  constructor() {
    super('', '');
  }

  getFrequentItems(): Promise<ActivityItem[]> {
    return Promise.resolve([{
      objectId: 'frequent1',
      name: 'frequent item 1',
      container: 'container 1',
      iconUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
      url: 'frequent1-url.com'
    }, {
      objectId: 'frequent2',
      name: 'frequent item 2',
      container: 'container 2',
      iconUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
      url: 'frequent2-url.com'
    }]);
  }

  getRecentItems(): Promise<ActivityItem[]> {
    return Promise.resolve([{
      objectId: 'recent1',
      name: 'recent item 1',
      container: 'container 1',
      iconUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
      url: 'recent1-url.com'
    }, {
      objectId: 'recent2',
      name: 'recent item 2',
      container: 'container 2',
      iconUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
      url: 'recent2-url.com'
    }, {
      objectId: 'recent3',
      name: 'recent item 3',
      container: 'container 3',
      iconUrl: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png',
      url: 'recent3-url.com'
    }]);
  }
}

async function openLinkPanel(editorView, pluginState) {
  const activityProviderPromise = Promise.resolve(new MockActivityResource());
  const hyperlinkEdit = mount(<HyperlinkEdit activityProvider={activityProviderPromise} pluginState={pluginState} editorView={editorView} />);
  hyperlinkEdit.setState({ inputActive: true });
  pluginState.showLinkPanel(editorView);
  await timeout();

  return hyperlinkEdit;
}

function timeout(ms = 1) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeTextInput(recentSearch: ReactWrapper<any, any>, text: string) {
  const onChangeFn = recentSearch.find(PanelTextInput).prop('onChange');
  onChangeFn!(text);
  await timeout();
}

function pressDownArrowInputField(recentSearch: ReactWrapper<any, any>) {
  recentSearch.find('input').simulate('keydown', { keyCode: 40 });
}

function pressReturnInputField(recentSearch: ReactWrapper<any, any>) {
  recentSearch.find('input').simulate('keydown', { keyCode: 13 });
}


describe('@atlaskit/editor-core/ui/HyperlinkEditRecentSearch', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  it('should show the recent search input when inserting a new link', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);

    expect(hyperlinkEdit.find(RecentSearch)).to.have.lengthOf(1);
  });

  it('should not show the recent search input when editing an existing link', async () => {
    const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('www.atlas{<>}sian.com'), 'after')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);

    expect(hyperlinkEdit.find(RecentSearch)).to.have.lengthOf(0);
  });

  it('should show frequent items by default', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    expect(recentSearch.find(RecentItem)).to.have.lengthOf(2);
    expect(recentSearch.find(RecentItem).at(0).prop('item')).to.have.property('name', 'frequent item 1');
  });

  it('should search recent items when typing into the input field', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    await changeTextInput(recentSearch, 'recent item 1');

    expect(recentSearch.find(RecentItem)).to.have.lengthOf(1);
    expect(recentSearch.find(RecentItem).at(0).prop('item')).to.have.property('name', 'recent item 1');
  });

  it('should allow clicking on a link form the search results to insert it', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    expect(recentSearch.find(RecentItem)).to.have.lengthOf(2);
    recentSearch.find(RecentItem).at(0).simulate('mousedown');

    expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://frequent1-url.com' })('frequent item 1'))));
  });

  it('should allow inserting an arbitrary link', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    await changeTextInput(recentSearch, 'example.com');
    pressReturnInputField(recentSearch);

    expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('example.com'))));
  });

  it('should allow inserting a link from search results by pressing return', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    await changeTextInput(recentSearch, 'recent');
    pressReturnInputField(recentSearch);

    expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://recent1-url.com' })('recent item 1'))));
  });

  it('should allow selecting a link from search results with the keyboard and inserting it by pressing return', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    // select 2nd item and press return
    pressDownArrowInputField(recentSearch);
    pressDownArrowInputField(recentSearch);
    pressReturnInputField(recentSearch);

    expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://frequent2-url.com' })('frequent item 2'))));
  });

  it('should allow inserting a link from a text selection', async () => {
    const { editorView, pluginState } = editor(doc(paragraph('{<}Page{>}')));
    const hyperlinkEdit = await openLinkPanel(editorView, pluginState);
    const recentSearch = hyperlinkEdit.find(RecentSearch);

    pressDownArrowInputField(recentSearch);
    pressReturnInputField(recentSearch);

    expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://frequent1-url.com' })('Page'))));
  });
});

