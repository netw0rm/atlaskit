import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
import Item from 'ak-droplist-item';
import Group from 'ak-droplist-group';
import AkFieldBase, { Label } from 'ak-field-base';
import styles from 'style!./styles.less';

export const itemShape = PropTypes.shape({
  content: PropTypes.node,
  value: PropTypes.oneOf(PropTypes.string, PropTypes.number),
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
    items: React.PropTypes.arrayOf(itemShape),
    label: PropTypes.string,
    onSelected: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    selectedItem: itemShape,
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
    <Group heading={group.heading} key={groupIndex}>{this.renderItems(group.items)}</Group>
  )

  render = () => (
    <div className={styles.selectWrapper}>
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
        trigger={
          <AkFieldBase
            isPaddingDisabled
            isDisabled={this.props.isDisabled}
            isInvalid={this.props.isInvalid}
          >
            {this.props.selectedItem.content || this.props.placeholder}
          </AkFieldBase>
        }
      >
        {this.renderGroups(this.props.items)}
      </Droplist>
    </div>
  );
}
