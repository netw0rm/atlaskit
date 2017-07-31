import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import { defaultCategories } from '../../../../src/constants';
import * as styles from '../../../../src/components/picker/styles';
import CategorySelector, { Props, CategoryDescriptionMap } from '../../../../src/components/picker/CategorySelector';

const setupComponent = (props?: Props): ReactWrapper<any, any> => mount(
  <CategorySelector {...props} />
);

describe('<CategorySelector />', () => {
  it('all categories visible', () => {
    const component = setupComponent();
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((categoryId, i) => {
      expect(categoryButtons.at(i).prop('title'), `Button #${i}`).to.equal(CategoryDescriptionMap[categoryId].name);
    });
  });

  it('all categories disabled if flag is set', () => {
    const component = setupComponent({ disableCategories: true });
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((categoryId, i) => {
      const button = categoryButtons.at(i);
      expect(button.prop('title'), `Button #${i}`).to.equal(CategoryDescriptionMap[categoryId].name);
      expect(button.hasClass(styles.disable), `Button #${i} is disabled`).to.equal(true);
    });
  });

  it('onCategorySelected called which clicking a category', () => {
    let selectedCategoryId;
    const component = setupComponent({
      onCategorySelected: (id) => { selectedCategoryId = id; },
    });
    const categoryButtons = component.find('button');
    categoryButtons.at(4).simulate('click');
    expect(selectedCategoryId, 'Category was selected').to.equal(defaultCategories[4]);
  });

  it('active category highlighted', () => {
    const activeCategoryId = defaultCategories[3];
    const component = setupComponent({
      activeCategoryId,
    });
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((categoryId, i) => {
      const button = categoryButtons.at(i);
      expect(button.prop('title'), `Button #${i}`).to.equal(CategoryDescriptionMap[categoryId].name);
      const shouldBeActive = i === 3;
      expect(button.hasClass(styles.active), `Button #${i} active=${shouldBeActive}`).to.equal(shouldBeActive);
    });
  });
});
