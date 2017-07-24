
export type DecisionState = 'DECIDED';
export type DecisionStatus = 'CREATED';
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

export interface DecisionMeta {
  cursor?: string;
}

export interface ServiceDecisionResponse {
  decisions: ServiceDecision[];
  meta: DecisionMeta;
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

export interface TaskDecisionProvider {
  getDecisions(query: DecisionQuery): Promise<DecisionResponse>;
}

export interface RenderDocument {
  (document: any): JSX.Element;
}

export interface OnUpdate {
  (allDecisions: Decision[], newDecisions: Decision[]): void;
}
