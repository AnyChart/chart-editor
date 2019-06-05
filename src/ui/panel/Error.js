goog.provide('chartEditor.ui.panel.Error');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Error = function(model, opt_domHelper) {
  chartEditor.ui.panel.Error.base(this, 'constructor', model, 'Error', opt_domHelper);

  this.allowEnabled(false);
  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Error, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Error.prototype.createDom = function() {
  chartEditor.ui.panel.Error.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var hasXError = model.getModel()['chart']['type'] === 'scatter';

  var valueErrorStroke = new chartEditor.ui.panel.Stroke(model, hasXError ? 'Value Stroke' : 'Stroke');
  valueErrorStroke.setKey(this.genKey('valueErrorStroke()'));
  this.addChildControl(valueErrorStroke);

  var valueErrorWidth = new chartEditor.ui.control.input.Numbers();
  var valueErrorWidthLC = new chartEditor.ui.control.wrapped.Labeled(valueErrorWidth, hasXError ? 'Value Width' : 'Width');
  valueErrorWidthLC.init(model, this.genKey('valueErrorWidth()'));
  this.addChildControl(valueErrorWidthLC);

  if (hasXError) {
    this.addContentSeparator();

    var xErrorStroke = new chartEditor.ui.panel.Stroke(model, 'X Stroke');
    xErrorStroke.setKey(this.genKey('xErrorStroke()'));
    this.addChildControl(xErrorStroke);

    var xErrorWidth = new chartEditor.ui.control.input.Numbers();
    var xErrorWidthLC = new chartEditor.ui.control.wrapped.Labeled(xErrorWidth, 'X Width');
    xErrorWidthLC.init(model, this.genKey('xErrorWidth()'));
    this.addChildControl(xErrorWidthLC);
  }
};
