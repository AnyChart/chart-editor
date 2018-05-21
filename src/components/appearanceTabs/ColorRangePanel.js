goog.provide('chartEditor.ColorRangePanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Markers');
goog.require('chartEditor.settings.Stagger');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.Ticks');
goog.require('chartEditor.settings.Title');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.ColorRangePanel = function(model, opt_domHelper) {
  chartEditor.ColorRangePanel.base(this, 'constructor', model, 'Color Range', opt_domHelper);

  this.stringId = 'colorRange';

  this.key = [['chart'], ['settings'], 'colorRange()'];
};
goog.inherits(chartEditor.ColorRangePanel, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.ColorRangePanel.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-color-range');


/** @inheritDoc */
chartEditor.ColorRangePanel.prototype.createDom = function() {
  chartEditor.ColorRangePanel.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.ColorRangePanel.CSS_CLASS);
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // Orientation
  var orientation = new chartEditor.controls.select.DataField({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  // Align
  var align = new chartEditor.controls.select.DataField({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  // Color Line Size
  var colorLineSize = new chartEditor.comboBox.Base();
  colorLineSize.setOptions([5, 10, 15, 20, 30]);
  colorLineSize.setRange(0, 100);
  var colorLineSizeLC = new chartEditor.controls.LabeledControl(colorLineSize, 'Color Line Size');
  colorLineSizeLC.init(model, this.genKey('colorLineSize()'));
  this.addChildControl(colorLineSizeLC);

  // Length
  var length = new chartEditor.comboBox.Percent();
  length.setOptions([20, 50, 80, 100]);
  var lengthLC = new chartEditor.controls.LabeledControl(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Stroke
  var stroke = new chartEditor.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);

  // Overlap mode
  var overlapMode = new chartEditor.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  // Stagger settings
  var staggerSettings = new chartEditor.settings.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Marker
  var marker = new chartEditor.settings.Markers(model);
  marker.setName('Marker');
  marker.allowEnabled(true);
  marker.setKey(this.genKey('marker()'));
  this.addChildControl(marker);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Labels
  var labels = new chartEditor.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new chartEditor.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Ticks
  var ticks = new chartEditor.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Minor Labels
  var minorLabels = new chartEditor.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Minor Ticks
  var minorTicks = new chartEditor.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  // Title
  var title = new chartEditor.settings.Title(model, 'Title');
  title.allowEnabled(true);
  title.allowEditPosition(false);
  title.allowEditAlign(false);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);
};
