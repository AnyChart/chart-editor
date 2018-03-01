goog.provide('anychart.chartEditorModule.settings.axes.Radar');

goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Ticks');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.axes.Radar = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.axes.Radar.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'xAxis()'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-axis-radar'));
};
goog.inherits(anychart.chartEditorModule.settings.axes.Radar, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.axes.Radar.prototype.createDom = function() {
  anychart.chartEditorModule.settings.axes.Radar.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  //region Labels
  var labels = new anychart.chartEditorModule.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  // Ticks
  var ticks = new anychart.chartEditorModule.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion
};
