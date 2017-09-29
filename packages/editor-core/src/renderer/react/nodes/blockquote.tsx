import * as React from 'react';
export default function Blockquote(props: React.Props<any>, params) { return <blockquote key={params.key}>{params.children}</blockquote>; }
