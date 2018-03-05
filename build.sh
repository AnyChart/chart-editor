#!/usr/bin/env bash

echo 'Start build'

if [ -z $1 ] || [ $1 = "compile" ]
then
    echo "Just compile"
    sh compile.sh
else
    if [ $1 = "all" ]
    then
        sh compile.sh
    fi
    if [ $1 = "deps" ] || [ $1 = "all" ]
    then
        sh deps.sh
    fi
    if [ $1 = "css" ] || [ $1 = "all" ]
    then
        sh css.sh
    fi
fi

echo 'Build done!'