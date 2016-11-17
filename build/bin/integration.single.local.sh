#!/usr/bin/env bash
set -e

CHALK="`npm bin`/chalk"

PKG="$1"
# shift removes first command line arg (the package name)
shift || true

# Symlinks are absolute by default, which won't work in docker,
# as the absolute path is different, so we change them in to relative links
pushd "./packages" > /dev/null
for l in $(find . -lname '/*'); do
    $CHALK --no-stdin -t "{blue Changing symlink for $l into a relative one}"
    LINKED_PACKAGE=$(basename $l)
    rm "$l"
    ln -sf "../../$LINKED_PACKAGE" "$l"
done
popd > /dev/null

SCOPE="$PKG" docker-compose -f docker-compose-integration.yml up $@
