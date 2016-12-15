import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from 'style!../styles/spinner.less';

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

export default class Spinner extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className={styles.pfSpinner} role="progressbar">
        {bladeClasses.map(blade => (
          <div
            key={blade}
            className={
              classNames({
                [styles.pfSpinnerBlades]: true,
                [styles[blade]]: true,
              })
            }
          >
            <div />
          </div>
        ))}
      </div>
    );
  }
}
