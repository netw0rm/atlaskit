/**
 * This event gets emitted before a tag gets removed
 * (e.g. before the remove animation starts).
 * It is cancelable. If it gets cancelled, the removal is aborted.
 *
 * @event Tag#beforeRemove
 */
export const beforeRemove = 'beforeRemove';

/**
 * This event gets emitted after a tag has been removed
 * (e.g. after the remove animation finished).
 * It is not cancelable.
 *
 * @event Tag#afterRemove
 */
export const afterRemove = 'afterRemove';
