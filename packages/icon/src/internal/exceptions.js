import createError from 'create-error';

/**
 * This exception gets thrown if an {@link Icon} implementation has not implemented the
 * {@link Icon#getGlyphTemplate} function.
 *
 * @class NotImplementedError
 * @implements {Error}
 * @private
 */
 // eslint-disable-next-line import/prefer-default-export
export const NotImplementedError = createError('NotImplementedError');
