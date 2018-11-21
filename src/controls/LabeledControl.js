goog.provide('chartEditor.controls.LabeledControl');

goog.require('chartEditor.controls.WrappedControl');


/**
 * @param {chartEditor.EditorModel.Control} control
 * @param {string=} opt_label
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.controls.WrappedControl}
 */
chartEditor.controls.LabeledControl = function(control, opt_label, opt_allowReset, opt_domHelper) {
  chartEditor.controls.LabeledControl.base(this, 'constructor', control, opt_allowReset, opt_domHelper);

  this.labelString_ = opt_label ? opt_label : '';

  this.addClassName('anychart-ce-labeled-control');
};
goog.inherits(chartEditor.controls.LabeledControl, chartEditor.controls.WrappedControl);


/** @inheritDoc */
chartEditor.controls.LabeledControl.prototype.createDom = function() {
  chartEditor.controls.LabeledControl.base(this, 'createDom');

  var element = this.getElement();

  this.label_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-labeled-control-label', this.labelString_);
  goog.dom.insertChildAt(element, this.label_, 0);

  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-settings-control-right');
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};


/** @override */
chartEditor.controls.LabeledControl.prototype.disposeInternal = function() {
  this.label_ = null;
  chartEditor.controls.LabeledControl.base(this, 'disposeInternal');
};