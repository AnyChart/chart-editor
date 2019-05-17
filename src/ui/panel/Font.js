goog.provide('chartEditor.ui.panel.Font');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.button.Bold');
goog.require('chartEditor.ui.control.button.Italic');
goog.require('chartEditor.ui.control.button.Underline');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
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

  this.options['fontWeight'] = true;
  this.options['fontStyle'] = true;
  this.options['fontDecoration'] = true;
  this.options['fontFamily'] = true;
  this.options['fontSize'] = true;
  this.options['fontColor'] = true;

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.Font, chartEditor.ui.Panel);


/**
 * @param {string} fontColorKey
 */
chartEditor.ui.panel.Font.prototype.setFontColorKey = function(fontColorKey) {
  this.fontColorKey_ = fontColorKey;
};


/** @override */
chartEditor.ui.panel.Font.prototype.createDom = function() {
  chartEditor.ui.panel.Font.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), goog.getCssName('anychart-ce-panel-font'));

  var content = this.getContentElement();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var pointWidthLC;
  if (this.getOption('fontFamily')) {
    var fontFamily = new chartEditor.ui.control.select.FontFamily();
    pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(fontFamily, 'Font family');
    pointWidthLC.init(model, this.genKey('fontFamily()'));
    this.addChildControl(pointWidthLC);
  }

  if (this.getOption('fontSize')) {
    var fontSizeSelect = new chartEditor.ui.control.comboBox.Base();
    fontSizeSelect.setOptions([10, 12, 14, 16, 18, 20, 22]);
    pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(fontSizeSelect, 'Font Size');
    pointWidthLC.init(model, this.genKey('fontSize()'));
    this.addChildControl(pointWidthLC);
  }

  /**@type {Node|null}*/
  var buttonsWrapper;

  if (this.getOption('fontWeight') || this.getOption('fontStyle') || this.getOption('fontDecoration')) {
    buttonsWrapper = goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-panel-font-style-buttons-right'));
  }

  if (this.getOption('fontWeight')) {
    var boldBtn = new chartEditor.ui.control.button.Bold();
    boldBtn.addClassName(goog.getCssName('anychart-ce-panel-bold'));
    boldBtn.init(model, this.genKey('fontWeight()'));
    this.addChildControl(boldBtn);
    goog.dom.appendChild(buttonsWrapper, boldBtn.getElement());
    boldBtn.setCollapsed(goog.ui.ButtonSide.END);
  }

  if (this.getOption('fontStyle')) {
    var italicBtn = new chartEditor.ui.control.button.Italic();
    italicBtn.init(model, this.genKey('fontStyle()'));
    this.addChildControl(italicBtn);
    goog.dom.appendChild(buttonsWrapper, italicBtn.getElement());
    italicBtn.setCollapsed(goog.ui.ButtonSide.END | goog.ui.ButtonSide.START);
  }

  if (this.getOption('fontDecoration')) {
    var underlineBtn = new chartEditor.ui.control.button.Underline();
    underlineBtn.init(model, this.genKey('fontDecoration()'));
    this.addChildControl(underlineBtn);
    goog.dom.appendChild(buttonsWrapper, underlineBtn.getElement());
    underlineBtn.setCollapsed(goog.ui.ButtonSide.START);
  }

  if (this.getOption('fontColor')) {
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
