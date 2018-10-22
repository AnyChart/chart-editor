goog.provide('chartEditor.NodePanel');

goog.require('chartEditor.SettingsPanel');
goog.require("chartEditor.colorPicker.Base");
goog.require("chartEditor.controls.LabeledControl");
goog.require('chartEditor.settings.Labels');
goog.require("chartEditor.settings.Stroke");
goog.require('chartEditor.settings.Tooltip');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.NodePanel = function(model, opt_domHelper) {
  chartEditor.NodePanel.base(this, 'constructor', model, 'Nodes', opt_domHelper);
  this.stringId = chartEditor.enums.EditorTabs.NODE;
  this.key = [['chart'], ['settings'], 'node()'];
  this.allowEnabled(false);
};
goog.inherits(chartEditor.NodePanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.NodePanel.prototype.createDom = function() {
  chartEditor.NodePanel.base(this, 'createDom');
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  this.addContentSeparator();

  var labelSettings = new chartEditor.settings.Labels(model);
  labelSettings.allowEnabled(true);
  labelSettings.setName('Labels');
  labelSettings.setKey(this.genKey('labels()'));
  this.addChild(labelSettings, true);

  this.addContentSeparator();

  var tooltipSettings = new chartEditor.settings.Tooltip(model);
  tooltipSettings.allowEnabled(false);
  tooltipSettings.allowEditDisplayMode(false);
  tooltipSettings.allowEditPositionMode(false);
  tooltipSettings.setName('Tooltip');
  tooltipSettings.setKey(this.genKey('tooltip()'));
  this.addChild(tooltipSettings, true);
};
