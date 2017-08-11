/* tslint:disable: variable-name */
import * as React from 'react';

export interface ViewerErrorProps {
  error?: string;
}

export const ViewerError = (props: ViewerErrorProps) => {
  const {error} = props;
  return (
    <div>
      <h1>Error!</h1>
      {error}
    </div>
  );
};
