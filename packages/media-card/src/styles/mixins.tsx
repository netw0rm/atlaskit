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

export const centerX = () => `
  display: flex;
  justify-content: center;
`;

export const center = () => `
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const antialiased = () => `
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export default ellipsis;
