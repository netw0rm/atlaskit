import createError from 'create-error';

/**
 * This exception gets thrown if a {Tag} is removed that is not removable.
 *
 * @class NotRemovableError
 * @implements {Error}
 * @public
 */
const NotRemovableError = createError('NotRemovableError');

export { NotRemovableError };
