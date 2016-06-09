document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#my-button').addEventListener('click', (event) => {
    const target = event.target;
    target.parentNode.removeChild(target);
  });
});
