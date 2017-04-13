import React, { PropTypes, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Layer from '@atlaskit/layer';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Container from './styled/Container';

// this offset is passed to popper as two space separated numbers representing
// the offset from the target the first is distance along the same axis you are
// on (top or bottom aligned would move left/right) and the second is on the
// perpendicular axis (how far 'away' you are from the target) both are measured
// in pixels
const dialogOffset = `0 ${akGridSizeUnitless}`;

// TODO: expose applicable props from Layer and pull in here
export default class InlineDialog extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    isOpen: PropTypes.bool,
    onContentBlur: PropTypes.func,
    onContentClick: PropTypes.func,
    onContentFocus: PropTypes.func,
    onClose: PropTypes.func,
    position: PropTypes.oneOf([
      'top left', 'top center', 'top right', 'right top', 'right middle',
      'right bottom', 'bottom left', 'bottom center', 'bottom right', 'left top',
      'left middle', 'left bottom',
    ]),
    shouldFlip: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    onContentBlur: () => {},
    onContentClick: () => {},
    onContentFocus: () => {},
    onClose: () => {},
    position: 'bottom center',
    shouldFlip: false,
  }

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (event.target instanceof Node && !domNode.contains(event.target))) {
        this.props.onClose({ isOpen: false, event });
      }
    }
  }

  render() {
    const {
      children, content, isOpen, onContentBlur, onContentClick, onContentFocus,
      position, shouldFlip,
    } = this.props;

    const layerContent = isOpen ? (
      <Container
        onBlurCapture={onContentBlur}
        onClick={onContentClick}
        onFocusCapture={onContentFocus}
        tabIndex="-1"
      >
        {content}
      </Container>
    ) : null;

    return (
      <Layer
        autoFlip={shouldFlip}
        content={layerContent}
        offset={dialogOffset}
        position={position}
      >
        <div>
          {children}
        </div>
      </Layer>
    );
  }
}
