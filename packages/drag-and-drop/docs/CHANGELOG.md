# @atlaskit/drag-and-drop

## 4.5.2 (2017-08-03)

* bug fix; fixes broken storybooks due to ED-2389 ([184d93a](https://bitbucket.org/atlassian/atlaskit/commits/184d93a))

## 4.5.1 (2017-08-01)

* bug fix; fixing small race condition where item could still be animating in the DROP_COMPLETE ([c69febb](https://bitbucket.org/atlassian/atlaskit/commits/c69febb))

## 4.5.0 (2017-07-28)

* feature; adding support for scroll containers ([5afae78](https://bitbucket.org/atlassian/atlaskit/commits/5afae78))

### Behaviour Changes
- feature: now supporting scrollable containers! (see docs for details)
- improvement: performance improvement due to usage of conditional disabling of pointer events
- improvement: improved support for dragging with a mouse and window scrolling
- fix: can no longer drag an item while returning to home
- improvement: item dragging with mouse now moves more naturally when scrolling the window
- limitation imposed: while dragging with a keyboard, if you scroll the window then the drag is canceled. This limitation can be removed in the future
- limitation imposed: keyboard dragging without a scrollable container will not allow the user to scroll beyond the visible edges. This limitation could be removed if we built auto scrolling lists.

### Technical changes
- now using position: fixed rather than position: absolute for positioning a draggable item
- blocking pointer events when appropriate while dragging to allow scrolling on containers while dragging (and for performance butter)
- droppable dimension now needs to be aware of its current scroll (this is now listened to within droppable-dimension-publisher)
- a draggable knows what droppable it is in by using context rather than its page coordinates (this is really important when you have more than one droppable. It is the best way to know what a draggables parent is)
- sinon+chai => jest
- previously draggable and droppable shared a 'dimension' type. However, they are just becoming too different and forcing them to share was proving to be a lot of trouble and misdirection. Now they are seperate things and they also have their own dimension publishers
draggables will now 'move' based on a window scroll or container scroll

### API changes

`draggableStyle` has had some changes

```js
type Provided = {|
  innerRef: (HTMLElement) => void,
  // values have changed
  draggableStyle: ?DraggableStyle,
  dragHandleProps: ?DragHandleProvided,
  placeholder: ?ReactElement,
|}
```

**Old dragging style**

```js
type DraggableStyle = DraggingStyle | NotDraggingStyle;

type DraggingStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
  transform: ?string,
|}

type NotDraggingStyle = {|
  transition: ?string,
  transform: ?string,
|}
```

**New dragging style**

```js
type DraggableStyle = DraggingStyle | NotDraggingStyle;

type DraggingStyle = {|
  position: 'fixed',
  boxSizing: 'border-box',
  // allow scrolling of the element behind the dragging element
  pointerEvents: 'none',
  zIndex: ZIndex,
  width: number,
  height: number,
  top: number,
  left: number,
  transform: ?string,
|}

type NotDraggingStyle = {|
  transition: ?string,
  transform: ?string,
  pointerEvents: 'none' | 'auto',
|}
```

## 4.4.2 (2017-07-27)


* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 4.4.1 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 4.1.0 (2017-07-17)

## 4.1.0 (2017-07-17)

## 4.1.0 (2017-07-17)


* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 4.1.0 (2017-07-17)


* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 4.0.1 (2017-07-17)


* fix; resorting to using keyCodes for event key matching for improved browser support ([5d15c13](https://bitbucket.org/atlassian/atlaskit/commits/5d15c13))

## 4.0.0 (2017-07-14)


* feature; using css transitions rather than physics for minor movements to greatly increase p ([d9029d2](https://bitbucket.org/atlassian/atlaskit/commits/d9029d2))


* breaking; Minor changes to Draggable > Provided > DraggableStyle. In most cases upgrading will involve no
changes

## 3.0.1 (2017-07-13)


* fix; drastically improving drag performance by scheduling movements within an animation f ([5b93d43](https://bitbucket.org/atlassian/atlaskit/commits/5b93d43))

## 3.0.0 (2017-07-12)


* feature; draggables will now be positioned correctly with parents that have position:relativ ([6fe9d5a](https://bitbucket.org/atlassian/atlaskit/commits/6fe9d5a))


* breaking; top and left have been remove from Draggable > Provided > PlacementInfo

ISSUES CLOSED: AK-2963

## 2.0.3 (2017-07-11)


* fix; draggable and droppable will now re-render their children if they are rendered ([0dbb3a8](https://bitbucket.org/atlassian/atlaskit/commits/0dbb3a8))

## 2.0.2 (2017-07-10)

## 2.0.1 (2017-07-10)


* fix; cancel drag on window resize ([892e585](https://bitbucket.org/atlassian/atlaskit/commits/892e585))
* fix; fixing story in ie11 ([f5eaca4](https://bitbucket.org/atlassian/atlaskit/commits/f5eaca4))

## 1.0.0 (2017-07-06)


* feature; initial release of drag and drop component ([ad4a5b0](https://bitbucket.org/atlassian/atlaskit/commits/ad4a5b0))
