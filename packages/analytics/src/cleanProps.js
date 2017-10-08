/*
cleanProps removes props added by the withAnalytics HOC from an object
*/
function cleanProps(props: Object) {
  /* eslint-disable no-unused-vars */
  const {
    analyticsId,
    analyticsData,
    analyticsVersion,
    fireAnalyticsEvent,
    firePrivateAnalyticsEvent,
    ...cleanedProps
  } = props;
  /* eslint-enable no-unused-vars */
  return cleanedProps;
}

export default cleanProps;
