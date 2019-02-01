goog.provide('chartEditor.ui.panel.axes.Radar');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Ticks');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.axes.Radar = function(model, opt_domHelper) {
  chartEditor.ui.panel.axes.Radar.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'xAxis()'];

  this.allowEnabled(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-axis-radar'));
};
goog.inherits(chartEditor.ui.panel.axes.Radar, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.axes.Radar.prototype.createDom = function() {
  chartEditor.ui.panel.axes.Radar.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'));
  this.addChildControl(scale);

  this.addContentSeparator();

  //region Labels
  var labels = new chartEditor.ui.panel.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  // Ticks
  var ticks = new chartEditor.ui.panel.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion
};
