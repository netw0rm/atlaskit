export async function waitUntil(predicate: () => boolean, timeout = 100, maxRetries = 10): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const check = (retry: number) => {
      if (retry > 0) {
        if (predicate()) {
          resolve();
        }
        else {
          setTimeout(check, timeout, retry - 1);
        }
      } else {
        reject('timed out');
      }
    };

    check(maxRetries);
  });
}
