goog.provide('chartEditor.settings.axes.Linear');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Stagger');
goog.require('chartEditor.settings.Ticks');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.axes.Linear = function(model, index, opt_domHelper) {
  chartEditor.settings.axes.Linear.base(this, 'constructor', model, index, null, opt_domHelper);

  this.name = 'axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-axis-linear'));
};
goog.inherits(chartEditor.settings.axes.Linear, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.axes.Linear.prototype.createDom = function() {
  chartEditor.settings.axes.Linear.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var orientation = new chartEditor.controls.select.DataField({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  this.addContentSeparator();

  var staggerSettings = new chartEditor.settings.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  this.addContentSeparator();

  var overlapMode = new chartEditor.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  staggerSettings.addChildControl(overlapMode);

  var title = new chartEditor.settings.Title(model, 'Title');
  title.allowEditPosition(false, this.xOrY === 'x' ? 'bottom' : 'left');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  var labels = new chartEditor.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  var ticks = new chartEditor.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(true/*!this.isRadarPolarAxis*/);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorlabels = new chartEditor.settings.Labels(model);
  minorlabels.setName('Minor Labels');
  minorlabels.allowEnabled(true);
  minorlabels.allowEditPosition(false);
  minorlabels.allowEditAnchor(false);
  minorlabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorlabels);

  this.addContentSeparator();

  var minorTicks = new chartEditor.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(true/*!this.isRadarPolarAxis*/);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
};
