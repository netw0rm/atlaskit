import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/style.less';
import CategorySelector from '../src/internal/picker/CategorySelector';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

const toAvailableCategories = categories => (
  categories.reduce((availableCategories, category) => {
    availableCategories[category.id] = true;
    return availableCategories;
  }, {})
);

const defaultCategories = CategorySelector.defaultProps.categories;

const setupComponent = props => mount(
  <CategorySelector
    availableCategories={toAvailableCategories(defaultCategories)}
    {...props}
  />
);

describe('<CategorySelector />', () => {
  it('all categories visible', () => {
    const component = setupComponent();
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      expect(categoryButtons.at(i).key(), `Button #${i}`).to.equal(category.name);
    });
  });

  it('only available categories enabled', () => {
    const enabledCat1 = defaultCategories[0];
    const enabledCat2 = defaultCategories[3];
    const component = setupComponent({
      availableCategories: toAvailableCategories([enabledCat1, enabledCat2]),
    });
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      const button = categoryButtons.at(i);
      expect(button.key(), `Button #${i}`).to.equal(category.name);
      const shouldBeEnabled = i === 0 || i === 3;
      expect(button.hasClass(styles.disable), `Button #${i} enabled=${shouldBeEnabled}`).to.equal(!shouldBeEnabled);
    });
  });

  it('onCategorySelected called which clicking a category', () => {
    let selectedCategoryId;
    const component = setupComponent({
      onCategorySelected: (id) => { selectedCategoryId = id; },
    });
    const categoryButtons = component.find('button');
    categoryButtons.at(4).simulate('click');
    expect(selectedCategoryId, 'Category was selected').to.equal(defaultCategories[4].id);
  });

  it('active category highlighted', () => {
    const activeCategoryId = defaultCategories[3].id;
    const component = setupComponent({
      activeCategoryId,
    });
    const categoryButtons = component.find('button');
    expect(categoryButtons.length, 'Number of categories').to.be.equal(defaultCategories.length);
    defaultCategories.forEach((category, i) => {
      const button = categoryButtons.at(i);
      expect(button.key(), `Button #${i}`).to.equal(category.name);
      const shouldBeActive = i === 3;
      expect(button.hasClass(styles.active), `Button #${i} active=${shouldBeActive}`).to.equal(shouldBeActive);
    });
  });
});
