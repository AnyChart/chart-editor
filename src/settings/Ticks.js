goog.provide('anychart.chartEditorModule.settings.Ticks');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Stroke');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.Ticks = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.Ticks.base(this, 'constructor', model, 'Ticks', opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.Ticks, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.Ticks.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-ticks');


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.settings.Ticks.prototype.allowEditPosition_ = true;


/**
 * @param {boolean} value
 */
anychart.chartEditorModule.settings.Ticks.prototype.allowEditPosition = function(value) {
  this.allowEditPosition_ = value;
};


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.settings.Ticks.prototype.allowEditFill_ = false;


/**
 * @param {boolean} value
 */
anychart.chartEditorModule.settings.Ticks.prototype.allowEditFill = function(value) {
  this.allowEditFill_ = value;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Ticks.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Ticks.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.Ticks.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // Position
  if (this.allowEditPosition_) {
    var position = new anychart.chartEditorModule.controls.select.DataField({label: 'Position'});
    var positionValues = goog.object.getValues(anychart.enums.SidePosition);
    positionValues = goog.array.filter(positionValues, function(i) {
      return goog.typeOf(i) === 'string';
    });
    position.getControl().setOptions(positionValues);
    position.init(model, this.genKey('position()'));
    this.addChildControl(position);
  }

  // Length
  var length = new anychart.chartEditorModule.comboBox.Base();
  length.setOptions([1, 5, 10, 15]);
  length.setRange(0, 100);
  var lengthLC = new anychart.chartEditorModule.controls.LabeledControl(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Fill
  if (this.allowEditFill_) {
    var fill = new anychart.chartEditorModule.colorPicker.Base();
    var fillLC = new anychart.chartEditorModule.controls.LabeledControl(fill, 'Fill');
    fillLC.init(model, this.genKey('fill()'));
    this.addChildControl(fillLC);
  }

  // Stroke
  var stroke = new anychart.chartEditorModule.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);
};
