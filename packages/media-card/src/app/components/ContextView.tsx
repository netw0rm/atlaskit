/* tslint:disable:variable-name */
import * as React from 'react';
import {AppCardIcon as IconModel} from '../model';
import {Wrapper, IconImage, Text, LinkText} from '../styled/ContextView';

export interface ContextViewProps {
  text: string;
  icon?: IconModel;
  link?: string;
  inverse?: boolean;
  onContextClick?: () => void;
}

export class ContextView extends React.Component<ContextViewProps, {}> {

  handleLinkClick = (event) => {
    const {onContextClick} = this.props;

    // allow the user to click the link but prevent the event bubling up and being handled by the
    // card onClick event
    event.stopPropagation();

    if (onContextClick) {

      // let onClick handle the event instead of navigating to the link
      event.preventDefault();

      onContextClick();
    }

  }

  renderIcon() {
    const {icon} = this.props;
    if (!icon) {
      return null;
    }
    return <IconImage src={icon.url} alt={icon.label}/>;
  }

  renderText() {
    const {text, link, inverse} = this.props;
    if (!link) {
      return <Text inverse={inverse} onClick={this.handleLinkClick}>{text}</Text>;
    }
    return <LinkText href={link} inverse={inverse} onClick={this.handleLinkClick}>{text}</LinkText>;
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
