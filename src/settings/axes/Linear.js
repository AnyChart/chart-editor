goog.provide('anychart.chartEditorModule.settings.axes.Linear');

goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Stagger');
goog.require('anychart.chartEditorModule.settings.Ticks');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.axes.Linear = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.axes.Linear.base(this, 'constructor', model, index, null, opt_domHelper);

  this.name = 'axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-axis-linear'));
};
goog.inherits(anychart.chartEditorModule.settings.axes.Linear, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.axes.Linear.prototype.createDom = function() {
  anychart.chartEditorModule.settings.axes.Linear.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var orientation = new anychart.chartEditorModule.controls.select.DataField({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  this.addContentSeparator();

  var staggerSettings = new anychart.chartEditorModule.settings.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  this.addContentSeparator();

  var overlapMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  staggerSettings.addChildControl(overlapMode);

  var title = new anychart.chartEditorModule.settings.Title(model, 'Title');
  title.allowEditPosition(false, this.xOrY === 'x' ? 'bottom' : 'left');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  var labels = new anychart.chartEditorModule.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  var ticks = new anychart.chartEditorModule.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(true/*!this.isRadarPolarAxis*/);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorlabels = new anychart.chartEditorModule.settings.Labels(model);
  minorlabels.setName('Minor Labels');
  minorlabels.allowEnabled(true);
  minorlabels.allowEditPosition(false);
  minorlabels.allowEditAnchor(false);
  minorlabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorlabels);

  this.addContentSeparator();

  var minorTicks = new anychart.chartEditorModule.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(true/*!this.isRadarPolarAxis*/);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
};
