import createError from 'create-error';

/**
 * This exception gets thrown if an {@link Icon} implementation has not implemented the method
 * to get glyphs.
 *
 * @class NotImplementedError
 * @implements {Error}
 * @public
 */
export const NotImplementedError = createError('NotImplementedError');
