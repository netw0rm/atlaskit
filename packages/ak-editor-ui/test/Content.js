import * as chai from 'chai';
import Component from '../src/Content';

const { expect } = chai;

describe('ak-editor-ui Content', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-content', 'i'));
  });
});
