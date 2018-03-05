goog.provide('chartEditor.SettingsPanelZippy');

goog.require('chartEditor.Component');
goog.require('chartEditor.SettingsPanelIndexed');
goog.require('goog.ui.AnimatedZippy');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelIndexed}
 */
chartEditor.SettingsPanelZippy = function(model, index, opt_name, opt_domHelper) {
  chartEditor.SettingsPanelZippy.base(this, 'constructor', model, index, opt_name, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-zippy'));
};
goog.inherits(chartEditor.SettingsPanelZippy, chartEditor.SettingsPanelIndexed);


/**
 * Expands panel.
 */
chartEditor.SettingsPanelZippy.prototype.expand = function() {
  if (this.zippy_) this.zippy_.expand();
};


/** @override */
chartEditor.SettingsPanelZippy.prototype.createDom = function() {
  chartEditor.SettingsPanelZippy.base(this, 'createDom');

  // region == zippyHeader element ==
  var zippyHeader = new chartEditor.Component();
  zippyHeader.addClassName('zippy-header');
  this.addChild(zippyHeader, true);
  this.zippyHeader = zippyHeader;

  if (this.topEl)
    goog.dom.appendChild(this.zippyHeader.getElement(), this.topEl);

  var plusMinus = goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-plus-minus'), [
    goog.dom.createDom(goog.dom.TagName.DIV, 'expand ac ac-chevron-circle-down'),
    goog.dom.createDom(goog.dom.TagName.DIV, 'collapse ac ac-chevron-circle-up')
  ]);
  this.zippyHeader.getElement().appendChild(plusMinus);
  // endregion

  // region == zippyContent element ==
  var zippyContent = new chartEditor.Component();
  this.addChild(zippyContent, true);

  var innerContent = new chartEditor.Component();
  zippyContent.addClassName('zippy-content');
  zippyContent.addChild(innerContent, true);
  this.zippyContent = innerContent;

  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));

  this.zippy_ = new goog.ui.AnimatedZippy(zippyHeader.getElement(), zippyContent.getElement());
  this.zippy_.setHandleKeyboardEvents(false);
  this.zippy_.setHandleMouseEvents(false);
  this.getHandler().listen(plusMinus, goog.events.EventType.CLICK, function() {
    this.zippy_.toggle();
  });
  // endregion
};


/** @override */
chartEditor.SettingsPanelZippy.prototype.addChildControl = function(control, opt_index) {
  var added = chartEditor.SettingsPanelZippy.base(this, 'addChildControl', control);

  if (added && this.zippyContent) {
    this.removeChild(control, true);
    opt_index = goog.isDef(opt_index) ? opt_index : this.zippyContent.getChildCount();
    this.zippyContent.addChildAt(control, opt_index, true);
  }

  return added;
};


/**
 * Adds control to header.
 * @param {chartEditor.SettingsPanel|chartEditor.controls.LabeledControl|chartEditor.checkbox.Base|chartEditor.controls.select.Base|chartEditor.comboBox.Base|chartEditor.colorPicker.Base|chartEditor.input.Base} control
 * @return {boolean}
 */
chartEditor.SettingsPanelZippy.prototype.addHeaderChildControl = function(control) {
  var added = chartEditor.SettingsPanelZippy.superClass_.addChildControl.call(this, control);

  if (added) {
    this.removeChild(control, true);
    this.zippyHeader.addChild(control, true);
  }

  return added;
};


/** @override */
chartEditor.SettingsPanelZippy.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));
};