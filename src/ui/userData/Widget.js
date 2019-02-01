goog.provide('chartEditor.ui.userData.Widget');

goog.require('chartEditor.ui.Component');



/**
 * @param {Array.<{id: string, type:string, caption: string, icon:string}>=} opt_model
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.userData.Widget = function(opt_model) {
  chartEditor.ui.userData.Widget.base(this, 'constructor');

  this.addClassName('anychart-ce-user-data');

  this.setModel(opt_model);

  this.items_ = [];
};
goog.inherits(chartEditor.ui.userData.Widget, chartEditor.ui.Component);


/** @enum {string} */
chartEditor.ui.userData.Widget.EventType = {
  ACTION: goog.events.getUniqueId('action')
};


/** @inheritDoc */
chartEditor.ui.userData.Widget.prototype.createDom = function() {
  chartEditor.ui.userData.Widget.base(this, 'createDom');
  var element = this.getElement();
  var model = /** @type {Array.<{id: string, caption: string, icon:string}>} */(this.getModel());

  var connectCaption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-ce-user-data-caption', 'User Data');
  goog.dom.appendChild(element, connectCaption);

  if (model) {
    for (var i = 0, count = model.length; i < count; i++) {
      var item = model[i];
      var itemElement = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-user-data-item', [
        goog.dom.createDom(goog.dom.TagName.IMG, {
          'src': item.icon,
          'class': 'anychart-ce-user-data-item-icon'
        }),
        goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-user-data-item-caption', item.caption)
      ]);
      goog.dom.setProperties(itemElement, {'data-value': item.id});
      goog.dom.appendChild(element, itemElement);

      this.items_.push(itemElement);
    }
  }
};


/** @inheritDoc */
chartEditor.ui.userData.Widget.prototype.enterDocument = function() {
  chartEditor.ui.userData.Widget.base(this, 'enterDocument');
  for (var i = 0; i < this.items_.length; i++) {
    var itemElement = this.items_[i];
    this.getHandler().listen(itemElement, goog.events.EventType.CLICK, this.onItemClick_);
  }
};


/**
 * @param {Object} e
 * @private
 */
chartEditor.ui.userData.Widget.prototype.onItemClick_ = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.dispatchEvent({
    type: chartEditor.ui.userData.Widget.EventType.ACTION,
    value: e.currentTarget.getAttribute('data-value')
  });
};


/** @inheritDoc */
chartEditor.ui.userData.Widget.prototype.disposeInternal = function () {
  this.items_.length = 0;
  chartEditor.ui.userData.Widget.base(this, 'disposeInternal');
};
