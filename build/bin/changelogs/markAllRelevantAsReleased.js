#!/usr/bin/env node
/* eslint-disable no-console */
const findReleaseDetails = require('./findReleaseDetails');
const markAsReleased = require('./markAsReleased');

async function markAllAsReleased() {
  const releaseDetails = await findReleaseDetails();
  await releaseDetails.map(markAsReleased);
  console.log('Completed Updating of readme files');
}

markAllAsReleased();
