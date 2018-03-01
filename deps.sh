#!/usr/bin/env bash

echo 'Start build deps'

python node_modules/google-closure-library/closure/bin/build/depswriter.py \
--root_with_prefix=chart-editor ..\src \
--output_file=out/deps.js

echo 'Build done!'