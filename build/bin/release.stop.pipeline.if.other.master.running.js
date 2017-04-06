#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

/*
   To debug this file you should be able to change BRANCH_TO_CHECK_FOR_MULTIPLE_BUILDS_FOR to be the
    name of the branch you are working on then call this script from a branch build AFTER running
   yarn. It should then be able to simulate a master build fine.
   (replacing the rest of the build after calling this with `sleep 300` is a good idea too!)
*/

const BRANCH_TO_CHECK_FOR_MULTIPLE_BUILDS_FOR = 'flush-node-buffer-with-warning';
const BUILDS_PER_PAGE = 30;
const BB_USERNAME = process.env.BITBUCKET_USER;
const BB_PASSWORD = process.env.BITBUCKET_PASSWORD;
const CURRENT_BUILD_HASH = process.env.BITBUCKET_COMMIT;
const PIPELINES_ENDPOINT = 'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/pipelines/';
const TIME_TO_WAIT_FOR_LOGS_UPLOAD_MS = 5000;

const axiosRequestConfig = {
  auth: {
    username: BB_USERNAME,
    password: BB_PASSWORD,
  },
  params: {
    pagelen: BUILDS_PER_PAGE,
    // get the most recent builds first
    sort: '-created_on',
    'target.ref_name': BRANCH_TO_CHECK_FOR_MULTIPLE_BUILDS_FOR,
    'target.ref_type': 'BRANCH',
  },
};

// Stops a currently running Pipelines build
// Related documentation
// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/stopPipeline
function stopPipelineBuild(pipelineUUID) {
  const stopPipelinesEndpoint = `${PIPELINES_ENDPOINT}${pipelineUUID}/stopPipeline`;
  console.warn(`Stopping pipline using endpoint ${stopPipelinesEndpoint}`);
  // we'll return the promise and let it be caught outside (first param is just empty form data)
  return axios.post(stopPipelinesEndpoint, {}, {
    auth: {
      username: BB_USERNAME,
      password: BB_PASSWORD,
    },
  });
}

axios.get(PIPELINES_ENDPOINT, axiosRequestConfig)
  .then((response) => {
    const allRunningPipelines = response.data.values;
    const currentPipeline = allRunningPipelines
      .find(job => job.target.commit.hash === CURRENT_BUILD_HASH);
    const olderRunningPipelines = allRunningPipelines
      .filter(job => job.state.name === 'IN_PROGRESS' || job.state.name === 'PENDING')
      .filter(job => new Date(job.created_on) < new Date(currentPipeline.created_on));

    // if there is another master branch running, we should stop our current one
    if (olderRunningPipelines.length !== 0) {
      // Hypothetically, we should only be able to have 1 at a time...
      const olderRunningPipelineURL = `https://bitbucket.org/atlassian/atlaskit/addon/pipelines/home#!/results/${olderRunningPipelines[0].uuid}`;
      console.warn(`Another master branch is already running: ${olderRunningPipelineURL}`);
      console.warn('Stopping this build to let that one finish');
      console.warn('Feel free to re-run this build once that one is done if you like 👌');

      return new Promise((resolve) => {
        // we need to wait a bit so that pipelines takes our logs and uploads them before we stop
        // the build
        setTimeout(() => resolve(), TIME_TO_WAIT_FOR_LOGS_UPLOAD_MS);
      })
      .then(() => stopPipelineBuild(currentPipeline.uuid));
      // We are actually going to let the build continue here as process.exit will return a non-zero
      // return code and we want to leave these as 'stopped', not 'failed'
    }

    console.log('No other master builds seem to be running. Continuing build...');
    return Promise.resolve();
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
/* eslint-enable no-console */
