/**
 * This event gets emitted before a tag gets removed
 * (e.g. before the remove animation starts).
 * It is cancelable. If it gets cancelled, the removal is aborted.
 *
 * @event Tag#beforeRemove
 * @example @html <ak-tag
 *   text="Cupcake"
 *   remove-button-text="No more"
 *   onBeforeRemove={(e) => console.log('Just about to start the remove animation')}
 * ></ak-tag>
 * @example @js import { exceptions } from 'ak-tag';
 *
 * tag.addEventListener(exceptions.beforeRemove, (e) => {
 *   console.log('Just about to start the remove animation');
 *   // e.preventDefault(); // this would stop the removal process
 * });
 */
export const beforeRemove = 'beforeRemove';

/**
 * This event gets emitted after a tag has been removed
 * (e.g. after the remove animation finished).
 * It is not cancelable.
 *
 * @event Tag#afterRemove
 * @example @html <ak-tag
 *   text="Cupcake"
 *   remove-button-text="No more"
 *   onAfterRemove={(e) => console.log('Finished the remove animation')}
 * ></ak-tag>
 * @example @js import { exceptions } from 'ak-tag';
 *
 * tag.addEventListener(exceptions.afterRemove, () => {
 *   console.log('Finished the remove animation');
 *   document.body.removeChild(tag);
 * });
 */
export const afterRemove = 'afterRemove';
