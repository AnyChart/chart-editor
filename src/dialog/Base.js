goog.provide('chartEditor.dialog.Base');

goog.require('goog.ui.Dialog');


/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Dialog}
 */
chartEditor.dialog.Base = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.dialog.Base.base(this, 'constructor', opt_class || goog.getCssName('anychart-ce-dialog'), opt_useIframeMask, opt_domHelper);
};
goog.inherits(chartEditor.dialog.Base, goog.ui.Dialog);


/** @inheritDoc */
chartEditor.dialog.Base.prototype.createDom = function(){
  chartEditor.dialog.Base.base(this, 'createDom');

  var titleCloseEl = this.getTitleCloseElement();
  goog.dom.classlist.add(titleCloseEl, goog.getCssName('ac'));
  goog.dom.classlist.add(titleCloseEl, goog.getCssName('ac-plus'));
};
