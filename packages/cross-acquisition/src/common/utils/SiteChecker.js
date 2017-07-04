/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
class SiteChecker {

  SiteChecker() {
    this.pollInterval = 500;
  }

  start() {
    this.interval = setInterval(() => {
    }, this.pollInterval);
  }
}

export default SiteChecker;
