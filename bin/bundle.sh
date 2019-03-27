#!/usr/bin/env bash

echo 'Start building bundle'

if [ -z $1 ] || [ $1 = "compile" ]
then
    echo "  Compiling minified js"
    PACKAGE_VERSION=$(cat package.json \
      | grep version \
      | head -1 \
      | awk -F: '{ print $2 }' \
      | sed 's/[",]//g' \
      | tr -d '[[:space:]]')

    java -jar node_modules/google-closure-compiler/compiler.jar \
    --js_output_file="out/anychart-editor.min.js" \
    --js="node_modules/google-closure-library/closure/goog/**.js" \
    --js="src/**.js" \
    --entry_point=bundleEditor \
    --flagfile="bin/common.flags" \
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

    echo "$HEADER" | cat - out/anychart-editor.min.js > temp && mv temp out/anychart-editor.min.js
fi

if [ -z $1 ] || [ $1 = "deps" ]
then
    echo '  Building deps'
    python node_modules/google-closure-library/closure/bin/build/depswriter.py \
    --root_with_prefix="src ../../../../src" \
    --output_file="out/deps.js"
fi

if [ -z $1 ] || [ $1 = "css" ]
then
    echo '  Building css'
    lessc css/chartEditor.less out/anychart-editor.css
    lessc css/chartEditor.less out/anychart-editor.min.css --clean-css="--s1 --advanced --compatibility=ie8"
fi

echo 'Bundle build done!'