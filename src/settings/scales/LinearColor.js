goog.provide('chartEditor.settings.scales.LinearColor');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.input.Palette");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.LinearColor = function(model, opt_domHelper) {
  chartEditor.settings.scales.LinearColor.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.settings.scales.LinearColor, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.LinearColor.prototype.createDom = function() {
  chartEditor.settings.scales.LinearColor.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var colors = new chartEditor.controls.input.Palette('Comma separated colors');
  this.colors_ = new chartEditor.controls.LabeledControl(colors, 'Palette');
  this.colors_.init(model, this.genKey('colors', true));
  this.addChild(this.colors_, true);
};


/** @inheritDoc */
chartEditor.settings.scales.LinearColor.prototype.onChartDraw = function(evt) {
  chartEditor.settings.scales.LinearColor.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var target;
    if (this.key[0] && this.key[0][0] == 'standalones') {
      var key = this.genKey();
      key.pop(); // pop 'settings'
      key.push('instance');

      var model = /** @type {chartEditor.EditorModel} */(this.getModel());
      target = /** @type {Object} */(model.getValue(key));
    } else
      target = evt.chart;

    var stringKey = chartEditor.EditorModel.getStringKey(this.key);
    var scale = /** @type {Object} */(chartEditor.binding.exec(target, stringKey));

    if (scale && this.colors_) {
      var colors = scale['colors']();
      this.colors_.getControl().setValueByColors(colors);
    }
  }
};


/** @override */
chartEditor.settings.scales.LinearColor.prototype.disposeInternal = function() {
  goog.dispose(this.colors_);
  this.colors_ = null;
  chartEditor.settings.scales.LinearColor.base(this, 'disposeInternal');
};
