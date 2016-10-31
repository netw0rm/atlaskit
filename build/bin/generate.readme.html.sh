#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

if [ -e "README.md" ]; then
  # add the npm styles to the readme.html
  echo "<html>" \
    "<head><link rel=\"stylesheet\" href=\"https://www.npmjs.com/static/css/index.css\" /></head>" \
    "<body><div class=\"container content\">" \
    "<div class=\"content-column\" >" >> ../../$OUTDIR/$PKG.html

  marky-markdown README.md >> ../../$OUTDIR/$PKG.html

  # need to add a fake sidebar to make the npm styles work properly
  echo "</div><div class=\"sidebar\">" >> ../../$OUTDIR/$PKG.html
  # close off the rest of the html
  echo "</div></div></body></html>" >> ../../$OUTDIR/$PKG.html
fi
