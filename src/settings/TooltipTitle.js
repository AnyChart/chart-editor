goog.provide('chartEditor.settings.TooltipTitle');

goog.require('chartEditor.settings.Title');



/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.Title}
 */
chartEditor.settings.TooltipTitle = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.TooltipTitle.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowEnabled(true);
  this.allowEditPosition(false);
  this.allowEditAlign(false);

  /**
   * @type {chartEditor.EditorModel.Key}
   * @private
   */
  this.titleFormatKey_ = [];
};
goog.inherits(chartEditor.settings.TooltipTitle, chartEditor.settings.Title);


/**
 * @param {chartEditor.EditorModel.Key} value
 */
chartEditor.settings.TooltipTitle.prototype.setTitleFormatKey = function(value) {
  this.titleFormatKey_ = value;
};


/** @inheritDoc */
chartEditor.settings.TooltipTitle.prototype.updateKeys = function() {
  chartEditor.settings.TooltipTitle.base(this, 'updateKeys');
  if (this.isExcluded()) return;

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (this.textInput_) this.textInput_.init(model, this.titleFormatKey_);
};
