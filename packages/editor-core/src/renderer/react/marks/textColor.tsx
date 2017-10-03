import * as React from 'react';

export interface Props {
  color: string;
}

export default function TextColor(props: Props & React.Props<any>) { return <span style={{color: props.color}}>{props.children}</span>; }
