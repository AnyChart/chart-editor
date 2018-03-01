goog.provide('anychart.chartEditorModule.ComponentWithKey');

goog.require('anychart.chartEditorModule.Component');


/**
 * Component, that can be connected to model and chart settings.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.ComponentWithKey = function(model, opt_domHelper) {
  anychart.chartEditorModule.ComponentWithKey.base(this, 'constructor', opt_domHelper);

  if (model)
    this.setModel(model);
  else
    console.warn('anychart.chartEditorModule.ComponentWithKey: Model could not be undefined!');

  /**
   * Editor Model key.
   *
   * @type {anychart.chartEditorModule.EditorModel.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(anychart.chartEditorModule.ComponentWithKey, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.ComponentWithKey.prototype.enterDocument = function() {
  this.onModelChange(null);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listen(model, anychart.chartEditorModule.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);

  anychart.chartEditorModule.ComponentWithKey.base(this, 'enterDocument');
};


/**
 * Setter for model key.
 *
 * @param {anychart.chartEditorModule.EditorModel.Key} key
 */
anychart.chartEditorModule.ComponentWithKey.prototype.setKey = function(key) {
  this.key = key;
};


/**
 * Getter for model key.
 *
 * @param {(string|Array)=} opt_completion New key's level
 * @return {anychart.chartEditorModule.EditorModel.Key}
 */
anychart.chartEditorModule.ComponentWithKey.prototype.getKey = function(opt_completion) {
  return goog.isDef(opt_completion) ? goog.array.concat(this.key, opt_completion) : this.key;
};


/**
 * Returns new key with added string to last key's element.
 *
 * @param {string=} opt_completion
 * @param {boolean=} opt_asObjectKey
 * @return {anychart.chartEditorModule.EditorModel.Key}
 */
anychart.chartEditorModule.ComponentWithKey.prototype.genKey = function(opt_completion, opt_asObjectKey) {
  var result = [];

  for (var i = 0, count = this.key.length; i < count; i++) {
    if (i == count - 1) {
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
anychart.chartEditorModule.ComponentWithKey.prototype.onModelChange = function(evt) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listenOnce(model, anychart.chartEditorModule.events.EventType.CHART_DRAW, this.onChartDraw);
};


/**
 * Callback on chart draw.
 * @param {Object} evt
 */
anychart.chartEditorModule.ComponentWithKey.prototype.onChartDraw = function(evt) {
  // evt.chart
  // evt.rebuild
};