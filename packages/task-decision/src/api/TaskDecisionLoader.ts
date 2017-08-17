import {
  Decision,
  Item,
  Query,
  Task,
  TaskDecisionProvider,
} from '../types';

// const extractAllIds = (item: Item[]) => new Set(item.map(item => item.localId);

/**
 * Grabs the latest Items from the service, deduplicating against existing items.
 */
export const loadLatestItems = (query: Query, existing: Item[], provider: TaskDecisionProvider): Promise<Item[]> => {
  return provider.getItems(query).then(response => mergeItems(existing, response.items));
};

/**
 * Grabs the latest Decisions from the service, deduplicating against existing Decisions.
 */
export const loadLatestDecisions = (query: Query, existing: Decision[], provider: TaskDecisionProvider): Promise<Decision[]> => {
  return provider.getDecisions(query).then(response => mergeItems(existing, response.decisions));
};

/**
 * Grabs the latest Tasks from the service, deduplicating against existing Tasks.
 */
export const loadLatestTasks = (query: Query, existing: Task[], provider: TaskDecisionProvider): Promise<Task[]> => {
  return provider.getTasks(query).then(response => mergeItems(existing, response.tasks));
};


export interface ItemLike {
  localId: string;
}

export const mergeItems = <I extends ItemLike>(existingItems: I[], newItems: I[]): I[] => {
  const newIds = new Set(newItems.map(item => item.localId));
  return [
    ...newItems,
    ...existingItems.filter(item => !newIds.has(item.localId))
  ];
};
