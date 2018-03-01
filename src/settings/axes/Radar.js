goog.provide('chartEditor.settings.axes.Radar');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Ticks');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.axes.Radar = function(model, opt_domHelper) {
  chartEditor.settings.axes.Radar.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'xAxis()'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-axis-radar'));
};
goog.inherits(chartEditor.settings.axes.Radar, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.axes.Radar.prototype.createDom = function() {
  chartEditor.settings.axes.Radar.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  //region Labels
  var labels = new chartEditor.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  // Ticks
  var ticks = new chartEditor.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion
};
