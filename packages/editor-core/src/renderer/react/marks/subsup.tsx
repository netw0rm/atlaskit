import * as React from 'react';

export type SubSupType = 'sub' | 'sup';

export interface Props {
  type: SubSupType;
}

const isSub = (type: SubSupType): type is 'sub' => {
  return type === 'sub';
};

export default function SubSup(props, params) {
  if (isSub(props.type)) {
    return <sub key={params.key}>{params.children}</sub>;
  }

  return <sup key={params.key}>{params.children}</sup>;
}
