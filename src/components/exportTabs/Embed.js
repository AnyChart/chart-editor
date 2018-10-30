goog.provide('chartEditor.exportTabs.Embed');

goog.require('chartEditor.exportTabs.Scripts');
goog.require('goog.ui.Button');
goog.require('goog.ui.FormPost');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.exportTabs.Scripts}
 */
chartEditor.exportTabs.Embed = function(model, opt_domHelper) {
  chartEditor.exportTabs.Embed.base(this, 'constructor', model, 'Save To Cloud', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.EMBED;
};
goog.inherits(chartEditor.exportTabs.Embed, chartEditor.exportTabs.Scripts);


/** @inheritDoc */
chartEditor.exportTabs.Embed.prototype.createDom = function() {
  chartEditor.exportTabs.Embed.base(this, 'createDom');

  var element = this.getContentElement();

  var text = goog.dom.createDom(
      goog.dom.TagName.P,
      'anychart-connected-data-sets-intro-p',
      goog.dom.constHtmlToNode(goog.string.Const.from(
          '<p>You can save the chart you have just configured into <a href="https://playground.anychart.com/" target="_blank">AnyChart Cloud Playground</a></p>' +
          '<p>AnyChart Playground allows you to fine tune charts using rich capabilities of <a href="https://api.anychart.com" target="_blank">AnyChart API</a> ' +
          'and all other <a href="https://docs.anychart.com" target="_blank">AnyChart Features</a>, <br>save different version of the chart and embed the final result into your HTML pages.</p>'
      )));

  goog.dom.appendChild(element, text);

  var buttonRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(goog.ui.ButtonRenderer, 'anychart-ce-embed-button'));
  this.button_ = new goog.ui.Button('Save To Cloud', buttonRenderer);
  this.addChild(this.button_, true);

  this.form_ = new goog.ui.FormPost();
};


/** @inheritDoc */
chartEditor.exportTabs.Embed.prototype.enterDocument = function() {
  chartEditor.exportTabs.Embed.base(this, 'enterDocument');

  this.getHandler().listen(this.button_, goog.ui.Component.EventType.ACTION, this.onButton_);
};


/**
 * Embed button click handler
 * @private
 */
chartEditor.exportTabs.Embed.prototype.onButton_ = function() {
  var scripts = this.getScripts();

  var values = {
    'markup': '<div id="container"></div>',
    'markup_type': 'html',
    'code_type': 'js',
    'style_type': 'css',
    'tags': ['chartEditor']
  };

  values['scripts'] = [scripts.bundle];

  if (scripts.theme)
    values['scripts'].push(scripts.theme);

  if (scripts.geoData) {
    values['scripts'].push(scripts.geoData);
    values['scripts'].push(scripts.proj4js);
  }

  values['styles'] = [scripts.css_ui, scripts.css_fonts];

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var chartCode = model.getChartAsJsCode({
    'containerId': 'container',
    'wrapper': 'document-ready',
    'addData': false,
    'addGeoData': false
  });

  var dataCode = model.getDataCode();
  values['code'] = chartCode + '\n' + dataCode + '\n';

  this.form_.post(values, 'https://playground.anychart.com/export', '_blank');
};