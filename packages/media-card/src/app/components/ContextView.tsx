/* tslint:disable:variable-name */
import * as React from 'react';
import {AppCardIcon as IconModel} from '../model';
import {Wrapper, IconImage, Text, LinkText} from '../styled/ContextView';

export interface ContextViewProps {
  text: string;
  icon?: IconModel;
  href?: string;
  inverse?: boolean;
}

export class ContextView extends React.Component<ContextViewProps, {}> {

  renderIcon() {
    const {icon} = this.props;
    if (!icon) {
      return null;
    }
    return <IconImage src={icon.url} alt={icon.label}/>;
  }

  renderText() {
    const {text, href, inverse} = this.props;
    if (!href) {
      return <Text inverse={inverse}>{text}</Text>;
    }
    return <LinkText href={href} inverse={inverse}>{text}</LinkText>;
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        {this.renderIcon()}
        {this.renderText()}
      </Wrapper>
    );
  }

}
