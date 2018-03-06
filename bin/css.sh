#!/usr/bin/env bash

echo '-- css'

lessc css/chartEditor.less out/chart-editor.css
lessc css/chartEditor.less out/chart-editor.min.css --clean-css="--s1 --advanced --compatibility=ie8"