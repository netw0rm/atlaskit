import * as React from 'react';
export default function Doc(props, params) { return <div key={params.key}>{params.children}</div>; }
