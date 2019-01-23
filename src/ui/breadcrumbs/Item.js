goog.provide('chartEditor.ui.breadcrumbs.Item');

goog.require('chartEditor.ui.Component');


/**
 * @param {string} caption
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.breadcrumbs.Item = function(caption) {
  chartEditor.ui.breadcrumbs.Item.base(this, 'constructor');
  this.caption_ = caption;

  this.addClassName('anychart-ce-breadcrumbs-item');
};
goog.inherits(chartEditor.ui.breadcrumbs.Item, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.breadcrumbs.Item.prototype.createDom = function() {
  chartEditor.ui.breadcrumbs.Item.base(this, 'createDom');
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