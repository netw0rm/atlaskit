import createError from 'create-error';

/**
 * This exception gets thrown if a {@link Tag} is removed that is not removable.
 *
 * @class NotRemovableError
 * @implements {Error}
 * @public
 */
const NotRemovableError = createError('NotRemovableError');

// eslint-disable-next-line import/prefer-default-export
export { NotRemovableError };
