anychart.onDocumentReady(function(){
  var editor = anychart.editor();

  editor.localization({
    'inputLocale': 'es-py',
    'outputLocale': 'ru-ru',
    'inputDateTimeFormat': 'dd MMMM yyyy',
    'outputDateTimeFormat': 'yyyy dd mm'
  });

  editor.steps().prepareData(false);

  editor.data({
    "data":
        // [
        //   {x: '2014 5 6', value: 511.53},
        //   {x: '2014 6 6', value: 900},
        //   {x: '2014 7 6', value: 700},
        //   {x: '2014 8 6', value: 380},
        //   {x: '2014 9 6', value: 830}
        // ]
        [
          {x: '6 jun 2014', value: 511.53},
          {x: '6 jul 2014', value: 900},
          {x: '6 ag 2014', value: 700},
          {x: '6 sept 2014', value: 380},
          {x: '6 oct 2014', value: 830}
        ]
  });

  editor.render(document.getElementById("container"));
});