#!/usr/bin/env bash

if [ -z $1 ]
then
    echo "  Compiling vanilla chart editor."
    LOCATION="out/anychart-editor.min.js"
else
    echo "  Compiling chart editor for $1."
    LOCATION="out/$1/anychart-editor.min.js"
fi

PACKAGE_VERSION=$(cat package.json \
      | grep version \
      | head -1 \
      | awk -F: '{ print $2 }' \
      | sed 's/[",]//g' \
      | tr -d '[[:space:]]')

java -jar node_modules/google-closure-compiler/compiler.jar \
--js_output_file="$LOCATION" \
--js="node_modules/google-closure-library/closure/goog/**.js" \
--js="src/**.js" \
--entry_point=bundleEditor \
--flagfile="bin/common.flags" \
--define="chartEditor.model.Base.SOLUTION='$1'" \
--define="chartEditor.editor.Base.VERSION='$PACKAGE_VERSION'"

DATE=`date +%Y-%m-%d`

HEADER=$'/**
 * AnyChart is lightweight robust charting library with great API and Docs,
 * that works with your stack and has tons of chart types and features.
 *
 * Chart Editor is an out-of-the-box chart generator and editor with intuitive user interface
 * that can be easily embedded into any web service or web view based desktop application.
 * AnyChart Chart Editor allows you to leverage the entire power of AnyChart with minimal integration effort.
 *
 * Version: '${PACKAGE_VERSION}' ('${DATE}')
 * License: https://www.anychart.com/buy/
 * Contact: sales@anychart.com
 * Copyright: AnyChart.com 2018. All rights reserved.
 */'

echo "$HEADER" | cat - "$LOCATION" > temp && mv temp "$LOCATION"

sh ./bin/css.sh $1

if [ -z $1 ]
then
    echo "  Compilation of vanilla chart editor complete: $LOCATION"
else
    echo "  Compilation of chart editor for $1 complete: $LOCATION"
fi

echo ""



