goog.provide('chartEditor.ui.panel.axes.Linear');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Stagger');
goog.require('chartEditor.ui.panel.Ticks');
goog.require('chartEditor.ui.panel.Title');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.axes.Linear = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.axes.Linear.base(this, 'constructor', model, index, null, opt_domHelper);

  this.name = 'axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);

  this.allowRemove(true);
};
goog.inherits(chartEditor.ui.panel.axes.Linear, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.axes.Linear.prototype.createDom = function() {
  chartEditor.ui.panel.axes.Linear.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'));
  this.addChildControl(scale);

  var orientation = new chartEditor.ui.control.fieldSelect.Base({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  this.addContentSeparator();

  var staggerSettings = new chartEditor.ui.panel.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  this.addContentSeparator();

  var overlapMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  staggerSettings.addChildControl(overlapMode);

  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.allowEditPosition(false, this.xOrY === 'x' ? 'bottom' : 'left');
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  this.addContentSeparator();

  var labels = new chartEditor.ui.panel.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  this.addContentSeparator();

  var ticks = new chartEditor.ui.panel.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditPosition(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorlabels = new chartEditor.ui.panel.Labels(model);
  minorlabels.setName('Minor Labels');
  minorlabels.allowEnabled(true);
  minorlabels.allowEditPosition(false);
  minorlabels.allowEditAnchor(false);
  minorlabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorlabels);

  this.addContentSeparator();

  var minorTicks = new chartEditor.ui.panel.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditPosition(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
};
