goog.provide('chartEditor.settings.specific.Mekko');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Mekko = function(model, opt_domHelper) {
  chartEditor.settings.specific.Mekko.base(this, 'constructor', model, 'Mekko Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Mekko, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.Mekko.CSS_CLASS = goog.getCssName('anychart-settings-panel-mosaic');


/** @override */
chartEditor.settings.specific.Mekko.prototype.createDom = function() {
  chartEditor.settings.specific.Mekko.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.Mekko.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var pointsPadding = new chartEditor.comboBox.Base();
  pointsPadding.setOptions([0, 1, 3, 5, 10, 15]);
  pointsPadding.setRange(0, 20);
  var pointsPaddingLC = new chartEditor.controls.LabeledControl(pointsPadding, 'Points Padding');
  pointsPaddingLC.init(model, this.genKey('pointsPadding()'));
  this.addChildControl(pointsPaddingLC);
};
