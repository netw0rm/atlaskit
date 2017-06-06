import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import { Label, FieldBaseStateless } from '@atlaskit/field-base';
import TagGroup from '@atlaskit/tag-group';
import Tag from '@atlaskit/tag';
import classNames from 'classnames';

import styles from './styles.less';
import DummyItem from './internal/DummyItem';
import DummyGroup from './internal/DummyGroup';
import DummyFooter from './internal/DummyFooter';
import Trigger from './internal/Trigger';
import NothingWasFound from './internal/NothingWasFound';
import Footer from './internal/Footer';
import { mapAppearanceToFieldBase } from './internal/appearances';

const groupShape = DummyGroup.propTypes;
const itemShape = DummyItem.propTypes;
const footerShape = DummyFooter.propTypes;

// =============================================================
// NOTE: Duplicated in ./internal/appearances until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

const appearances = {
  values: [
    'default',
    'subtle',
  ],
  default: 'default',
};

export default class StatelessMultiSelect extends PureComponent {
  static propTypes = {
    /** Subtle items do not have a background color. */
    appearance: PropTypes.oneOf(appearances.values),
    /** Message to display in footer after the name of the new item. Only applicable if
     * shouldAllowCreateItem prop is set to true. Default: 'New item'*/
    createNewItemLabel: PropTypes.string,
    /** Value to be used when filtering the items. Compared against 'content'. */
    filterValue: PropTypes.string,
    /** Element to show after the list of item. Accepts an object of the specific shape */
    footer: PropTypes.shape(footerShape),
    /** id property to be passed down to the html select component. */
    id: PropTypes.string,
    /** Sets whether the select is selectable. Changes hover state. */
    isDisabled: PropTypes.bool,
    /** controls the top margin of the label component rendered. */
    isFirstChild: PropTypes.bool,
    /** Sets whether the field will become focused. */
    shouldFocus: PropTypes.bool,
    /** Set whether there is an error with the selection. Sets an orange border
    and shows the warning icon. */
    isInvalid: PropTypes.bool,
    /** Sets whether the Select dropdown is open. */
    isOpen: PropTypes.bool,
    /** Sets whether form including select can be submitted without an option
    being made. */
    isRequired: PropTypes.bool,
    /** An array of objects, each one of which must have an array of items, and
    may have a heading. All items should have content and value properties, with
    content being the displayed text. */
    items: PropTypes.arrayOf(PropTypes.shape(groupShape)),
    /** Label to be displayed above select. */
    label: PropTypes.string,
    /** Mesage to display in any group in items if there are no items in it,
    including if there is one item that has been selected. */
    noMatchesFound: PropTypes.string,
    /** name property to be passed to the html select element. */
    name: PropTypes.string,
    /** Handler to be called when the filtered items changes.*/
    onFilterChange: PropTypes.func,
    /** Handler to be called when a new item is created.
     * Only applicable when the shouldAllowCreateItem is set to true.*/
    onNewItemCreated: PropTypes.func,
    /** Handler called when the select is opened or closed. Called with an object
    that has both the event, and the new isOpen state. */
    onOpenChange: PropTypes.func,
    /** Handler called when a selection is made, with the item chosen. */
    onSelected: PropTypes.func,
    onRemoved: PropTypes.func,
    /** Text to be shown within the select when no item is selected. */
    placeholder: PropTypes.string,
    /** Where the select dropdown should be displayed relative to the field position. */
    position: PropTypes.string,
    /** Array of selected items */
    selectedItems: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    /** Sets whether the field should be constrained to the width of its trigger */
    shouldFitContainer: PropTypes.bool,
    /** Sets whether a new item could be created and added to the list by pressing Enter
     * inside the autocomplete field. If set to true then no additional footer from the 'footer'
     * property would be rendered. */
    shouldAllowCreateItem: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    createNewItemLabel: 'New item',
    filterValue: '',
    footer: {},
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
    shouldAllowCreateItem: false,
  }

