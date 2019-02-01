goog.provide('chartEditor.ui.panel.specific.TreeMap');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.AdjustFontSize');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.TreemapHeaders');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.TreeMap = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.TreeMap.base(this, 'constructor', model, 'Tree Map Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-panel-pie'));
};
goog.inherits(chartEditor.ui.panel.specific.TreeMap, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.TreeMap.prototype.createDom = function() {
  chartEditor.ui.panel.specific.TreeMap.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var sort = new chartEditor.ui.control.fieldSelect.Base({label: 'Sort'});
  sort.getSelect().setOptions([
    {value: 'asc', caption: 'Ascending'},
    {value: 'desc', caption: 'Descending'},
    {value: 'none', caption: 'No sorting'}
  ]);
  sort.init(model, this.genKey('sort()'));
  this.addChildControl(sort);

  var maxDepth = new chartEditor.ui.control.comboBox.Base();
  maxDepth.setOptions([1, 2, 3, 4, 5]);
  maxDepth.setRange(1, 10);
  var maxDepthLC = new chartEditor.ui.control.wrapped.Labeled(maxDepth, 'Max Depth');
  maxDepthLC.init(model, this.genKey('maxDepth()'));
  this.addChildControl(maxDepthLC);

  var hintDepth = new chartEditor.ui.control.comboBox.Base();
  hintDepth.setOptions([0, 1, 2, 3, 4]);
  hintDepth.setRange(0, 10);
  var hintDepthLC = new chartEditor.ui.control.wrapped.Labeled(hintDepth, 'Hint Depth');
  hintDepthLC.init(model, this.genKey('hintDepth()'));
  this.addChildControl(hintDepthLC);

  var hintOpacity = new chartEditor.ui.control.comboBox.Base();
  hintOpacity.setOptions([0, 0.2, 0.5, 0.7, 1]);
  hintOpacity.setRange(0, 1);
  var hintOpacityLC = new chartEditor.ui.control.wrapped.Labeled(hintOpacity, 'Hint Opacity');
  hintOpacityLC.init(model, this.genKey('hintOpacity()'));
  this.addChildControl(hintOpacityLC);

  var adjustFontSize = new chartEditor.ui.control.checkbox.AdjustFontSize();
  adjustFontSize.setCaption('Adjust Labels Font Size');
  adjustFontSize.init(model, this.genKey('labels().adjustFontSize()'));
  this.addChildControl(adjustFontSize);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-gap')));

  var headers = new chartEditor.ui.panel.TreemapHeaders(model);
  headers.allowEnabled(true);
  this.addChildControl(headers);
};
