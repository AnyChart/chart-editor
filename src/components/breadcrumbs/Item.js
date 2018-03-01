goog.provide('anychart.chartEditorModule.Item');
goog.require('anychart.ui.Component');


/**
 * @param {string} caption
 * @constructor
 * @extends {anychart.ui.Component}
 */
anychart.chartEditorModule.Item = function(caption) {
    anychart.chartEditorModule.Item.base(this, 'constructor');
    this.caption_ = caption;

    this.addClassName('anychart-breadcrumbs-item');
};
goog.inherits(anychart.chartEditorModule.Item, anychart.ui.Component);


/** @inheritDoc */
anychart.chartEditorModule.Item.prototype.createDom = function() {
    anychart.chartEditorModule.Item.base(this, 'createDom');
    var element = this.getElement();

    var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-breadcrumbs-item-caption', this.caption_);
    goog.dom.appendChild(element, caption);

    var indicator = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-breadcrumbs-item-indicator');
    goog.dom.appendChild(element, indicator);

    this.getHandler().listen(element, goog.events.EventType.CLICK, function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dispatchEvent(goog.ui.Component.EventType.ACTION);
    });
};