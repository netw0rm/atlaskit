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
    current: validateCurrent,
    total: validateTotal,
    onSetPage: PropTypes.func,
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
