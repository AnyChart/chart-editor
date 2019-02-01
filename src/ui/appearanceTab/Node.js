goog.provide('chartEditor.ui.appearanceTabs.Node');

goog.require('chartEditor.ui.Panel');
goog.require("chartEditor.ui.control.colorPicker.Base");
goog.require("chartEditor.ui.control.wrapped.Labeled");
goog.require('chartEditor.ui.panel.Labels');
goog.require("chartEditor.ui.panel.Stroke");
goog.require('chartEditor.ui.panel.Tooltip');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Node = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Node.base(this, 'constructor', model, 'Nodes', opt_domHelper);
  this.stringId = chartEditor.enums.EditorTabs.NODE;
  this.key = [['chart'], ['settings'], 'node()'];
  this.allowEnabled(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.Node, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Node.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Node.base(this, 'createDom');
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.ui.panel.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  this.addContentSeparator();

  var labelSettings = new chartEditor.ui.panel.Labels(model);
  labelSettings.allowEnabled(true);
  labelSettings.setName('Labels');
  labelSettings.setKey(this.genKey('labels()'));
  this.addChildControl(labelSettings);

  this.addContentSeparator();

  var tooltipSettings = new chartEditor.ui.panel.Tooltip(model);
  tooltipSettings.allowEnabled(false);
  tooltipSettings.allowEditDisplayMode(false);
  tooltipSettings.allowEditPositionMode(false);
  tooltipSettings.setName('Tooltip');
  tooltipSettings.setKey(this.genKey('tooltip()'));
  this.addChildControl(tooltipSettings);
};
