import React, { PureComponent, PropTypes } from 'react';
import Droplist from '@atlaskit/droplist';
import Item from '@atlaskit/droplist-item';
import Group from '@atlaskit/droplist-group';
import { Label, FieldBase } from '@atlaskit/field-base';
import styles from 'style!./styles.less';
import classNames from 'classnames';

import Trigger from './internal/Trigger';
import { appearances, mapAppearanceToFieldBase } from './internal/appearances';

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
    appearance: PropTypes.oneOf(appearances.values),
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    isOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    name: PropTypes.string,
    onSelected: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    selectedItem: itemShape,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
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

  renderOptions = items => items.map((item, itemIndex) => (<option
    disabled={item.isDisabled}
    key={itemIndex}
    value={item.value}
  >{item.content}</option>))

  renderOptGroups = groups => groups.map((group, groupIndex) =>
    <optgroup
      label={group.heading}
      key={groupIndex}
    >
      {this.renderOptions(group.items)}
    </optgroup>
  )

  renderSelect = () => (<select
    disabled={this.props.isDisabled}
    id={this.props.id}
    name={this.props.name}
    readOnly
    required={this.props.isRequired}
    style={{ display: 'none' }}
    value={this.props.selectedItem.value}
  >
    <option value="" />
    {this.renderOptGroups(this.props.items)}
  </select>)

  render() {
    const classes = classNames([styles.selectWrapper, {
      [styles.fitContainer]: this.props.shouldFitContainer,
    }]);

    return (
      <div className={classes}>
        {this.renderSelect()}
        {this.props.label ? <Label
          htmlFor={this.props.id}
          isFirstChild={this.props.isFirstChild}
          isRequired={this.props.isRequired}
          label={this.props.label}
        /> : null}
        <Droplist
          isOpen={this.props.isOpen}
          isTriggerNotTabbable
          onOpenChange={this.props.onOpenChange}
          position={this.props.position}
          shouldFitContainer
          trigger={
            <FieldBase
              appearance={mapAppearanceToFieldBase([this.props.appearance])}
              isDisabled={this.props.isDisabled}
              isFitContainerWidthEnabled
              isFocused={this.props.isOpen || this.state.isFocused}
              isInvalid={this.props.isInvalid}
              isPaddingDisabled
              onBlur={this.onBlur}
              onFocus={this.onFocus}
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
