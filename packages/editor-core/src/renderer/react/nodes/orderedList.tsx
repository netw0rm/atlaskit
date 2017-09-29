import * as React from 'react';
export default function OrderedList(props: { start?: number } & React.Props<any>, params) {
  return <ol key={params.key} start={props.start}>{params.children}</ol>;
}
