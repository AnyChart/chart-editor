goog.provide('chartEditor.ui.Balloon');

goog.require('chartEditor.ui.Component');
goog.require('goog.Timer');


/**
 * Help balloon
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.Balloon = function(opt_domHelper) {
  chartEditor.ui.Balloon.base(this, 'constructor', opt_domHelper);

  /**
   * @type {goog.Timer}
   * @private
   */
  this.timer_ = new goog.Timer();
  this.timer_.setInterval(chartEditor.ui.Balloon.INTERVAL);
  this.getHandler().listen(this.timer_, goog.Timer.TICK, this.hideInternal);

  this.addClassName(goog.getCssName('anychart-ce-balloon'));
  this.addClassName(chartEditor.ui.Balloon.CSS_HIDDEN );
};
goog.inherits(chartEditor.ui.Balloon, chartEditor.ui.Component);


chartEditor.ui.Balloon.INTERVAL = 300;


chartEditor.ui.Balloon.CSS_HIDDEN = goog.getCssName('anychart-ce-hidden');


//
// /** @inheritDoc */
// chartEditor.ui.Balloon.prototype.createDom = function() {
//   chartEditor.ui.Balloon.base(this, 'createDom');
//
//
// };


/**
 *
 * @param {string} value
 */
chartEditor.ui.Balloon.prototype.text = function(value) {
  var el = this.getElement();
  var dom = this.getDomHelper();
  dom.removeChildren(el);
  dom.append(el, value);
  return this;
};


chartEditor.ui.Balloon.prototype.exclude = function(value) {};

chartEditor.ui.Balloon.prototype.hide = function(opt_hide) {
  console.log('hide');
  this.timer_.start();
};


chartEditor.ui.Balloon.prototype.show = function(opt_hide) {
  console.log('show');
  this.timer_.stop();
  goog.dom.classlist.remove(this.getElement(), chartEditor.ui.Balloon.CSS_HIDDEN);
};


chartEditor.ui.Balloon.prototype.hideInternal = function() {
  console.log('hideInternal');
  this.timer_.stop();
  goog.dom.classlist.add(this.getElement(), chartEditor.ui.Balloon.CSS_HIDDEN);
};


/** @inheritDoc */
chartEditor.ui.Balloon.prototype.disposeInternal = function() {
  goog.dispose(this.timer_);
  this.timer_ = null;
  chartEditor.ui.Balloon.base(this, 'disposeInternal');
};
