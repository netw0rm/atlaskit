import * as React from 'react';

export default function Em(props, params) {
  return <em key={params.key}>{params.children}</em>;
}
