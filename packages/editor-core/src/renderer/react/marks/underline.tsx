import * as React from 'react';

export default function Underline(props, params) {
  return <u key={params.key}>{params.children}</u>;
}
