import { expect } from 'chai';
import { applyMark } from '../../../../../src/renderer/text/util';
import schema from '../../../../../src/test-helper/schema';

describe('Renderer - TextSerializer - Marks', () => {
  it('should only render link when text and link are the same', () => {
    const mark = schema.marks.link.create({ href: 'https://www.atlassian.com' });
    expect(applyMark('https://www.atlassian.com', mark)).to.equal('https://www.atlassian.com');
  });

  it('should only render text when link is absent', () => {
    const mark = schema.marks.link.create({ href: '' });
    expect(applyMark('Atlassian', mark)).to.equal('Atlassian');
  });

  it('should render text and link in brackets if text and link differ', () => {
    const mark = schema.marks.link.create({ href: 'https://www.atlassian.com' });
    expect(applyMark('Atlassian', mark)).to.equal('Atlassian (https://www.atlassian.com)');
  });
});
