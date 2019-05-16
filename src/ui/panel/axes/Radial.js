goog.provide('chartEditor.ui.panel.axes.Radial');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Ticks');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.axes.Radial = function(model, opt_domHelper) {
  chartEditor.ui.panel.axes.Radial.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'yAxis()'];
};
goog.inherits(chartEditor.ui.panel.axes.Radial, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.axes.Radial.prototype.createDom = function() {
  chartEditor.ui.panel.axes.Radial.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'), void 0, true);
  this.addChildControl(scale);

  var overlapMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  var drawFirstLabel = new chartEditor.ui.control.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  this.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.ui.control.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  this.addChildControl(drawLastLabel);

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

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new chartEditor.ui.panel.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new chartEditor.ui.panel.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion
};
