import React, { PureComponent, PropTypes } from 'react';
import Button from '@atlaskit/button';

import {
  validateCurrent,
  validateTotal,
  i18nShape,
  defaultI18n,
} from './internal/props';
import { Container, ButtonActive } from './styled';

export default class Pagination extends PureComponent {
  static propTypes = {
    /** The page that is currently selected. */
    current: validateCurrent,
    /** The number of pages to display. */
    total: validateTotal,
    /** Function to call when the page is changed. It is called with the number
    of the page clicked on. */
    onSetPage: PropTypes.func,
    /** Object that sets the values for the previous and next buttons. It should
    have the properties 'prev' and 'next', which should be strings. Defaults to
    'Prev' and 'Next' */
    i18n: i18nShape,
  }

  static defaultProps = {
    current: 1,
    total: 1,
    onSetPage() {},
    i18n: defaultI18n,
  }

  onSetPage = page => () => this.props.onSetPage(page)

  render() {
    const { total, current, i18n } = this.props;
    const prevLabel = i18n.prev;
    const prevIsDisabled = current === 1;
    const prevOnClick = this.onSetPage(current - 1);

    const nextLabel = i18n.next;
    const nextIsDisabled = current === total;
    const nextOnClick = this.onSetPage(current + 1);

    return !total ? null : (
      <Container>
        <Button
          appearance="link"
          isDisabled={prevIsDisabled}
          onClick={prevOnClick}
        >
          { prevLabel }
        </Button>

        { [...Array(total)].map((_, i) => {
          const pageNum = i + 1;
          const isDisabled = pageNum === current;
          const Element = isDisabled ? ButtonActive : Button;
          return (
            <Element
              isDisabled={isDisabled}
              key={pageNum}
              appearance="link"
              onClick={this.onSetPage(pageNum)}
            >
              {pageNum}
            </Element>
          );
        })}

        <Button
          appearance="link"
          isDisabled={nextIsDisabled}
          onClick={nextOnClick}
        >
          { nextLabel }
        </Button>
      </Container>
    );
  }
}
