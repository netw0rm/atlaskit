import * as React from 'react';
import { PureComponent } from 'react';

import {
  CategorySelectorStyle,
  CategoryStyle,
} from './styles';
import { AvailableCategories, CategoryDescription, OnCategory } from '../../types';

import EmojiActivityIcon from '@atlaskit/icon/glyph/emoji/activity';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import EmojiFlagsIcon from '@atlaskit/icon/glyph/emoji/flags';
import EmojiFoodIcon from '@atlaskit/icon/glyph/emoji/food';
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent';
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature';
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects';
import EmojiPeopleIcon from '@atlaskit/icon/glyph/emoji/people';
import EmojiSymbolsIcon from '@atlaskit/icon/glyph/emoji/symbols';
import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel';

export interface Props {
  categories?: CategoryDescription[];
  activeCategoryId?: string;
  onCategorySelected?: OnCategory;
  availableCategories?: AvailableCategories;
}

export default class CategorySelector extends PureComponent<Props, undefined> {
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
        id: 'ACTIVITY',
        name: 'Activity',
        icon: EmojiActivityIcon,
      },
      {
        id: 'PLACES',
        name: 'Travel & Places',
        icon: EmojiTravelIcon,
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
    const { onCategorySelected } = this.props;
    if (onCategorySelected) {
      onCategorySelected(categoryId);
    }
  }

  render() {
    const { categories, availableCategories } = this.props;
    let categoriesSection;

    if (categories) {
      categoriesSection = (
        <ul>
          {categories.map((category) => {
            const disable = !availableCategories || !availableCategories[category.id];
            let onClick;

            if (!disable) {
              // disable click handling
              onClick = () => this.onClick(category.id);
            }

            // tslint:disable-next-line:variable-name
            const Icon = category.icon;

            return (
              <li key={category.name}>
                <CategoryStyle
                  key={category.name}
                  disable={disable}
                  active={category.id === this.props.activeCategoryId}
                  onClick={onClick}
                  title={category.name}
                >
                  <Icon
                    label={category.name}
                  />
                </CategoryStyle>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <CategorySelectorStyle>
        {categoriesSection}
      </CategorySelectorStyle>
    );
  }
}
