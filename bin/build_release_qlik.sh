#!/usr/bin/env bash

if [[ -z $1 ]] || [[ $1 = "basic" ]]
then
    sh ./bin/buildBasic.sh
    cp ./out/anychart-editor.min.css ~/Documents/Qlik/Sense/Extensions/anychart-qlik-basic/lib/anychart-editor.min.css
    cp ./out/anychart-editor.min.js ~/Documents/Qlik/Sense/Extensions/anychart-qlik-basic/lib/anychart-editor.min.js
    echo ''
fi

if [[ -z $1 ]] || [[ $1 = "chart" ]]
then
    sh ./bin/buildChart.sh
    cp ./out/anychart-editor.min.css ~/Documents/Qlik/Sense/Extensions/anychart-qlik-charts/lib/anychart-editor.min.css
    cp ./out/anychart-editor.min.js ~/Documents/Qlik/Sense/Extensions/anychart-qlik-charts/lib/anychart-editor.min.js
    echo ''
fi

if [[ -z $1 ]] || [[ $1 = "stock" ]]
then
    sh ./bin/buildStock.sh
    cp ./out/anychart-editor.min.css ~/Documents/Qlik/Sense/Extensions/anychart-qlik-stock-charts/lib/anychart-editor.min.css
    cp ./out/anychart-editor.min.js ~/Documents/Qlik/Sense/Extensions/anychart-qlik-stock-charts/lib/anychart-editor.min.js
    echo ''
fi

if [[ -z $1 ]] || [[ $1 = "map" ]]
then
    sh ./bin/buildMap.sh
    cp ./out/anychart-editor.min.css ~/Documents/Qlik/Sense/Extensions/anychart-qlik-geo-maps/lib/anychart-editor.min.css
    cp ./out/anychart-editor.min.js ~/Documents/Qlik/Sense/Extensions/anychart-qlik-geo-maps/lib/anychart-editor.min.js
    echo ''
fi

if [[ -z $1 ]] || [[ $1 = "gantt" ]]
then
    sh ./bin/buildGantt.sh
    cp ./out/anychart-editor.min.css ~/Documents/Qlik/Sense/Extensions/anychart-qlik-gantt-chart/lib/anychart-editor.min.css
    cp ./out/anychart-editor.min.js ~/Documents/Qlik/Sense/Extensions/anychart-qlik-gantt-chart/lib/anychart-editor.min.js
    echo ''
fi
