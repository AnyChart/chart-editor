goog.provide('chartEditor.ui.panel.Error');

goog.require('chartEditor.enums');
goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Select');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Error = function(model, opt_domHelper) {
  chartEditor.ui.panel.Error.base(this, 'constructor', model, 'Error', opt_domHelper);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Error, chartEditor.ui.Panel);


// /**
//  * Default CSS class.
//  * @type {string}
//  */
// chartEditor.ui.panel.Markers.CSS_CLASS = goog.getCssName('anychart-ce-panel-markers');


/** @override */
chartEditor.ui.panel.Error.prototype.createDom = function() {
  chartEditor.ui.panel.Error.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var valueError = new chartEditor.ui.control.comboBox.Percent();
  valueError.setOptions([1, 2, 3, 4, 5, 10, 15]);
  var valueErrorLC = new chartEditor.ui.control.wrapped.Labeled(valueError, 'Value Error');
  valueErrorLC.init(model, this.genKey(['valueError()']));
  this.addChildControl(valueErrorLC);


  var valueLowerError = new chartEditor.ui.control.input.Numbers();
  var valueErrorLC = new chartEditor.ui.control.wrapped.Labeled(valueError, 'Value Error');
  valueErrorLC.init(model, this.genKey(['valueError()']));
  this.addChildControl(valueErrorLC);




  // var to = new chartEditor.ui.control.input.Numbers('To value');
  // var tolLC = new chartEditor.ui.control.wrapped.Labeled(to, 'To');
  // tolLC.init(model, this.genKey('to', true));
  // this.addChildControl(tolLC);
};
