goog.provide('chartEditor.ui.panel.scales.LinearColor');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Palette');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.LinearColor = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.LinearColor.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.scales.LinearColor, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.LinearColor.prototype.createDom = function() {
  chartEditor.ui.panel.scales.LinearColor.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var colors = new chartEditor.ui.control.input.Palette('Comma separated colors');
  this.colors_ = new chartEditor.ui.control.wrapped.Labeled(colors, 'Palette');
  this.colors_.init(model, this.genKey('colors', true), void 0, true);
  this.addChild(this.colors_, true);
};


/** @inheritDoc */
chartEditor.ui.panel.scales.LinearColor.prototype.onChartDraw = function(evt) {
  chartEditor.ui.panel.scales.LinearColor.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var target;
    if (this.key[0] && this.key[0][0] == 'standalones') {
      var key = this.genKey();
      key.pop(); // pop 'panel'
      key.push('instance');

      var model = /** @type {chartEditor.model.Base} */(this.getModel());
      target = /** @type {Object} */(model.getValue(key));
    } else
      target = evt.chart;

    var stringKey = chartEditor.model.Base.getStringKey(this.key);
    var scale = /** @type {Object} */(chartEditor.binding.exec(target, stringKey));

    if (scale && this.colors_) {
      var colors = scale['colors']();
      this.colors_.getControl().setValueByColors(colors);
    }
  }
};


/** @override */
chartEditor.ui.panel.scales.LinearColor.prototype.disposeInternal = function() {
  goog.dispose(this.colors_);
  this.colors_ = null;
  chartEditor.ui.panel.scales.LinearColor.base(this, 'disposeInternal');
};
