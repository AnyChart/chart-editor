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
  this.addChildControl(settings);
  this.settings_ = settings;

  var maxHeadersHeight = new chartEditor.comboBox.Base();
  maxHeadersHeight.setOptions([0, 10, 20, 50, 100]);
  maxHeadersHeight.setRange(0, 100);
  this.maxHeadersHeight_ = new chartEditor.controls.LabeledControl(maxHeadersHeight, 'Max Headers Height');
  this.maxHeadersHeight_.init(model, [['chart'], ['settings'], 'maxHeadersHeight()']);
  this.addChildControl(this.maxHeadersHeight_);

  var headersDisplayMode = new chartEditor.controls.select.DataField({label: 'Headers Display Mode'});
  headersDisplayMode.getSelect().setOptions([
    {value: 'always-show', caption: 'Always Show'},
    {value: 'clip', caption: 'Clip'},
    {value: 'drop', caption: 'Drop'}
  ]);
  this.headersDisplayMode_ = headersDisplayMode;
  this.headersDisplayMode_.init(model, [['chart'], ['settings'], 'headersDisplayMode()']);
  this.addChildControl(this.headersDisplayMode_);
};
