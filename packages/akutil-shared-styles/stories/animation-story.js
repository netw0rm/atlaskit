import { storiesOf } from '@kadira/storybook';
import storyStyles from 'style!./stories.less';
import { name } from '../package.json';

const boxClass = storyStyles.locals.box;

storiesOf(name, module)
  .add('Bold, Optimistic and Combined curves', () => (
    <div className={boxClass}>
      Something something
    </div>
  ));
