import styled from 'styled-components';
import { akColorN30 } from '@atlaskit/util-shared-styles';

interface MentionItemStyleProps {
  selected?: boolean;
}

// tslint:disable:next-line variable-name
export const RowStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 9px 20px;
  position: relative;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

// tslint:disable:next-line variable-name
export const AvatarStyle = styled.span`
  position: relative;
  flex: initial;
  margin-top: -2px;
`;

// tslint:disable:next-line variable-name
export const NameSectionStyle = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 10px;
`;

// tslint:disable:next-line variable-name
export const FullNameStyle = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// tslint:disable:next-line variable-name
export const MentionNameStyle = styled.span`
  color: #747474;
  font-size: 12px;

  margin-top: 2px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// tslint:disable:next-line variable-name
export const InfoSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  & {
    /* Lozenge */
    & > span {
      margin-bottom: 2px;
    }
  }
`;

// tslint:disable:next-line variable-name
export const TimeStyle = styled.div`
  margin-left: 20px;
  flex: none;
  color: #747474;
  font-size: 12px;
`;

// tslint:disable:next-line variable-name
export const MentionItemStyle = styled.div`
  background-color: ${(props: MentionItemStyleProps) => props.selected ? akColorN30 : 'transparent'};
  display: block;
  overflow: hidden;
  list-style-type: none;
  height: 48px;
  line-height: 1.2;
  cursor: pointer;
`;
