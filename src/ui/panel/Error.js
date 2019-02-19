goog.provide('chartEditor.ui.panel.Error');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');



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


/** @override */
chartEditor.ui.panel.Error.prototype.createDom = function() {
  chartEditor.ui.panel.Error.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var valueError = new chartEditor.ui.control.comboBox.Percent();
  valueError.setOptions([1, 2, 3, 4, 5, 10, 15]);
  var valueErrorLC = new chartEditor.ui.control.wrapped.Labeled(valueError, 'Value Error');
  valueErrorLC.init(model, this.genKey(['valueError()']));
  this.addChildControl(valueErrorLC);

  var valueUpperError = new chartEditor.ui.control.input.Numbers();
  var valueUpperErrorLC = new chartEditor.ui.control.wrapped.Labeled(valueUpperError, 'Value Upper Error');
  valueUpperErrorLC.init(model, this.genKey(['valueUpperError()']));
  this.addChildControl(valueUpperErrorLC);

  var valueLowerError = new chartEditor.ui.control.input.Numbers();
  var valueLowerErrorLC = new chartEditor.ui.control.wrapped.Labeled(valueLowerError, 'Value Lower Error');
  valueLowerErrorLC.init(model, this.genKey(['valueLowerError()']));
  this.addChildControl(valueLowerErrorLC);

  if (model.getModel()['chart']['type'] === 'scatter') {
    var xUpperError = new chartEditor.ui.control.input.Numbers();
    var xUpperErrorLC = new chartEditor.ui.control.wrapped.Labeled(xUpperError, 'X Upper Error');
    xUpperErrorLC.init(model, this.genKey(['xUpperError()']));
    this.addChildControl(xUpperErrorLC);

    var xLowerError = new chartEditor.ui.control.input.Numbers();
    var xLowerErrorLC = new chartEditor.ui.control.wrapped.Labeled(xLowerError, 'X Lower Error');
    xLowerErrorLC.init(model, this.genKey(['xLowerError()']));
    this.addChildControl(xLowerErrorLC);
  }
};
