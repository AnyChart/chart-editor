goog.provide('chartEditor.checkbox.Renderer');

goog.require('goog.ui.CheckboxRenderer');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');


/**
 * Select renderer.
 * @constructor
 * @extends {goog.ui.CheckboxRenderer}
 */
chartEditor.checkbox.Renderer = function() {
  chartEditor.checkbox.Renderer.base(this, 'constructor');
};
goog.inherits(chartEditor.checkbox.Renderer, goog.ui.CheckboxRenderer);
goog.addSingletonGetter(chartEditor.checkbox.Renderer);


/** @override */
chartEditor.checkbox.Renderer.prototype.createDom = function(checkbox) {
  var dom = checkbox.getDomHelper();
  var element = dom.createDom(goog.dom.TagName.SPAN,
      this.getClassNames(checkbox).join(' '),
      dom.createDom(goog.dom.TagName.SPAN, [
            goog.getCssName(this.getCssClass(), 'element'),
            goog.ui.INLINE_BLOCK_CLASSNAME
          ],
          dom.createDom(goog.dom.TagName.DIV, [
            goog.getCssName(this.getCssClass(), 'checkmark'),
            'ac ac-check'])),

      checkbox.getCaption() ? dom.createDom(goog.dom.TagName.DIV, [
            goog.getCssName(this.getCssClass(), 'caption'),
            goog.ui.INLINE_BLOCK_CLASSNAME
          ],
          checkbox.getCaption()) : null
  );

  var state = checkbox.getChecked();
  this.setCheckboxState(element, state);

  return element;
};


/**
 * @param {Element} element Root element of the checkbox whose content element
 *     is to be returned.
 * @return {Element} The checkbox's content element.
 * @override
 */
chartEditor.checkbox.Renderer.prototype.getContentElement = function(element) {
  if (element) {
    var captionElem = goog.dom.getElementsByTagNameAndClass(
        '*', goog.getCssName(this.getCssClass(), 'caption'), element)[0];
    return captionElem;
  }
  return null;
};
