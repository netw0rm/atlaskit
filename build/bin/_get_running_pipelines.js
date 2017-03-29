#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

const BUILDS_PER_PAGE = 30;
const BB_USERNAME = 'luke_batchelor';
const BB_PASSWORD = 'Z4WW4uKPVF3UGJXrSeZS';
// const BB_USERNAME = process.env.BITBUCKET_USER;
// const BB_PASSWORD = process.env.BITBUCKET_PASSWORD;
const CURRENT_BUILD_HASH = process.env.BITBUCKET_COMMIT;
const pipelinesEndpoint = 'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/pipelines/';

const axiosRequestConfig = {
  auth: {
    username: BB_USERNAME,
    password: BB_PASSWORD,
  },
  params: {
    pagelen: BUILDS_PER_PAGE,
    // get the most recent builds first
    sort: '-created_on',
    'target.ref_name': 'AK-2002-only-allow-one-master-at-a-time',
    'target.ref_type': 'BRANCH',
  },
};

function getPipelinesResultURL(pipelineUUID) {
  return `https://bitbucket.org/atlassian/atlaskit/addon/pipelines/home#!/results/${pipelineUUID}`;
}

// Stops a currently running Pipelines build
// Related documentation
// https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/pipelines/%7Bpipeline_uuid%7D/stopPipeline
function stopPipelineBuild(pipelineUUID) {
  // we'll strip the braces from the uuid
  const safeUUID = encodeURI(pipelineUUID);
  const stopPipelinesEndpoint = `${pipelinesEndpoint}${safeUUID}/stopPipeline`;
  console.log(`Stopping pipline using endpoint ${stopPipelinesEndpoint}`);
  // we'll return the promise and let it be caught outside
  return axios.post(stopPipelinesEndpoint, {
    auth: {
      username: BB_USERNAME,
      password: BB_PASSWORD,
    },
  });
}

axios.get(pipelinesEndpoint, axiosRequestConfig)
  .then((response) => {
    const allRunningPipelines = response.data.values;
    const currentPipeline = allRunningPipelines
      .find(job => job.target.commit.hash === CURRENT_BUILD_HASH);
    const olderRunningPipelines = allRunningPipelines
      .filter(job => job.state.name === 'IN_PROGRESS' || job.state.name === 'PENDING')
      .filter(job => new Date(job.created_on) < new Date(currentPipeline.created_on));

    console.log(`Current Build Hash: ${CURRENT_BUILD_HASH}`);
    console.log(`Current pipeline Hash: ${currentPipeline.target.commit.hash}`);
    console.log(`Current pipelines UUID: ${currentPipeline.uuid}`);

    // if there is another master branch running, we should stop our current one
    if (olderRunningPipelines.length !== 0) {
      // Hypothetically, we should only be able to have 1 at a time...
      const runningPipelineURL = getPipelinesResultURL(olderRunningPipelines[0].uuid);
      console.log(`Another master branch is already running: ${runningPipelineURL}`);
      console.log('Stopping this build to let that one finish');
      console.log('Feel free to re-run this build once that one is done if you like');
      console.log('For debugging purposes: ');
      console.log(JSON.stringify(olderRunningPipelines[0]));

      return stopPipelineBuild(currentPipeline.uuid);
      // We are actually going to let the build continue here as process.exit will return a non-zero
      // return code and we want to leave these as 'stopped', not 'failed'
    }

    console.log('No other master builds seem to be running. Continuing build...');
    return Promise.resolve();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
/* eslint-enable no-console */
