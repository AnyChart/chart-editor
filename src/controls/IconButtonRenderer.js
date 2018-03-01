goog.provide('chartEditor.IconButtonRenderer');

goog.require('goog.ui.CustomButtonRenderer');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');



/**
 * Icon button renderer.
 *
 * @constructor
 * @extends {goog.ui.CustomButtonRenderer}
 */
chartEditor.IconButtonRenderer = function() {
  chartEditor.IconButtonRenderer.base(this, 'constructor');
};
goog.inherits(chartEditor.IconButtonRenderer, goog.ui.CustomButtonRenderer);
goog.addSingletonGetter(chartEditor.IconButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
chartEditor.IconButtonRenderer.CSS_CLASS = goog.getCssName('anychart-icon-button');


/** @override */
chartEditor.IconButtonRenderer.prototype.getCssClass = function() {
  return chartEditor.IconButtonRenderer.CSS_CLASS;
};


/** @override */
chartEditor.IconButtonRenderer.prototype.createDom = function(control) {
  var button = /** @type {goog.ui.Button} */ (control);
  var classNames = this.getClassNames(button);
  var attributes = {
    'class': goog.ui.INLINE_BLOCK_CLASSNAME + ' ' + classNames.join(' ')
  };
  var buttonElement = button.getDomHelper().createDom(
      goog.dom.TagName.DIV, attributes);
  this.setTooltip(
      buttonElement, /** @type {!string}*/ (button.getTooltip()));

  return buttonElement;
};


/** @override */
chartEditor.IconButtonRenderer.prototype.getContentElement = function(element) {
  return element;
};
