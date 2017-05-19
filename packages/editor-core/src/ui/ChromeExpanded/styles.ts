import { akEditorSubtleAccent, akEditorMentionSelected } from '../../styles';
import { akBorderRadius, akGridSize } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

export const createNestedListStyles = (): any => {
  const styles = {};
  const listStyleTypes = ['decimal', 'lower-alpha', 'lower-roman'];
  let key = '';
  for (let i = 0; i < 9; i++) {
    styles[`${key} > li`] = {
      listStyleType: listStyleTypes[i % 3]
    };
    key += ' > li > ol';
  }
  return styles;
};

export const Container = styled.div`
  background-color: white;
  border: 1px solid ${akEditorSubtleAccent};
  box-sizing: border-box;
  border-radius: ${akBorderRadius};

  /* Create a stacking context, so that the toolbar can be placed above the content */
  position: relative;

  &:focus {
    outline: none;
  }
`;

export const Content = styled.div`
  position: relative;

  & .ie11 {
    overflow: visible;
    word-wrap: break-word;
  }

  .ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    outline: none;
    padding: 12px 20px;
  }

  .ProseMirror ul, .ProseMirror ol {
    padding-left: 30px;
    cursor: default;
  }

  .ProseMirror blockquote {
    padding-left: 1em;
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
    /* Dont do weird stuff with marker clicks */
    pointer-events: none;

    > p:not(:first-child) {
      margin: 4px 0 0 0;
    }
  }
  .ProseMirror ol {
    ${createNestedListStyles()}
  }

  .ProseMirror li > * {
    pointer-events: auto
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-selectednode {
    outline: none;
  }

  .ProseMirror-selectednode:empty {
    outline: 2px solid #8cf;
  }

  .ProseMirror-selectednode .ak-mention {
    background: ${akEditorMentionSelected};
  }

  /* Make sure li selections wrap around markers */
  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }
`;

export const Footer = styled.div`
  font-size: 14px;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const FooterActions = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const IconButton = styled.div`
  cursor: pointer;
  font-size: inherit;
  background: none;
  border: none;
  padding: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

export const Toolbar = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  padding-left: ${akGridSize};
  padding-right: ${akGridSize};
  position: relative;

  & > * {
    align-items: center;
    display: flex;
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const SecondaryToolbar = styled.div`
  align-items: center;
  display: flex;
`;
