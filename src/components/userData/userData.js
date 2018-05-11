goog.provide('chartEditor.UserData');
goog.require('chartEditor.Component');



/**
 * @param {Array.<{id: string, type:string, caption: string, icon:string}>=} opt_model
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.UserData = function(opt_model) {
  chartEditor.UserData.base(this, 'constructor');

  this.addClassName('anychart-ce-user-data');

  this.setModel(opt_model);

  this.items_ = [];
};
goog.inherits(chartEditor.UserData, chartEditor.Component);

/** @enum {string} */
chartEditor.UserData.EventType = {
  ACTION: goog.events.getUniqueId('action')
};


/** @inheritDoc */
chartEditor.UserData.prototype.createDom = function() {
  chartEditor.UserData.base(this, 'createDom');
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
chartEditor.UserData.prototype.enterDocument = function() {
  chartEditor.UserData.base(this, 'enterDocument');
  for (var i = 0; i < this.items_.length; i++) {
    var itemElement = this.items_[i];
    this.getHandler().listen(itemElement, goog.events.EventType.CLICK, this.onItemClick_);
  }
};


/**
 * @param {Object} e
 * @private
 */
chartEditor.UserData.prototype.onItemClick_ = function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.dispatchEvent({
    type: chartEditor.UserData.EventType.ACTION,
    value: e.currentTarget.getAttribute('data-value')
  });
};


/** @inheritDoc */
chartEditor.UserData.prototype.disposeInternal = function () {
  this.items_.length = 0;
  chartEditor.UserData.base(this, 'disposeInternal');
};
