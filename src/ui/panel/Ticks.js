goog.provide('chartEditor.ui.panel.Ticks');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Ticks = function(model, opt_domHelper) {
  chartEditor.ui.panel.Ticks.base(this, 'constructor', model, 'Ticks', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-ticks'));
};
goog.inherits(chartEditor.ui.panel.Ticks, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Ticks.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Ticks.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.panel.Ticks.prototype.allowEditFill_ = false;


/**
 * @param {boolean} value
 */
chartEditor.ui.panel.Ticks.prototype.allowEditFill = function(value) {
  this.allowEditFill_ = value;
};


/** @inheritDoc */
chartEditor.ui.panel.Ticks.prototype.createDom = function() {
  chartEditor.ui.panel.Ticks.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // Position
  if (this.allowEditPosition_) {
    var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Position'});
    var positionValues = goog.object.getValues(chartEditor.enums.SidePosition);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) === 'string';
    });
    position.getControl().setOptions(positionValues);
    position.init(model, this.genKey('position()'));
    this.addChildControl(position);
  }

  // Length
  var length = new chartEditor.ui.control.comboBox.Base();
  length.setOptions([1, 5, 10, 15]);
  length.setRange(0, 100);
  var lengthLC = new chartEditor.ui.control.wrapped.Labeled(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Fill
  if (this.allowEditFill_) {
    var fill = new chartEditor.ui.control.colorPicker.Base();
    var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
    fillLC.init(model, this.genKey('fill()'));
    this.addChildControl(fillLC);
  }

  // Stroke
  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
};
