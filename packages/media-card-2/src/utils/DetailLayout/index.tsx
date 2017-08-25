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

export interface DetailLayout {
  title?: ReactNode;
  icon?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export function DetailLayout(props) {
  const {title, icon, subtitle, actions, children} = props;
  return (
    <Wrapper>
      {title
        ? <TitleWrapper>{title}</TitleWrapper>
        : null
      }
      {children}
      {icon || subtitle || actions
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
