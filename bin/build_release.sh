#!/usr/bin/env bash

sh ./bin/build.sh

cp ./out/anychart-editor.css ./dist/anychart-editor.css
cp ./out/anychart-editor.min.css ./dist/anychart-editor.min.css
cp ./out/anychart-editor.min.js ./dist/anychart-editor.min.js
