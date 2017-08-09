// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styledRootElement from '../styled/Item';
import {
  Before,
  After,
  Content,
  ContentWrapper,
  Description,
} from '../styled/ItemParts';
import type { ReactElement, HTMLElement } from '../types';

export default class Item extends Component {
  static propTypes = {
    /** Optional function to be used for rendering links. Receives `href` and possibly `target`
      * as props. */
    linkComponent: PropTypes.func,
    /** Main content to be shown inside the item. */
    children: PropTypes.node,
    /** Secondary text to be shown underneath the main content. */
    description: PropTypes.string,
    /** Drag and drop props provided by @atlaskit/drag-and-drop. Please do not use this unless
      * using @atlaskit/drag-and-drop */
    dnd: PropTypes.shape({
      draggableStyle: PropTypes.object,
      dragHandleProps: PropTypes.object,
      innerRef: PropTypes.func,
    }),
    /** Content to be shown before to the left of the main content (shown to the right of content
      * in RTL mode). */
    elemAfter: PropTypes.node,
    /** Content to be shown before to the right of the main content (shown to the left of content
      * in RTL mode). */
    elemBefore: PropTypes.node,
    /** Link that the user will be redirected to when the item is clicked. If omitted, a
     *  non-hyperlink component will be rendered. */
    href: PropTypes.string,
    /** Causes the item to be rendered with reduced spacing. */
    isCompact: PropTypes.bool,
    /** Causes the item to appear in a disabled state and click behaviours will not be triggered. */
    isDisabled: PropTypes.bool,
    /** Used to apply correct dragging styles when also using @atlaskit/drag-and-drop. */
    isDragging: PropTypes.bool,
    /** Causes the item to still be rendered, but with `display: none` applied. */
    isHidden: PropTypes.bool,
    /** Causes the item to appear with a persistent selected background state. */
    isSelected: PropTypes.bool,
    /** Function to be called when the item is clicked, Receives the MouseEvent. */
    onClick: PropTypes.func,
    /** Function to be called when the item is pressed with a keyboard,
    * Receives the KeyboardEvent. */
    onKeyDown: PropTypes.func,
    /** Standard onmouseenter event */
    onMouseEnter: PropTypes.func,
    /** Standard onmouseleave event */
    onMouseLeave: PropTypes.func,
    /** Allows the role attribute of the item to be altered from it's default of
     *  `role="presentation"` */
    role: PropTypes.string,
    /** Allows the `children` content to break onto a new line, rather than truncating the
     *  content. */
    shouldAllowMultiline: PropTypes.bool,
    /** Target frame for item `href` link to be aimed at. */
    target: PropTypes.string,
    /** Standard browser title to be displayed on the item when hovered. */
    title: PropTypes.string,
    /** Whether the Item should attempt to gain browser focus when mounted */
    autoFocus: PropTypes.bool,
  }

  static defaultProps = {
    description: '',
    isCompact: false,
    isDisabled: false,
    isHidden: false,
    role: 'presentation',
    shouldAllowMultiline: false,
    autoFocus: false,
  }

  // eslint-disable-next-line react/sort-comp
  ref: ?HTMLElement

  // $FlowFixMe
  constructor(props) {
    super(props);

    // The type of element rendered at the root of render() can vary based on the `href`
    // and `linkComponent` props provided. We generate this component here to avoid re-
    // generating the component inside render(). This is for performance reasons, and also
    // allows us to avoid generating a new `ref` for the root element each render().
    this.rootComponent = styledRootElement({
      href: this.href(),
      linkComponent: props.linkComponent,
    });
  }

  componentDidMount() {
    if (this.ref && this.props.autoFocus) {
      this.ref.focus();
    }
  }

  setRef = (ref: ?HTMLElement) => {
    this.ref = ref;
  }

  rootComponent: ReactElement

  href = () => (this.props.isDisabled ? null : this.props.href);

  render() {
    const {
      onClick,
      onKeyDown,
      isCompact,
      isDisabled,
      isDragging,
      isHidden,
      isSelected,
      onMouseEnter,
      onMouseLeave,
      role,
      dnd,
      ...otherProps
    } = this.props;

    const { rootComponent: Root } = this;
    const dragHandleProps: ?Object = (dnd && dnd.dragHandleProps) || null;

    const patchedEventHandlers = {
      onClick: (event: MouseEvent) => {
        const original = () => {
          if (!isDisabled && onClick) {
            onClick(event);
          }
        };

        if (!dragHandleProps || !dragHandleProps.onClick) {
          original();
          return;
        }

        // Drag and drop has its own disabled mechansim
        // So not checking for isDisabled
        dragHandleProps.onClick(event);

        // if default is prevent - do not fire the onClick prop
        if (event.defaultPrevented) {
          return;
        }

        original();
      },
      onMouseDown: (event: MouseEvent) => {
        if (dragHandleProps && dragHandleProps.onMouseDown) {
          dragHandleProps.onMouseDown(event);
        }

        // We want to prevent the item from getting focus when clicked
        event.preventDefault();
      },
      onKeyDown: (event: KeyboardEvent) => {
        const original = () => {
          if (!isDisabled && onKeyDown) {
            onKeyDown(event);
          }
        };

        if (!dragHandleProps || !dragHandleProps.onKeyDown) {
          original();
          return;
        }

        dragHandleProps.onKeyDown(event);

        // if default is prevent - do not fire other handlers
        if (event.defaultPrevented) {
          return;
        }

        // not allowing keyboard events on the element while dragging
        if (isDragging) {
          return;
        }

        original();
      },
    };

    const patchedInnerRef = (ref) => {
      this.setRef(ref);

      if (dnd) {
        dnd.innerRef(ref);
      }
    };

    return (
      <Root
        aria-disabled={isDisabled}
        href={this.href()}
        isCompact={isCompact}
        isDisabled={isDisabled}
        isDragging={isDragging}
        isHidden={isHidden}
        isSelected={isSelected}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role={role}
        tabIndex={isDisabled || isHidden ? null : 0}
        target={this.props.target}
        title={this.props.title}
        style={dnd ? dnd.draggableStyle : null}
        innerRef={patchedInnerRef}
        {...dragHandleProps}
        {...patchedEventHandlers}
        {...otherProps}
      >
        {!!this.props.elemBefore && <Before>{this.props.elemBefore}</Before>}
        <ContentWrapper>
          <Content allowMultiline={this.props.shouldAllowMultiline}>
            {this.props.children}
          </Content>
          {!!this.props.description && (
            <Description
              isCompact={this.props.isCompact}
              isDisabled={this.props.isDisabled}
            >{this.props.description}</Description>
          )}
        </ContentWrapper>
        {!!this.props.elemAfter && <After>{this.props.elemAfter}</After>}
      </Root>
    );
  }
}
