/**
 * This class will poll a specified site for a set period to check if it
 * has come up.
 */
class SiteChecker {
  constructor() {
    this.pollInterval = 1000;
  }

  start(progressHandler) {
    this.progress = 0;
    this.interval = setInterval(() => {
      this.checkProgress();

      if (progressHandler) {
        progressHandler(this.progress);
      }
    }, this.pollInterval);
  }

  stop() {
    if (this.interval) {
      clearTimeout(this.interval);
    }
  }

  checkProgress() {
    // TODO: poll site and update progresss
    this.progress = (this.progress + 1) % 100;
    // console.log('polling', this.progress);
  }
}

export default SiteChecker;
