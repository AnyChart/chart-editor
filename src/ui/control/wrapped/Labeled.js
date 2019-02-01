goog.provide('chartEditor.ui.control.wrapped.Labeled');

goog.require('chartEditor.ui.control.wrapped.Base');


/**
 * @param {chartEditor.model.Base.Control} control
 * @param {string=} opt_label
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.control.wrapped.Base}
 */
chartEditor.ui.control.wrapped.Labeled = function(control, opt_label, opt_allowReset, opt_domHelper) {
  chartEditor.ui.control.wrapped.Labeled.base(this, 'constructor', control, opt_allowReset, opt_domHelper);

  this.labelString_ = opt_label ? opt_label : '';

  this.addClassName('anychart-ce-labeled-control');
};
goog.inherits(chartEditor.ui.control.wrapped.Labeled, chartEditor.ui.control.wrapped.Base);


/** @inheritDoc */
chartEditor.ui.control.wrapped.Labeled.prototype.createDom = function() {
  chartEditor.ui.control.wrapped.Labeled.base(this, 'createDom');

  var element = this.getElement();

  this.label_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-labeled-control-label', this.labelString_);
  goog.dom.insertChildAt(element, this.label_, 0);

  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-panel-control-right');
  goog.dom.appendChild(element, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};


/** @override */
chartEditor.ui.control.wrapped.Labeled.prototype.disposeInternal = function() {
  this.label_ = null;
  chartEditor.ui.control.wrapped.Labeled.base(this, 'disposeInternal');
};