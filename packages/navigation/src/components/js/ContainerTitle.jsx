import React, { PureComponent, PropTypes } from 'react';
import DefaultLinkComponent from './DefaultLinkComponent';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleInner from '../styled/ContainerTitleInner';
import ContainerTitleSubText from '../styled/ContainerTitleSubText';
import ContainerTitleText from '../styled/ContainerTitleText';
import ContainerTitleTextWrapper from '../styled/ContainerTitleTextWrapper';

export default class ContainerTitle extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string,
    subText: PropTypes.string,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
  }

  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      href,
      text,
      subText,
      linkComponent: Link,
    } = this.props;

    return (
      <Link href={href}>
        <ContainerTitleInner>
          <ContainerTitleIcon>
            {this.props.icon}
          </ContainerTitleIcon>
          <ContainerTitleTextWrapper>
            <ContainerTitleText>{text}</ContainerTitleText>
            {subText ? <ContainerTitleSubText>{subText}</ContainerTitleSubText> : null}
          </ContainerTitleTextWrapper>
        </ContainerTitleInner>
      </Link>
    );
  }
}
