import * as React from 'react';

export interface Props {
  children?: any;
  href: string;
  target?: string;
}

export default function Link(props: Props & React.Props<any>) {
  const {
    href,
    target = '_blank',
  } = props;

  const anchorProps: any = {
    href,
    target,
    title: href,
  };

  return (
    <a {...anchorProps}>{props.children}</a>
  );
}
