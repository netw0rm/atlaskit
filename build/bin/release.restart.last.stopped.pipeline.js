#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

/*
   This script queries pipelines and checks the most recent master* builds. If the most recent one
   was "stopped" (not failed or running), then we tell pipelines to restart that pipeline.

   This script should be called at the very END of a master* build so that stopped builds will still
   get run after the last build finishes.
*/

const BUILDS_PER_PAGE = 30;
const BRANCH_TO_CHECK_FOR_STOPPED_BUILDS_FOR = process.env.BITBUCKET_BRANCH;
const BB_USERNAME = process.env.BITBUCKET_USER;
const BB_PASSWORD = process.env.BITBUCKET_PASSWORD;
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
    'target.ref_name': BRANCH_TO_CHECK_FOR_STOPPED_BUILDS_FOR,
    'target.ref_type': 'BRANCH',
  },
};

axios.get(pipelinesEndpoint, axiosRequestConfig)
  .then((response) => {
    const allRunningPipelines = response.data.values;

    // we have a list of pipelines sorted by creation date. At this point we just need to get the
    // latest one and:
    //   if it is stopped: restart it
    //   if it is failed (should be suuuuper rare): restart it
    //   if it is pending: we can safely exit (it will pick up all other stopped builds)
    //   if it pipeline is running:
    //    - we are either looking at ourselves (we can safely exit)
    //    - or we are looking at a new build which is going to pick up the work (we can safely exit)
    const mostRecentPipeline = allRunningPipelines[0];
    const pipelineState = mostRecentPipeline.state.name;

    if (pipelineState === 'STOPPED' || pipelineState === 'FAILED') {
      console.log('There is a stopped or failed pipeline created after this one.');
      console.log('Restarting it now.');
      const postData = {
        target: {
          ref_name: BRANCH_TO_CHECK_FOR_STOPPED_BUILDS_FOR,
          ref_type: 'branch',
          type: 'pipeline_ref_target',
        },
      };
      return axios.post(pipelinesEndpoint, postData, {
        auth: {
          username: BB_USERNAME,
          password: BB_PASSWORD,
        },
      });
    }
    return Promise.resolve();
  })
  .then((response) => {
    if (response) {
      console.log(response);
    }
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
/* eslint-enable no-console */
