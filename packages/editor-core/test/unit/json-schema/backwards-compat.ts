import axios from 'axios';
import { validateSchemaCompatibility } from 'json-schema-diff-validator';
import * as newSchema from '../../../dist/json-schema/v1/full.json';

// TODO: remove this when jest unit tests are supported for TS files
declare var expect: any;

const RED_START = '\u001b[31m';
const RED_END = '\u001b[39m';
const BOLD_START = '\u001b[1m';
const BOLD_END = '\u001b[22m';
const IMPORTANT_MESSAGE_START = `${RED_START}${BOLD_START}`;
const IMPORTANT_MESSAGE_END = `${BOLD_END}${RED_END}`;

async function fetchExistingJSONSchema() {
  const url = 'https://unpkg.com/@atlaskit/editor-core@latest/dist/json-schema/v1/full.json';
  const res = await axios.get(url);

  return res.data;
}

expect.extend({
  toBeBackwardsCompatibleWith(received: any, argument: any) {
    try {
      validateSchemaCompatibility(argument, received);

      return {
        pass: true,
      };
    } catch (ex) {
      return {
        message: () => ex.message,
        pass: false,
      };
    }
  },
});

describe('JSON schema', () => {
  it.skip('should be backwards compatible', async () => {
    const existingSchema = await fetchExistingJSONSchema();

    try {
      expect(newSchema).toBeBackwardsCompatibleWith(existingSchema);
    } catch (ex) {
      throw new Error(
        'JSON schema backwards compatibility test failed. ' +
        `${IMPORTANT_MESSAGE_START}Have you tried rebasing your current branch against target branch?${IMPORTANT_MESSAGE_END}\n` +
        ex.message
      );
    }
  });
});
