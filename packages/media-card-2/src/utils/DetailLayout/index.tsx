import * as React from 'react';
import {ReactNode} from 'react';
import {
  Wrapper,
  TitleWrapper,
  BottomWrapper,
  IconWrapper,
  SubtitleWrapper,
  ActionsWrapper
} from './styled';

export interface DetailLayoutProps {
  title?: ReactNode;
  icon?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export interface DetailLayoutState {
}

export class DetailLayout extends React.Component<DetailLayoutProps, DetailLayoutState> {

  get hasTop(): boolean {
    const {title} = this.props;
    return Boolean(title);
  }

  get hasMiddle(): boolean {
    const {children} = this.props;
    return Boolean(children);
  }

  get hasBottom(): boolean {
    const {icon, subtitle, actions} = this.props;
    return Boolean(icon || subtitle || actions);
  }

  get valign(): 'top' | 'bottom' | undefined {

    if (this.hasTop && !this.hasMiddle && !this.hasBottom) {
      return 'top';
    }

    if (this.hasBottom && !this.hasMiddle && !this.hasTop) {
      return 'bottom';
    }

    return;
  }

  render() {
    const {title, icon, subtitle, actions, children} = this.props;
    return (
      <Wrapper valign={this.valign}>
        {title
          ? <TitleWrapper>{title}</TitleWrapper>
          : null
        }
        {children}
        {this.hasBottom
          ? (
            <BottomWrapper>
              {icon
                ? <IconWrapper>{icon}</IconWrapper>
                : null
              }
              {subtitle
                ? <SubtitleWrapper>{subtitle}</SubtitleWrapper>
                : null
              }
              {actions
                ? <ActionsWrapper>{actions}</ActionsWrapper>
                : null
              }
            </BottomWrapper>
          )
          : null
        }
      </Wrapper>
    );
  }

}
