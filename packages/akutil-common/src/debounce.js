export default function debounce(func, wait) {
  let timeout;
  let result;

  return (...args) => {
    let context = this;
    const later = () => {
      result = func.apply(context, args);
      context = null;
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    return result;
  };
}
