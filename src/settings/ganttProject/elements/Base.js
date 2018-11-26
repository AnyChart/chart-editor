goog.provide('chartEditor.settings.ganttProject.elements.Base');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Base');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Stroke');



/**
 * @param {chartEditor.EditorModel} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.elements.Base = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.elements.Base.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.fields_ = {
    'position': true,
    'anchor': true,
    'height': true
  };

  this.allowReset(true);
};
goog.inherits(chartEditor.settings.ganttProject.elements.Base, chartEditor.SettingsPanel);


/**
 * Hide passed field in DOM.
 * @param {string} name
 * */
chartEditor.settings.ganttProject.elements.Base.prototype.hideField = function(name) {
  this.fields_[name] = false;
};


/** @override */
chartEditor.settings.ganttProject.elements.Base.prototype.createDom = function() {
  chartEditor.settings.ganttProject.elements.Base.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  if (this.fields_['height']) {
    var height = new chartEditor.controls.input.Base();
    var heightLC = new chartEditor.controls.LabeledControl(height, 'Height', true);
    heightLC.init(model, this.genKey('height()'));
    this.addChildControl(heightLC);
  }

  if (this.fields_['position']) {
    var position = new chartEditor.controls.select.DataField();
    position.getSelect().setOptions([
      chartEditor.enums.Anchor.LEFT_BOTTOM,
      chartEditor.enums.Anchor.LEFT_CENTER,
      chartEditor.enums.Anchor.LEFT_TOP
    ]);

    var positionLC = new chartEditor.controls.LabeledControl(position, 'Position');
    positionLC.init(model, this.genKey('position()'));
    this.addChildControl(positionLC);
  }

  if (this.fields_['anchor']) {
    var anchor = new chartEditor.controls.select.DataField();
    anchor.getSelect().setOptions([
      chartEditor.enums.Anchor.LEFT_BOTTOM,
      chartEditor.enums.Anchor.LEFT_CENTER,
      chartEditor.enums.Anchor.LEFT_TOP,
      chartEditor.enums.Anchor.AUTO
    ]);

    var anchorLC = new chartEditor.controls.LabeledControl(anchor, 'Anchor');
    anchorLC.init(model, this.genKey('anchor()'));
    this.addChildControl(anchorLC);
  }
  // Not implemented
  // normal()	Normal state settings.
  // rendering()	Rendering settings.
  // selected()	Selected state settings.
  //   Labels
  // labels()	Element labels settings.
  //   Size and Position
  // above()	Displaying of the baseline bar above an time bar.
};
