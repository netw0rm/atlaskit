# Drag and Drop

[TODO: gif]

The goal of this library is to create a beautiful drag and drop experience for lists.

## Feature set

### Supported

- Reordering within a single vertical list
- keyboard first dragging

### Short term backlog

- Correct scroll handling while dragging with keyboard or mouse
- Moving items between vertical lists (until this lands conditional dropping will not be available)

### Medium term backlog

- Dragging within a horizontal list
- Moving items between horizontal lists
- Moving a *draggable* from a vertical list to a *horizontal* list
- Nesting

### Long term backlog

- Automatically disabling physics for a drag when the frame rate drops below a threshold. This can be because of low system resources, or when the are 100's of impacted items during a drag
- A mechanism to programtically perform dragging
- Mutli-drag
- And lots more!

## `dragDropContext`

In order to use drag and drop, you need to have the part of your react tree that you want to be able to use drag and drop in wrapped in a **drag drop context**. It is advised to just wrap your entire application in a **drag drop context**. Having nested **drag drop context**'s is not supported. You will be able to achieve your desired conditional dragging and dropping using the `type` and `provide` functions of `droppable` and `draggable`. You can think of this function as having a similar purpose to the [react-redux Provider component](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)

This function will return a higher order component which wraps the component that you provide. It will spread whatever props you pass it onto your original component.

### Type information

```js
dragDropContext(hooks?: Hooks)(Component: ReactClass<any>): ReactClass<any>

type Hooks = {
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd: (result: DropResult) => void,
}
```

### Basic usage

```js
const App extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {/* The rest of the application which
            can include draggables and droppables */}
      </div>
    )
  }
}

// for details on hooks see `hook`s
const ConnectedApp = dragDropContext({
  onDragStart: () => {...},
  onDragEnd: () => {...}
})(App);

ReactDOM.render(<ConnectedApp title="This is awesome" />);
```

### `Hook`s

These are top level application events that you can use to perform your own state updates.

### `onDragStart` (optional)

This function will get notified when a drag starts. You are provided with the following details:

- `id`: the id of the *draggable* that is now dragging
- `location`: the location (`droppableId` and `index`) of where the dragging item has started within a *droppable*.

This function is *optional* and therefore does not need to be provided. It is **highly recommended** that you use this function to block updates to all *draggable* and *droppable* components during a drag. (See *Best `hooks` practices*)

**Type information**

```js
onDragStart?: (id: DraggableId, location: DraggableLocation) => void

// supporting types
type Id = string;
type DroppableId: Id;
type DraggableId: Id;
type DraggableLocation = {|
  droppableId: DroppableId,
  // the position of the droppable within a droppable
  index: number
|};
```

### `onDragEnd` (required)

This function is *extremely* important and has an important role to play in the application lifecycle. **This function must result in the *synchronous* reordering of a list of draggables**

It is provided with all the information about a drag:

### `result: DragResult`

- `result.draggableId`: the id of the *draggable* was dragging.
- `result.source`: the location that the *draggable* started in.
- `result.destination`: the location that the *draggable* finished in. The `destination` will be `null` if the user dropped into no position (such as outside any list) *or* if they dropped the *draggable* back into the same position that it started in.

### Synchronous reordering

Because this library does not control your state, it is up to you to *synchronously* reorder your lists based on the `result`.

