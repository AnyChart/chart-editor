#!/usr/bin/env bash

echo '-- deps'

python node_modules/google-closure-library/closure/bin/build/depswriter.py \
--root_with_prefix="src ../../../../src" \
--output_file="out/deps.js"