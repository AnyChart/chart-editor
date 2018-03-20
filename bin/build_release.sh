#!/usr/bin/env bash

sh ./bin/build.sh all

cp ./out/chart-editor.css ./dist/chart-editor.css
cp ./out/chart-editor.min.css ./dist/chart-editor.min.css
cp ./out/chart-editor.min.js ./dist/chart-editor.min.js
