goog.provide('anychart.chartEditorModule.settings.TreemapHeaders');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.TreemapHeaders = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.TreemapHeaders.base(this, 'constructor', model, 'Headers', opt_domHelper);

  this.key = [['chart'], ['settings'], 'headers()'];
};
goog.inherits(anychart.chartEditorModule.settings.TreemapHeaders, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.TreemapHeaders.CSS_CLASS = goog.getCssName('anychart-settings-treemap-headers');


/** @inheritDoc */
anychart.chartEditorModule.settings.TreemapHeaders.prototype.createDom = function() {
  anychart.chartEditorModule.settings.TreemapHeaders.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, anychart.chartEditorModule.settings.TreemapHeaders.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var settings = new anychart.chartEditorModule.settings.Title(model, null);
  settings.allowEnabled(false);
  settings.allowEditPosition(false);
  settings.allowEditAlign(false);

  settings.setTitleKey('format()');
  settings.setKey(this.getKey()); // This is for enabled working sake!
  this.addChild(settings, true);
  this.settings_ = settings;

  var maxHeadersHeight = new anychart.chartEditorModule.comboBox.Base();
  maxHeadersHeight.setOptions([0, 10, 20, 50, 100]);
  maxHeadersHeight.setRange(0, 100);
  this.maxHeadersHeight_ = new anychart.chartEditorModule.controls.LabeledControl(maxHeadersHeight, 'Max Headers Height');
  this.addChild(this.maxHeadersHeight_, true);

  var headersDisplayMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Headers Display Mode'});
  headersDisplayMode.getSelect().setOptions([
    {value: 'always-show', caption: 'Always Show'},
    {value: 'clip', caption: 'Clip'},
    {value: 'drop', caption: 'Drop'}
  ]);
  this.headersDisplayMode_ = headersDisplayMode;
  this.addChild(this.headersDisplayMode_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.TreemapHeaders.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    if (this.settings_) this.settings_.setKey(this.getKey());
    if (this.maxHeadersHeight_) this.maxHeadersHeight_.init(model, [['chart'], ['settings'], 'maxHeadersHeight()']);
    if (this.headersDisplayMode_) this.headersDisplayMode_.init(model, [['chart'], ['settings'], 'headersDisplayMode()']);
  }

  anychart.chartEditorModule.settings.TreemapHeaders.base(this, 'updateKeys');
};


/** @inheritDoc */
anychart.chartEditorModule.settings.TreemapHeaders.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.TreemapHeaders.base(this, 'onChartDraw', evt);
  if (!this.isExcluded()) {
    var target = evt.chart;
    if (this.maxHeadersHeight_) this.maxHeadersHeight_.setValueByTarget(target);
    if (this.headersDisplayMode_) this.headersDisplayMode_.setValueByTarget(target);
  }
};


/** @override */
anychart.chartEditorModule.settings.TreemapHeaders.prototype.disposeInternal = function() {
  goog.dispose(this.settings_);
  this.settings_ = null;

  goog.dispose(this.maxHeadersHeight_);
  this.maxHeadersHeight_ = null;

  goog.dispose(this.headersDisplayMode_);
  this.headersDisplayMode_ = null;

  anychart.chartEditorModule.settings.TreemapHeaders.base(this, 'disposeInternal');
};
