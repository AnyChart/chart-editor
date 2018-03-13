editor = null;
model = null;

function openEditor() {
  if (!editor) {
    editor = chartEditor.editor();

     // editor.steps().prepareData(false);

//     // editor['renderAsDialog']();
//     // editor['steps']()['visualAppearance']()['contextMenu'](false);
//
//     editor.data({
//       'setId': 'qlikData',
//       // "name": "Linear Gauge",
//       "chartType": "column",
//       //"chartType": "gauges.circular",
//       // "chartType": "column-stacked-percent",
//       // "defaults": [
//       //   {"key": [["chart"], ["settings"], "legend().enabled()"], "value": true},
//       //   // {"key": [["chart"], ["settings"], "range(0)"], "value": {
//       //   //   "from": 0,
//       //   //   "to": 5
//       //   // }},
//       // ],
//       "fieldNames": {
//         dimension0: 'City',
//         Measure0: 'Field Name'
//       },
//       "data": [
//         {bane: 'rising', open: 5, high: 15, low: 3, close: 10},
//         {bane: 'falling', open: 10, high: 15, low: 3, close: 5},
//       ]
//     });

//     // editor.data({
//     //     "chartType": "bar",
//     //     "data": [['a', 123123.123,35321.543], ['b', 323123.345,65321.67567]]
//     // });
//
//     // editor.deserializeModel('{"dataSettings":{"active":"cqlikData","field":"name","mappings":[[{"ctor":"column","mapping":{"value":"val1"},"id":"goog_1076503193"},{"ctor":"column","mapping":{"value":"val2"},"id":"goog_1076503194"},{"ctor":"column","mapping":{"value":"val3"},"id":"goog_1076503195"}]]},"anychart":{},"chart":{"type":"column","seriesType":"column","settings":{"getSeries(\'goog_1076503193\').name()":"One","getSeries(\'goog_1076503194\').name()":"","xAxis(0).enabled()":true,"yAxis(0).enabled()":true,"legend().enabled()":true},"typeKey":"column"},"outputSettings":null,"editorSettings":{}}');
//     // editor.forceSeriesNames(true);
//     // editor.visible(true);

    editor.render(document.getElementById("container"));
//
//     // editorюsteps()visualAppearance()contextMenu(false);
//     // if (model) editor.deserializeModel(model);
//
    editor.listen('complete', function(evt) {
      // model = editor['serializeModel']();
      console.log(editor.getChartAsJsCode({
        wrapper: false,

        // Убирает данные из результата
        //addData: false,

        // Убирает гео данные из результа
        // addGeoData: false
      }));
//
//       // var code = editor['getChartAsJsCode']({
//       //   'minify': true,
//       //   'addData': false,
//       //   'wrapper': '',
//       //   'container': ''
//       // });
//       //
//       // closeEditor();
    });
  }
}

// function closeEditor() {
//   if (editor) {
//     editor['visible'](false);
//     editor['removeAllListeners']();
//     editor['dispose']();
//     editor = null;
//   }
// }
//
anychart.onDocumentReady(function() {

  // editor.setDefaults([
  //   {key: [['anychart'], 'licenseKey()'], value: 'Irina-d43a427a-1985961f'}
  // ]);

  // editor.data({
  //   // 'chartType': 'heatMap',
  //   'data': [
  //   ["1986", 3.6, 2.3, 2.8, 11.5],
  //   ["1987", 7.1, 4.0, 4.1, 14.1],
  //   ["1988", 8.5, 6.2, 5.1, 17.5],
  //   ["1989", 9.2, 11.8, 6.5, 18.9],
  //   ["1990", 10.1, 13.0, 12.5, 20.8],
  //   ["1991", 11.6, 13.9, 18.0, 22.9],
  //   ["1992", 16.4, 18.0, 21.0, 25.2],
  //   ["1993", 18.0, 23.3, 20.3, 27.0],
  //   ["1994", 13.2, 24.7, 19.2, 26.5],
  //   ["1995", 12.0, 18.0, 14.4, 25.3],
  //   ["1996", 3.2, 15.1, 9.2, 23.4],
  //   ["1997", 4.1, 11.3, 5.9, 19.5],
  //   ["1998", 6.3, 14.2, 5.2, 17.8],
  //   ["1999", 9.4, 13.7, 4.7, 16.2],
  //   ["2000", 11.5, 9.9, 4.2, 15.4],
  //   ["2001", 13.5, 12.1, 1.2, 14.0],
  //   ["2002", 14.8, 13.5, 5.4, 12.5],
  //   ["2003", 16.6, 15.1, 6.3, 10.8],
  //   ["2004", 18.1, 17.9, 8.9, 8.9],
  //   ["2005", 17.0, 18.9, 10.1, 8.0],
  //   ["2006", 16.6, 20.3, 11.5, 6.2],
  //   ["2007", 14.1, 20.7, 12.2, 5.1],
  //   ["2008", 15.7, 21.6, 10, 3.7],
  //   ["2009", 12.0, 22.5, 8.9, 1.5]
  // ]});


  //editor.render(document.getElementById("container"));

  openEditor();

  // document.getElementById("button").addEventListener("click", function() {
  //   openEditor();
  // })
});