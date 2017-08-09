import { css } from 'styled-components';

export default css`
/* IE11 doesn't support <template> elements which shouldn't be displayed */
template {
  display: none;
}

/* IE11 and some older browsers don't support these elements yet and treat them as display: inline; */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

/* Suppress the ugly broken image styling in Firefox */
@-moz-document url-prefix() {
  img {
    font-size: 0;
  }
  img:-moz-broken {
    font-size: inherit;
  }
}
`;
