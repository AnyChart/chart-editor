goog.provide('anychart.chartEditorModule.ColorRangePanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Markers');
goog.require('anychart.chartEditorModule.settings.Stagger');
goog.require('anychart.chartEditorModule.settings.Stroke');
goog.require('anychart.chartEditorModule.settings.Ticks');
goog.require('anychart.chartEditorModule.settings.Title');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.ColorRangePanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.ColorRangePanel.base(this, 'constructor', model, 'Color Range', opt_domHelper);

  this.stringId = 'colorRange';

  this.key = [['chart'], ['settings'], 'colorRange()'];
};
goog.inherits(anychart.chartEditorModule.ColorRangePanel, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.ColorRangePanel.CSS_CLASS = goog.getCssName('anychart-settings-panel-color-range');


/** @inheritDoc */
anychart.chartEditorModule.ColorRangePanel.prototype.createDom = function() {
  anychart.chartEditorModule.ColorRangePanel.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, anychart.chartEditorModule.ColorRangePanel.CSS_CLASS);
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // Orientation
  var orientation = new anychart.chartEditorModule.controls.select.DataField({label: 'Orientation'});
  orientation.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'right', icon: 'ac ac-position-right'},
    {value: 'top', icon: 'ac ac-position-top'},
    {value: 'bottom', icon: 'ac ac-position-bottom'}
  ]);
  orientation.init(model, this.genKey('orientation()'));
  this.addChildControl(orientation);

  // Align
  var align = new anychart.chartEditorModule.controls.select.DataField({label: 'Align'});
  align.getSelect().setOptions([
    {value: 'left', icon: 'ac ac-position-left'},
    {value: 'center', icon: 'ac ac-position-center'},
    {value: 'right', icon: 'ac ac-position-right'}
  ]);
  align.init(model, this.genKey('align()'));
  this.addChildControl(align);

  // Color Line Size
  var colorLineSize = new anychart.chartEditorModule.comboBox.Base();
  colorLineSize.setOptions([5, 10, 15, 20, 30]);
  colorLineSize.setRange(0, 100);
  var colorLineSizeLC = new anychart.chartEditorModule.controls.LabeledControl(colorLineSize, 'Color Line Size');
  colorLineSizeLC.init(model, this.genKey('colorLineSize()'));
  this.addChildControl(colorLineSizeLC);

  // Length
  var length = new anychart.chartEditorModule.comboBox.Percent();
  length.setOptions([20, 50, 80, 100]);
  var lengthLC = new anychart.chartEditorModule.controls.LabeledControl(length, 'Length');
  lengthLC.init(model, this.genKey('length()'));
  this.addChildControl(lengthLC);

  // Stroke
  var stroke = new anychart.chartEditorModule.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);

  // Overlap mode
  var overlapMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  // Stagger settings
  var staggerSettings = new anychart.chartEditorModule.settings.Stagger(model);
  staggerSettings.setKey(this.getKey());
  this.addChildControl(staggerSettings);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Marker
  var marker = new anychart.chartEditorModule.settings.Markers(model);
  marker.setName('Marker');
  marker.allowEnabled(true);
  marker.setKey(this.genKey('marker()'));
  this.addChildControl(marker);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Labels
  var labels = new anychart.chartEditorModule.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new anychart.chartEditorModule.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new anychart.chartEditorModule.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Ticks
  var ticks = new anychart.chartEditorModule.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Minor Labels
  var minorLabels = new anychart.chartEditorModule.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Minor Ticks
  var minorTicks = new anychart.chartEditorModule.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  // Title
  var title = new anychart.chartEditorModule.settings.Title(model, 'Title');
  title.allowEnabled(true);
  title.allowEditPosition(false);
  title.allowEditAlign(false);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);
};
