#!/usr/bin/env bash

echo 'Start build'

if [ -z $1 ] || [ $1 = "compile" ]
then
    sh ./bin/compile.sh
else
    if [ $1 = "all" ]
    then
        sh ./bin/compile.sh
    fi
    if [ $1 = "deps" ] || [ $1 = "all" ]
    then
        sh ./bin/deps.sh
    fi
    if [ $1 = "css" ] || [ $1 = "all" ]
    then
        sh ./bin/css.sh
    fi
fi

echo 'Build done!'