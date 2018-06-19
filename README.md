[<img src="https://cdn.anychart.com/images/logo-transparent-segoe.png?2" width="234px" alt="AnyChart - Robust JavaScript/HTML5 Chart library for any project">](https://www.anychart.com)

AnyChart Chart Editor
=========

Intuitive and easy to use web application that allows you to create and work with [AnyChart JavaScript Charts](https://www.anychart.com).

## Table of Contents

* [Download and Install](#download-and-install)
* [Getting started](#getting-started)
* [Using](#using)
* [Building](#building)
* [Contacts](#contacts)
* [Links](#links)
* [License](#license)

## Download and install

There are several ways to download/install AnyChart Chart Editor.

#### Direct download

All binaries are located in [dist](https://github.com/AnyChart/chart-editor/tree/master/dist) folder.

#### Using npm

You can install AnyChart Chart Editor using **npm**:

```
npm install anychart-editor
```

## Getting started

To use AnyChart Chart Editor on a web page you should include AnyChart library first:
```html
<!-- anychart -->
<script src="https://cdn.anychart.com/releases/v8/js/anychart-bundle.min.js"></script>

<!-- anychart css -->
<link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" type="text/css" rel="stylesheet">
<link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" type="text/css" rel="stylesheet">

<!-- Include this if you plan to use Maps -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js"></script>
```

If you want to have any theming options on the Theming tab of Visual appearance step of Chart Editor you should include desired themes:
```html
<script src="https://cdn.anychart.com/releases/v8/themes/dark_blue.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/themes/dark_glamour.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/themes/light_glamour.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/themes/coffee.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/themes/monochrome.min.js"></script>
```
 
And at last include Chart Editor's binaries that you can find in a project's [dist](https://github.com/AnyChart/chart-editor/tree/master/dist) folder.
```html
<!-- anychart chart editor -->
<link href="anychart-editor.min.css" type="text/css" rel="stylesheet">
<script src="anychart-editor.min.js"></script>
```

Now you can create Chart Editor instance and render it to dom container. 
```javascript
anychart.onDocumentReady(function() {
  // Create chart editor instance
  var editor = anychart.editor();

  // Render to div#container
  editor.render(document.getElementById("container"));

  // Listen 'complete' event to get result code
  editor.listen('editorComplete', function() {
    console.log(editor.getJavascript());
  });
});
```

The full working example you can find in index.html and index.js from [dist](https://github.com/AnyChart/chart-editor/tree/master/dist) folder.

## Using

#### Render options
Method | Description
--- | ---
*render()* | Renders the component.  If a parent element is supplied, the component's element will be appended to it.  If there is no optional parent element and the element doesn't have a parentNode then it will be appended to the document body.
*decorate()* | Decorates the element for the UI component.
*dialogRender()* | Renders the Chart Editor as modal dialog. To set dialog visible or hidden use *dialogVisible(Boolean)* method.

#### Data
You can pass your data to Chart Editor using user interface of the Prepare Data step. Or you can pass data using data() method:
```javascript
// Pass only data
editor.data([
    {name: 'Jan', val1: 10, price: 20.5, amount: 100},
    {name: 'Feb', val1: 20, price: 30, amount: 200},
    {name: 'Mar', val1: 5, price: 115, amount: 10}
]);

// Pass data and some settings
editor.data({
    data: [
        {name: 'Jan', val1: 10, price: 20.5, amount: 100},
        {name: 'Feb', val1: 20, price: 30, amount: 200},
        {name: 'Mar', val1: 5, price: 115, amount: 10}
    ],
    chartType: 'column',
    fieldNames: {
      name: 'Month',
      val1: 'Value 1'
    },
    title: 'Awesome Chart'
});

// You also may want to disable Prepare Data step 
editor.steps().prepareData(false);
```


#### Result code
After all you can get the result code of a chart that you have configured. You can get code by these methods:

Method | Description | Arguments
--- | --- | ---
*getJavascript()* | Returns JS code string that creates a configured chart. | opt_outputOptions - object with configuration options.
*getJson()* | Returns configured chart in JSON representation. | -
*getXml()* | Returns configured chart in XML representation. | -
 

## Building
If you want to build your own binaries from project's source code first you should install remaining dependencies using following command
```
npm install
```

To compile chart editor from source run following command
```
./bin/build_release.sh
```
In this case you can find builded binaries in a *dist* folder.

Or you can build by build.sh script. In this case you can find builded binaries in a *out* folder.
Build everything
```bash
./bin/build.sh

#! or using npm
npm run build
```


Build only javascript binary
```bash
./bin/build.sh compile

#! or using npm 
npm run compile
```


Build only css
```bash
./bin/build.sh css

#! or using npm 
npm run css
```

Build only dependencies 
```bash
./bin/build.sh deps

#! or using npm 
npm run deps
```

## Contacts

* Web: [www.anychart.com](https://www.anychart.com)
* Email: [contact@anychart.com](mailto:contact@anychart.com)
* Twitter: [anychart](https://twitter.com/anychart)
* Facebook: [AnyCharts](https://www.facebook.com/AnyCharts)
* LinkedIn: [anychart](https://www.linkedin.com/company/anychart)

## Links

* [Report Issues](https://github.com/AnyChart/AnyChart-React/issues)
* [AnyChart Website](https://www.anychart.com)
* [Download AnyChart](https://www.anychart.com/download/)
* [AnyChart Licensing](https://www.anychart.com/buy/)
* [AnyChart Support](https://www.anychart.com/support/)
* [AnyChart Playground](https://playground.anychart.com)
* [AnyChart Documentation](https://docs.anychart.com)
* [AnyChart API Reference](https://api.anychart.com)
* [AnyChart Sample Solutions](https://www.anychart.com/solutions/)
* [AnyChart Integrations](https://www.anychart.com/integrations/)

## License

[© AnyChart.com - JavaScript charts](https://www.anychart.com). All rights reserved.