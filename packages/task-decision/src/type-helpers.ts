import {
  Decision,
  Item,
  ObjectKey,
  ServiceDecision,
  ServiceItem,
  ServiceTask,
  SortCriteria,
  Task,
} from './types';

export const isDecision = (item: Item): item is Decision => !!(item && item.type === 'DECISION');
export const isTask = (item: Item): item is Task => !!(item && item.type === 'TASK');

export const isServiceDecision = (item: ServiceItem): item is ServiceDecision => !!(item && item.type === 'DECISION');
export const isServiceTask = (item: ServiceItem): item is ServiceTask => !!(item && item.type === 'TASK');

export const isDateSortCriteria = (sortCriteria?: SortCriteria) => !sortCriteria || sortCriteria === 'creationDate' || sortCriteria === 'lastUpdateDate';

export const toObjectKey = (item: Item | ServiceDecision | ServiceTask): ObjectKey => {
  const { containerAri, localId, objectAri } = item;
  return {
    containerAri,
    localId,
    objectAri
  };
};

export const objectKeyToString = (objectKey: ObjectKey) => {
  const { containerAri, objectAri, localId } = objectKey;
  return `${containerAri}:${objectAri}:${localId}`;
};
