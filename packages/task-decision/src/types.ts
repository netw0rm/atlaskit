
export type DecisionState = 'DECIDED';
export type DecisionStatus = 'CREATED';
export type TaskState = 'TODO' | 'DONE';
export type Cursor = string;

export type DecisionType = 'DECISION';
export type TaskType = 'TASK';

export interface ObjectKey {
  localId: string;
  containerAri: string;
  objectAri: string;
}

export interface BaseItem<S> extends ObjectKey {
  state: S;
  type: DecisionType | TaskType;
}

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
  type: DecisionType;
}

export interface Meta {
  cursor?: string;
}

export interface ServiceDecisionResponse {
  decisions: ServiceDecision[];
  meta: Meta;
}

export type ServiceItem = ServiceDecision | ServiceTask;

export interface ServiceItemResponse {
  elements: ServiceItem[];
  meta: Meta;
}

export interface ServiceTaskResponse {
  tasks: ServiceTask[];
  meta: Meta;
}

export interface Decision extends BaseItem<DecisionState> {
  creationDate: Date;
  creatorId: string;
  lastUpdateDate: Date;
  participants: any[];
  // Atlassian Document fragment
  content: any;
  status: DecisionStatus;
  type: DecisionType;
}

export interface DecisionResponse {
  decisions: Decision[];
  nextQuery?: Query;
}

export interface TaskResponse {
  tasks: Task[];
  nextQuery?: Query;
}

export type Item = Decision | Task;

export interface ItemResponse {
  items: Item[];
  nextQuery?: Query;
}

export interface Query {
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
  type: TaskType;
}

export interface Task extends BaseItem<TaskState> {
  creationDate: Date;
  creatorId: string;
  lastUpdateDate: Date;
  parentLocalId: string;
  participants: any[];
  position: number;
  // Atlassian Document fragment
  content: any;
  type: TaskType;
}

export type Handler = (state: TaskState | DecisionState) => void;

export interface TaskDecisionProvider {
  getDecisions(query: Query): Promise<DecisionResponse>;
  getTasks(query: Query): Promise<TaskResponse>;
  getItems(query: Query): Promise<ItemResponse>;

  // Tasks
  toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
  subscribe(objectKey: ObjectKey, handler: Handler): void;
  unsubscribe(objectKey: ObjectKey, handler: Handler): void;
}

export interface RenderDocument {
  (document: any): JSX.Element;
}

export interface OnUpdate<T> {
  (allDecisions: T[], newDecisions: T[]): void;
}
