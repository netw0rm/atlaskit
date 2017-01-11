import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../../style.less';
import EmojiActivityIcon from 'ak-icon/glyph/emoji/activity';
import EmojiAtlassianIcon from 'ak-icon/glyph/emoji/atlassian';
import EmojiCustomIcon from 'ak-icon/glyph/emoji/custom';
import EmojiFlagsIcon from 'ak-icon/glyph/emoji/flags';
import EmojiFoodIcon from 'ak-icon/glyph/emoji/food';
import EmojiFrequentIcon from 'ak-icon/glyph/emoji/frequent';
import EmojiNatureIcon from 'ak-icon/glyph/emoji/nature';
import EmojiObjectsIcon from 'ak-icon/glyph/emoji/objects';
import EmojiPeopleIcon from 'ak-icon/glyph/emoji/people';
import EmojiSymbolsIcon from 'ak-icon/glyph/emoji/symbols';
import EmojiTravelIcon from 'ak-icon/glyph/emoji/travel';

// eslint-disable-next-line react/prefer-stateless-function
export default class CategorySelector extends PureComponent {
  static propTypes = {
    categories: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    activeCategoryId: PropTypes.string,
    onCategorySelected: PropTypes.func,
    availableCategories: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    categories: [
      {
        id: 'FREQUENT',
        name: 'Frequent',
        icon: EmojiFrequentIcon,
      },
      {
        id: 'PEOPLE',
        name: 'People',
        icon: EmojiPeopleIcon,
      },
      {
        id: 'NATURE',
        name: 'Nature',
        icon: EmojiNatureIcon,
      },
      {
        id: 'FOODS',
        name: 'Food & Drink',
        icon: EmojiFoodIcon,
      },
      {
        id: 'PLACES',
        name: 'Travel & Places',
        icon: EmojiTravelIcon,
      },
      {
        id: 'ACTIVITY',
        name: 'Activity',
        icon: EmojiActivityIcon,
      },
      {
        id: 'OBJECTS',
        name: 'Objects',
        icon: EmojiObjectsIcon,
      },
      {
        id: 'SYMBOLS',
        name: 'Symbols',
        icon: EmojiSymbolsIcon,
      },
      {
        id: 'FLAGS',
        name: 'Flags',
        icon: EmojiFlagsIcon,
      },
      {
        id: 'ATLASSIAN',
        name: 'Atlassian',
        icon: EmojiAtlassianIcon,
      },
      {
        id: 'CUSTOM',
        name: 'Custom',
        icon: EmojiCustomIcon,
      },
    ],
    onCategorySelected: () => {},
  };

  onClick = (categoryId) => {
    this.props.onCategorySelected(categoryId);
  };

  render() {
    return (
      <div className={classNames([styles.categorySelector])}>
        <ul>
          {this.props.categories.map((category) => {
            const categoryClasses = [styles.category];
            if (category.id === this.props.activeCategoryId) {
              categoryClasses.push(styles.active);
            }

            if (!this.props.availableCategories[category.id]) {
              categoryClasses.push(styles.disable);
            }

            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className={classNames(categoryClasses)}
                onClick={() => this.onClick(category.id)}
              >
                <Icon
                  label={category.name}
                />
              </button>
            );
          })}
        </ul>
      </div>
    );
  }
}
