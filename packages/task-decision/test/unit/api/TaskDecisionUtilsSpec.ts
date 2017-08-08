import { serviceDecision } from '../../../src/support/test-data';
import { convertServiceDecisionToDecision, decisionsToDocument, objectKeyToString } from '../../../src/api/TaskDecisionUtils';

describe('TaskDecisionUtils', () => {
  it('convertServiceDecisionToDecision', () => {
    const decision = convertServiceDecisionToDecision(serviceDecision);
    const { containerAri, creationDate, creatorId, lastUpdateDate, localId, objectAri,
      participants, content, state, status } = decision;

    expect(containerAri).toEqual(serviceDecision.containerAri);
    expect(creatorId).toEqual(serviceDecision.creatorId);
    expect(localId).toEqual(serviceDecision.localId);
    expect(objectAri).toEqual(serviceDecision.objectAri);
    expect(participants).toEqual(serviceDecision.participants);
    expect(state).toEqual(serviceDecision.state);
    expect(status).toEqual(serviceDecision.status);

    expect(creationDate).toEqual(new Date(serviceDecision.creationDate));
    expect(lastUpdateDate).toEqual(new Date(serviceDecision.lastUpdateDate));
    expect(content).toEqual(JSON.parse(serviceDecision.rawContent));
  });

  it('decisionsToDocument', () => {
    const decision = convertServiceDecisionToDecision(serviceDecision);
    const { content, localId, state } = decision;
    const doc = decisionsToDocument([decision]);
    expect(doc.content.length).toBe(1);
    const decisionListNode = doc.content[0];
    expect(decisionListNode.type).toEqual('decisionList');
    expect(decisionListNode.content.length).toBe(1);
    const decisionItemNode = decisionListNode.content[0];
    expect(decisionItemNode.type).toEqual('decisionItem');
    expect(decisionItemNode.attrs.localId).toEqual(localId);
    expect(decisionItemNode.attrs.state).toEqual(state);
    expect(decisionItemNode.content).toEqual(content);
  });

  it('objectKeyToString', () => {
    const objectKey = { localId: 'task-1', objectAri: 'object', containerAri: 'container' };
    const key = objectKeyToString(objectKey);
    expect(key).toEqual('container:object:task-1');
  });
});
