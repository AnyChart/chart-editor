goog.provide('chartEditor.Component');

goog.require('goog.ui.Component');



/**
 * Component, that can be hidden.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {goog.ui.Component}
 */
chartEditor.Component = function(opt_domHelper) {
  chartEditor.Component.base(this, 'constructor', opt_domHelper);

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
goog.inherits(chartEditor.Component, goog.ui.Component);


/**
 * @type {Array<string>|null}
 * @private
 */
chartEditor.Component.prototype.extraClassNames_ = null;


/** @inheritDoc */
chartEditor.Component.prototype.createDom = function() {
  chartEditor.Component.base(this, 'createDom');

  var element = this.getElement();
  if (element && this.extraClassNames_) {
    goog.dom.classlist.addAll(element, this.extraClassNames_);
  }
  
  if (!this.isExcluded()) {
    var parent = this.getParent();
    this.exclude(parent && goog.isFunction(parent.isExcluded) && parent.isExcluded());
  }
};


/** @inheritDoc */
chartEditor.Component.prototype.enterDocument = function() {
  chartEditor.Component.base(this, 'enterDocument');

  if (!this.isExcluded()) {
    var parent = this.getParent();
    this.exclude(parent && goog.isFunction(parent.isExcluded) && parent.isExcluded());
  }

  if (this.hidden_)
    this.hide();
};


/**
 * Add the given class name to the list of classes to be applied to
 * the component's root element.
 * @param {string} className
 */
chartEditor.Component.prototype.addClassName = function(className) {
  if (className) {
    if (this.extraClassNames_) {
      if (!goog.array.contains(this.extraClassNames_, className)) {
        this.extraClassNames_.push(className);
      }
    } else {
      this.extraClassNames_ = [className];
    }
    var element = this.getElement();
    if (element) {
      goog.dom.classlist.add(element, className);
    }
  }
};


/**
 * Removes the given class name from the list of classes to be applied to
 * the component's root element.
 * @param {string} className Class name to be removed from the component's root
 *     element.
 */
chartEditor.Component.prototype.removeClassName = function(className) {
  if (className && this.extraClassNames_ && goog.array.remove(this.extraClassNames_, className)) {
    if (this.extraClassNames_.length === 0) {
      this.extraClassNames_ = null;
    }

    var element = this.getElement();
    if (element) {
      goog.dom.classlist.remove(element, className);
    }
  }
};


/**
 * @param {boolean} enabled
 */
chartEditor.Component.prototype.setVisible = function(enabled) {
  if (this.isInDocument())
    goog.style.setElementShown(this.getElement(), enabled);
};


/** @override */
chartEditor.Component.prototype.disposeInternal = function() {
  this.extraClassNames_ = null;
  chartEditor.Component.base(this, 'disposeInternal');
};


// region ---- event listeners
/** @inheritDoc */
chartEditor.Component.prototype.listen = function(type, listener, opt_useCapture, opt_listenerScope) {
  return chartEditor.Component.base(this, 'listen', String(type).toLowerCase(), listener, opt_useCapture, opt_listenerScope);
};


/** @inheritDoc */
chartEditor.Component.prototype.listenOnce = function(type, listener, opt_useCapture, opt_listenerScope) {
  return chartEditor.Component.base(this, 'listenOnce', String(type).toLowerCase(), listener, opt_useCapture, opt_listenerScope);
};


/** @inheritDoc */
chartEditor.Component.prototype.unlisten = function(type, listener, opt_useCapture, opt_listenerScope) {
  return chartEditor.Component.base(this, 'unlisten', String(type).toLowerCase(), listener, opt_useCapture, opt_listenerScope);
};


/** @inheritDoc */
chartEditor.Component.prototype.unlistenByKey = function(key) {
  return chartEditor.Component.base(this, 'unlistenByKey', key);
};


/** @inheritDoc */
chartEditor.Component.prototype.removeAllListeners = function(opt_type) {
  if (goog.isDef(opt_type)) opt_type = String(opt_type).toLowerCase();
  return chartEditor.Component.base(this, 'removeAllListeners', opt_type);
};
// endregion


/**
 * Hides component in DOM by setting 'display: none' style
 * @param {boolean=} opt_hide default TRUE
 */
chartEditor.Component.prototype.hide = function(opt_hide) {
  this.hidden_ = goog.isDef(opt_hide) ? opt_hide : true;
  if (this.isInDocument())
    goog.style.setElementShown(this.getElement(), !this.hidden_);
};


/**
 * Shows component in DOM by removing 'display: none' style
  @param {boolean=} opt_show default TRUE
 */
chartEditor.Component.prototype.show = function(opt_show) {
  var hide = goog.isDef(opt_show) ? !opt_show : false;
  this.hide(hide);
};


/**
 * Getter for hidden state.
 * @return {boolean}
 */
chartEditor.Component.prototype.isHidden = function() {
  return this.hidden_;
};


/** @param {boolean} value */
chartEditor.Component.prototype.exclude = function(value) {
  if (this.excluded !== value) {
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
chartEditor.Component.prototype.isExcluded = function() {
  return this.excluded;
};