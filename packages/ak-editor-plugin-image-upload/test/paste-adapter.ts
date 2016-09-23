import PasteAdapter from '../src/paste-adapter';
import { expect } from 'chai';
import { ProseMirror } from 'ak-editor-prosemirror';

describe('ak-editor-plugin-image-upload PasteAdapter', () => {
  const mockEditor = (): ProseMirror => {
    const wrapper = document.createElement('div');
    return {
      wrapper,
      content: { parentNode: wrapper },
    } as any;
  };

  it('Should attach a paste event listenter to the parent of content', () => {
    const pm = mockEditor();
    const pasteAdapter = new PasteAdapter(pm);

    expect(pasteAdapter.pm).to.equal(pm);
    expect(pasteAdapter.handlers.length).to.equal(0);
  });

  it('Should allow to register handlers', () => {
    const pm = mockEditor();
    const pasteAdapter = new PasteAdapter(pm);

    pasteAdapter.add(sinon.spy());

    expect(pasteAdapter.handlers.length).to.equal(1);
  });

  it('Should allow to remove handlers', () => {
    const pm = mockEditor();
    const pasteAdapter = new PasteAdapter(pm);

    const fn = sinon.spy();

    pasteAdapter.add(fn);
    pasteAdapter.add(sinon.spy());
    pasteAdapter.add(sinon.spy());

    expect(pasteAdapter.handlers.length).to.equal(3);

    pasteAdapter.remove(fn);

    expect(pasteAdapter.handlers.length).to.equal(2);
  });

  it('Should reset handlers on detach', () => {
    const pm = mockEditor();
    const addEvent = pm.wrapper.addEventListener = sinon.spy();
    const removeEvent = pm.wrapper.removeEventListener = sinon.spy();
    const pasteAdapter = new PasteAdapter(pm);

    pasteAdapter.add(sinon.spy());
    expect(pasteAdapter.handlers.length).to.equal(1);
    expect(addEvent.callCount).to.equal(1);

    pasteAdapter.detach();
    expect(removeEvent.callCount).to.equal(1);
    expect(pasteAdapter.handlers.length).to.equal(0);
  });

  it('Should not trigger handlers upon not a valid paste event', () => {
    const pm = mockEditor();
    const addEvent = pm.wrapper.addEventListener = sinon.spy();

    const pasteAdapter = new PasteAdapter(pm);
    expect(addEvent.callCount).to.equal(1);

    const fn = sinon.spy();
    pasteAdapter.add(fn);

    const eventHandler = addEvent.firstCall.args[1];

    let ClipboardEventStub = {
      clipboardData: {
        types: {}
      }
    } as ClipboardEvent;

    eventHandler(ClipboardEventStub);
    expect(fn.callCount).to.equal(0);
  });
});
