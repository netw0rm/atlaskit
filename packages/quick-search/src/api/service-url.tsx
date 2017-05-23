export function serviceUrl() {
  return `https://pf-ppl-directory-service${hostSuffix()}/graphql`;
}

function hostSuffix(): string {
  const hostname = window.location.hostname;

  // Local dev
  if (hostname === 'local.atlassian.io' || hostname === 'localhost' || window.location.port === '3001') {
    return `.internal.uswest2.staging.atlassian.io`;
  }

  if (
    (/atlassian.net$/).test(hostname) ||
    (/jira.com$/).test(hostname)
  ) {
    return `.atlassian.io`;
  }

  if ((/staging.atlassian.io$/).test(hostname)) {
    return `.internal.useast.staging.atlassian.io`;
  }

  if ((/domain.dev.atlassian.io$/).test(hostname)) {
    return `.internal.useast.staging.atlassian.io`;
  }

  if ((/atlassian.io$/).test(hostname)) {
    return `.atlassian.io`;
  }

  return '';
}
