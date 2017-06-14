import * as React from 'react';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import {Metadata} from '../model';
import {AvatarStack} from './AvatarStack';
import {Wrapper, Widget, Title, Text, IconImage} from '../styled/MetaView';

export interface MetaViewProps {
  meta: Metadata[];
  inverse?: boolean;
  contentMaxWidth: number;
}

export class MetaView extends React.Component<MetaViewProps, {}> {

  renderWidget(data: Metadata) {
    const {inverse} = this.props;
    const {title, text, icon, badge, lozenge, users} = data;
    const attrs: JSX.Element[] = [];

    if (title) {
      attrs.push(<Title key="title" inverse={inverse}>{title}:</Title>);
    }

    if (icon) {
      attrs.push(<IconImage key="icon" src={icon.src} alt={icon.label}/>);
    }

    if (users) {
      attrs.push(
        <AvatarStack key="avatar-group" size="small" max={4} avatars={users.map(({src, label}) => ({src, label}))}/>
      );
    }

    if (badge) {
      attrs.push(<Badge key="badge" appearance={badge.appearance || 'default'} value={badge.value} max={badge.max}/>);
    }

    if (lozenge) {
      attrs.push(<Lozenge key="lozenge" appearance={lozenge.appearance || 'default'}>{lozenge.text}</Lozenge>);
    }

    if (text) {
      attrs.push(<Text key="text">{text}</Text>);
    }

    if (attrs.length === 0) {
      console.warn(`SmartCardView: A metadata item doesn't contain any supported attributes: ${JSON.stringify(attrs, null, 2)}`);
      return null;
    }

    return attrs;
  }

  render(): JSX.Element {
    const {meta, contentMaxWidth} = this.props;
    return (
      <Wrapper contentMaxWidth={contentMaxWidth}>
        {meta.map((data, index) => (
          <Widget key={index}> {/* no unique ID so can't avoid using the index for the key here */}
            {this.renderWidget(data)}
          </Widget>
        ))}
      </Wrapper>
    );
  }

}
