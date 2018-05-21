goog.provide('chartEditor.exportTabs.SourceCode');

goog.require('chartEditor.exportTabs.Scripts');
goog.require('goog.Timer');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.exportTabs.Scripts}
 */
chartEditor.exportTabs.SourceCode = function(model, opt_domHelper) {
  chartEditor.exportTabs.SourceCode.base(this, 'constructor', model, 'Source Code', opt_domHelper);
};
goog.inherits(chartEditor.exportTabs.SourceCode, chartEditor.exportTabs.Scripts);


/** @inheritDoc */
chartEditor.exportTabs.SourceCode.prototype.enterDocument = function() {
  chartEditor.exportTabs.SourceCode.base(this, 'enterDocument');

  this.dispatchEvent({
    type: chartEditor.events.EventType.WAIT,
    wait: true
  });
};


/** @inheritDoc */
chartEditor.exportTabs.SourceCode.prototype.onChartDraw = function(evt) {
  chartEditor.exportTabs.SourceCode.base(this, 'onChartDraw', evt);

  var self = this;
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var scripts = this.getScripts();

  var resultCode =
      '<!doctype html>\n' +
      '<html>\n' +
      '<head>\n' +
      '    <meta charset="utf-8">\n\n'+
      '    <!-- anychart -->\n' +
      '    <script src="' + scripts.bundle + '"></script>\n';

  // Include theme if needed
  if (scripts.theme)
    resultCode +=
        '    <!-- anychart theme -->\n' +
        '    <script src="' + scripts.theme + '"></script>\n';

  resultCode +=
      '    <!-- anychart css -->\n' +
      '    <link href="' + scripts.css_ui + '" type="text/css" rel="stylesheet">\n' +
      '    <link href="' + scripts.css_fonts + '" type="text/css" rel="stylesheet">\n\n';

  // Include proj4js for maps
  if (scripts.geoData) {
    resultCode +=
        '    <!-- anychart geodata -->\n' +
        '    <script src="' + scripts.geoData + '"></script>\n';

    resultCode +=
        '    <!-- proj4js for anymap -->\n' +
        '    <script src="' + scripts.proj4js + '"></script>\n\n';
  }

  resultCode +=
      '    <style>\n' +
      '        html, body, #container {\n' +
      '            width: 100%;\n' +
      '            height: 100%;\n' +
      '            margin: 0;\n' +
      '            padding: 0;\n' +
      '        }\n' +
      '    </style>\n' +
      '</head>\n' +
      '<body>\n' +
      '    <div id="container"></div>\n' +
      '    <script type="text/javascript">\n';

  var chartCode = model.indentCode(model.getChartAsJsCode({
    'containerId': 'container',
    'wrapper': 'document-ready',
    'addData': false,
    'addGeoData': false
  }), 8);

  var dataCode = model.indentCode(model.getDataCode(), 8);

  resultCode += chartCode + '\n' + dataCode + '\n';

  resultCode +=
      '    </script>\n' +
      '</body>\n' +
      '</html>';

  var dom = this.getDomHelper();
  if (this.preEl)
    dom.removeNode(this.preEl);

  this.codeEl = dom.createDom(goog.dom.TagName.CODE, 'language-html', resultCode);
  this.preEl = dom.createDom(goog.dom.TagName.PRE, null, this.codeEl);
  dom.appendChild(this.getContentElement(), this.preEl);

  var chartContainer = dom.getElementByClass('anychart-ce-chart-container');
  if (chartContainer) {
    var h = goog.style.getSize(chartContainer).height;
    goog.style.setHeight(this.preEl, h);
  }

  var wrapperEl = dom.getAncestorByClass( this.preEl, 'anychart-ce-step-tab-content');
  if (wrapperEl) {
    goog.style.setStyle(wrapperEl, 'overflow-y', 'hidden');
  }

  var prism = goog.dom.getWindow()['Prism'];
  if (prism) {
    prism['highlightElement'](this.codeEl);
  }

  goog.Timer.callOnce(function(){
    self.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: false
    });
  }, 10);
};


/** @inheritDoc */
chartEditor.exportTabs.SourceCode.prototype.disposeInternal = function() {
  this.preEl = this.codeEl = null;

  chartEditor.exportTabs.SourceCode.base(this, 'disposeInternal');
};