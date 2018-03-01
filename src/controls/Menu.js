goog.provide('anychart.chartEditorModule.controls.Menu');
goog.provide('anychart.chartEditorModule.controls.MenuRenderer');

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
anychart.chartEditorModule.controls.Menu = function (opt_additionalClassName, opt_domHelper, opt_renderer) {
  anychart.chartEditorModule.controls.Menu.base(this, 'constructor',
      opt_domHelper,
      opt_renderer || anychart.chartEditorModule.controls.MenuRenderer.getInstance());

  /**
   * @type {string}
   */
  this.additionalClassName = opt_additionalClassName || '';
};
goog.inherits(anychart.chartEditorModule.controls.Menu, goog.ui.Menu);


/** @inheritDoc */
anychart.chartEditorModule.controls.Menu.prototype.setVisible = function(show, opt_force, opt_e) {
  if (show) {
    var select = this.getParent();
    var bounds = goog.style.getBounds(select.getElement());
    goog.style.setWidth(this.getElement(), bounds.width);
    goog.style.setPosition(this.getElement(), bounds.left);
  }
  return anychart.chartEditorModule.controls.Menu.base(this, 'setVisible', show, opt_force, opt_e);
};
// endregion


// region ---- DataFieldMenuRenderer
/**
 * @param {string=} opt_ariaRole Optional ARIA role used for the element.
 * @constructor
 * @extends {goog.ui.MenuRenderer}
 */
anychart.chartEditorModule.controls.MenuRenderer = function (opt_ariaRole) {
  anychart.chartEditorModule.controls.MenuRenderer.base(this, 'constructor', opt_ariaRole);
};
goog.inherits(anychart.chartEditorModule.controls.MenuRenderer, goog.ui.MenuRenderer);
goog.addSingletonGetter(anychart.chartEditorModule.controls.MenuRenderer);


/** @inheritDoc */
anychart.chartEditorModule.controls.MenuRenderer.prototype.createDom = function(container) {
  container = /** @type {anychart.chartEditorModule.controls.Menu} */(container);
  var element = anychart.chartEditorModule.controls.MenuRenderer.base(this, 'createDom', container);
  if (container.additionalClassName) goog.dom.classlist.add(element, container.additionalClassName);
  return element;
};


/** @inheritDoc */
anychart.chartEditorModule.controls.MenuRenderer.prototype.getCssClass = function () {
  return 'anychart-control-menu';
};
// endregion
