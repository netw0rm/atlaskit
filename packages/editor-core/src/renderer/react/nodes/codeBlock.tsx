import * as React from 'react';
import { AkCodeBlock } from '@atlaskit/code';

const identity = (text: string): string => {
  return text;
};

export interface Props {
  language: string;
}

export default function CodeBlock(props, params) {
  const {
    language,
  } = props;

  const codeProps = {
    language,
    text: React.Children.map(params.children, identity).join('')
  };

  return (
    <AkCodeBlock key={params.key} {...codeProps}/>
  );
}
