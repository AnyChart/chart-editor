goog.provide('chartEditor.ui.dialog.Base');

goog.require('goog.ui.Dialog');


/**
 * Modal dialog for adding custom data on Prepare Data step.
 *
 * @param {string=} opt_class
 * @param {boolean=} opt_useIframeMask
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Dialog}
 */
chartEditor.ui.dialog.Base = function(opt_class, opt_useIframeMask, opt_domHelper) {
  chartEditor.ui.dialog.Base.base(
      this,
      'constructor',
      opt_class || goog.getCssName('anychart-ce-dialog'),
      opt_useIframeMask,
      opt_domHelper);
};
goog.inherits(chartEditor.ui.dialog.Base, goog.ui.Dialog);


/**
 * @type {Array<string>|null}
 * @private
 */
chartEditor.ui.dialog.Base.prototype.extraClassNames_ = null;


/**
 * Add the given class name to the list of classes to be applied to
 * the ui's root element.
 * @param {string} className
 */
chartEditor.ui.dialog.Base.prototype.addClassName = function(className) {
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
 * the ui's root element.
 * @param {string} className Class name to be removed from the ui's root
 *     element.
 */
chartEditor.ui.dialog.Base.prototype.removeClassName = function(className) {
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


/** @inheritDoc */
chartEditor.ui.dialog.Base.prototype.createDom = function(){
  chartEditor.ui.dialog.Base.base(this, 'createDom');

  var element = this.getElement();
  if (element && this.extraClassNames_) {
    goog.dom.classlist.addAll(element, this.extraClassNames_);
  }

  var titleCloseEl = this.getTitleCloseElement();
  goog.dom.classlist.add(titleCloseEl, goog.getCssName('ac'));
  goog.dom.classlist.add(titleCloseEl, goog.getCssName('ac-plus'));
};


//exports
(function () {
  var proto = chartEditor.ui.dialog.Base.prototype;
  proto['addClassName'] = proto.addClassName;
  proto['removeClassName'] = proto.removeClassName;
})();