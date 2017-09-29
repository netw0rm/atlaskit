import * as React from 'react';

export interface Props {
  color: string;
}

export default function TextColor(props, params)  {
  const { color } = props;
  return <span key={params.key} style={{color}}>{params.children}</span>;
}
