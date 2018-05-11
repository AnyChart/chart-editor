goog.provide('chartEditor.settings.axes.Radial');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.Scales');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Ticks');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.axes.Radial = function(model, opt_domHelper) {
  chartEditor.settings.axes.Radial.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'yAxis()'];
};
goog.inherits(chartEditor.settings.axes.Radial, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.axes.Radial.prototype.createDom = function() {
  chartEditor.settings.axes.Radial.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var scale = new chartEditor.controls.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'));
  this.addChildControl(scale);

  var overlapMode = new chartEditor.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  var drawFirstLabel = new chartEditor.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  this.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  this.addChildControl(drawLastLabel);

  this.addContentSeparator();

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

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new chartEditor.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new chartEditor.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion
};
