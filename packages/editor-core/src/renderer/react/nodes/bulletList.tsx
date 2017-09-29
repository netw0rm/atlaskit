import * as React from 'react';
export default function BulletList(props, params) { return <ul key={params.key}>{params.children}</ul>; }
