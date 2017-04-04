import React, { PureComponent, PropTypes } from 'react';
import Root from './Root';
import AnimationWrapper from './AnimationWrapper';
import Chrome from './Chrome';
import Content from './Content';
import Button from './RemoveButton';
import ElemBefore from './ElemBefore';

export default class Tag extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf('default', 'rounded'),
    elemBefore: PropTypes.node,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    removeButtonText: PropTypes.string,
    onBeforeRemoveAction: PropTypes.func,
    onAfterRemoveAction: PropTypes.func,
  }

  static defaultProps = {
    appearance: 'default',
    elemBefore: null,
    onAfterRemoveAction: () => {},
    onBeforeRemoveAction: () => true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
      isRemoved: false,
      markedForRemoval: false,
    };
  }

  handleRemoveAction = () => {
    if (this.props.onBeforeRemoveAction()) {
      this.setState({ isRemoving: true, isRemoved: false });
    }
  }

  handleHoverChange = (hoverState) => {
    this.setState({ markedForRemoval: hoverState });
  }

  handleRemovalCompletion = () => {
    this.setState({ isRemoving: false, isRemoved: true });
    this.props.onAfterRemoveAction(this.props.text);
  }

  render() {
    const newButton = this.props.removeButtonText ? (
      <Button
        removeText={this.props.removeButtonText}
        isRounded={this.props.appearance === 'rounded'}
        onHoverChange={this.handleHoverChange}
        onRemoveAction={this.handleRemoveAction}
      />
    ) : null;

    return (
      <Root>
        <AnimationWrapper
          isRemoving={this.state.isRemoving}
          isRemoved={this.state.isRemoved}
          onRemovalCompletion={this.handleRemovalCompletion}
        >
          <Chrome
            isRounded={this.props.appearance === 'rounded'}
            isLink={!!this.props.href}
            markedForRemoval={this.state.markedForRemoval}
            isRemovable={!!this.props.removeButtonText}
          >
            <ElemBefore>{this.props.elemBefore}</ElemBefore>
            <Content href={this.props.href}>
              {this.props.text}
            </Content>
            {newButton}
          </Chrome>
        </AnimationWrapper>
      </Root>
    );
  }
}
