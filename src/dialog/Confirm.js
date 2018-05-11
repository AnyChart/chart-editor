goog.provide('chartEditor.dialog.Confirm');

goog.require('chartEditor.dialog.Base');
goog.require('goog.ui.Dialog');


/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.dialog.Base}
 */
chartEditor.dialog.Confirm = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.dialog.Confirm.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
};
goog.inherits(chartEditor.dialog.Confirm, chartEditor.dialog.Base);


/** @inheritDoc */
chartEditor.dialog.Confirm.prototype.createDom = function(){
  chartEditor.dialog.Confirm.base(this, 'createDom');

  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-confirm-dialog'));
};
