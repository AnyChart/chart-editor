goog.provide('chartEditor.ui.panel.Font');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.button.Bold');
goog.require('chartEditor.ui.control.button.Italic');
goog.require('chartEditor.ui.control.button.Underline');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.select.FontFamily');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Font = function(model, opt_domHelper) {
  chartEditor.ui.panel.Font.base(this, 'constructor', model, null, opt_domHelper);
  /**
   * Font color key. Used for non default color keys such as 'fill()'
   * @type {string}
   * */
  this.fontColorKey_ = 'fontColor()';

  this.fields_ = {
    'fontWeight': true,
    'fontStyle': true,
    'fontDecoration': true,
    'fontFamily': true,
    'fontSize': true,
    'fontColor': true,
    'format': false,
    'position': false,
    'anchor': false,
    'enabled': false
  };

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.Font, chartEditor.ui.Panel);

/**
 * Hide passed field in DOM.
 * @param {string} name
 * */
chartEditor.ui.panel.Font.prototype.hideField = function(name) {
  this.fields_[name] = false;
};


/**
 * Show passed field in DOM.
 * @param {string} name
 * */
chartEditor.ui.panel.Font.prototype.showField = function(name) {
  this.fields_[name] = true;
};


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.ui.panel.Font.CSS_CLASS = goog.getCssName('anychart-ce-panel-font');


/**
 * @param {string} fontColorKey
 */
chartEditor.ui.panel.Font.prototype.setFontColorKey = function(fontColorKey) {
  this.fontColorKey_ = fontColorKey;
};


/** @override */
chartEditor.ui.panel.Font.prototype.createDom = function() {
  chartEditor.ui.panel.Font.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.ui.panel.Font.CSS_CLASS);

  var content = this.getContentElement();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (this.fields_['enabled']) {
    var enabled = new chartEditor.ui.control.checkbox.Base();
    enabled.init(model, this.genKey('enabled()'));
    enabled.setCaption('Enabled');
    this.addChildControl(enabled);
  }
  var pointWidthLC;
  if (this.fields_['fontFamily']) {
    var fontFamily = new chartEditor.ui.control.select.FontFamily();
    pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(fontFamily, 'Family');
    pointWidthLC.init(model, this.genKey('fontFamily()'));
    this.addChildControl(pointWidthLC);
  }
  if (this.fields_['fontSize']) {
    var fontSizeSelect = new chartEditor.ui.control.comboBox.Base();
    fontSizeSelect.setOptions([10, 12, 14, 16, 18, 20, 22]);
    pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(fontSizeSelect, 'Font Size');
    pointWidthLC.init(model, this.genKey('fontSize()'));
    this.addChildControl(pointWidthLC);
  }

  if (this.fields_['format']) {
    var format = new chartEditor.ui.control.input.Base();
    var formatLC = new chartEditor.ui.control.wrapped.Labeled(format, 'Format');
    formatLC.init(model, this.genKey('format()'));
    this.addChildControl(formatLC);
  }

  if (this.fields_['position']) {
    var position = new chartEditor.ui.control.fieldSelect.Base();
    position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
    var positionLC = new chartEditor.ui.control.wrapped.Labeled(position, 'Labels position');
    positionLC.init(model, this.genKey('position()'));
    this.addChildControl(positionLC);
  }

  if (this.fields_['anchor']) {
    var anchor = new chartEditor.ui.control.fieldSelect.Base();
    anchor.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
    var anchorLC = new chartEditor.ui.control.wrapped.Labeled(anchor, 'Labels anchor');
    anchorLC.init(model, this.genKey('anchor()'));
    this.addChildControl(anchorLC);
  }

  /**@type {Node|null}*/
  var buttonsWrapper;

  if (this.fields_['fontWeight'] || this.fields_['fontStyle'] || this.fields_['fontDecoration']) {
    buttonsWrapper = goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-panel-font-style-buttons-right'));
  }

  if (this.fields_['fontWeight']) {
    var boldBtn = new chartEditor.ui.control.button.Bold();
    boldBtn.addClassName(goog.getCssName('anychart-ce-panel-bold'));
    boldBtn.init(model, this.genKey('fontWeight()'));
    this.addChildControl(boldBtn);
    goog.dom.appendChild(buttonsWrapper, boldBtn.getElement());
    boldBtn.setCollapsed(goog.ui.ButtonSide.END);
  }
  if (this.fields_['fontStyle']) {
    var italicBtn = new chartEditor.ui.control.button.Italic();
    italicBtn.init(model, this.genKey('fontStyle()'));
    this.addChildControl(italicBtn);
    goog.dom.appendChild(buttonsWrapper, italicBtn.getElement());
    italicBtn.setCollapsed(goog.ui.ButtonSide.END | goog.ui.ButtonSide.START);
  }
  if (this.fields_['fontDecoration']) {
    var underlineBtn = new chartEditor.ui.control.button.Underline();
    underlineBtn.init(model, this.genKey('fontDecoration()'));
    this.addChildControl(underlineBtn);
    goog.dom.appendChild(buttonsWrapper, underlineBtn.getElement());
    underlineBtn.setCollapsed(goog.ui.ButtonSide.START);
  }
  if (this.fields_['fontColor']) {
    var colorPicker = new chartEditor.ui.control.colorPicker.Base();
    colorPicker.addClassName(goog.getCssName('anychart-ce-panel-font-color'));
    this.addChild(colorPicker, true);
    colorPicker.init(model, this.genKey(this.fontColorKey_));
    this.addChildControl(colorPicker);
  }
  if (goog.isDef(buttonsWrapper)) {
    goog.dom.appendChild(content, buttonsWrapper);
  }
};
