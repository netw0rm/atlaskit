import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import HyperlinkPlugin from '../../../src/plugins/hyperlink';
import { insert, insertText, setTextSelection, chaiPlugin, fixtures, makeEditor, doc, a as link, linkable, unlinkable } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('hyperlink', () => {
    const fixture = fixtures();
    const editor = (doc: any) => makeEditor({
        doc,
        plugin: HyperlinkPlugin,
        place: fixture(),
    });

    it('defines a name for use by the ProseMirror plugin registry ', () => {
        const plugin = HyperlinkPlugin as any;
        expect(plugin.key).is.be.a('string');
    });

    describe('active', () => {
        context('when select the whole hyperlink text from start to end', () => {
            it('is active', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.active).to.be.true;
            });
        });

        context('when select the whole hyperlink text from end to start', () => {
            it('is active', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos2, pos1);

                expect(pluginState.active).to.be.true;
            });
        });

        context('when select part of the hyperlink text from the end', () => {
            it('is active', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos2, pos1);

                expect(pluginState.active).to.be.true;
            });
        });

        context('when select part of the hyperlink text from the start', () => {
            it('is active', () => {
                const { editorView, pluginState, refs } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.active).to.be.true;
            });
        });

        context('when select part of the hyperlink text in the middle', () => {
            it('is active', () => {
                const { editorView, pluginState, refs } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.active).to.be.true;
            });
        });

        context('when cursor is winthin hyperlink text', () => {
            it('is active', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

                expect(pluginState.active).to.be.true;
            });
        });

        context('when cursor at the beginning of hyperlink text', () => {
            it('returns undefined', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

                expect(pluginState.active).to.be.false;
            });
        });

        context('when cursor at the end of hyperlink text', () => {
            it('returns undefined', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

                expect(pluginState.active).to.be.false;
            });
        });
    });

    describe('element', () => {
        context('when select the whole hyperlink text from start to end', () => {
            it('returns link element', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when select the whole hyperlink text from end to start', () => {
            it('returns link element', () => {
                const { editorView, pluginState, refs } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos2, pos1);

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when select part of the hyperlink text from the end', () => {
            it('returns link element', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos2, pos1);

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when select part of the hyperlink text from the start', () => {
            it('returns link element', () => {
                const { editorView, pluginState, refs } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when select part of the hyperlink text in the middle', () => {
            it('returns link element', () => {
                const { editorView, refs, pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
                const { pos1, pos2 } = refs;

                setTextSelection(editorView, pos1, pos2);

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when cursor is winthin hyperlink text', () => {
            it('returns undefined', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

                expect(pluginState.element.tagName).to.eq('A');
            });
        });

        context('when cursor at the beginning of hyperlink text', () => {
            it('returns undefined', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

                expect(pluginState.element).to.be.undefined;
            });
        });

        context('when cursor at the end of hyperlink text', () => {
            it('returns undefined', () => {
                const { pluginState } = editor(doc(linkable('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

                expect(pluginState.element).to.be.undefined;
            });
        });
    });

    describe('API', () => {
        it('should allow a change handler to be registered', () => {
            const { pluginState } = editor(doc(linkable('')));

            pluginState.subscribe(sinon.spy());
        });

        it('should get current state immediately once subscribed', () => {
            const { pluginState } = editor(doc(linkable('{<}text{>}')));
            const spy = sinon.spy();
            pluginState.subscribe(spy);

            expect(spy.callCount).to.equal(1);
        });

        it('should be able to register handlers for state change events', () => {
            const { editorView, refs, pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{pos}xt'))));
            const spy = sinon.spy();
            pluginState.subscribe(spy);

            setTextSelection(editorView, refs['pos']);

            expect(spy.callCount).to.equal(2);
        });

        it('sets linkable to false when in a context where links are not supported by the schema', () => {
            const { pluginState } = editor(doc(unlinkable('{<}text{>}')));

            expect(pluginState.linkable).to.equal(false);
        });

        it('sets active to true when link is already in place', () => {
            const { pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

            expect(pluginState.active).to.equal(true);
        });

        it('does not emit `change` multiple times when the selection moves within a link', () => {
            const { editorView, refs, pluginState } = editor(doc(linkable('{<>}text', link({ href: 'http://www.atlassian.com' })('l{pos1}i{pos2}nk'))));
            const spy = sinon.spy();
            const { pos1, pos2 } = refs;
            pluginState.subscribe(spy);

            setTextSelection(editorView, pos1);
            setTextSelection(editorView, pos2);

            expect(spy.callCount).to.equal(2);
        });

        it('emits change when the selection leaves a link', () => {
            const { editorView, refs, pluginState } = editor(doc(linkable('te{textPos}xt {<>}')));
            const { textPos } = refs;
            const spy = sinon.spy();
            const { linkPos } = insert(editorView, link({ href: 'http://www.atlassian.com' })('li{linkPos}nk'));
            setTextSelection(editorView, linkPos);

            pluginState.subscribe(spy);
            setTextSelection(editorView, textPos);

            expect(spy.callCount).to.equal(2);
        });

        it('permits adding a link to an empty selection using the href', () => {
            const { editorView, pluginState } = editor(doc(linkable('{<>}')));
            const href = 'http://www.atlassian.com';

            pluginState.addLink({ href }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href })(href))));
        });

        it('does not permit adding a link to an existing link', () => {
            const { editorView, pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}link{>}'))));

            pluginState.addLink({ href: 'http://www.example.com' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: 'http://www.atlassian.com' })('link'))));
        });

        it('does not permit adding a link when not supported by the schema', () => {
            const { editorView, pluginState } = editor(doc(unlinkable('{<}text{>}')));

            pluginState.addLink({ href: 'http://www.atlassian.com' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(unlinkable('text')));
        });

        it('requires href when adding a link', () => {
            const { editorView, pluginState } = editor(doc(linkable('{<}text{>}')));

            pluginState.addLink({ href: 'http://example.com' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('text'))));
        });

        it('should not be a part of the link when typing before it', () => {
            const { editorView, refs, pluginState } = editor(doc(linkable('a{before}{<}text{>}')));
            const { before } = refs;
            const href = 'http://example.com';

            pluginState.addLink({ href }, editorView);
            insertText(editorView, 'bar', before);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(`abar`, link({ href })('text'))));
        });

        it('should be a part of the link when typing in it', () => {
            const { editorView, refs, pluginState } = editor(doc(linkable('{<}te{middle}xt{>}')));
            const { middle } = refs;
            const href = 'http://example.com';

            pluginState.addLink({ href }, editorView);
            insertText(editorView, 'bar', middle);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href })('tebarxt'))));
        });

        it('should not be a part of the link when typing after it', () => {
            const { refs, editorView, pluginState } = editor(doc(linkable('{<}text{>}{end}')));
            const { end } = refs;
            const href = 'http://example.com';

            pluginState.addLink({ href }, editorView);
            insertText(editorView, 'bar', end);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href })('text'), 'bar')));
        });

        it('should allow links to be added when the selection is empty', () => {
            const { pluginState } = editor(doc(linkable('{<>}text')));

            expect(pluginState.linkable).to.equal(true);
        });

        it('should not be able to unlink a node that has no link', () => {
            const { editorView, pluginState } = editor(doc(linkable('{<}text{>}')));

            pluginState.removeLink(editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable('text')));
        });

        it('should be able to unlink an existing link', () => {
            const { editorView, pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

            pluginState.removeLink(editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable('text')));
        });

        context('when a link is in the second paragraph', () => {
            it('should be able to unlink that link', () => {
                const { pm, plugin } = editor(doc(paragraph('hello'), linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

                plugin.removeLink();

                expect(pm.doc).to.deep.equal(doc(paragraph('hello'), linkable('text')));
            });
        });

        it('should be able to update existing links with href', () => {
            const { editorView, pluginState } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

            pluginState.updateLink({ href: 'http://example.com' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('text'))));
        });

        it('should allow updating a link if new href is empty', () => {
            const { editorView, pluginState } = editor(doc(linkable(link({ href: 'http://example.com' })('{<}text{>}'))));

            pluginState.updateLink({ href: '' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: '' })('text'))));
        });

        it('should not be able to update when not in a link', () => {
            const { editorView, pluginState } = editor(doc(linkable('{<}text{>}')));

            pluginState.updateLink({ href: 'http://example.com/foo' }, editorView);

            expect(editorView.state.doc).to.deep.equal(doc(linkable('text')));
        });

        it('should escape from link mark when typing at the beginning of the link', () => {
            const { editorView } = editor(doc(linkable(link({ href: 'http://example.com' })('text'))));

            insertText(editorView, '1', 1, 1);

            expect(editorView.state.doc).to.deep.equal(doc(linkable('1', link({ href: 'http://example.com' })('text'))));
        });

        it('should not escape from link mark when typing at the middle of the link', () => {
            const { editorView } = editor(doc(linkable(link({ href: 'http://example.com' })('text'))));

            insertText(editorView, '1', 2, 2);

            expect(editorView.state.doc).to.deep.equal(doc(linkable(link({ href: 'http://example.com' })('t1ext'))));
        });


        it('should call subscribers when link was focused and then editor is blur', () => {
            const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
            const spy = sinon.spy();
            plugin.subscribe(spy);
            pm.on.blur.dispatch();
            expect(spy.callCount).to.equal(2);
        });

        it('should not call subscribers if link was not focused when editor is blur', () => {
            const { pm, plugin } = editor(doc(paragraph('te{<>}st'), linkable(link({ href: 'http://www.atlassian.com' })('text'))));
            const spy = sinon.spy();
            plugin.subscribe(spy);
            pm.on.blur.dispatch();
            expect(spy.callCount).to.equal(1);
        });

        it('should not call subscribers if editor is focused but link is not focused', () => {
            const { pm, plugin } = editor(doc(paragraph('te{<>}st'), linkable(link({ href: 'http://www.atlassian.com' })('text'))));
            const spy = sinon.spy();
            plugin.subscribe(spy);
            pm.on.blur.dispatch();
            pm.on.focus.dispatch();
            expect(spy.callCount).to.equal(1);
        });


        it('should return referring DOM element', () => {
            const { pluginState } = editor(doc(
                linkable(link({ href: 'http://www.atlassian.com' })('atlassian')),
                linkable(link({ href: 'http://www.stypositive.ru' })('d{<>}sorin')))
            );

            expect(pluginState.element.text).to.eq('dsorin');
        });
    });

    describe('toolbarVisible', () => {
        context('when editor is blur', () => {
            it('it is false', () => {
                const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
                pm.on.focus.dispatch();
                pm.on.blur.dispatch();
                expect(plugin.toolbarVisible).to.not.be.true;
            });
        });
    });

    describe('editorFocued', () => {
        context('when editor is focused', () => {
            it('it is true', () => {
                const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
                pm.on.blur.dispatch();
                pm.on.focus.dispatch();
                expect(plugin.editorFocused).to.be.true;
            });
        });

        context('when editor is blur', () => {
            it('it is false', () => {
                const { pm, plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
                pm.on.blur.dispatch();
                expect(plugin.editorFocused).not.to.be.true;
            });
        });
    });

    describe('showLinkPanel', () => {
        context('when called without any selection in the editor', () => {
            it('should set state value showToolbarPanel to true', () => {
                const { plugin } = editor(doc(paragraph('testing')));
                plugin.showLinkPanel();
                expect(plugin.showToolbarPanel).to.be.true;
            });
        });

        context('when called without any selection in the editor', () => {
            it('should call subscribers', () => {
                const { plugin } = editor(doc(paragraph('testing')));
                const spy = sinon.spy();
                plugin.subscribe(spy);
                plugin.showLinkPanel();
                expect(spy.callCount).to.equal(2);
            });
        });

        context('when called with cursor in a link', () => {
            it('should not call subscribers', () => {
                const { plugin } = editor(doc(linkable(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
                const spy = sinon.spy();
                plugin.subscribe(spy);
                plugin.showLinkPanel();
                expect(spy.callCount).to.equal(1);
            });
        });

        context('when called with a selection in the editor', () => {
            it('should create a link node', () => {
                const { pm, plugin } = editor(doc(paragraph('testing')));
                pm.setSelection(new TextSelection(pm.doc.resolve(4), pm.doc.resolve(7)));
                plugin.showLinkPanel();
                expect(plugin.activeLinkNode).not.to.be.undefined;
                expect(plugin.text).not.to.be.undefined;
            });
        });
    });

    describe('Key Press Cmd-K', () => {
        context('when called without any selection in the editor', () => {
            it('should call subscribers', () => {
                const { pm, plugin } = editor(doc(paragraph('testing')));
                const spy = sinon.spy();
                plugin.subscribe(spy);
                dispatchKeypressEvent(pm, 'Mod-K');
                expect(spy.callCount).to.equal(2);
            });
        });

        context('when called with a selection in the editor', () => {
            it('should create a link node', () => {
                const { pm, plugin } = editor(doc(paragraph('testing')));
                pm.setSelection(new TextSelection(pm.doc.resolve(4), pm.doc.resolve(7)));
                dispatchKeypressEvent(pm, 'Mod-K');
                expect(plugin.activeLinkNode).not.to.be.undefined;
                expect(plugin.text).not.to.be.undefined;
            });
        });
    });
});
});
