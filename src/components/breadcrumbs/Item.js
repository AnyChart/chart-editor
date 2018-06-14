goog.provide('chartEditor.breadcrumbs.Item');

goog.require('chartEditor.Component');


/**
 * @param {string} caption
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.breadcrumbs.Item = function(caption) {
  chartEditor.breadcrumbs.Item.base(this, 'constructor');
  this.caption_ = caption;

  this.addClassName('anychart-ce-breadcrumbs-item');
};
goog.inherits(chartEditor.breadcrumbs.Item, chartEditor.Component);


/** @inheritDoc */
chartEditor.breadcrumbs.Item.prototype.createDom = function() {
  chartEditor.breadcrumbs.Item.base(this, 'createDom');
  var element = this.getElement();

  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-breadcrumbs-item-caption', this.caption_);
  goog.dom.appendChild(element, caption);

  var indicator = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-breadcrumbs-item-indicator');
  goog.dom.appendChild(element, indicator);

  this.getHandler().listen(element, goog.events.EventType.CLICK, function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(goog.ui.Component.EventType.ACTION);
  });
};