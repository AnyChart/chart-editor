goog.provide('chartEditor.ui.ComponentWithKey');

goog.require('chartEditor.ui.Component');


/**
 * Component, that can be connected to model and chart panel.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.ComponentWithKey = function(model, opt_domHelper) {
  chartEditor.ui.ComponentWithKey.base(this, 'constructor', opt_domHelper);

  if (model)
    this.setModel(model);
  // else
  //   console.warn('ComponentWithKey: model could not be undefined!');

  /**
   * Editor Model key.
   *
   * @type {chartEditor.model.Base.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(chartEditor.ui.ComponentWithKey, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.ComponentWithKey.prototype.enterDocument = function() {
  this.onModelChange(null);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (model && goog.isFunction(model['setValue']))
    this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);

  chartEditor.ui.ComponentWithKey.base(this, 'enterDocument');
};


/**
 * Setter for model key.
 *
 * @param {chartEditor.model.Base.Key} key
 */
chartEditor.ui.ComponentWithKey.prototype.setKey = function(key) {
  this.key = key;
};


/**
 * Getter for model key.
 *
 * @param {(string|Array)=} opt_completion New key's level
 * @return {chartEditor.model.Base.Key}
 */
chartEditor.ui.ComponentWithKey.prototype.getKey = function(opt_completion) {
  return goog.isDef(opt_completion) ? goog.array.concat(this.key, opt_completion) : this.key;
};


/**
 * Returns new key with added string to last key's element.
 *
 * @param {(string|Array)=} opt_completion
 * @param {boolean=} opt_asObjectKey
 * @return {chartEditor.model.Base.Key}
 */
chartEditor.ui.ComponentWithKey.prototype.genKey = function(opt_completion, opt_asObjectKey) {
  var result = [];

  for (var i = 0, count = this.key.length; i < count; i++) {
    if (i == count - 1 && goog.isDef(opt_completion)) {
      if (goog.isArray(this.key[i])) {
        result.push(this.key[i]);
        result.push(opt_completion);
      } else
        if (opt_asObjectKey) {
          result.push([this.key[i]]);
          result.push(opt_completion);
        } else
          result.push(this.key[i] + '.' + opt_completion);

    } else
      result.push(this.key[i]);
  }

  return result;
};


/**
 * Updates ui on model change.
 * @param {?Object} evt
 */
chartEditor.ui.ComponentWithKey.prototype.onModelChange = function(evt) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (model && goog.isFunction(model['setValue']))
    this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
};


/**
 * Callback on chart draw.
 * @param {Object} evt
 */
chartEditor.ui.ComponentWithKey.prototype.onChartDraw = function(evt) {
  // evt.chart
};