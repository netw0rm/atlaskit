/*
   Runs a list of functions, pausing between each one to ensure the component
   has had time to re-render.
   Ensure that you pass `done` into the test and that you call it at the end
   as this will make your tests asyncronous.

   USAGE
   ```
   it('should respond to prop changes', (done) => {
     afterMutations(
       () => expect(component).to.be.in.some.state,
       () => props(component, {propName, propValue}),
       () => expect(component).to.be.in.another.state,
       () -> props(component, {propName, anotherValue}),
       () => expect(component).to.be.in.another.another.state,
       done
     );
   });
   ```
*/
function afterMutations(...fns) {
  setTimeout(() => {
    const fn = fns.shift();
    if (typeof fn === 'function') {
      fn();
    }
    if (fns.length) {
      afterMutations.apply(null, fns);
    }
  }, 1);
}

export { afterMutations };
