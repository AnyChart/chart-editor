goog.provide('chartEditor.ui.dialog.PresetPreview');

goog.require('chartEditor.ui.dialog.Base');
goog.require('chartEditor.ui.presets.Widget');
goog.require('goog.ui.Dialog');


/**
 * Modal dialog to show preset preview and selector.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.dialog.Base}
 */
chartEditor.ui.dialog.PresetPreview = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.ui.dialog.PresetPreview.base(this, 'constructor', opt_class, opt_useIframeMask, opt_domHelper);
  this.setButtonSet(null);
};
goog.inherits(chartEditor.ui.dialog.PresetPreview, chartEditor.ui.dialog.Base);


/** @inheritDoc */
chartEditor.ui.dialog.PresetPreview.prototype.createDom = function() {
  chartEditor.ui.dialog.PresetPreview.base(this, 'createDom');
  goog.dom.classlist.add(this.getDialogElement(), goog.getCssName('anychart-ce-data-preview-dialog'));

  var predefinedDataSelector = new chartEditor.ui.presets.Widget(/** @type {chartEditor.model.Base} */ (this.getModel()));
  this.addChild(predefinedDataSelector, true);
};

