goog.provide('chartEditor.settings.Ticks');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Ticks = function(model, opt_domHelper) {
  chartEditor.settings.Ticks.base(this, 'constructor', model, 'Ticks', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-settings-ticks'));
};
goog.inherits(chartEditor.settings.Ticks, chartEditor.SettingsPanel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Ticks.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
chartEditor.settings.Ticks.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
chartEditor.settings.Ticks.prototype.allowEditFill_ = false;


/**
 * @param {boolean} value
 */
chartEditor.settings.Ticks.prototype.allowEditFill = function(value) {
  this.allowEditFill_ = value;
};


/** @inheritDoc */
chartEditor.settings.Ticks.prototype.createDom = function() {
  chartEditor.settings.Ticks.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // Position
  if (this.allowEditPosition_) {
    var position = new chartEditor.controls.select.DataField({label: 'Position'});
    var positionValues = goog.object.getValues(chartEditor.enums.SidePosition);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) === 'string';
    });
    position.getControl().setOptions(positionValues);
    position.init(model, this.genKey('position()'));
    this.addChildControl(position);
  }

  // Length
  var length = new chartEditor.comboBox.Base();
  length.setOptions([1, 5, 10, 15]);
  length.setRange(0, 100);
  var lengthLC = new chartEditor.controls.LabeledControl(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Fill
  if (this.allowEditFill_) {
    var fill = new chartEditor.colorPicker.Base();
    var fillLC = new chartEditor.controls.LabeledControl(fill, 'Fill');
    fillLC.init(model, this.genKey('fill()'));
    this.addChildControl(fillLC);
  }

  // Stroke
  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
};
