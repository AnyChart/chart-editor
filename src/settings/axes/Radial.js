goog.provide('anychart.chartEditorModule.settings.axes.Radial');

goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Ticks');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.axes.Radial = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.axes.Radial.base(this, 'constructor', model, 0, 'Enabled', opt_domHelper);

  this.key = [['chart'], ['settings'], 'yAxis()'];

  this.addClassName(goog.getCssName('anychart-settings-panel-axis-radial'));
};
goog.inherits(anychart.chartEditorModule.settings.axes.Radial, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.axes.Radial.prototype.createDom = function() {
  anychart.chartEditorModule.settings.axes.Radial.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var inverted = new anychart.chartEditorModule.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, [['chart'], ['settings'], 'yScale().inverted()']);
  this.addChildControl(inverted);

  var overlapMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  var drawFirstLabel = new anychart.chartEditorModule.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  this.addChildControl(drawFirstLabel);

  var drawLastLabel = new anychart.chartEditorModule.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  this.addChildControl(drawLastLabel);

  this.addContentSeparator();

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

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new anychart.chartEditorModule.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new anychart.chartEditorModule.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion
};
