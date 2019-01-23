goog.provide('chartEditor.ui.appearanceTabs.ColorRange');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Markers');
goog.require('chartEditor.ui.panel.Stagger');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.Ticks');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.ColorRange = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ColorRange.base(this, 'constructor', model, 'Color Range', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.COLOR_RANGE;

  this.key = [['chart'], ['settings'], 'colorRange()'];

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-color-range'));
};
goog.inherits(chartEditor.ui.appearanceTabs.ColorRange, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ColorRange.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.ColorRange.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // Orientation
  var orientation = new chartEditor.ui.control.fieldSelect.Base({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  // Align
  var align = new chartEditor.ui.control.fieldSelect.Base({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  // Color Line Size
  var colorLineSize = new chartEditor.ui.control.comboBox.Base();
  colorLineSize.setOptions([5, 10, 15, 20, 30]);
  colorLineSize.setRange(0, 100);
  var colorLineSizeLC = new chartEditor.ui.control.wrapped.Labeled(colorLineSize, 'Color Line Size');
  colorLineSizeLC.init(model, this.genKey('colorLineSize()'));
  this.addChildControl(colorLineSizeLC);

  // Length
  var length = new chartEditor.ui.control.comboBox.Percent();
  length.setOptions([20, 50, 80, 100]);
  var lengthLC = new chartEditor.ui.control.wrapped.Labeled(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Stroke
  var stroke = new chartEditor.ui.panel.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  // Overlap mode
  var overlapMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  // Stagger panel
  var staggerSettings = new chartEditor.ui.panel.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  this.addContentSeparator();

  // Marker
  var marker = new chartEditor.ui.panel.Markers(model);
  marker.setName('Marker');
  marker.allowEnabled(true);
  marker.setKey(this.genKey('marker()'));
  this.addChildControl(marker);

  this.addContentSeparator();

  // Labels
  var labels = new chartEditor.ui.panel.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new chartEditor.ui.control.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.ui.control.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  this.addContentSeparator();

  // Ticks
  var ticks = new chartEditor.ui.panel.Ticks(model);
  ticks.allowEnabled(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  // Minor Labels
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
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);

  this.addContentSeparator();

  // Title
  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.allowEnabled(true);
  title.allowEditPosition(false);
  title.allowEditAlign(false);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);
};
