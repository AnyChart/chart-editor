goog.provide('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem');
goog.provide('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem = function(opt_model, opt_domHelper, opt_renderer) {
    goog.ui.MenuItem.call(
        this,
        opt_model ? opt_model.caption : '',
        opt_model,
        opt_domHelper,
        opt_renderer || anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer.getInstance()
    );
};
goog.inherits(anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer = function() {
    goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer);


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataFieldSelectMenuItemRenderer.prototype.getCssClass = function() {
    return 'anychart-control-menu-item';
};