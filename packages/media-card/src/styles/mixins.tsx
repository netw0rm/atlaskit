/* tslint:disable:variable-name */
export const ellipsis = maxWidth => `
  max-width: ${maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const size = value => `
  width: ${value}px;
  height: ${value}px;
`;

export default ellipsis;
