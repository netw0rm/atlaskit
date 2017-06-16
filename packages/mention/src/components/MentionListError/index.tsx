import * as React from 'react';
import { Component } from 'react';
import { MentionListErrorStyle } from './styles';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import { HttpError } from '../../api/MentionResource';

export interface Props {
  error?: Error;
}

const defaultErrorMessage = 'Something went wrong';

export default class MentionListError extends Component<Props, {}> {

  constructor(props) {
    super(props);
  }

  /**
   * Translate the supplied Error into a message suitable for display in the MentionList.
   *
   * @param error the error to be displayed
   */
  private static prepareError(error: Error | undefined): string {
    if (error instanceof HttpError) {
      let httpError = error as HttpError;

      if (httpError.statusCode === 401) {
        return 'Try logging in again.';
      }

      if (httpError.statusCode === 403) {
        return 'Not permitted.';
      }
    }

    return defaultErrorMessage;
  }

  render() {
    const { error } = this.props;

    return <MentionListErrorStyle>
      <div><EditorWarningIcon label="whoops" size="xlarge"/></div>
      <div>{MentionListError.prepareError(error)}</div>
    </MentionListErrorStyle>;
  }
}

