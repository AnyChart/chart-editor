goog.provide('chartEditor.ui.control.Menu');
goog.provide('chartEditor.ui.control.MenuRenderer');

goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuRenderer');



// region ---- DataFieldMenu
/**
 * @param {string=} opt_additionalClassName
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {goog.ui.MenuRenderer=} opt_renderer
 * @constructor
 * @extends {goog.ui.Menu}
 */
chartEditor.ui.control.Menu = function (opt_additionalClassName, opt_domHelper, opt_renderer) {
  chartEditor.ui.control.Menu.base(this, 'constructor',
      opt_domHelper,
      opt_renderer || chartEditor.ui.control.MenuRenderer.getInstance());

  /**
   * @type {string}
   */
  this.additionalClassName = opt_additionalClassName || '';
};
goog.inherits(chartEditor.ui.control.Menu, goog.ui.Menu);


/** @inheritDoc */
chartEditor.ui.control.Menu.prototype.setVisible = function(show, opt_force, opt_e) {
  if (show) {
    var select = this.getParent();
    var bounds = goog.style.getBounds(select.getElement());
    goog.style.setWidth(this.getElement(), bounds.width);
    goog.style.setPosition(this.getElement(), bounds.left);
  }
  return chartEditor.ui.control.Menu.base(this, 'setVisible', show, opt_force, opt_e);
};
// endregion


// region ---- DataFieldMenuRenderer
/**
 * @param {string=} opt_ariaRole Optional ARIA role used for the element.
 * @constructor
 * @extends {goog.ui.MenuRenderer}
 */
chartEditor.ui.control.MenuRenderer = function (opt_ariaRole) {
  chartEditor.ui.control.MenuRenderer.base(this, 'constructor', opt_ariaRole);
};
goog.inherits(chartEditor.ui.control.MenuRenderer, goog.ui.MenuRenderer);
goog.addSingletonGetter(chartEditor.ui.control.MenuRenderer);


/** @inheritDoc */
chartEditor.ui.control.MenuRenderer.prototype.createDom = function(container) {
  container = /** @type {chartEditor.ui.control.Menu} */(container);
  var element = chartEditor.ui.control.MenuRenderer.base(this, 'createDom', container);
  if (container.additionalClassName) goog.dom.classlist.add(element, container.additionalClassName);
  return element;
};


/** @inheritDoc */
chartEditor.ui.control.MenuRenderer.prototype.getCssClass = function () {
  return 'anychart-ce-control-menu';
};
// endregion
