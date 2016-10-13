import { vdom } from 'skatejs';
import classNames from 'classnames';
import shadowStyles from './pf-profilecard-resourced-shadow.less';
const styles = shadowStyles.locals;

const bladeClasses = [
  'pfSpinnerBlade1',
  'pfSpinnerBlade2',
  'pfSpinnerBlade3',
  'pfSpinnerBlade4',
  'pfSpinnerBlade5',
  'pfSpinnerBlade6',
  'pfSpinnerBlade7',
  'pfSpinnerBlade8',
  'pfSpinnerBlade9',
  'pfSpinnerBlade10',
  'pfSpinnerBlade11',
];

export default () => (
  <div className={styles.pfSpinner} role="progressbar">
    {bladeClasses.map((blade) => (
      <div
        className={
          classNames({
            [styles.pfSpinnerBlades]: true,
            [styles[blade]]: true,
          })
        }
      ><div></div></div>
    ))}
  </div>
);
