import * as chai from 'chai';
import Component from '../src/ButtonLink';

const { expect } = chai;

describe('ak-editor-ui ButtonLink', () => {
  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp('^ak-editor-ui-button-link', 'i'));
  });
});
