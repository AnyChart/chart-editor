goog.provide('chartEditor.ui.PanelZippy');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.PanelIndexed');
goog.require('goog.ui.AnimatedZippy');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelIndexed}
 */
chartEditor.ui.PanelZippy = function(model, index, opt_name, opt_domHelper) {
  chartEditor.ui.PanelZippy.base(this, 'constructor', model, index, opt_name, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-panel-zippy'));

  this.locked_ = false;
};
goog.inherits(chartEditor.ui.PanelZippy, chartEditor.ui.PanelIndexed);


/**
 * Expands panel.
 */
chartEditor.ui.PanelZippy.prototype.expand = function() {
  if (this.zippy_ && !this.locked_) this.zippy_.expand();
};


/**
 * Lock panel to prevent user's interaction
 * @param {boolean} value
 */
chartEditor.ui.PanelZippy.prototype.lock = function(value) {
  this.locked_ = value;
  goog.dom.classlist.enable(this.getElement(), 'locked', this.locked_);
debugger
  if (this.locked_)
    this.zippy_.collapse();
};


/** @override */
chartEditor.ui.PanelZippy.prototype.createDom = function() {
  chartEditor.ui.PanelZippy.base(this, 'createDom');

  // region == zippyHeader element ==
  var zippyHeader = new chartEditor.ui.Component();
  zippyHeader.addClassName('zippy-header');
  this.addChild(zippyHeader, true);
  this.zippyHeader = zippyHeader;

  if (this.topEl) {
    goog.dom.appendChild(this.zippyHeader.getElement(), this.topEl);
  }

  if (this.allowReset()) {
    goog.dom.appendChild(this.zippyHeader.getElement(), this.resetButton_.getElement());
  }

  this.plusMinus_ = goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-toggle'), [
    goog.dom.createDom(goog.dom.TagName.DIV, 'expand ac ac-chevron-circle-down'),
    goog.dom.createDom(goog.dom.TagName.DIV, 'collapse ac ac-chevron-circle-up')
  ]);
  this.zippyHeader.getElement().appendChild(this.plusMinus_);
  // endregion

  // region == zippyContent element ==
  var zippyContent = new chartEditor.ui.Component();
  this.addChild(zippyContent, true);

  var innerContent = new chartEditor.ui.Component();
  zippyContent.addClassName('zippy-content');
  zippyContent.addChild(innerContent, true);
  this.zippyContent = innerContent;

  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));

  this.zippy_ = new goog.ui.AnimatedZippy(zippyHeader.getElement(), zippyContent.getElement());
  this.zippy_.setHandleKeyboardEvents(false);
  this.zippy_.setHandleMouseEvents(false);

  this.getHandler().listen(this.plusMinus_, goog.events.EventType.MOUSEDOWN, function() {
    console.log('MOUSEDOWN', this);
    // this.zippy_.toggle();
  });

  this.getHandler().listen(this.plusMinus_, goog.events.EventType.CLICK, function() {
    console.log('toggle', this);
    //this.zippy_.toggle();
  });
  // endregion
};


/** @override */
chartEditor.ui.PanelZippy.prototype.addChildControl = function(control, opt_index) {
  var added = chartEditor.ui.PanelZippy.base(this, 'addChildControl', control);

  if (added && this.zippyContent) {
    this.removeChild(control, true);
    opt_index = goog.isDef(opt_index) ? opt_index : this.zippyContent.getChildCount();
    this.zippyContent.addChildAt(control, opt_index, true);
  }

  return added;
};


/**
 * Adds control to header.
 * @param {chartEditor.ui.Panel|chartEditor.ui.control.wrapped.Labeled|chartEditor.ui.control.checkbox.Base|chartEditor.ui.control.select.Base|chartEditor.ui.control.comboBox.Base|chartEditor.ui.control.colorPicker.Base|chartEditor.ui.control.input.Base} control
 * @return {boolean}
 */
chartEditor.ui.PanelZippy.prototype.addHeaderChildControl = function(control) {
  var added = chartEditor.ui.PanelZippy.superClass_.addChildControl.call(this, control);

  if (added) {
    this.removeChild(control, true);
    this.zippyHeader.addChild(control, true);
  }

  return added;
};


/** @override */
chartEditor.ui.PanelZippy.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.zippyContent.getElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-separator-gaps')));
};