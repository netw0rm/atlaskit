import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!./less/HorizontalNavigation.less';

export default class HorizontalNavigation extends PureComponent {
  static propTypes = {
    logo: PropTypes.node,
    title: PropTypes.string,
    linkItems: PropTypes.arrayOf(PropTypes.string),
  };

  static simpleDropdownItems = [
    {
      heading: 'Heading',
      items: [
        {
          content: 'Some text',
          href: '//atlassian.com',
          target: '_blank',
        },
        {
          content: 'Some text 2',
          href: '//atlassian.com',
          target: '_blank',
          isDisabled: true,
        },
        {
          content: 'Some text 4',
          href: '//atlassian.com',
          target: '_blank',
        },
      ],
    },
  ];

  render() {
    const {
      logo,
      title,
      linkItems,
    } = this.props;

    return (<div className={classNames(styles.horizontalNavigation)}>
      <div className={styles.primaryContainer}>
        {logo ? <span className={styles.logo}>{logo}</span> : null}
        <div className={styles.primaryTitle}>{title}</div>
        <ul className={styles.linkItems}>
          {linkItems.map(linkItem =>
            <li>
              <a href={linkItem.href} className={linkItem.selected && styles.current}>
                {linkItem.text}
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className={styles.secondaryContainer} />
    </div>);
  }
}
