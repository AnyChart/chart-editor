goog.provide('chartEditor.ui.control.colorPicker.Renderer');

goog.require('goog.asserts');
goog.require('goog.color');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');
goog.require('goog.ui.FlatMenuButtonRenderer');
goog.require('goog.userAgent');



/**
 * Renderer for {@link chartEditor.ui.control.colorPicker.Base}s.
 * @constructor
 * @extends {goog.ui.FlatMenuButtonRenderer}
 */
chartEditor.ui.control.colorPicker.Renderer = function() {
  chartEditor.ui.control.colorPicker.Renderer.base(this, 'constructor');
};
goog.inherits(chartEditor.ui.control.colorPicker.Renderer, goog.ui.FlatMenuButtonRenderer);
goog.addSingletonGetter(chartEditor.ui.control.colorPicker.Renderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
chartEditor.ui.control.colorPicker.Renderer.CSS_CLASS = goog.getCssName('anychart-ce-color-menu-button');


/**
 * Overrides the superclass implementation by wrapping the caption text or DOM
 * structure in a color indicator element.  Creates the following DOM structure:
 *   <div class="goog-inline-block goog-menu-button-caption">
 *     <div class="goog-color-menu-button-indicator">
 *       Contents...
 *     </div>
 *   </div>
 * The 'goog-color-menu-button-indicator' style should be defined to have a
 * bottom border of nonzero width and a default color that blends into its
 * background.
 * @param {goog.ui.ControlContent} content Text caption or DOM structure.
 * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
 * @return {Element} Caption element.
 * @override
 */
chartEditor.ui.control.colorPicker.Renderer.prototype.createCaption = function(content, dom) {
  return chartEditor.ui.control.colorPicker.Renderer.superClass_.createCaption.call(this,
      chartEditor.ui.control.colorPicker.Renderer.wrapCaption(content, dom), dom);
};


/**
 * Wrap a caption in a div with the color-menu-button-indicator CSS class.
 * @param {goog.ui.ControlContent} content Text caption or DOM structure.
 * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 */
chartEditor.ui.control.colorPicker.Renderer.wrapCaption = function(content, dom) {
  return dom.createDom(goog.dom.TagName.DIV,
      goog.getCssName(chartEditor.ui.control.colorPicker.Renderer.CSS_CLASS, 'indicator'),
      content);
};


/**
 * Takes a color menu button control's root element and a value object
 * (which is assumed to be a color), and updates the button's DOM to reflect
 * the new color.  Overrides {@link goog.ui.ButtonRenderer#setValue}.
 * @param {Element} element The button control's root element (if rendered).
 * @param {*} value New value; assumed to be a color spec string.
 * @override
 */
chartEditor.ui.control.colorPicker.Renderer.prototype.setValue = function(element, value) {
  if (element) {
    chartEditor.ui.control.colorPicker.Renderer.setCaptionValue(
        this.getContentElement(element), value);
  }
};


/**
 * Takes a control's content element and a value object (which is assumed
 * to be a color), and updates its DOM to reflect the new color.
 * @param {Element} caption A content element of a control.
 * @param {*} value New value; assumed to be a color spec string.
 */
chartEditor.ui.control.colorPicker.Renderer.setCaptionValue = function(caption, value) {
  // Assume that the caption's first child is the indicator.
  if (caption && caption.firstChild) {
    // Normalize the value to a hex color spec or null (otherwise setting
    // borderBottomColor will cause a JS error on IE).
    var hexColor;

    var strValue = /** @type {string} */ (value);
    hexColor = strValue && goog.color.isValidColor(strValue) ?
        goog.color.parse(strValue).hex :
        null;

    // Stupid IE6/7 doesn't do transparent borders.
    // TODO(attila): Add user-agent version check when IE8 comes out...
    // caption.firstChild.style.borderBottomColor = hexColor ||
    //     (goog.userAgent.IE ? '' : 'transparent');
    caption.firstChild.style.backgroundColor = hexColor ||
        (goog.userAgent.IE ? '' : 'transparent');
  }
};


/**
 * Initializes the button's DOM when it enters the document.  Overrides the
 * superclass implementation by making sure the button's color indicator is
 * initialized.
 * @param {goog.ui.Control} button goog.ui.ColorMenuButton whose DOM is to be
 *     initialized as it enters the document.
 * @override
 */
chartEditor.ui.control.colorPicker.Renderer.prototype.initializeDom = function(button) {
  var buttonElement = button.getElement();
  goog.asserts.assert(buttonElement);
  this.setValue(buttonElement, button.getValue());
  goog.dom.classlist.add(buttonElement,
      chartEditor.ui.control.colorPicker.Renderer.CSS_CLASS);
  chartEditor.ui.control.colorPicker.Renderer.superClass_.initializeDom.call(this,
      button);
};

