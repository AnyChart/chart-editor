goog.provide('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.provide('chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.ui.control.fieldSelect.SelectMenuItem = function(opt_model, opt_domHelper, opt_renderer) {
    goog.ui.MenuItem.call(
        this,
        opt_model ? opt_model.caption : '',
        opt_model,
        opt_domHelper,
        opt_renderer || chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer.getInstance()
    );
};
goog.inherits(chartEditor.ui.control.fieldSelect.SelectMenuItem, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer = function() {
    goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer);


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.SelectMenuItemRenderer.prototype.getCssClass = function() {
    return 'anychart-ce-control-menu-item';
};