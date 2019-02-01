goog.provide('chartEditor.ui.panel.TooltipTitle');

goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.Title}
 */
chartEditor.ui.panel.TooltipTitle = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.TooltipTitle.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowEnabled(true);
  this.allowEditPosition(false);
  this.allowEditAlign(false);

  /**
   * @type {chartEditor.model.Base.Key}
   * @private
   */
  this.titleFormatKey_ = [];
};
goog.inherits(chartEditor.ui.panel.TooltipTitle, chartEditor.ui.panel.Title);


/**
 * @param {chartEditor.model.Base.Key} value
 */
chartEditor.ui.panel.TooltipTitle.prototype.setTitleFormatKey = function(value) {
  this.titleFormatKey_ = value;
};


/** @inheritDoc */
chartEditor.ui.panel.TooltipTitle.prototype.updateKeys = function() {
  chartEditor.ui.panel.TooltipTitle.base(this, 'updateKeys');
  if (this.isExcluded()) return;

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (this.textInput_) this.textInput_.init(model, this.titleFormatKey_);
};
