#!/usr/bin/env bash

echo 'Start build'

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
    --entry_point=chartEditor \
    --flagfile="bin/common.flags" \
    --define="chartEditor.Editor.VERSION='$PACKAGE_VERSION'"
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

echo 'Build done!'
