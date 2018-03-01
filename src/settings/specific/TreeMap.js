goog.provide('anychart.chartEditorModule.settings.specific.TreeMap');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.checkbox.AdjustFontSize');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Stroke');
goog.require('anychart.chartEditorModule.settings.TreemapHeaders');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.TreeMap = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.TreeMap.base(this, 'constructor', model, 'Tree Map Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.TreeMap, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.TreeMap.CSS_CLASS = goog.getCssName('anychart-settings-panel-pie');


/** @override */
anychart.chartEditorModule.settings.specific.TreeMap.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.TreeMap.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.TreeMap.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var sort = new anychart.chartEditorModule.controls.select.DataField({label: 'Sort'});
  sort.getSelect().setOptions([
    {value: 'asc', caption: 'Ascending'},
    {value: 'desc', caption: 'Descending'},
    {value: 'none', caption: 'No sorting'}
  ]);
  sort.init(model, this.genKey('sort()'));
  this.addChildControl(sort);

  var maxDepth = new anychart.chartEditorModule.comboBox.Base();
  maxDepth.setOptions([1, 2, 3, 4, 5]);
  maxDepth.setRange(1, 10);
  var maxDepthLC = new anychart.chartEditorModule.controls.LabeledControl(maxDepth, 'Max Depth');
  maxDepthLC.init(model, this.genKey('maxDepth()'));
  this.addChildControl(maxDepthLC);

  var hintDepth = new anychart.chartEditorModule.comboBox.Base();
  hintDepth.setOptions([0, 1, 2, 3, 4]);
  hintDepth.setRange(0, 10);
  var hintDepthLC = new anychart.chartEditorModule.controls.LabeledControl(hintDepth, 'Hint Depth');
  hintDepthLC.init(model, this.genKey('hintDepth()'));
  this.addChildControl(hintDepthLC);

  var hintOpacity = new anychart.chartEditorModule.comboBox.Base();
  hintOpacity.setOptions([0, 0.2, 0.5, 0.7, 1]);
  hintOpacity.setRange(0, 1);
  var hintOpacityLC = new anychart.chartEditorModule.controls.LabeledControl(hintOpacity, 'Hint Opacity');
  hintOpacityLC.init(model, this.genKey('hintOpacity()'));
  this.addChildControl(hintOpacityLC);

  var adjustFontSize = new anychart.chartEditorModule.checkbox.AdjustFontSize();
  adjustFontSize.setCaption('Adjust Labels Font Size');
  adjustFontSize.init(model, this.genKey('labels().adjustFontSize()'));
  this.addChildControl(adjustFontSize);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-gap')));

  var headers = new anychart.chartEditorModule.settings.TreemapHeaders(model);
  headers.allowEnabled(true);
  this.addChild(headers, true);
};
