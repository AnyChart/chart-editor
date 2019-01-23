goog.provide('chartEditor.ui.panel.scales.Standalone');

goog.require("chartEditor.ui.panel.scales.Base");


/**
 * @param {chartEditor.model.Base} model
 * @param {string|Array.<string>} types
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.scales.Base}
 */
chartEditor.ui.panel.scales.Standalone = function(model, types, opt_domHelper) {
  chartEditor.ui.panel.scales.Standalone.base(this, 'constructor', model, types, opt_domHelper);
};
goog.inherits(chartEditor.ui.panel.scales.Standalone, chartEditor.ui.panel.scales.Base);


/** @override */
chartEditor.ui.panel.scales.Standalone.prototype.createDom = function() {
  chartEditor.ui.panel.scales.Standalone.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var key = this.genKey();
  key.pop();
  key.push('type');
  this.scaleTypeField.init(model, key);
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Standalone.prototype.onModelChange = function(evt) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (!this.isExcluded()) {
    var scaleType = this.fixedScaleType_ || model.getValue(this.scaleTypeField.getKey());

    this.scaleTypeField.setValue(scaleType ? scaleType : null, true);
    this.updateSpecific();
  }

  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
};


/** @inheritDoc */
chartEditor.ui.panel.scales.Standalone.prototype.onChartDraw = function(evt) {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var key = this.genKey();
    key.pop();
    var descriptor = model.getValue(key);

    if (descriptor['instance'] && !descriptor['locked']) {
      this.scaleTypeField.setValue(descriptor['type'], true);
      if (this.specificComponent) {
        this.specificComponent.exclude(false);
        this.specificComponent.onChartDraw(evt);
      }

    } else {
      this.scaleTypeField.setValue(null, true);
      if (this.specificComponent) {
        this.specificComponent.exclude(true);
      }
    }

    this.dispatchEvent({
      type: chartEditor.events.EventType.LOCK,
      lock: descriptor['locked']
    });
  }
};
