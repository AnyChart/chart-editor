goog.provide('chartEditor.controls.select.DataFieldSelectMenuItem');
goog.provide('chartEditor.controls.select.DataFieldSelectMenuItemRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.controls.select.DataFieldSelectMenuItem = function(opt_model, opt_domHelper, opt_renderer) {
    goog.ui.MenuItem.call(
        this,
        opt_model ? opt_model.caption : '',
        opt_model,
        opt_domHelper,
        opt_renderer || chartEditor.controls.select.DataFieldSelectMenuItemRenderer.getInstance()
    );
};
goog.inherits(chartEditor.controls.select.DataFieldSelectMenuItem, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.controls.select.DataFieldSelectMenuItemRenderer = function() {
    goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.controls.select.DataFieldSelectMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.controls.select.DataFieldSelectMenuItemRenderer);


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelectMenuItemRenderer.prototype.getCssClass = function() {
    return 'anychart-ce-control-menu-item';
};