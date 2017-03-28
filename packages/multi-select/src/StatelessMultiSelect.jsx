import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import { Label, FieldBase } from '@atlaskit/field-base';
import TagGroup from '@atlaskit/tag-group';
import Tag from '@atlaskit/tag';
import classNames from 'classnames';

import styles from 'style!./styles.less';
import DummyItem from './internal/DummyItem';
import DummyGroup from './internal/DummyGroup';
import Trigger from './internal/Trigger';
import NothingWasFound from './internal/NothingWasFound';
import { appearances, mapAppearanceToFieldBase } from './internal/appearances';

const groupShape = DummyGroup.propTypes;
const itemShape = DummyItem.propTypes;

export default class StatelessMultiSelect extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(appearances.values),
    filterValue: PropTypes.string,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    shouldFocus: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape(groupShape)),
    label: PropTypes.string,
    noMatchesFound: PropTypes.string,
    name: PropTypes.string,
    onFilterChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    onSelected: PropTypes.func,
    onRemoved: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    selectedItems: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    filterValue: '',
    shouldFocus: false,
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
    isFocused: this.props.isOpen || this.props.shouldFocus,
    focusedItemIndex: null,
  }

  componentDidMount = () => {
    if (this.state.isFocused && this.inputNode) {
      this.inputNode.focus();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.shouldFocus && this.props.shouldFocus && this.inputNode) {
      this.inputNode.focus();
    }
  }

  onFocus = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: true });
      this.inputNode.focus();
    }
  }

  onBlur = () => {
    if (!this.props.isDisabled) {
      this.setState({ isFocused: false });
    }
  }

  onOpenChange = (attrs) => {
    const target = attrs.event.target;
    // eslint-disable-next-line react/no-find-dom-node
    const tagGroup = ReactDOM.findDOMNode(this.tagGroup);
    const tagGroupElements = tagGroup.children;
    const isInsideTagGroup = [...tagGroupElements].some(
      node => node.contains(target) && node.tagName !== 'INPUT'
    );

    if (!isInsideTagGroup) {
      this.props.onOpenChange(attrs);
    }

    if (attrs.isOpen) {
      tagGroup.querySelector('input').focus();
    }
  }

  getAllValues = () => this.props.selectedItems.map(item => item.value)

  getPlaceholder = () => {
    if (!this.props.isOpen && this.props.selectedItems.length === 0) {
      return this.props.placeholder;
    }

    return null;
  }

  getNextFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem === null) {
      currentItem = 0;
    } else if (currentItem < length) {
      currentItem++;
    } else {
      currentItem = 0;
    }

    return currentItem;
  }

  getPrevFocusable = (indexItem, length) => {
    let currentItem = indexItem;

    if (currentItem > 0) {
      currentItem--;
    } else {
      currentItem = length;
    }

    return currentItem;
  }

  getAllVisibleItems = (groups) => {
    let allFilteredItems = [];
    groups.forEach((val) => {
      allFilteredItems = allFilteredItems.concat(this.filterItems(val.items));
    });
    return allFilteredItems;
  }

  handleItemSelect = (item, attrs) => {
    if (!item.isDisabled) {
      this.props.onOpenChange({ isOpen: false, event: attrs.event });
      this.props.onSelected(item);
      this.props.onFilterChange('');
      this.setState({ focusedItemIndex: null });
    }
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

  handleOnChange = (event) => {
    const value = event.target.value;

    if (value !== this.props.filterValue) {
      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleTriggerClick = (event) => {
    if (!this.props.isDisabled) {
      this.onOpenChange({ event, isOpen: true });
    }
  }

  focusNextItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    this.setState({
      focusedItemIndex: this.getNextFocusable(this.state.focusedItemIndex, length),
    });
  }

  focusPreviousItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    const length = filteredItems.length - 1;
    this.setState({
      focusedItemIndex: this.getPrevFocusable(this.state.focusedItemIndex, length),
    });
  }

  handleKeyboardInteractions = (event) => {
    const isSelectOpen = this.props.isOpen;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isSelectOpen) {
          this.onOpenChange({ event, isOpen: true });
        }
        this.focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isSelectOpen) {
          this.focusPreviousItem();
        }
        break;
      case 'Enter':
        if (isSelectOpen) {
          event.preventDefault();
          if (this.state.focusedItemIndex !== null) {
            this.handleItemSelect(
              this.getAllVisibleItems(this.props.items)[this.state.focusedItemIndex], { event }
            );
          }
        }
        break;
      case 'Backspace':
        if (!this.props.filterValue) {
          this.removeLatestItem();
          this.onOpenChange({ event, isOpen: true });
        }
        break;
      default:
        break;
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
        elemBefore={item.elemBefore}
        isFocused={itemIndex === this.state.focusedItemIndex}
        key={itemIndex}
        onActivate={(attrs) => {
          this.handleItemSelect(item, attrs);
        }}
      >
        {item.content}
      </Item>));
    }

    return (<NothingWasFound noMatchesFound={this.props.noMatchesFound} />);
  }

  renderGroups = groups => groups.map((group, groupIndex) => { // eslint-disable-line arrow-body-style, max-len
    return group.items.length > 0 ?
      <Group
        heading={group.heading}
        key={groupIndex}
      >
        {this.renderItems(group.items)}
      </Group>
    : null;
  })

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
    multiple
    name={this.props.name}
    readOnly
    required={this.props.isRequired}
    style={{ display: 'none' }}
    value={this.getAllValues(this.props.selectedItems)}
  >
    {this.renderOptGroups(this.props.items)}
  </select>)

  render() {
    const classes = classNames([styles.selectWrapper, {
      [styles.fitContainer]: this.props.shouldFitContainer,
    }]);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={classes}
        onKeyDown={this.handleKeyboardInteractions}
      >
        {this.renderSelect()}
        {this.props.label ? <Label
          htmlFor={this.props.id}
          isFirstChild={this.props.isFirstChild}
          isRequired={this.props.isRequired}
          label={this.props.label}
        /> : null}
        <Droplist
          isKeyboardInteractionDisabled
          isOpen={this.props.isOpen}
          isTriggerDisabled
          isTriggerNotTabbable
          onOpenChange={this.onOpenChange}
          position={this.props.position}
          shouldFitContainer
          trigger={
            <FieldBase
              appearance={mapAppearanceToFieldBase(this.props.appearance)}
              isDisabled={this.props.isDisabled}
              isFitContainerWidthEnabled
              isFocused={this.props.isOpen || this.state.isFocused}
              isInvalid={this.props.isInvalid}
              isPaddingDisabled
              isRequired={this.props.isRequired}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            >
              <Trigger
                isDisabled={this.props.isDisabled}
                onClick={this.handleTriggerClick}
              >
                <TagGroup ref={ref => (this.tagGroup = ref)}>
                  {this.props.selectedItems.map(item =>
                    <Tag
                      elemBefore={item.tagElemBefore}
                      key={item.value}
                      onAfterRemoveAction={() => {
                        this.handleItemRemove(item);
                      }}
                      removeButtonText={this.props.isDisabled ? null : `${item.content}, remove`}
                      text={item.content}
                    />)}
                  {this.props.isDisabled ? null : <input
                    className={styles.input}
                    disabled={this.props.isDisabled}
                    onChange={this.handleOnChange}
                    placeholder={this.getPlaceholder()}
                    ref={ref => (this.inputNode = ref)}
                    type="text"
                    value={this.props.filterValue}
                  />}
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
