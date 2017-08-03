import React, { PureComponent } from 'react';
import RemoveIcon from '@atlaskit/icon/glyph/cross';
import Button from '../styled/Remove';

type Props = {|
  removeText: string,
  isRounded?: bool,
  onHoverChange?: (a: bool) => null,
  onRemoveAction?: () => null,
|}

export default class Remove extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  onKeyPress = (e: KeyboardEvent) => {
    const spacebarOrEnter = (e.key === ' ' || e.key === 'Enter');

    if (spacebarOrEnter) {
      e.stopPropagation();
      this.props.onRemoveAction();
    }
  }

  onMouseOver = () => {
    this.props.onHoverChange(true);
  };

  onMouseOut = () => {
    this.props.onHoverChange(false);
  }

  render() {
    const { isRounded, onRemoveAction, removeText } = this.props;

    return (
      <Button
        aria-label={removeText}
        isRounded={isRounded}
        onClick={onRemoveAction}
        onKeyPress={this.onKeyPress}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        type="button"
      >
        <RemoveIcon label={removeText} size="small" />
      </Button>
    );
  }
}
