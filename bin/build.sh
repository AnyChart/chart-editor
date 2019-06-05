#!/usr/bin/env bash



if [ -z $1 ] || [ $1 = "css" ]
then
    echo 'Start building CSS.'
    sh ./bin/css.sh
    sh ./bin/css.sh qlik
    sh ./bin/css.sh tableau
    sh ./bin/css.sh freeboard
    echo 'Finish building CSS.'
fi

if [ -z $1 ] || [ $1 = "deps" ]
then
    echo 'Start building deps.'
    python node_modules/google-closure-library/closure/bin/build/depswriter.py \
    --root_with_prefix="src ../../../../src" \
    --output_file="out/deps.js"
    echo 'Finish building deps.'
fi

