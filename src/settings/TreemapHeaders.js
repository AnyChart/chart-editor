goog.provide('chartEditor.settings.TreemapHeaders');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.TreemapHeaders = function(model, opt_domHelper) {
  chartEditor.settings.TreemapHeaders.base(this, 'constructor', model, 'Headers', opt_domHelper);

  this.key = [['chart'], ['settings'], 'headers()'];
};
goog.inherits(chartEditor.settings.TreemapHeaders, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.TreemapHeaders.CSS_CLASS = goog.getCssName('anychart-ce-settings-treemap-headers');


/** @inheritDoc */
chartEditor.settings.TreemapHeaders.prototype.createDom = function() {
  chartEditor.settings.TreemapHeaders.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.settings.TreemapHeaders.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var settings = new chartEditor.settings.Title(model, null);
  settings.allowEnabled(false);
  settings.allowEditPosition(false);
  settings.allowEditAlign(false);

  settings.setTitleKey('format()');
  settings.setKey(this.getKey()); // This is for enabled working sake!
  this.addChild(settings, true);
  this.settings_ = settings;

  var maxHeadersHeight = new chartEditor.comboBox.Base();
  maxHeadersHeight.setOptions([0, 10, 20, 50, 100]);
  maxHeadersHeight.setRange(0, 100);
  this.maxHeadersHeight_ = new chartEditor.controls.LabeledControl(maxHeadersHeight, 'Max Headers Height');
  this.addChild(this.maxHeadersHeight_, true);

  var headersDisplayMode = new chartEditor.controls.select.DataField({label: 'Headers Display Mode'});
  headersDisplayMode.getSelect().setOptions([
    {value: 'always-show', caption: 'Always Show'},
    {value: 'clip', caption: 'Clip'},
    {value: 'drop', caption: 'Drop'}
  ]);
  this.headersDisplayMode_ = headersDisplayMode;
  this.addChild(this.headersDisplayMode_, true);
};


/** @inheritDoc */
chartEditor.settings.TreemapHeaders.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    if (this.settings_) this.settings_.setKey(this.getKey());
    if (this.maxHeadersHeight_) this.maxHeadersHeight_.init(model, [['chart'], ['settings'], 'maxHeadersHeight()']);
    if (this.headersDisplayMode_) this.headersDisplayMode_.init(model, [['chart'], ['settings'], 'headersDisplayMode()']);
  }

  chartEditor.settings.TreemapHeaders.base(this, 'updateKeys');
};


/** @inheritDoc */
chartEditor.settings.TreemapHeaders.prototype.onChartDraw = function(evt) {
  chartEditor.settings.TreemapHeaders.base(this, 'onChartDraw', evt);
  if (!this.isExcluded()) {
    var target = evt.chart;
    if (this.maxHeadersHeight_) this.maxHeadersHeight_.setValueByTarget(target);
    if (this.headersDisplayMode_) this.headersDisplayMode_.setValueByTarget(target);
  }
};


/** @override */
chartEditor.settings.TreemapHeaders.prototype.disposeInternal = function() {
  goog.dispose(this.settings_);
  this.settings_ = null;

  goog.dispose(this.maxHeadersHeight_);
  this.maxHeadersHeight_ = null;

  goog.dispose(this.headersDisplayMode_);
  this.headersDisplayMode_ = null;

  chartEditor.settings.TreemapHeaders.base(this, 'disposeInternal');
};
