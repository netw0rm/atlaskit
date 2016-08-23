import classNames from 'classnames';
import { storiesOf } from '@kadira/storybook';
import storyStyles from 'style!./stories.less';
import { name } from '../package.json';

const containerClass = storyStyles.container;
const boxClass = storyStyles.box;
const boldClass = classNames(boxClass, storyStyles.bold);
const optimisticClass = classNames(boxClass, storyStyles.optimistic);
const combinedClass = classNames(boxClass, storyStyles.combined);
const buttonContainerClass = storyStyles.buttonContainer;


storiesOf(name, module)
  .add('Bold, Optimistic and Combined curves', () => (
    <div className={containerClass}>
      <div className={boldClass}></div>
      <div className={optimisticClass}></div>
      <div className={combinedClass}></div>
      <div className={buttonContainerClass}>
        <input type="button" value="Bold" id="boldButton" />
        <input type="button" value="Optimistic" id="optimisticButton" />
        <input type="button" value="Combined" id="combinedButton" />
      </div>
    </div>
  ));
