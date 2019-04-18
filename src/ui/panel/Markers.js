goog.provide('chartEditor.ui.panel.Markers');

goog.require('chartEditor.enums');
goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Markers = function(model, opt_domHelper) {
  chartEditor.ui.panel.Markers.base(this, 'constructor', model, 'Markers', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-markers'));

  this.fillKey_ = 'fill()';
};
goog.inherits(chartEditor.ui.panel.Markers, chartEditor.ui.Panel);


/** @param {string} value */
chartEditor.ui.panel.Markers.prototype.setFillKey = function(value) {
  this.fillKey_ = value;
};

/** @override */
chartEditor.ui.panel.Markers.prototype.createDom = function() {
  chartEditor.ui.panel.Markers.base(this, 'createDom');

  var content = this.getContentElement();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var type = new chartEditor.ui.control.fieldSelect.Select('Type');
  type.setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.addClassName(goog.getCssName('markers-type'));
  var pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(type, 'Type');
  pointWidthLC.init(model, this.genKey('type()'));
  this.addChildControl(pointWidthLC);

  var size = new chartEditor.ui.control.comboBox.Base();
  size.setOptions([6, 10, 12, 15]);
  pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(size, 'Size');
  pointWidthLC.init(model, this.genKey('size()'));
  this.addChildControl(pointWidthLC);
  goog.dom.classlist.add(size.getElement(), goog.getCssName('markers-size'));

  var fill = new chartEditor.ui.control.colorPicker.Base();
  pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  pointWidthLC.init(model, this.genKey(this.fillKey_));
  this.addChildControl(pointWidthLC);
  goog.dom.classlist.add(fill.getElement(), goog.getCssName('markers-fill'));

  goog.dom.appendChild(content, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-gap')));

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
};
