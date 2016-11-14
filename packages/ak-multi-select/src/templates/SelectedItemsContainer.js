import { vdom } from 'skatejs';
import Tag from 'ak-tag';
import TagGroup from 'ak-tag-group';

import FilterFieldContainer from './FilterFieldContainer';

/* eslint-disable react/prop-types */
export default props => (<TagGroup style={{ flex: '1 auto' }}>
  {props.items.map(el => (<Tag
    text={el.textContent}
    remove-button-text="Remove from the selection"
    data-value={el.value}
    key={el.value}
  />))}
  <FilterFieldContainer />
</TagGroup>);
