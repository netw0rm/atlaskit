#!/usr/bin/env node

const axios = require('axios');

const BB_USERNAME = process.env.BITBUCKET_USER;
const BB_PASSWORD = process.env.BITBUCKET_PASSWORD;
const pipelinesEndpoint = 'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit/pipelines/';

axios.get(pipelinesEndpoint, { username: BB_USERNAME, password: BB_PASSWORD })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