*Here is what you need to do:*
- if the `destination` is `null`: all done!
- if `source.droppableId` equals `destination.droppableId` you need to [reorder](https://stackoverflow.com/a/2440720/1374236) the *draggables* in the *droppable*
- if `source.droppableId` does not equal `destination.droppable` you need to [remove](https://stackoverflow.com/a/20690490/1374236) the *draggable* from the `source.droppableId` list and [add it](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) into the correct position of the `destination.droppableId` list.

(links assume you store your ids in arrays)

### Type information

```js
onDragEnd: (result: DropResult) => void

// supporting types
type DropResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

type Id = string;
type DroppableId: Id;
type DraggableId: Id;
type DraggableLocation = {|
  droppableId: DroppableId,
  // the position of the droppable within a droppable
  index: number
|};
```

### Best practices for `hooks`

**Block updates during a drag**

> For more background information see 'Application lifecycle'

It is **highly** recommended that while a user is dragging that you block any state updates that might impact the amount of *draggables* and *droppables*, or their dimensions. Please listen to `onDragStart` and block updates to the *draggables* and *droppables* until you receive at `onDragEnd`.

When the user starts dragging we take a snapshot of all of the dimensions of the applicable *draggable* and *droppable* nodes. If these change during a drag we will not know about it.

Here are a few poor user experiences that can occur if you change things *during a drag*:

- If you increase the amount of nodes the library will not know about them and they will not be moved when the user would expect them to be.
- If you decrease the amount of nodes then there might be gaps and unexpected movements in your lists.
- If you change the dimensions of any node, it can cause the changed node as well as others to move at incorrect times.
- If you remove the node that the user is dragging the drag will instantly end
- If you change the dimension of the dragging node then other things will not move out of the way at the correct time.


**`onDragStart` and `onDragEnd` pairing**

We try very hard to ensure that each `onDragStart` event is paired with a single `onDragEnd` event. However, there maybe a rouge situation where this is not the case. If that occurs - it is a bug. Currently there is no mechanism to tell the library to cancel a current drag externally.


## `droppable`

*Droppable* components can be **dropped on by a *draggable***. They also **contain** *draggables*. A *draggable* must be contained within a *droppable*.

```js
const DroppableList = droppable(type, direction, provide, mapStateToProps?)(List);
```

### api

- `type`: A static `TypeId(string)` that can be used to simply accept a class of *draggable*. For example, if you use the type `PERSON` then it will only allow *draggables* of type `PERSON` to be dropped on itself. *draggables* of type `TASK` would not be able to be dropped on a *droppable* with type `PERSON`. Currently the `type` of the *draggables* within a *droppable* **must be** the same. This restriction might be loosened in the future if there is a valid use case.
- `direction`: whether this *droppable* supports vertical or horizontal movement. *Currently only vertical reordering is supported* so the `direction` will always need to be `vertical`.
- `provide`: A function that provides you with your own props, and expects you to return a `DroppableId(string)` and whether or not dropping on this *droppable* is currently permitted (see conditional dropping). This function is used by the library to know critical information about your component at runtime. You are more than welcome to change `isDropEnabled` at any point - even during a drag. **Do not change the id of a droppable during a drag** or things will go badly. At this point the library might just raise an exception. We could add some extra safeguards, but for now just do not do this.
-  `mapStateToProps?`: This **optional** function allows you to get provided with a small snapshot of drag state that is relevant to your *droppable*. Whatever you return from this function will be added to the props of your component. The main usecase of this is to add a `isDraggingOver` prop onto your component.

### Conditionally dropping

> Keep in mind that this is not supported at this time. In this current initial version we only support reordering within a single list.

- *droppables* can only be dropped on by *draggables* who share the same `type`. This is a simple way of allowing conditional dropping.
- Using the `provide` function you can conditionally allow dropping based on your `ownProps`. This allows you to do arbitrarily complex conditional transitions.
- You can disable dropping on a *droppable* altogether by always returning `isDraggingOver: false` in your `provide` function. You might always want a list to not be able to be dropped on.
- Technically you do not need to use `type` and could just set it to something generic such as `ITEM` and do all of your conditional drop logic with the `provide` function. The `type` parameter is a convenient shortcut for a common use case.

### Type information

```js
droppable(
  type: TypeId,
  direction: Direction,
  provide: Provide,
  mapStateToProps?: MapStateToProps
) => (Component: ReactClass) => ReactClass

// supporting types
type Id = string;
type TypeId = Id;
// Currently only supporting vertical movement
type Direction = 'vertical';

type OwnProps = Object;

// Provide
type Provide = (ownProps: OwnProps) => NeedsProviding;
type NeedsProviding = {|
  id: DroppableId,
  isDropEnabled?: boolean
|}

// MapStateToProps
type MapStateToProps = (state: StateSnapshot, ownProps: OwnProps) => Object;
type StateSnapshot = {|
  isDraggingOver: boolean
|}
```

### Basic usage

```js
import React, { Component, PropTypes } from 'react';

const List extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    // provided by mapStateToProps
    isDraggingOver: PropTypes.bool.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { children, isDraggingOver, listId } = this.props;
    const style = {
      backgroundColor: isDraggingOver ? 'lightblue' : 'lightgreen'
    };

    return (
      <div style={style}>
        <h3>List id: {listId}</h3>
        {children}
      </div>
    );
  }
}

const provide = (ownProps) => ({
  id: ownProps.listId,
});

const mapStateToProps = (state) => ({
  isDraggingOver: state.isDraggingOver,
});

export default droppable('TYPE', 'vertical', provide, mapStateToMaps)(List);
```

## `draggable`

*Draggable* components can be dragged around and dropped onto *droppables*. A *draggable* must always be contained within a *droppable*. It is **possible** to reorder a *draggable* within its home *droppable* or move to another *droppable*. It is **possible** because a *droppable* is free to control what it allows to be dropped on it.

```js
const DraggableItem = draggable(type, provide, mapStateToProps?)(Item);
```

### api

- `type`: The type (`TypeId(string)`) of the *draggable*. This is used to control what *droppables* the *draggable* is permitted to drop on. *draggables* can only drop on *droppables* that share the same `type`. Currently the `type` of a *draggable* **must be** the same as its container *droppable*. This restriction might be loosened in the future if there is a valid use case.
- `provide`: A function that is used to collect information about the *draggable* at run time. The function is provided with the components current props and needs to provide a `id: DraggableId`, and can optionally also provide whether dragging is currently enabled `isDragEnabled?: boolean`. This function allows you to conditionally allow dragging. If you set `isDragEnabled` to `false` while an item is dragging, the drag will be cancelled.
- `mapStateToProps?` (optional) `(state, ownProps, getDragHandle)` this function allows you to two things. Firstly, it provides you with a relevant small state snapshot and your own props which you can use to create new props for your component. A common use case for this is to add a `isDragging` prop to your component. Secondly, it provides you with a `getDragHandle` function. This function will return a function which you can then wrap a part of your component tree in. The part of your tree that is wrapped in a `DragHandle` will be used to control the dragging of the whole item. If you do not call `getDragHandle` your entire component will be the drag handle. If you request a drag handle, be sure to use it. If you do not put it in the tree somewhere then it will not be possible to drag the item (and might possibly error). Please do not use this as a mechanism for conditional dragging. That is what the `provide` function is for.

### Props



### Sloppy clicks


### Type information

```js
draggable(
  type: TypeId,
  provide: Provide,
  mapStateToProps?: MapStateToProps
) => (Component: ReactClass) => ReactClass

// supporting types
type Id = string;
type DraggableId = Id;
type DroppableId = Id;
type TypeId = Id;

type OwnProps = Object;

// Provide
type Provide = (ownProps: OwnProps) => NeedsProviding;
type NeedsProviding = {|
  id: DroppableId,
  isDropEnabled?: boolean
|}

// MapStateToProps
type MapStateToProps =
  (state: StateSnapshot, ownProps: OwnProps, getDragHandle: () => mixed) => Object;
type StateSnapshot = {|
  isDragging: boolean
|}
```

### Basic usage

```js
import React, { Component, PropTypes } from 'react';
// some custom Avatar component
import Avatar from './avatar';

const Person extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.boolean.isRequired,
  }

  render() {
    const { itemId, isDragging, name, innerRef } = this.props;
    const style = {
      backgroundColor: isDragging ? 'yellow' : 'grey';
    }

    return (
      <div style={style} ref={innerRef} {...this.props}>
        <h2>{name}</h2>
        <Avatar personId={personId}/>
      </div>
    );
  }
}

const provide = (ownProps) => ({
  id: ownProps.itemId,
});

const mapStateToProps = (state, ownProps) => ({
  isDragging: state.isDragging,
});

export default ('PERSON', provide, mapStateToProps)(Person);
```

### Custom drag handle usage

```js
import React, { Component, PropTypes } from 'react';
// some custom Avatar component
import Avatar from './avatar';

const Person extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.boolean.isRequired,
    dragHandle: PropTypes.function.isRequired,
  }

  render() {
    const { itemId, isDragging, name } = this.props;
    const style = {
      backgroundColor: isDragging ? 'yellow' : 'grey';
    }

    return (
      <div style={style}>
        <h2>{name}</h2>
        {/* this component will now be dragged by the Avatar */}
        {dragHandle(<Avatar personId={personId}/>)}
      </div>
    );
  }
}

const provide = (ownProps) => ({
  id: ownProps.itemId,
});

const mapStateToProps = (state, ownProps, getDragHandle) => ({
  isDragging: state.isDragging,
  dragHandle: getDragHandle(),
});

export default ('PERSON', provide, mapStateToProps)(Person);
```

## Usage with react-redux

Redux has a nice seperation because connected (smart) and unconnected (dumb) components. In order to make a unconnected component connected to a redux store you use the `connect` function. Depending on your use case you are welcome to wrap a *connected* component with a *droppable* or *draggable* or you can wrap a *droppable* or *draggable* with a *connected* component. Usually you will want to wrap your *droppable* or *draggable* within your *connected* component so that you have access to its full props.

### Example: advised wrapping strategy

This example wraps a *unconnected* component with a *droppable* and then wraps the *droppable* with a *connected* component. Doing this allows your `provide` and `mapStateToProps` functions to have access to all the props hydrated by your `connect` function.

```js
const Person extends Component {
  static propTypes = {
    // provided by props
    personId: PropTypes.string.isRequired,
    // provided by your redux store
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // provided by this library
    isDragging: PropTypes.bool.isRequired,
  }

  render() {
    const { name, personId, email } = this.props;
    const style = {
      backgroundColor: isDragging ? 'yellow' : 'grey';
    };

    return (
      <div style={style}>
        <h2>{name} (id: {personId})</h2>
        <Avatar email={email} />
      </div>
    );
  }
}

const provide = (ownProps) => ({
  id: ownProps.itemId,
  // Because we have wrapped the draggable within the connected component, we have access to the connected components hydrated props in this function.
  isDragEnabled: ownProps.name !== 'admin',
});

const mapStateToProps = (state, ownProps) => ({
  // this will put the isDragging prop on the component
  isDragging: state.isDragging,
});

const DraggablePerson = ('PERSON', provide, mapStateToProps)(Person);

const reduxMapStateToProps = (state, ownProps) => {
  const person = state.users[ownProps.personId];

  return {
    name: person.name,
    email: person.email,
  };
}

const ConnectedDraggablePerson = connect(reduxMapStateToProps)(DraggablePerson);

ConnectedDraggablePerson.propTypes = {
  personId: PropTypes.string.isRequired,
};

export default ConnectedDraggablePerson;
```

**Wrapping your *draggable* or *droppable* with a *connected* component:**

```js
<ConnectedDraggablePerson>
  <DraggablePerson>
    <Person />
  </DraggablePerson>
</ConnectedDraggablePerson>
```

If you wrap your *draggable* or *droppable* with a *connected* component then `ownProps` within your `provide` and `mapStateToProps` functions would have `personId`, `name` and `email`.

**Wrapping your *connected* component with a *draggable* or *droppable*:**

```js
<DraggablePerson>
  <ConnectedPerson>
    <Person />
  </ConnectedPerson>
</DraggablePerson>
```
If you wrap your *connected* component with a *draggable* or *droppable* then `ownProps` within your `provide` and `mapStateToProps` functions would only have access to `personId`.

## Engineering health

### Tested

### Performance

### Typed

Using flowtype
