anychart.onDocumentReady(function() {
  // Create editor instance
  var editor = anychart.editor();

  // console.log(editor.version());

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

  // Render editor to div#container
  editor.render(document.getElementById("container"));

  editor.listen('editorComplete', function() {
    console.log(editor.getJavascript());
  });
});