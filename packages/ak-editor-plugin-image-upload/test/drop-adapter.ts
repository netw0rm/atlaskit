import DropAdapter from '../src/drop-adapter';
import { ProseMirror } from 'ak-editor-prosemirror';
import { expect } from 'chai';

describe('ak-editor-plugin-image-upload DropAdapter', () => {
  const mockEditor = (): ProseMirror => {
    const wrapper = document.createElement('div');
    return {
      wrapper: wrapper,
      content: { parentNode: wrapper },
    } as any;
  };

  it('Should attach a paste event listener to the parent of content', () => {
    const pm = mockEditor();
    const dropAdapter = new DropAdapter(pm);

    expect(dropAdapter.pm).to.equal(pm);
    expect(dropAdapter.handlers.length).to.equal(0);
  });

  it('Should allow to register handlers', () => {
    const pm = mockEditor();
    const dropAdapter = new DropAdapter(pm);

    dropAdapter.add(sinon.spy());
    expect(dropAdapter.handlers.length).to.equal(1);
  });

  it('Should allow to remove handlers', () => {
    const pm = mockEditor();
    const dropAdapter = new DropAdapter(pm);

    const fn = sinon.spy();

    dropAdapter.add(fn);
    dropAdapter.add(sinon.spy());
    dropAdapter.add(sinon.spy());

    expect(dropAdapter.handlers.length).to.equal(3);

    dropAdapter.remove(fn);

    expect(dropAdapter.handlers.length).to.equal(2);
  });

  it('Should reset handlers on detach', () => {
    const pm = mockEditor();
    const addEvent = pm.wrapper.addEventListener = sinon.spy();
    const removeEvent = pm.wrapper.removeEventListener = sinon.spy();
    const dropAdapter = new DropAdapter(pm);

    dropAdapter.add(sinon.spy());
    expect(dropAdapter.handlers.length).to.equal(1);

    expect(addEvent.callCount).to.equal(1);

    dropAdapter.detach();

    expect(removeEvent.callCount).to.equal(1);
    expect(dropAdapter.handlers.length).to.equal(0);
  });

  it('Should not trigger handlers upon not a valid drop event', () => {
    const pm = mockEditor();
    const addEvent = pm.wrapper.addEventListener = sinon.spy();
    const dropAdapter = new DropAdapter(pm);

    expect(addEvent.callCount).to.equal(1);

    const fn = sinon.spy();

    dropAdapter.add(fn);

    const eventHandler = addEvent.firstCall.args[1];
    const DragEventStub = {
      dataTransfer: {
        types: {}
      }
    } as DragEvent;

    eventHandler(DragEventStub);
    expect(fn.callCount).to.equal(0);
  });
});
