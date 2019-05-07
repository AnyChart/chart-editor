goog.provide('chartEditor.ui.panel.ganttProject.elements.Base');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ganttProject.elements.Base = function(model, index, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.Base.base(this, 'constructor', model, index, opt_name, opt_domHelper);

  this.fields_ = {
    'position': true,
    'anchor': true,
    'height': true,
    'offset': true,
    'labels': true,
    'above': false
  };

  this.labelsPanel = new chartEditor.ui.panel.Font(model);
  this.labelsPanel.showField('position');
  this.labelsPanel.showField('anchor');
  this.labelsPanel.showField('enabled');
  this.labelsPanel.showField('format');
  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.Base, chartEditor.ui.PanelZippy);


/**
 * Hide passed field in DOM.
 * @param {string} name
 * */
chartEditor.ui.panel.ganttProject.elements.Base.prototype.hideField = function(name) {
  this.fields_[name] = false;
};


/**
 * Show passed field in DOM.
 * @param {string} name
 * */
chartEditor.ui.panel.ganttProject.elements.Base.prototype.showElement = function(name) {
  this.fields_[name] = true;
};



/** @override */
chartEditor.ui.panel.ganttProject.elements.Base.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.elements.Base.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  if (this.fields_['height']) {
    var height = new chartEditor.ui.control.input.Base();
    var heightLC = new chartEditor.ui.control.wrapped.Labeled(height, 'Height', true);
    heightLC.init(model, this.genKey('height()'));
    this.addChildControl(heightLC);
  }

  if (this.fields_['position']) {
    var position = new chartEditor.ui.control.fieldSelect.Base();
    position.getSelect().setOptions([
      chartEditor.enums.Anchor.LEFT_BOTTOM,
      chartEditor.enums.Anchor.LEFT_CENTER,
      chartEditor.enums.Anchor.LEFT_TOP
    ]);

    var positionLC = new chartEditor.ui.control.wrapped.Labeled(position, 'Position');
    positionLC.init(model, this.genKey('position()'));
    this.addChildControl(positionLC);
  }

  if (this.fields_['anchor']) {
    var anchor = new chartEditor.ui.control.fieldSelect.Base();
    anchor.getSelect().setOptions([
      chartEditor.enums.Anchor.LEFT_BOTTOM,
      chartEditor.enums.Anchor.LEFT_CENTER,
      chartEditor.enums.Anchor.LEFT_TOP,
      chartEditor.enums.Anchor.AUTO
    ]);

    var anchorLC = new chartEditor.ui.control.wrapped.Labeled(anchor, 'Anchor');
    anchorLC.init(model, this.genKey('anchor()'));
    this.addChildControl(anchorLC);
  }

  if (this.fields_['above']) {
    var above = new chartEditor.ui.control.checkbox.Base();
    above.init(model, this.genKey('above()'));
    above.setCaption('Above');
    this.addChildControl(above);
  }

  if (this.fields_['offset']) {
    var offset = new chartEditor.ui.control.input.Base();
    offset.setFormatterFunction(function(value) {
      value = parseFloat(value);

      if (isNaN(value))
        value = 0;

      return String(value);
    });

    var offsetLC = new chartEditor.ui.control.wrapped.Labeled(offset, 'Offset');
    offsetLC.init(model, this.genKey('offset()'));
    this.addChildControl(offsetLC);
  }

  if (this.fields_['labels']) {
    this.labelsPanel.setKey(this.genKey('labels()'));
    this.addChildControl(this.labelsPanel);
  }

  // Not implemented
  // normal()	Normal state panel.
  // rendering()	Rendering panel.
  // selected()	Selected state panel.
  //   Labels
  // labels()	Element labels panel.
  //   Size and Position
  // above()	Displaying of the baseline bar above an time bar.
};
