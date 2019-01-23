goog.provide('chartEditor.ui.control.select.MenuItem');
goog.provide('chartEditor.ui.control.select.MenuItemRenderer');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');


/**
 * @param {Object=} opt_model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuItemRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
chartEditor.ui.control.select.MenuItem = function(opt_model, opt_domHelper, opt_renderer) {
  goog.ui.MenuItem.call(
      this,
      opt_model ? opt_model.caption : '',
      opt_model,
      opt_domHelper,
      opt_renderer || chartEditor.ui.control.select.MenuItemRenderer.getInstance()
  );
  //this.addClassName(chartEditor.ui.control.select.MenuItem.CSS_CLASS);
};
goog.inherits(chartEditor.ui.control.select.MenuItem, goog.ui.MenuItem);


/**
 * @constructor
 * @extends {goog.ui.MenuItemRenderer}
 */
chartEditor.ui.control.select.MenuItemRenderer = function() {
  goog.ui.MenuItemRenderer.call(this);
};
goog.inherits(chartEditor.ui.control.select.MenuItemRenderer, goog.ui.MenuItemRenderer);
goog.addSingletonGetter(chartEditor.ui.control.select.MenuItemRenderer);


/**
 * Overrides {@link goog.ui.ControlRenderer#createDom} by adding extra markup
 * and stying to the menu item's element if it is selectable or checkable.
 * @param {goog.ui.Control} item Menu item to render.
 * @return {Element} Root element for the item.
 * @override
 */
chartEditor.ui.control.select.MenuItemRenderer.prototype.createDom = function(item) {
  var element = chartEditor.ui.control.select.MenuItemRenderer.base(this, 'createDom', item);

  //var content = this.getContentElement(element);

  var iconUrl = item.getModel().icon;
  var icon = goog.dom.createDom('img', {'src': iconUrl});
  goog.dom.insertChildAt(element, icon, 0);
  return element;
};


// /** @inheritDoc */
// chartEditor.ui.control.select.MenuItemRenderer.prototype.getCssClass = function() {
//   return chartEditor.ui.control.select.MenuItem.CSS_CLASS;
// };