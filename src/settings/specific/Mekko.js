goog.provide('anychart.chartEditorModule.settings.specific.Mekko');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.Mekko = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.Mekko.base(this, 'constructor', model, 'Mekko Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.Mekko, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.Mekko.CSS_CLASS = goog.getCssName('anychart-settings-panel-mosaic');


/** @override */
anychart.chartEditorModule.settings.specific.Mekko.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.Mekko.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.Mekko.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var pointsPadding = new anychart.chartEditorModule.comboBox.Base();
  pointsPadding.setOptions([0, 1, 3, 5, 10, 15]);
  pointsPadding.setRange(0, 20);
  var pointsPaddingLC = new anychart.chartEditorModule.controls.LabeledControl(pointsPadding, 'Points Padding');
  pointsPaddingLC.init(model, this.genKey('pointsPadding()'));
  this.addChildControl(pointsPaddingLC);
};
