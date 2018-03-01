#!/usr/bin/env bash

java -jar node_modules/google-closure-compiler/compiler.jar \
--js_output_file="out/chart-editor.min.js" \
--js="node_modules/google-closure-library/closure/goog/**.js" \
--js="src/**.js" \
--compilation_level=ADVANCED_OPTIMIZATIONS \
--entry_point=chartEditor \
--flagfile="bin/common.flags" \
--isolation_mode IIFE
