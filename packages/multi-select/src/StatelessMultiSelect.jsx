import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Droplist from '@atlaskit/droplist';
import Item from '@atlaskit/droplist-item';
import Group from '@atlaskit/droplist-group';
import { Label, FieldBase } from '@atlaskit/field-base';
import TagGroup from '@atlaskit/tag-group';
import Tag from '@atlaskit/tag';
import classNames from 'classnames';

import styles from 'style!./styles.less';
import Trigger from './internal/Trigger';

export const itemShape = PropTypes.shape({
  content: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  elemBefore: PropTypes.node,
  elemAfter: PropTypes.node,
});

export default class StatelessMultiSelect extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    onOpenChange: PropTypes.func,
    onSelected: PropTypes.func,
    onRemoved: PropTypes.func,
    position: PropTypes.string,
    selectedItems: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    items: [],
    label: '',
    onOpenChange: () => {},
    onSelected: () => {},
    onRemoved: () => {},
    position: 'bottom left',
    selectedItems: [],
  }

  // This is used only to show the focus ring around , it's okay to have state in this case.
  state = {
    isFocused: this.props.isOpen,
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  onBlur = () => {
    this.setState({ isFocused: false });
  }

  onOpenChange = (attrs) => {
    const target = attrs.event.target;
    // eslint-disable-next-line react/no-find-dom-node
    const tagGroup = ReactDOM.findDOMNode(this.tagGroup);
    const tagGroupElements = tagGroup.children;
    const isInsideTagGroup = [...tagGroupElements].some(node =>
      node.contains(target) && node.tagName !== 'INPUT');

    if (!isInsideTagGroup) {
      this.props.onOpenChange(attrs);
    }

    if (attrs.isOpen) {
      tagGroup.querySelector('input').focus();
    }
  }

  handleTriggerClick = (event) => {
    this.onOpenChange({ event, isOpen: true });
  }

  handleItemRemove = (item) => {
    this.props.onRemoved(item);
  }

  renderItems = items =>
    items.map((item, itemIndex) =>
      <Item
        {...item}
        isHidden={this.props.selectedItems.indexOf(item) > -1}
        key={itemIndex}
        onActivate={() => {
          this.props.onSelected(item);
        }}
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
          htmlFor={this.props.id}
          label={this.props.label}
        /> : null}
        <Droplist
          isOpen={this.props.isOpen}
          isTriggerDisabled
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          position={this.props.position}
          shouldFitContainer
          trigger={
            <FieldBase
              isFitContainerWidthEnabled
              isFocused={this.props.isOpen || this.state.isFocused}
              isPaddingDisabled
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            >
              <Trigger
                onClick={this.handleTriggerClick}
              >
                <TagGroup ref={ref => (this.tagGroup = ref)}>
                  {this.props.selectedItems.map(item =>
                    <Tag
                      key={item.value}
                      onAfterRemoveAction={() => {
                        this.handleItemRemove(item);
                      }}
                      removeButtonText={`${item.content}, remove`}
                      text={item.content}
                    />)}
                  <input className={styles.input} type="text" />
                </TagGroup>
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
