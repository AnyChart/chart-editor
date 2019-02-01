goog.provide('chartEditor.ui.control.fieldSelect.SelectMenuCaption');
goog.provide('chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.ui.control.fieldSelect.SelectMenuCaption = function(opt_model, opt_domHelper, opt_renderer) {
    goog.ui.MenuItem.call(
        this,
        opt_model ? opt_model.caption : '',
        opt_model,
        opt_domHelper,
        opt_renderer || chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer.getInstance()
    );
    this.setSelectable(false);
    this.setCheckable(false);
};
goog.inherits(chartEditor.ui.control.fieldSelect.SelectMenuCaption, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer = function() {
    goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer);


/**
 * Overrides {@link goog.ui.ControlRenderer#createDom} by adding extra markup
 * and stying to the menu item's element if it is selectable or checkable.
 * @param {goog.ui.Control} item Menu item to render.
 * @return {Element} Root element for the item.
 * @override
 */
chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer.prototype.createDom = function(item) {
    var element = chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer.base(this, 'createDom', item);

    return element;
};


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.SelectMenuCaptionRenderer.prototype.getCssClass = function() {
    return 'anychart-ce-control-menu-caption';
};