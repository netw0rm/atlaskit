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
import NothingWasFound from './internal/NothingWasFound';

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
    filterValue: PropTypes.string,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    noMatchesFound: PropTypes.string,
    name: PropTypes.string,
    onFilterChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    onSelected: PropTypes.func,
    onRemoved: PropTypes.func,
    position: PropTypes.string,
    selectedItems: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    filterValue: null,
    isOpen: false,
    items: [],
    label: '',
    noMatchesFound: 'No matches found',
    onFilterChange: () => {},
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

  getAllValues = () => this.props.selectedItems.map(item => item.value)

  handleTriggerClick = (event) => {
    this.onOpenChange({ event, isOpen: true });
  }

  handleItemRemove = (item) => {
    this.props.onRemoved(item);
  }

  removeLatestItem = () => {
    if (this.props.selectedItems.length) {
      const selectedItems = this.props.selectedItems;
      this.handleItemRemove(selectedItems[selectedItems.length - 1]);
    }
  }

  handleKeyUpInInput = (event) => {
    const key = event.key;
    const value = event.target.value;

    if (key === 'Backspace' && !this.props.filterValue) {
      this.removeLatestItem();
      this.onOpenChange({ event, isOpen: true });
    } else if (value !== this.props.filterValue) {
      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  filterItems = (items) => {
    const value = this.props.filterValue;
    const trimmedValue = value && value.toLowerCase().trim();
    const selectedItems = this.props.selectedItems;
    const unselectedItems = items.filter(item => selectedItems.indexOf(item) === -1);

    return trimmedValue ?
      unselectedItems.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
      unselectedItems;
  }

  renderItems = (items) => {
    const filteredItems = this.filterItems(items);
    if (filteredItems.length) {
      return filteredItems.map((item, itemIndex) => (<Item
        {...item}
        key={itemIndex}
        onActivate={(attrs) => {
          console.log('attar,', attrs);
          this.props.onOpenChange({ isOpen: false, event: attrs.event });
          this.props.onSelected(item);
        }}
      >
        {item.content}
      </Item>));
    }

    return (<NothingWasFound noMatchesFound={this.props.noMatchesFound} />);
  }

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
    id={this.props.id}
    multiple
    name={this.props.name}
    readOnly
    value={this.getAllValues(this.props.selectedItems)}
    style={{ display: 'none' }}
  >
    {this.renderOptGroups(this.props.items)}
  </select>)

  render = () => {
    const classes = classNames([styles.selectWrapper, {
      [styles.fitContainer]: this.props.shouldFitContainer,
    }]);

    return (
      <div className={classes}>
        {this.renderSelect()}
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
                  <input
                    className={styles.input}
                    type="text"
                    onKeyUp={this.handleKeyUpInInput}
                  />
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
