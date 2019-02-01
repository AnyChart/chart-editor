goog.provide('chartEditor.ui.panel.TreemapHeaders');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.TreemapHeaders = function(model, opt_domHelper) {
  chartEditor.ui.panel.TreemapHeaders.base(this, 'constructor', model, 'Headers', opt_domHelper);

  this.key = [['chart'], ['settings'], 'headers()'];
};
goog.inherits(chartEditor.ui.panel.TreemapHeaders, chartEditor.ui.Panel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.ui.panel.TreemapHeaders.CSS_CLASS = goog.getCssName('anychart-ce-panel-treemap-headers');


/** @inheritDoc */
chartEditor.ui.panel.TreemapHeaders.prototype.createDom = function() {
  chartEditor.ui.panel.TreemapHeaders.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.ui.panel.TreemapHeaders.CSS_CLASS);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var settings = new chartEditor.ui.panel.Title(model, null);
  settings.allowEnabled(false);
  settings.allowEditPosition(false);
  settings.allowEditAlign(false);

  settings.setTitleKey('format()');
  settings.setKey(this.getKey()); // This is for enabled working sake!
  this.addChildControl(settings);
  this.settings_ = settings;

  var maxHeadersHeight = new chartEditor.ui.control.comboBox.Base();
  maxHeadersHeight.setOptions([0, 10, 20, 50, 100]);
  maxHeadersHeight.setRange(0, 100);
  this.maxHeadersHeight_ = new chartEditor.ui.control.wrapped.Labeled(maxHeadersHeight, 'Max Headers Height');
  this.maxHeadersHeight_.init(model, [['chart'], ['settings'], 'maxHeadersHeight()']);
  this.addChildControl(this.maxHeadersHeight_);

  var headersDisplayMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Headers Display Mode'});
  headersDisplayMode.getSelect().setOptions([
    {value: 'always-show', caption: 'Always Show'},
    {value: 'clip', caption: 'Clip'},
    {value: 'drop', caption: 'Drop'}
  ]);
  this.headersDisplayMode_ = headersDisplayMode;
  this.headersDisplayMode_.init(model, [['chart'], ['settings'], 'headersDisplayMode()']);
  this.addChildControl(this.headersDisplayMode_);
};
