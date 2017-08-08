import React, { PureComponent } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import { AkContainerTitle } from '../../../src/index';
import ContainerTitleDropdownWrapper from '../styled/ContainerTitleDropdownWrapper';
import ContainerTitleDropdownIcon from '../styled/ContainerTitleDropdownIcon';
import { ReactElement } from '../../types';

type Props = {|
  /** Content to use as a custom presence indicator. Accepts any React element.
  For best results, it is recommended to use square content with height and
  width of 100%. */
  icon: ReactElement,
  /** Text to appear as the title. This is placed at the top and bolded. */
  text: string,
  /** Text to appear below the title. */
  subText?: string,
  /** The destination of the title if clicked. If no href is provided, the
  title will not be a link. */
  href?: string,
  /** A component to be used as a link. By Default this is an anchor. when a href
  is passed to it, and otherwise is a button. */
  linkComponent?: () => mixed,
|}

export default class ContainerTitleDropdown extends PureComponent {
  props: Props

  render() {
    const {
      icon,
      text,
      subText,
      href,
      linkComponent,
    } = this.props;

    return (
      <ContainerTitleDropdownWrapper tabIndex="0">
        <AkContainerTitle
          icon={icon}
          text={text}
          subText={subText}
          href={href}
          linkComponent={linkComponent}
        />
        {
          /* this should be removed when droplist.js remove its display inline-flex style*/
          text && !icon ? (
            <ContainerTitleDropdownIcon>
              <ExpandIcon size="medium" label={text} />
            </ContainerTitleDropdownIcon>
          ) : null
        }
      </ContainerTitleDropdownWrapper>
    );
  }
}
