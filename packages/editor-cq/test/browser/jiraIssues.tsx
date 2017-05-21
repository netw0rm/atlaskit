import { expect } from 'chai';
import { jiraIssueNodeView } from '../../src/schema/nodes/jiraIssue';
import 'react';

describe('jiraIssueNodeView', () => {
  it('should have a not null html dom', () => {
    const dom = jiraIssueNodeView({ attrs: { issueKey: 'test' } }).dom;
    expect(dom).to.not.equal(undefined);
  });

  it('should return a node of type span', () => {
    const dom = jiraIssueNodeView({ attrs: { issueKey: 'test' } }).dom;
    expect(dom!.nodeName).to.equal('SPAN');
  });

  it('should have well defined class on first child span', () => {
    const dom = jiraIssueNodeView({ attrs: { issueKey: 'test' } }).dom;
    expect(dom!.firstChild!.attributes.getNamedItem('class')).to.not.equal(undefined);
  });
});
