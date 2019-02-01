goog.provide('chartEditor.ui.PanelIndexed');

goog.require('chartEditor.ui.Panel');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.PanelIndexed = function(model, index, opt_name, opt_domHelper) {
  chartEditor.ui.PanelIndexed.base(this, 'constructor', model, opt_name, opt_domHelper);

  /** @type {number|undefined} */
  this.plotIndex_ = void 0;

  /** @type {number} */
  this.index_ = index;

  this.addClassName(goog.getCssName('anychart-ce-panel-indexed'));
};
goog.inherits(chartEditor.ui.PanelIndexed, chartEditor.ui.Panel);


/** @return {number} */
chartEditor.ui.PanelIndexed.prototype.getIndex = function() {
  return this.index_;
};


/** @return {number} */
chartEditor.ui.PanelIndexed.prototype.getPlotIndex = function() {
  return goog.isNumber(this.plotIndex_) ? this.plotIndex_ : 0;
};


/** @inheritDoc */
chartEditor.ui.PanelIndexed.prototype.createDom = function() {
  chartEditor.ui.PanelIndexed.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), this.index_ % 2 ? 'even' : 'odd');
};
