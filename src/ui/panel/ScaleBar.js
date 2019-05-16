goog.provide('chartEditor.ui.panel.ScaleBar');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ScaleBar = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.ScaleBar.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'scaleBar(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'scaleBar(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);

  this.allowRemove(true);
};
goog.inherits(chartEditor.ui.panel.ScaleBar, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.ScaleBar.prototype.createDom = function() {
  chartEditor.ui.panel.ScaleBar.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // custom formatter function for from and to controls
  var formatterFunc = function(value){
      return Number(value);
  };

  // region ==== Header
  // endregion

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill', true));
  this.addChildControl(fillLC);

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'), void 0, true);
  this.addChildControl(scale);

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke', true));
  this.addChildControl(stroke);

  var width = new chartEditor.ui.control.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new chartEditor.ui.control.wrapped.Labeled(width, 'Width');
  widthLC.init(model, this.genKey('width', true));
  this.addChildControl(widthLC);

  var offset = new chartEditor.ui.control.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.ui.control.wrapped.Labeled(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset', true));
  this.addChildControl(offsetLC);

  this.addContentSeparator();

  var from = new chartEditor.ui.control.input.Numbers('From value');
  from.setFormatterFunction(formatterFunc);
  var fromlLC = new chartEditor.ui.control.wrapped.Labeled(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new chartEditor.ui.control.input.Numbers('To value');
  to.setFormatterFunction(formatterFunc);
  var tolLC = new chartEditor.ui.control.wrapped.Labeled(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  this.addContentSeparator();

  var colorScale = new chartEditor.ui.panel.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
