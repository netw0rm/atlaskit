/**
 * This event gets emitted before a field-base changes it's own `focused` prop.
 * (e.g. when a child element receives focus, field-base will set it's own focused prop).
 *
 * It is cancelable. If it gets cancelled, the change is aborted.
 *
 * It will not get called if the prop change came from somewhere else.
 *
 * @event FieldBase#beforeFocusedChange
 * @example @html <ak-field-base
 *   onBeforeFocusedChange={(e) => console.log('Just about to start the remove animation')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.beforeFocusedChange, (e) => {
 *   console.log('Just about to apply focused=' + e.detail.focused);
 *   // e.preventDefault(); // this would stop change
 * });
 */
const beforeFocusedChange = 'beforeFocusedChange'; // eslint-disable-line import/prefer-default-export, max-len

/**
 * This event gets emitted when the field-base label is clicked.
 *
 * @event FieldBase#labelClick
 * @example @html <ak-field-base
 *   onLabelClick={(e) => console.log('The label was clicked.')}
 * ></ak-tag>
 * @example @js import { events } from 'ak-field-base';
 *
 * field.addEventListener(events.labelClick, (e) => {
 *   console.log('The label was clicked.');
 * });
 */
const labelClick = 'labelClick';

export {
  beforeFocusedChange,
  labelClick,
};
