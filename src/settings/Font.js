goog.provide('chartEditor.settings.Font');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.button.Bold');
goog.require('chartEditor.button.Italic');
goog.require('chartEditor.button.Underline');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.select.FontFamily');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Font = function(model, opt_domHelper) {
  chartEditor.settings.Font.base(this, 'constructor', model, null, opt_domHelper);
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
    'fontColor': true
  };

  this.allowEnabled(false);
};
goog.inherits(chartEditor.settings.Font, chartEditor.SettingsPanel);

/**
 * Hide passed field in DOM.
 * @param {string} name
 * */
chartEditor.settings.Font.prototype.hideField = function(name) {
  this.fields_[name] = false;
};

/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Font.CSS_CLASS = goog.getCssName('anychart-ce-settings-font');


/**
 * @param {string} fontColorKey
 */
chartEditor.settings.Font.prototype.setFontColorKey = function(fontColorKey) {
  this.fontColorKey_ = fontColorKey;
};


/** @override */
chartEditor.settings.Font.prototype.createDom = function() {
  chartEditor.settings.Font.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.Font.CSS_CLASS);

  var content = this.getContentElement();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (this.fields_['fontFamily']) {
    var fontFamily = new chartEditor.controls.select.FontFamily();
    fontFamily.addClassName(goog.getCssName('anychart-ce-settings-font-family'));
    fontFamily.init(model, this.genKey('fontFamily()'));
    this.addChildControl(fontFamily);
  }
  if (this.fields_['fontSize']) {
    var fontSizeSelect = new chartEditor.comboBox.Base();
    fontSizeSelect.setOptions([10, 12, 14, 16, 18, 20, 22]);
    fontSizeSelect.init(model, this.genKey('fontSize()'));
    this.addChildControl(fontSizeSelect);
    goog.dom.classlist.add(fontSizeSelect.getElement(), goog.getCssName('anychart-ce-settings-font-size'));
  }
  /**@type {Node|null}*/
  var buttonsWrapper;

  if (this.fields_['fontWeight'] || this.fields_['fontStyle'] || this.fields_['fontDecoration']) {
    buttonsWrapper = goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-settings-font-style-buttons'));
  }

  if (this.fields_['fontWeight']) {
    var boldBtn = new chartEditor.button.Bold();
    boldBtn.addClassName(goog.getCssName('anychart-ce-settings-bold'));
    boldBtn.init(model, this.genKey('fontWeight()'));
    this.addChildControl(boldBtn);
    goog.dom.appendChild(buttonsWrapper, boldBtn.getElement());
    boldBtn.setCollapsed(goog.ui.ButtonSide.END);
  }
  if (this.fields_['fontStyle']) {
    var italicBtn = new chartEditor.button.Italic();
    italicBtn.init(model, this.genKey('fontStyle()'));
    this.addChildControl(italicBtn);
    goog.dom.appendChild(buttonsWrapper, italicBtn.getElement());
    italicBtn.setCollapsed(goog.ui.ButtonSide.END | goog.ui.ButtonSide.START);
  }
  if (this.fields_['fontDecoration']) {
    var underlineBtn = new chartEditor.button.Underline();
    underlineBtn.init(model, this.genKey('fontDecoration()'));
    this.addChildControl(underlineBtn);
    goog.dom.appendChild(buttonsWrapper, underlineBtn.getElement());
    underlineBtn.setCollapsed(goog.ui.ButtonSide.START);
  }
  if (this.fields_['fontColor']) {
    var colorPicker = new chartEditor.colorPicker.Base();
    colorPicker.addClassName(goog.getCssName('anychart-ce-settings-font-color'));
    this.addChild(colorPicker, true);
    colorPicker.init(model, this.genKey(this.fontColorKey_));
    this.addChildControl(colorPicker);
  }
  if (goog.isDef(buttonsWrapper)) {
    goog.dom.appendChild(content, buttonsWrapper);
  }
};
