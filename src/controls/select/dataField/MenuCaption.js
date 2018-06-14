goog.provide('chartEditor.controls.select.DataFieldSelectMenuCaption');
goog.provide('chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.controls.select.DataFieldSelectMenuCaption = function(opt_model, opt_domHelper, opt_renderer) {
    goog.ui.MenuItem.call(
        this,
        opt_model ? opt_model.caption : '',
        opt_model,
        opt_domHelper,
        opt_renderer || chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer.getInstance()
    );
    this.setSelectable(false);
    this.setCheckable(false);
};
goog.inherits(chartEditor.controls.select.DataFieldSelectMenuCaption, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer = function() {
    goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer);


/**
 * Overrides {@link goog.ui.ControlRenderer#createDom} by adding extra markup
 * and stying to the menu item's element if it is selectable or checkable.
 * @param {goog.ui.Control} item Menu item to render.
 * @return {Element} Root element for the item.
 * @override
 */
chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer.prototype.createDom = function(item) {
    var element = chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer.base(this, 'createDom', item);

    return element;
};


/** @inheritDoc */
chartEditor.controls.select.DataFieldSelectMenuCaptionRenderer.prototype.getCssClass = function() {
    return 'anychart-ce-control-menu-caption';
};