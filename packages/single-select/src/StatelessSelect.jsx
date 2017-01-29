import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
import Item from 'ak-droplist-item';
import Group from 'ak-droplist-group';
import { Label, FieldBase } from 'ak-field-base';
import styles from 'style!./styles.less';
import classNames from 'classnames';

import Trigger from './internal/Trigger';

export const itemShape = PropTypes.shape({
  content: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  elemBefore: PropTypes.node,
  elemAfter: PropTypes.node,
});

export default class StatelessSelect extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    onSelected: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    selectedItem: itemShape,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    onSelected: () => {},
    onOpenChange: () => {},
    placeholder: '',
    position: 'bottom left',
    selectedItem: {},
  }

  state = {
    isFocused: this.props.isOpen,
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  }

  renderItems = items =>
    items.map((item, itemIndex) =>
      <Item
        {...item}
        key={itemIndex}
        onActivate={() => {
          this.props.onSelected(item);
        }}
        isActive={item.value === this.props.selectedItem.value}
      >
        {item.content}
      </Item>
    )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group
      heading={group.heading}
      key={groupIndex}
    >
      {this.renderItems(group.items)}
    </Group>
  )

  render = () => {
    const classes = classNames([styles.selectWrapper, {
      [styles.fitContainer]: this.props.shouldFitContainer,
    }]);

    return (
      <div className={classes}>
        {this.props.label ? <Label
          label={this.props.label}
          isRequired={this.props.isRequired}
          htmlFor={this.props.id}
        /> : null}
        <Droplist
          position={this.props.position}
          isOpen={this.props.isOpen}
          onOpenChange={this.props.onOpenChange}
          isTriggerNotTabbable
          shouldFitContainer
          trigger={
            <FieldBase
              isPaddingDisabled
              isDisabled={this.props.isDisabled}
              isInvalid={this.props.isInvalid}
              isFocused={this.props.isOpen || this.state.isFocused}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              isFitContainerWidthEnabled
            >
              <Trigger>
                {this.props.selectedItem.content || this.props.placeholder}
              </Trigger>
            </FieldBase>
          }
        >
          {this.renderGroups(this.props.items)}
        </Droplist>
      </div>
    );
  }
}
