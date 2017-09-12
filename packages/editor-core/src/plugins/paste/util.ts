export const isSingleLine = (text: string): boolean => {
  return !!text && text.trim().split('\n').length === 1;
};
