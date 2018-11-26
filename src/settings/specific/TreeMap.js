goog.provide('chartEditor.settings.specific.TreeMap');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.AdjustFontSize');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.TreemapHeaders');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.TreeMap = function(model, opt_domHelper) {
  chartEditor.settings.specific.TreeMap.base(this, 'constructor', model, 'Tree Map Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pie'));
};
goog.inherits(chartEditor.settings.specific.TreeMap, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.TreeMap.prototype.createDom = function() {
  chartEditor.settings.specific.TreeMap.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var sort = new chartEditor.controls.select.DataField({label: 'Sort'});
  sort.getSelect().setOptions([
    {value: 'asc', caption: 'Ascending'},
    {value: 'desc', caption: 'Descending'},
    {value: 'none', caption: 'No sorting'}
  ]);
  sort.init(model, this.genKey('sort()'));
  this.addChildControl(sort);

  var maxDepth = new chartEditor.comboBox.Base();
  maxDepth.setOptions([1, 2, 3, 4, 5]);
  maxDepth.setRange(1, 10);
  var maxDepthLC = new chartEditor.controls.LabeledControl(maxDepth, 'Max Depth');
  maxDepthLC.init(model, this.genKey('maxDepth()'));
  this.addChildControl(maxDepthLC);

  var hintDepth = new chartEditor.comboBox.Base();
  hintDepth.setOptions([0, 1, 2, 3, 4]);
  hintDepth.setRange(0, 10);
  var hintDepthLC = new chartEditor.controls.LabeledControl(hintDepth, 'Hint Depth');
  hintDepthLC.init(model, this.genKey('hintDepth()'));
  this.addChildControl(hintDepthLC);

  var hintOpacity = new chartEditor.comboBox.Base();
  hintOpacity.setOptions([0, 0.2, 0.5, 0.7, 1]);
  hintOpacity.setRange(0, 1);
  var hintOpacityLC = new chartEditor.controls.LabeledControl(hintOpacity, 'Hint Opacity');
  hintOpacityLC.init(model, this.genKey('hintOpacity()'));
  this.addChildControl(hintOpacityLC);

  var adjustFontSize = new chartEditor.checkbox.AdjustFontSize();
  adjustFontSize.setCaption('Adjust Labels Font Size');
  adjustFontSize.init(model, this.genKey('labels().adjustFontSize()'));
  this.addChildControl(adjustFontSize);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-gap')));

  var headers = new chartEditor.settings.TreemapHeaders(model);
  headers.allowEnabled(true);
  this.addChildControl(headers);
};
