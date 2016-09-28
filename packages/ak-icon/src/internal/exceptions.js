import createError from 'create-error';

/**
 * This exception gets thrown if an {@link Icon} implementation has not implemented the
 * {@link Icon#getGlyphTemplate} function.
 *
 * @class NotImplementedError
 * @implements {Error}
 * @private
 */
export const NotImplementedError = createError('NotImplementedError');
