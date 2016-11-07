#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)
OUTFILE="$OUTDIR/$PKG.html"

if [ -e "README.md" ]; then
  # add the npm styles to the readme.html
  echo "<html>" \
    "<head><link rel=\"stylesheet\" href=\"https://www.npmjs.com/static/css/index.css\" /></head>" \
    "<body><div class=\"container content\">" \
    "<div class=\"content-column\" >" >> $OUTFILE

  marky-markdown README.md >> $OUTFILE

  # need to add a fake sidebar to make the npm styles work properly
  echo "</div><div class=\"sidebar\">" >> $OUTFILE
  # close off the rest of the html
  echo "</div></div></body></html>" >> $OUTFILE
fi