  // This is used only to manipulate focus , it's okay to have state in this case.
  state = {
    isFocused: this.props.isOpen || this.props.shouldFocus,
    focusedItemIndex: null,
    isFooterFocused: null,
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

      /**
       * Check if we're tabbing to the Remove button on a tag.
       * This is a hacky workaround for now and should be fixed when
       * we implement proper traversal for tags with the keyboard.
       *
       * @see {@link https://ecosystem.atlassian.net/browse/AK-2250}
       * @todo Implement traversal of tags with arrow keys, then remove this.
       */
      if (document.activeElement.tagName.toLowerCase() !== 'button') {
        this.inputNode.focus();
      }
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

  handleItemCreate = (event) => {
    const { filterValue: value, items } = this.props;
    if (value) {
      const allVisible = this.getAllVisibleItems(items);
      const matchingElement = allVisible.filter(item => item.content === value);
      if (!matchingElement.length) {
        this.props.onNewItemCreated({ value });
      } else {
        this.handleItemSelect(matchingElement[0], { event });
      }
    }
  }

  handleFooterActivate = (event) => {
    const { footer } = this.props;
    if (footer.onActivate) {
      footer.onActivate(event);
    }
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
      // We want to get rid of the focus on the items when the shouldAllowCreateItem enabled.
      // When a user presses Enter multi-select should create a new value if nothing is focused, but
      // it still should allow to focus an item in the list and select it by pressing Enter
      // as normal multi-select does.
      if (this.props.shouldAllowCreateItem) {
        this.setState({ focusedItemIndex: null });
      }

      this.props.onFilterChange(value);
      this.onOpenChange({ event, isOpen: true });
    }
  }

  handleTriggerClick = (event) => {
    if (!this.props.isDisabled) {
      this.onOpenChange({ event, isOpen: true });
    }
  }

  focusCorrectElement = (focused, length) => {
    if (this.shouldFocusFooter(focused, length)) {
      this.focusFooter();
    } else {
      this.setState({
        focusedItemIndex: focused,
        isFooterFocused: false,
      });
    }
  }

  shouldFocusFooter = (focused, length) => {
    const { shouldAllowCreateItem, filterValue, footer } = this.props;
    return (
      (
        (shouldAllowCreateItem && filterValue) || footer.content
      ) &&
      (focused === length) &&
      this.state.focusedItemIndex !== null
    );
  }

  focusFooter = () => {
    this.setState({
      focusedItemIndex: null,
      isFooterFocused: true,
    });
  }

  focusNextItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    if (filteredItems.length) {
      const length = filteredItems.length - 1;
      const nextFocused = this.getNextFocusable(this.state.focusedItemIndex, length);

      this.focusCorrectElement(nextFocused, 0);
    } else {
      this.focusFooter();
    }
  }

  focusPreviousItem = () => {
    const filteredItems = this.getAllVisibleItems(this.props.items);
    if (filteredItems.length) {
      const length = filteredItems.length - 1;
      const prevFocused = this.getPrevFocusable(this.state.focusedItemIndex, length);

      this.focusCorrectElement(prevFocused, length);
    } else {
      this.focusFooter();
    }
  }

  handleFooterEnter = (event) => {
    const { footer } = this.props;

    if (footer.onActivate) {
      footer.onActivate(event);
    }
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
        if (this.inputNode) {
          this.inputNode.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isSelectOpen) {
          this.focusPreviousItem();
          if (this.inputNode) {
            this.inputNode.focus();
          }
        }
        break;
      case 'Enter':
        if (isSelectOpen) {
          // Only prevent default behavior when the focus is inside search field or on selected tags
          // Default behavior on Enter is needed if there is a focusable element in the footer,
          // for example a link
          // eslint-disable-next-line react/no-find-dom-node
          if (ReactDOM.findDOMNode(this.tagGroup).contains(document.activeElement)) {
            event.preventDefault();
          }
          if (this.state.focusedItemIndex !== null) {
            this.handleItemSelect(
              this.getAllVisibleItems(this.props.items)[this.state.focusedItemIndex], { event }
            );
          } else if (this.props.shouldAllowCreateItem) {
            this.handleItemCreate();
          } else if (this.props.footer.content) {
            this.handleFooterEnter();
          }
        }
        break;
      case 'Backspace':
        if (!this.props.filterValue) {
          this.removeLatestItem();
          this.onOpenChange({ event, isOpen: true });
        }
        break;
      case 'Tab':
        // setTimeout so that the document.activeElement is in sync with the actual focus
        setTimeout(() => {
          // When tab is pressed the focus should go to the footer element if it's present.
          // Fake focus should be neutralized in this case to avoid confusion.
          // Users can return to the input field by pressing cmd + tab (usual tab behavior)
          // If there is no footer, the dropdown should close itself
          if (this.multiSelectContainer.contains(document.activeElement)) {
            this.setState({ focusedItemIndex: null });
          } else {
            this.onOpenChange({ event, isOpen: false });
          }
        });
        break;
      default:
        break;
    }
  }

  filterItems = (items) => {
    const value = this.props.filterValue;
    const trimmedValue = value && value.toLowerCase().trim();
    const selectedValues = this.props.selectedItems.map(item => item.value);
    const unselectedItems = items.filter(item => selectedValues.indexOf(item.value) === -1);

    return trimmedValue ?
      unselectedItems.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
      unselectedItems;
  }

  hasFooter = () => this.props.footer.content || this.props.shouldAllowCreateItem

  renderItems = items => items.map((item, itemIndex) => (
    <Item
      {...item}
      elemBefore={item.elemBefore}
      isFocused={itemIndex === this.state.focusedItemIndex}
      key={itemIndex}
      onActivate={(attrs) => {
        this.handleItemSelect(item, attrs);
      }}
      type="option"
    >
      {item.content}
    </Item>)
  )

  renderNoItemsMessage = () => <NothingWasFound noMatchesFound={this.props.noMatchesFound} />

  renderGroups = (groups) => {
    const renderedGroups = groups.map((group, groupIndex) => {
      const filteredItems = this.filterItems(group.items);
      return filteredItems.length > 0 ?
        <Group
          heading={group.heading}
          key={groupIndex}
        >
          {this.renderItems(filteredItems)}
        </Group>
        : null;
    }).filter(group => !!group);

    // don't show the 'noItems' message when the new item functinality is enabled
    return (renderedGroups.length > 0 || this.props.shouldAllowCreateItem)
      ? renderedGroups : this.renderNoItemsMessage();
  }

  renderFooter = () => {
    const { filterValue: newValue, shouldAllowCreateItem, footer } = this.props;
    if (shouldAllowCreateItem) {
      if (newValue) {
        return (<Footer
          isFocused={this.state.isFooterFocused}
          newLabel={this.props.createNewItemLabel}
          appearance={footer.appearance}
          onClick={this.handleItemCreate}
          shouldHideSeparator={!this.getAllVisibleItems(this.props.items).length}
        >
          { newValue }
        </Footer>);
      }
    } else if (footer.content) {
      return (<Footer
        elemBefore={footer.elemBefore}
        isFocused={this.state.isFooterFocused}
        onClick={this.handleFooterActivate}
        shouldHideSeparator={!this.getAllVisibleItems(this.props.items).length}
        appearance={footer.appearance}
        textColor={footer.textColor}
      >{ footer.content }</Footer>);
    }
    return null;
  }

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
        ref={ref => (this.multiSelectContainer = ref)}
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
          appearance={this.hasFooter() ? 'tall' : 'default'}
          trigger={
            <FieldBaseStateless
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
                      appearance={item.tag ? item.tag.appearance : undefined}
                      elemBefore={item.tag ? item.tag.elemBefore : undefined}
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
            </FieldBaseStateless>
          }
        >
          <div
            className={classNames([{
              [styles.scrolledGroups]: this.hasFooter(),
            }])}
          >
            {this.renderGroups(this.props.items)}
          </div>
          {this.renderFooter()}
        </Droplist>
      </div>
    );
  }
}
