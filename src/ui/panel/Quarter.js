goog.provide('chartEditor.ui.panel.Quarter');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
// goog.require('chartEditor.ui.panel.QuarterLabel');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Quarter = function(model, opt_domHelper) {
  chartEditor.ui.panel.Quarter.base(this, 'constructor', model, 'Quarter', opt_domHelper);
  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.Quarter, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.panel.Quarter.prototype.createDom = function() {
  chartEditor.ui.panel.Quarter.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var corners = new chartEditor.ui.control.comboBox.Base();
  corners.setOptions([0, 10, 20, 30]);
  corners.setRange(0,200);
  var cornersLC = new chartEditor.ui.control.wrapped.Labeled(corners, 'Corners');
  cornersLC.init(model, this.genKey('corners()'));
  this.addChildControl(cornersLC);

  var cornerType = new chartEditor.ui.control.fieldSelect.Base({label: 'Corner type'});
  cornerType.init(model, this.genKey('cornerType()'));
  cornerType.getSelect().setOptions([
    {'value': 'none'},
    {'value': 'round'},
    {'value': 'round-inner'},
    {'value': 'cut'}
  ]);
  this.addChildControl(cornerType);

  var stroke = new chartEditor.ui.panel.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.allowEnabled(true);
  title.setPositionKey('orientation()');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  // any getter call of the quarter or chart label lead to creating it
  // TODO: make a workaround how to enable this control only by user action
  // var label = new chartEditor.ui.panel.QuarterLabel(model);
  // label.setName('Label');
  // // label.allowEditPosition(true);
  // // label.allowEditAnchor(true);
  // label.setKey(this.genKey('label()'));
  // this.addChildControl(label);
};
