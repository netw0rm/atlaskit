- flow

```js
const Connected = dragDropContext(hooks)(App);

render(<Connected />);

@dragDropContext(hooks)
class App extends ...

const provide = (ownProps) => ({
  id: ownProps.itemId,
  canDrag?: ownProps.isLoading
})

const mapStateToProps = (state, ownProps, requestDragHandle) => ({
  isDragging: state.isDragging,
  dragHandle: requestDragHandle()
});

dragSource('CAR', provide, mapStateToProps, hooks)(Component);


dragTarget(null, provide, mapStateToProps, hooks)(MyComponent)



```
