import * as React from 'react';
export default function Paragraph(props, params) { return <p key={params.key}>{params.children}</p>; }
