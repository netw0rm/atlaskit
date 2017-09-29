import * as React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function Heading(props: { level: HeadingLevel } & React.Props<any>, params) {
  const { level } = props;
  const children = params.children;
  switch (level) {
    case 1:
      return <h1 key={props.key}>{children}</h1>;
    case 2:
      return <h2 key={props.key}>{children}</h2>;
    case 3:
      return <h3 key={props.key}>{children}</h3>;
    case 4:
      return <h4 key={props.key}>{children}</h4>;
    case 5:
      return <h5 key={props.key}>{children}</h5>;
    case 6:
      return <h6 key={props.key}>{children}</h6>;
  }
}
