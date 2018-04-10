anychart.onDocumentReady(function() {
  // Create editor instance
  var editor = anychart.editor();

  // Render editor to div#container
  editor.render(document.getElementById("container"));

  // Add your data from code
  // editor.data({
  //   data: [
  //     {name: 'Jan', val1: 10, price: 20.5, amount: 100},
  //     {name: 'Feb', val1: 20, price: 30, amount: 200},
  //     {name: 'Mar', val1: 5, price: 115, amount: 10}
  //   ],
  //   chartType: 'column',
  //   fieldNames: {
  //     name: 'Month',
  //     val1: 'Value 1'
  //   },
  //   title: 'Awesome Chart'
  // });

  editor.listen('complete', function() {
    console.log(editor.getChartAsJsCode());
  });
});