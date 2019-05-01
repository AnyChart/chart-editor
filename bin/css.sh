#!/usr/bin/env bash

if [ -z $1 ]
then
    echo "    Compiling vanilla chart editor CSS."
    LOCATION="out/anychart-editor.min.css"
else
    echo "    Compiling chart editor CSS for $1."
    LOCATION="out/$1/anychart-editor.min.css"
fi

if [ -z $1 ]
then
    lessc css/chartEditor.less out/anychart-editor.css
    lessc css/chartEditor.less "$LOCATION" --clean-css="--s1 --advanced --compatibility=ie8"
    echo "    Compilation of vanilla chart editor CSS complete: $LOCATION"
else
    lessc css/chartEditor."$1".less out/"$1"/anychart-editor.css
    lessc css/chartEditor."$1".less "$LOCATION" --clean-css="--s1 --advanced --compatibility=ie8"
    echo "    Compilation of chart editor CSS for $1 complete: $LOCATION"
fi