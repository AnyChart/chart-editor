goog.provide('chartEditor.settings.scales.Standalone');

goog.require("chartEditor.settings.scales.Base");


/**
 * @param {chartEditor.EditorModel} model
 * @param {string|Array.<string>} types
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.scales.Base}
 */
chartEditor.settings.scales.Standalone = function(model, types, opt_domHelper) {
  chartEditor.settings.scales.Standalone.base(this, 'constructor', model, types, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.Standalone, chartEditor.settings.scales.Base);


/** @override */
chartEditor.settings.scales.Standalone.prototype.createDom = function() {
  chartEditor.settings.scales.Standalone.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var key = this.genKey();
  key.pop();
  key.push('type');
  this.scaleTypeField.init(model, key);
};


/** @inheritDoc */
chartEditor.settings.scales.Standalone.prototype.onModelChange = function(evt) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (!this.isExcluded()) {
    var scaleType = model.getValue(this.scaleTypeField.getKey());

    this.scaleTypeField.setValue(scaleType ? scaleType : null, true);
    this.updateSpecific();
  }

  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
};


/** @inheritDoc */
chartEditor.settings.scales.Standalone.prototype.onChartDraw = function(evt) {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var key = this.genKey();
    key.pop();
    var descriptor = model.getValue(key);

    if (descriptor['instance']) {
      this.scaleTypeField.setValue(descriptor['type'], true);

    } else if (this.specificComponent) {
      this.scaleTypeField.setValue(null, true);
      this.specificComponent.exclude(true);
    }
  }
};
