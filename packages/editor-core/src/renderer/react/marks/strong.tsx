import * as React from 'react';

export default function Strong(props, params) {
  return <strong key={params.key} >{params.children}</strong>;
}
