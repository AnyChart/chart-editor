#!/usr/bin/env bash

echo 'Start build css'

lessc css/chartEditor.less out/chart-editor.css
lessc css/chartEditor.less out/chart-editor.min.css --clean-css="--s1 --advanced --compatibility=ie8"

echo 'Build done!'