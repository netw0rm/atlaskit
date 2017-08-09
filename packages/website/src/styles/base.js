import { css } from 'styled-components';
import {
  codeFontFamily,
  colors,
  gridSize,
  fontSize,
  fontFamily,
  math,
} from '@atlaskit/theme';
import { h100, h300, h400, h500, h600, h700, h800 } from './typography';

export default ({ theme }) => css`
body,
html {
  height: 100%;
  width: 100%;
}
body {
  background-color: ${colors.background({ theme })};
  color: ${colors.text({ theme })};
  font-family: ${fontFamily({ theme })};
  font-size: ${fontSize({ theme })}px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42857142857143;
  letter-spacing: -0.005em;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  text-decoration-skip: ink;
}


/* Default margins */
p,
ul,
ol,
dl,
h1,
h2,
h3,
h4,
h5,
h6,
blockquote,
pre,
form,
table {
  margin: ${math.multiply(gridSize, 1.5)}px 0 0 0};
}


/* Links */

a {
  color: ${colors.link({ theme })};
  text-decoration: none;
}
a:hover {
  color: ${colors.linkHover({ theme })};
  text-decoration: underline;
}
a:active {
  color: ${colors.linkActive({ theme })};
}
a:focus {
  outline: 2px solid ${colors.linkOutline({ theme })};
  outline-offset: 2px;
}


/* Headings */
h1 {
  ${h800}
}
h2 {
  ${h700}
}
h3 {
  ${h600}
}
h4 {
  ${h500}
}
h5 {
  ${h400}
}
h6 {
  ${h300}
}



/* Lists */
ul,
ol,
dl {
  padding-left: ${math.multiply(gridSize({ theme }), 5)}px;

  [dir="rtl"]& {
    padding-left: 0;
    padding-right: ${math.multiply(gridSize({ theme }), 5)}px;
  }
}
dd,
dd + dt,
li + li {
  margin-top: ${math.divide(gridSize({ theme }), 2)}px;
}
ul,
ol {
  ul,
  ol {
    &:not(:first-child) {
      margin-top: ${math.divide(gridSize({ theme }), 2)}px;
    }
  }
}


/* remove top margin for first element */
p:first-child,
ul:first-child,
ol:first-child,
dl:first-child,
h1:first-child,
h2:first-child,
h3:first-child,
h4:first-child,
h5:first-child,
h6:first-child,
blockquote:first-child,
pre:first-child,
form:first-child,
table:first-child, {
  margin-top: 0;
}


/* Quotes */
blockquote,
q {
  color: inherit;
}
blockquote {
  border: none;
  padding-left: ${math.multiply(gridSize, 5)}px;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: ${math.multiply(gridSize, 5)}px;
  }
}
blockquote::before,
q:before {
  content: "\u201c";
}
blockquote::after,
q::after {
  content: "\u201d";
}
blockquote::before {
  float: left; // to keep the quotes left of any child elements like blockquote > p
  margin-left: -1em;
  text-align: right;
  width: 1em;

  [dir="rtl"] & {
    float: right;
    margin-right: -1em;
    text-align: left;
  }
}
blockquote > :last-child {
  display: inline-block; // so the quotes added via pseudos follow it immediately.
}


/* Other typographical elements */
small {
  ${h100}
}
code,
kbd {
  font-family: ${codeFontFamily};
}
var,
address,
dfn,
cite {
  font-style: italic;
}
abbr {
  border-bottom: 1px #ccc dotted;
  cursor: help;
}
`;
