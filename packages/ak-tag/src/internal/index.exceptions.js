import createError from 'create-error';

/**
 * This exception gets thrown if a {Tag} is removed that is not removable.
 *
 * @name NotRemovableError
 * @type Error
 */
export const NotRemovableError = createError('NotRemovableError');
