goog.provide('chartEditor.ui.Preloader');

goog.require('goog.ui.Component');



/**
 * Preloader.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
chartEditor.ui.Preloader = function(opt_domHelper) {
  chartEditor.ui.Preloader.base(this, 'constructor', opt_domHelper);
};
goog.inherits(chartEditor.ui.Preloader, goog.ui.Component);


/** @type {string} */
chartEditor.ui.Preloader.CSS_CLASS = goog.getCssName('anychart-ce-loader');


/**
 * Whether the preloader is visible.
 * @type {boolean}
 * @private
 */
chartEditor.ui.Preloader.prototype.visible_ = false;


/**
 * Sets the visibility of the preloader.
 * Lazily renders the ui if needed.
 * @param {boolean=} opt_value Whether the preloader should be visible.
 * @return {boolean|!chartEditor.ui.Preloader}
 */
chartEditor.ui.Preloader.prototype.visible = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (opt_value === this.visible_) {
      return this;
    }

    if (opt_value) {
      if (!this.isInDocument()) {
        this.render();
      }
      this.show_();
    } else {
      this.hide_();
    }

    return this;
  }

  return this.visible_;
};


/**
 * Show preloader.
 * @private
 */
chartEditor.ui.Preloader.prototype.show_ = function() {
  this.visible_ = true;
  goog.style.setElementShown(this.getElement(), this.visible_);
};


/**
 * Hide preloader.
 * @private
 */
chartEditor.ui.Preloader.prototype.hide_ = function() {
  this.visible_ = false;
  goog.style.setElementShown(this.getElement(), this.visible_);
};


/**
 * Create logo.
 * @param {Element=} opt_element
 * @private
 */
chartEditor.ui.Preloader.prototype.createLogo_ = function(opt_element) {
  var dom = this.getDomHelper();
  var element = opt_element || this.getElement();
  var className = chartEditor.ui.Preloader.CSS_CLASS;
  goog.dom.classlist.add(element, className);

  var rotatingCover = dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName(className, 'rotating-cover'),
      dom.createDom(
          goog.dom.TagName.DIV,
          goog.getCssName(className, 'rotating-plane'),
          dom.createDom(
              goog.dom.TagName.DIV,
              goog.getCssName(className, 'chart-row'),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'green')
                  ]),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'orange')
                  ]),
              dom.createDom(
                  goog.dom.TagName.DIV,
                  [
                    goog.getCssName(className, 'chart-col'),
                    goog.getCssName(className, 'red')
                  ])
          )
      ));

  this.hide_();
  goog.dom.appendChild(element, rotatingCover);
};


/** @override */
chartEditor.ui.Preloader.prototype.createDom = function() {
  chartEditor.ui.Preloader.base(this, 'createDom');
  this.createLogo_();
};


/** @override */
chartEditor.ui.Preloader.prototype.decorateInternal = function(element) {
  chartEditor.ui.Preloader.base(this, 'decorateInternal', element);
  this.createLogo_(element);
};


/** @override */
chartEditor.ui.Preloader.prototype.enterDocument = function() {
  chartEditor.ui.Preloader.base(this, 'enterDocument');
};


/** @override */
chartEditor.ui.Preloader.prototype.exitDocument = function() {
  chartEditor.ui.Preloader.base(this, 'exitDocument');
};


/** @override */
chartEditor.ui.Preloader.prototype.disposeInternal = function() {
  chartEditor.ui.Preloader.base(this, 'disposeInternal');
};


//exports
(function() {
  var proto = chartEditor.ui.Preloader.prototype;
  goog.exportSymbol('chartEditor.ui.Preloader', chartEditor.ui.Preloader);
  proto['render'] = proto.render;
  proto['decorate'] = proto.decorate;
  proto['visible'] = proto.visible;
})();
