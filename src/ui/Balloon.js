goog.provide('chartEditor.ui.Balloon');

goog.require('chartEditor.help');
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

  /**
   * @type {string}
   * @private
   */
  this.text_ = '';
};
goog.inherits(chartEditor.ui.Balloon, chartEditor.ui.Component);


chartEditor.ui.Balloon.INTERVAL = 200;


chartEditor.ui.Balloon.CSS_HIDDEN = goog.getCssName('anychart-ce-hidden');


/**
 * @param {chartEditor.model.Base.Key} key
 * @return {chartEditor.ui.Balloon}
 */
chartEditor.ui.Balloon.prototype.setTextByKey = function(key) {
  var text = '';
  if (key.length) {
    var stringKey = chartEditor.model.Base.getStringKey(key);
    stringKey = stringKey.replace(/\('.+'\)/g, '()');
    stringKey = stringKey.replace(/\(\d+\)/g, '()');
    stringKey = stringKey.replace(/scale,\d+/g, 'scale');

    if (chartEditor.help.Hints[stringKey]) {
      text = chartEditor.help.Hints[stringKey];

      // Aliases processing
      if (text.indexOf('a:') === 0) {
        var realKey = text.substr(2);
        if (chartEditor.help.Hints[realKey])
          text = chartEditor.help.Hints[realKey];
      }

    } else {
      // todo: (chernetsky) Comment this on production
      text = stringKey;
    }
  }

  this.text_ = text;

  var el = this.getElement();
  var dom = this.getDomHelper();
  dom.removeChildren(el);

  if (this.text_) {
    dom.appendChild(el, goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-content'), this.text_));
  }

  return this;
};


/**
 * @param {goog.math.Rect} bounds
 * @return {chartEditor.ui.Balloon}
 */
chartEditor.ui.Balloon.prototype.position = function(bounds) {
  if (this.text_)
    goog.style.setPosition(this.getElement(), bounds.left + bounds.width - 10, bounds.top - bounds.height + 30);
  return this;
};


/** @inheritDoc */
chartEditor.ui.Balloon.prototype.hide = function(opt_hide) {
  this.timer_.start();
};


/** @inheritDoc */
chartEditor.ui.Balloon.prototype.show = function(opt_hide) {
  this.timer_.stop();
  if (this.text_)
    goog.dom.classlist.remove(this.getElement(), chartEditor.ui.Balloon.CSS_HIDDEN);
};


/**
 * Hide balloon.
 */
chartEditor.ui.Balloon.prototype.hideInternal = function() {
  this.timer_.stop();
  goog.dom.classlist.add(this.getElement(), chartEditor.ui.Balloon.CSS_HIDDEN);
};


/** @inheritDoc */
chartEditor.ui.Balloon.prototype.disposeInternal = function() {
  goog.dispose(this.timer_);
  this.timer_ = null;
  chartEditor.ui.Balloon.base(this, 'disposeInternal');
};


/**
 * This should exist to prevent default behaviour
 * @param {boolean} value
 */
chartEditor.ui.Balloon.prototype.exclude = function(value) {};