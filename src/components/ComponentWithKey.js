goog.provide('chartEditor.ComponentWithKey');

goog.require('chartEditor.Component');


/**
 * Component, that can be connected to model and chart settings.
 *
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.ComponentWithKey = function(model, opt_domHelper) {
  chartEditor.ComponentWithKey.base(this, 'constructor', opt_domHelper);

  if (model)
    this.setModel(model);
  else
    console.warn('chartEditor.ComponentWithKey: Model could not be undefined!');

  /**
   * Editor Model key.
   *
   * @type {chartEditor.EditorModel.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(chartEditor.ComponentWithKey, chartEditor.Component);


/** @inheritDoc */
chartEditor.ComponentWithKey.prototype.enterDocument = function() {
  this.onModelChange(null);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);

  chartEditor.ComponentWithKey.base(this, 'enterDocument');
};


/**
 * Setter for model key.
 *
 * @param {chartEditor.EditorModel.Key} key
 */
chartEditor.ComponentWithKey.prototype.setKey = function(key) {
  this.key = key;
};


/**
 * Getter for model key.
 *
 * @param {(string|Array)=} opt_completion New key's level
 * @return {chartEditor.EditorModel.Key}
 */
chartEditor.ComponentWithKey.prototype.getKey = function(opt_completion) {
  return goog.isDef(opt_completion) ? goog.array.concat(this.key, opt_completion) : this.key;
};


/**
 * Returns new key with added string to last key's element.
 *
 * @param {(string|Array)=} opt_completion
 * @param {boolean=} opt_asObjectKey
 * @return {chartEditor.EditorModel.Key}
 */
chartEditor.ComponentWithKey.prototype.genKey = function(opt_completion, opt_asObjectKey) {
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
 * Updates component on model change.
 * @param {?Object} evt
 */
chartEditor.ComponentWithKey.prototype.onModelChange = function(evt) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
};


/**
 * Callback on chart draw.
 * @param {Object} evt
 */
chartEditor.ComponentWithKey.prototype.onChartDraw = function(evt) {
  // evt.chart
  // evt.rebuild
};