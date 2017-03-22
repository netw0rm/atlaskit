export const isTextWrapper = (type: string): type is 'textWrapper' => {
  return type === 'textWrapper';
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};
