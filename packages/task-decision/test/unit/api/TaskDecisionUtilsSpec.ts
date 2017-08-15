import { serviceDecision, serviceTask } from '../../../src/support/test-data';
import {
  convertServiceDecisionToDecision,
  convertServiceTaskToTask,
  decisionsToDocument,
  tasksToDocument,
} from '../../../src/api/TaskDecisionUtils';

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

  it('convertServiceTaskToTask', () => {
    const task = convertServiceTaskToTask(serviceTask);
    const { containerAri, creationDate, creatorId, lastUpdateDate, localId, objectAri,
      participants, content, state } = task;

    expect(containerAri).toEqual(serviceTask.containerAri);
    expect(creatorId).toEqual(serviceTask.creatorId);
    expect(localId).toEqual(serviceTask.localId);
    expect(objectAri).toEqual(serviceTask.objectAri);
    expect(participants).toEqual(serviceTask.participants);
    expect(state).toEqual(serviceTask.state);

    expect(creationDate).toEqual(new Date(serviceTask.creationDate));
    expect(lastUpdateDate).toEqual(new Date(serviceTask.lastUpdateDate));
    expect(content).toEqual(JSON.parse(serviceTask.rawContent));
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

  it('tasksToDocument', () => {
    const task = convertServiceTaskToTask(serviceTask);
    const { content, localId, state } = task;
    const doc = tasksToDocument([task]);
    expect(doc.content.length).toBe(1);
    const decisionListNode = doc.content[0];
    expect(decisionListNode.type).toEqual('taskList');
    expect(decisionListNode.content.length).toBe(1);
    const decisionItemNode = decisionListNode.content[0];
    expect(decisionItemNode.type).toEqual('taskItem');
    expect(decisionItemNode.attrs.localId).toEqual(localId);
    expect(decisionItemNode.attrs.state).toEqual(state);
    expect(decisionItemNode.content).toEqual(content);
  });
});
