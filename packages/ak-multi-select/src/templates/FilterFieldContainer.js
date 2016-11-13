import { vdom } from 'skatejs';
import shadowStyles from '../shadow.less';

/* eslint-disable react/prop-types */
export default () => (<div className={shadowStyles.locals.selectPlace}>
  <input type="text" className={shadowStyles.locals.selectPlaceInput} />
</div>);
