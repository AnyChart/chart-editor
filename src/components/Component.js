goog.provide('anychart.chartEditorModule.Component');

goog.require('anychart.ui.Component');



/**
 * Component, that can be hidden.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.ui.Component}
 */
anychart.chartEditorModule.Component = function(opt_domHelper) {
  anychart.chartEditorModule.Component.base(this, 'constructor', opt_domHelper);

  /**
   * @type {boolean}
   * @private
   */
  this.hidden_ = false;


  /**
   * State of exclusion
   * @type {boolean}
   */
  this.excluded = false;
};
goog.inherits(anychart.chartEditorModule.Component, anychart.ui.Component);


/** @inheritDoc */
anychart.chartEditorModule.Component.prototype.createDom = function() {
  anychart.chartEditorModule.Component.base(this, 'createDom');

  if (!this.isExcluded()) {
    var parent = this.getParent();
    this.exclude(parent && goog.isFunction(parent.isExcluded) && parent.isExcluded());
  }
};


/** @inheritDoc */
anychart.chartEditorModule.Component.prototype.enterDocument = function() {
  anychart.chartEditorModule.Component.base(this, 'enterDocument');

  if (!this.isExcluded()) {
    var parent = this.getParent();
    this.exclude(parent && goog.isFunction(parent.isExcluded) && parent.isExcluded());
  }

  if (this.hidden_)
    this.hide();
};


/**
 * Hides component in DOM by setting 'display: none' style
 * @param {boolean=} opt_hide default TRUE
 */
anychart.chartEditorModule.Component.prototype.hide = function(opt_hide) {
  this.hidden_ = goog.isDef(opt_hide) ? opt_hide : true;
  if (this.isInDocument())
    goog.style.setElementShown(this.getElement(), !this.hidden_);
};


/**
 * Shows component in DOM by removing 'display: none' style
  @param {boolean=} opt_show default TRUE
 */
anychart.chartEditorModule.Component.prototype.show = function(opt_show) {
  var hide = goog.isDef(opt_show) ? !opt_show : false;
  this.hide(hide);
};


/**
 * Getter for hidden state.
 * @return {boolean}
 */
anychart.chartEditorModule.Component.prototype.isHidden = function() {
  return this.hidden_;
};


/** @param {boolean} value */
anychart.chartEditorModule.Component.prototype.exclude = function(value) {
  if (this.excluded != value) {
    for (var i = 0, count = this.getChildCount(); i < count; i++) {
      var child = this.getChildAt(i);
      if (goog.isFunction(child.exclude))
        child.exclude(value);
    }

    this.excluded = value;
  }
  this.hide(this.excluded);
};


/** @return {boolean} */
anychart.chartEditorModule.Component.prototype.isExcluded = function() {
  return this.excluded;
};