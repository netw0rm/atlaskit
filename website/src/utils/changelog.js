import type { Logs} from '../components/ChangeLog'

export const divvyChangelog = (changelog): Logs => {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return changelog
      .replace(/## /g, `${splitToken}## `)
      .split(splitToken)
      .reduce((all, md) => {
        // This should only allow us to skip the first chunk which is the name, as
        // well as the unreleased section.
        const match = md.match(/\d+\.\d+\.\d+/)
        const version = match ? match[0] : null;
        if (!version) return all;
        return all.concat({
          version,
          md,
        });
      }, []);
}
