#!/usr/bin/env bash

echo 'Start building bundle.'

if [ -z $1 ]
then
    sh ./bin/solution.sh
else
    if [ $1 == 'all' ]
    then
        sh ./bin/solution.sh
        sh ./bin/solution.sh qlik
        sh ./bin/solution.sh tableau
        sh ./bin/solution.sh freeboard
    else
        sh ./bin/solution.sh $1
    fi
fi

echo 'Bundle build done!'