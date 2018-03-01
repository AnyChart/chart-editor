goog.provide('anychart.chartEditorModule.SettingsPanelZippy');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.SettingsPanelIndexed');
goog.require('goog.ui.AnimatedZippy');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelIndexed}
 */
anychart.chartEditorModule.SettingsPanelZippy = function(model, index, opt_name, opt_domHelper) {
  anychart.chartEditorModule.SettingsPanelZippy.base(this, 'constructor', model, index, opt_name, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-panel-zippy'));
};
goog.inherits(anychart.chartEditorModule.SettingsPanelZippy, anychart.chartEditorModule.SettingsPanelIndexed);


/**
 * Expands panel.
 */
anychart.chartEditorModule.SettingsPanelZippy.prototype.expand = function() {
  if (this.zippy_) this.zippy_.expand();
};


/** @override */
anychart.chartEditorModule.SettingsPanelZippy.prototype.createDom = function() {
  anychart.chartEditorModule.SettingsPanelZippy.base(this, 'createDom');

  // region == zippyHeader element ==
  var zippyHeader = new anychart.chartEditorModule.Component();
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
  var zippyContent = new anychart.chartEditorModule.Component();
  this.addChild(zippyContent, true);

  var innerContent = new anychart.chartEditorModule.Component();
  zippyContent.addClassName('zippy-content');
  zippyContent.addChild(innerContent, true);
  this.zippyContent = innerContent;

  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-clearboth')));

  this.zippy_ = new goog.ui.AnimatedZippy(zippyHeader.getElement(), zippyContent.getElement());
  this.zippy_.setHandleKeyboardEvents(false);
  this.zippy_.setHandleMouseEvents(false);
  this.getHandler().listen(plusMinus, goog.events.EventType.CLICK, function() {
    this.zippy_.toggle();
  });
  // endregion
};


/** @override */
anychart.chartEditorModule.SettingsPanelZippy.prototype.addChildControl = function(control, opt_index) {
  var added = anychart.chartEditorModule.SettingsPanelZippy.base(this, 'addChildControl', control);

  if (added && this.zippyContent) {
    this.removeChild(control, true);
    opt_index = goog.isDef(opt_index) ? opt_index : this.zippyContent.getChildCount();
    this.zippyContent.addChildAt(control, opt_index, true);
  }

  return added;
};


/**
 * Adds control to header.
 * @param {anychart.chartEditorModule.SettingsPanel|anychart.chartEditorModule.controls.LabeledControl|anychart.chartEditorModule.checkbox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.colorPicker.Base|anychart.chartEditorModule.input.Base} control
 * @return {boolean}
 */
anychart.chartEditorModule.SettingsPanelZippy.prototype.addHeaderChildControl = function(control) {
  var added = anychart.chartEditorModule.SettingsPanelZippy.superClass_.addChildControl.call(this, control);

  if (added) {
    this.removeChild(control, true);
    this.zippyHeader.addChild(control, true);
  }

  return added;
};


/** @override */
anychart.chartEditorModule.SettingsPanelZippy.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));
};