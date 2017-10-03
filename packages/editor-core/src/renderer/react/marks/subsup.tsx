import * as React from 'react';

export type SubSupType = 'sub' | 'sup';

export interface Props {
  type: SubSupType;
}

const isSub = (type: SubSupType): type is 'sub' => {
  return type === 'sub';
};

export default function SubSup(props: Props & React.Props<any>) {
  if (isSub(props.type)) {
    return <sub>{props.children}</sub>;
  }

  return <sup>{props.children}</sup>;
}
