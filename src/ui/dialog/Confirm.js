goog.provide('chartEditor.ui.dialog.Confirm');

goog.require('chartEditor.ui.dialog.Base');
goog.require('goog.ui.Dialog');


/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.ui.dialog.Confirm = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.ui.dialog.Confirm.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);

  this.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
};
goog.inherits(chartEditor.ui.dialog.Confirm, chartEditor.ui.dialog.Base);


/** @inheritDoc */
chartEditor.ui.dialog.Confirm.prototype.createDom = function(){
  chartEditor.ui.dialog.Confirm.base(this, 'createDom');

  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-dialog-confirm'));
};
