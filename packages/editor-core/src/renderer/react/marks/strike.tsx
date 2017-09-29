import * as React from 'react';

export default function Strike(props, params) {
  return <span key={params.key} style={{textDecoration: 'line-through'}}>{params.children}</span>;
}
