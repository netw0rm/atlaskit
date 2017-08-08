
export type DecisionState = 'DECIDED';
export type DecisionStatus = 'CREATED';
export type TaskState = 'TODO' | 'DONE';
export type Cursor = string;

export interface ServiceDecision {
  containerAri: string;
  creationDate: string;
  creatorId: string;
  lastUpdateDate: string;
  localId: string;
  objectAri: string;
  participants: any[];
  // Atlassian Document fragment (json string)
  rawContent: string;
  state: DecisionState;
  status: DecisionStatus;
}

export interface Meta {
  cursor?: string;
}

export interface ServiceDecisionResponse {
  decisions: ServiceDecision[];
  meta: Meta;
}

export interface ServiceTaskResponse {
  decisions: ServiceTask[];
  meta: Meta;
}

export interface Decision {
  containerAri: string;
  creationDate: Date;
  creatorId: string;
  lastUpdateDate: Date;
  localId: string;
  objectAri: string;
  participants: any[];
  // Atlassian Document fragment
  content: any;
  state: DecisionState;
  status: DecisionStatus;
}

export interface DecisionResponse {
  decisions: Decision[];
  nextQuery?: DecisionQuery;
}

export interface DecisionQuery {
  containerAri: string;
  limit?: number;
  cursor?: Cursor;
}

export interface ServiceTask {
  containerAri: string;
  creationDate: string;
  creatorId: string;
  lastUpdateDate: string;
  localId: string;
  objectAri: string;
  parentLocalId: string;
  participants: any[];
  position: number;
  // Atlassian Document fragment (json string)
  rawContent: string;
  state: TaskState;
}

export interface Task {
  containerAri: string;
  creationDate: Date;
  creatorId: string;
  lastUpdateDate: Date;
  localId: string;
  objectAri: string;
  participants: any[];
  // Atlassian Document fragment
  content: any;
  state: TaskState;
}

export interface ObjectKey {
  localId: string;
  containerAri: string;
  objectAri: string;
}

export interface GenericItem {
  containerAri: string;
  objectAri: string;
  localId: string;
  state: TaskState | DecisionState;
}

export type Handler = (state: TaskState | DecisionState) => void;

export interface TaskDecisionProvider {
  getDecisions(query: DecisionQuery): Promise<DecisionResponse>;

  // Tasks
  toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
  subscribe(objectKey: ObjectKey, handler: Handler): void;
  unsubscribe(objectKey: ObjectKey, handler: Handler): void;
}

export interface RenderDocument {
  (document: any): JSX.Element;
}

export interface OnUpdate {
  (allDecisions: Decision[], newDecisions: Decision[]): void;
}
