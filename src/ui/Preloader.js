goog.provide('chartEditor.Preloader');

goog.require('goog.ui.Component');



/**
 * Preloader.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 *
 * @constructor
 * @extends {goog.ui.Component}
 */
chartEditor.Preloader = function(opt_domHelper) {
  chartEditor.Preloader.base(this, 'constructor', opt_domHelper);
};
goog.inherits(chartEditor.Preloader, goog.ui.Component);


/** @type {string} */
chartEditor.Preloader.CSS_CLASS = goog.getCssName('anychart-ce-loader');


/**
 * Whether the preloader is visible.
 * @type {boolean}
 * @private
 */
chartEditor.Preloader.prototype.visible_ = false;


/**
 * Sets the visibility of the preloader.
 * Lazily renders the component if needed.
 * @param {boolean=} opt_value Whether the preloader should be visible.
 * @return {boolean|!chartEditor.Preloader}
 */
chartEditor.Preloader.prototype.visible = function(opt_value) {
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
chartEditor.Preloader.prototype.show_ = function() {
  this.visible_ = true;
  goog.style.setElementShown(this.getElement(), this.visible_);
};


/**
 * Hide preloader.
 * @private
 */
chartEditor.Preloader.prototype.hide_ = function() {
  this.visible_ = false;
  goog.style.setElementShown(this.getElement(), this.visible_);
};


/**
 * Create logo.
 * @param {Element=} opt_element
 * @private
 */
chartEditor.Preloader.prototype.createLogo_ = function(opt_element) {
  var dom = this.getDomHelper();
  var element = opt_element || this.getElement();
  var className = chartEditor.Preloader.CSS_CLASS;
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
chartEditor.Preloader.prototype.createDom = function() {
  chartEditor.Preloader.base(this, 'createDom');
  this.createLogo_();
};


/** @override */
chartEditor.Preloader.prototype.decorateInternal = function(element) {
  chartEditor.Preloader.base(this, 'decorateInternal', element);
  this.createLogo_(element);
};


/** @override */
chartEditor.Preloader.prototype.enterDocument = function() {
  chartEditor.Preloader.base(this, 'enterDocument');
};


/** @override */
chartEditor.Preloader.prototype.exitDocument = function() {
  chartEditor.Preloader.base(this, 'exitDocument');
};


/** @override */
chartEditor.Preloader.prototype.disposeInternal = function() {
  chartEditor.Preloader.base(this, 'disposeInternal');
};


/**
 * Constructor function for preloader.
 * @return {chartEditor.Preloader}
 */
chartEditor.preloader = function() {
  return new chartEditor.Preloader();
};


//exports
(function() {
  var proto = chartEditor.Preloader.prototype;
  goog.exportSymbol('chartEditor.preloader', chartEditor.preloader);
  proto['render'] = proto.render;
  proto['decorate'] = proto.decorate;
  proto['visible'] = proto.visible;
})();
