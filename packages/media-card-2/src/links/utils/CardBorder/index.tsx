import * as React from 'react';
import Icon from '@atlaskit/icon/glyph/link';
import {Border, Header, ImageWrapper, Content} from './styled';

export interface CardBorderProps {
  href?: string;
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
}

export class CardBorder extends React.Component<CardBorderProps, {}> {
  render() {
    const {href, icon, title, children} = this.props;
    return (
      <Border href={href} className="media-card">
        <Header>
          <ImageWrapper>
            {icon
              ? icon
              : <Icon label="link" size="small"/>
            }
          </ImageWrapper>
          {title}
        </Header>
        <Content>
          {children}
        </Content>
      </Border>
    );
  }
}
