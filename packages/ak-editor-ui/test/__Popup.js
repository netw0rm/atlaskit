import * as chai from 'chai';
import Component from '../src/Popup';

const { expect } = chai;

describe('ak-editor-ui Popup', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-popup', 'i'));
  });
});
