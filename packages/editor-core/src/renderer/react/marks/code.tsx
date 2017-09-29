import * as React from 'react';
import { AkCode } from '@atlaskit/code';

export default function Code(props, params) {
  const { children } = params;
  if (typeof children === 'string') {
    /**
     * It could be used like
     * <Code>This is the text</Code>
     */
    return <AkCode key={params.key} text={children as string} />;
  }

  if (Array.isArray(children) && typeof children[0] === 'string') {
    /**
     * The React Serializer would generically wrap all content in an array,
     * so it would actually looks like
     * <Code>{['This is the text']}</Code>
     */
    return <AkCode key={params.key} text={children[0] as string} />;
  }

  return <AkCode key={params.key} text={''} />;
}
