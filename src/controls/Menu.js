goog.provide('chartEditor.controls.Menu');
goog.provide('chartEditor.controls.MenuRenderer');

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
chartEditor.controls.Menu = function (opt_additionalClassName, opt_domHelper, opt_renderer) {
  chartEditor.controls.Menu.base(this, 'constructor',
      opt_domHelper,
      opt_renderer || chartEditor.controls.MenuRenderer.getInstance());

  /**
   * @type {string}
   */
  this.additionalClassName = opt_additionalClassName || '';
};
goog.inherits(chartEditor.controls.Menu, goog.ui.Menu);


/** @inheritDoc */
chartEditor.controls.Menu.prototype.setVisible = function(show, opt_force, opt_e) {
  if (show) {
    var select = this.getParent();
    var bounds = goog.style.getBounds(select.getElement());
    goog.style.setWidth(this.getElement(), bounds.width);
    goog.style.setPosition(this.getElement(), bounds.left);
  }
  return chartEditor.controls.Menu.base(this, 'setVisible', show, opt_force, opt_e);
};
// endregion


// region ---- DataFieldMenuRenderer
/**
 * @param {string=} opt_ariaRole Optional ARIA role used for the element.
 * @constructor
 * @extends {goog.ui.MenuRenderer}
 */
chartEditor.controls.MenuRenderer = function (opt_ariaRole) {
  chartEditor.controls.MenuRenderer.base(this, 'constructor', opt_ariaRole);
};
goog.inherits(chartEditor.controls.MenuRenderer, goog.ui.MenuRenderer);
goog.addSingletonGetter(chartEditor.controls.MenuRenderer);


/** @inheritDoc */
chartEditor.controls.MenuRenderer.prototype.createDom = function(container) {
  container = /** @type {chartEditor.controls.Menu} */(container);
  var element = chartEditor.controls.MenuRenderer.base(this, 'createDom', container);
  if (container.additionalClassName) goog.dom.classlist.add(element, container.additionalClassName);
  return element;
};


/** @inheritDoc */
chartEditor.controls.MenuRenderer.prototype.getCssClass = function () {
  return 'anychart-ce-control-menu';
};
// endregion
