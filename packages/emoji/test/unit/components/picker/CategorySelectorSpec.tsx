import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import * as styles from '../../../../src/components/picker/styles';
import CategorySelector, { Props } from '../../../../src/components/picker/CategorySelector';

const toAvailableCategories = categories => (
  categories.reduce((availableCategories, category) => {
    availableCategories[category.id] = true;
    return availableCategories;
  }, {})
);

const defaultCategories = CategorySelector.defaultProps.categories;

const setupComponent = (props?: Props): ReactWrapper<any, any> => mount(
  <CategorySelector
    availableCategories={toAvailableCategories(defaultCategories)}
    {...props}
  />
);

describe('<CategorySelector />', () => {
  it('all categories visible', () => {
    const component = setupComponent();
    const categoryButtons = component.find('button');
    expect(categoryButtons).toHaveLength(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      expect(categoryButtons.at(i).prop('title')).toBe(category.name);
    });
  });

  it('only available categories enabled', () => {
    const enabledCat1 = defaultCategories[0];
    const enabledCat2 = defaultCategories[3];
    const component = setupComponent({
      availableCategories: toAvailableCategories([enabledCat1, enabledCat2]),
    });
    const categoryButtons = component.find('button');
    expect(categoryButtons).toHaveLength(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      const button = categoryButtons.at(i);
      expect(button.prop('title')).toBe(category.name);
      const shouldBeEnabled = i === 0 || i === 3;
      expect(button.hasClass(styles.disable)).toBe(!shouldBeEnabled);
    });
  });

  it('onCategorySelected called which clicking a category', () => {
    let selectedCategoryId;
    const component = setupComponent({
      onCategorySelected: (id) => { selectedCategoryId = id; },
    });
    const categoryButtons = component.find('button');
    categoryButtons.at(4).simulate('click');
    expect(selectedCategoryId).toBe(defaultCategories[4].id);
  });

  it('active category highlighted', () => {
    const activeCategoryId = defaultCategories[3].id;
    const component = setupComponent({
      activeCategoryId,
    });
    const categoryButtons = component.find('button');
    expect(categoryButtons).toHaveLength(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      const button = categoryButtons.at(i);
      expect(button.prop('title')).toBe(category.name);
      const shouldBeActive = i === 3;
      expect(button.hasClass(styles.active)).toBe(shouldBeActive);
    });
  });
});
