import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';

export default class CommentAction extends PureComponent {
  static propTypes = {
    /** The content to render inside the action button. */
    children: PropTypes.node,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
  }

  render() {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <span
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        <Button
          appearance="subtle-link"
          spacing="none"
          type="button"
        >
          {this.props.children}
        </Button>
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
