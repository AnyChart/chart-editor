goog.provide('anychart.chartEditorModule.settings.Series');

goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.input.Base');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Markers');
goog.require('anychart.chartEditorModule.settings.Stroke');
goog.require('anychart.chartEditorModule.settings.Title');
goog.require('anychart.chartEditorModule.settings.scales.Base');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string|number} seriesId
 * @param {number} seriesIndex
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.Series = function(model, seriesId, seriesIndex, opt_plotIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.Series.base(this, 'constructor', model, seriesIndex, null, opt_domHelper);

  this.seriesId_ = String(seriesId);

  var stringKey = 'getSeries(\'' + this.seriesId_ + '\')';
  if (goog.isDef(opt_plotIndex)) {
    this.plotIndex_ = opt_plotIndex;
    stringKey = 'plot(' + this.plotIndex_ + ').' + stringKey;
  }

  this.seriesType_ = model.getValue([['dataSettings'], ['mappings', this.getPlotIndex()], [this.index_, 'ctor']]);
  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-settings-panel-series-single'));
};
goog.inherits(anychart.chartEditorModule.settings.Series, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.Series.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Series.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // region ==== Header
  var name = new anychart.chartEditorModule.input.Base('Series name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);

  var lockSeriesNames = model.getValue([['editorSettings'], ['lockSeriesName'], name.getKey()[2]]);
  name.setEnabled(!lockSeriesNames);

  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-chart-editor-series-name-input'));

  var color = new anychart.chartEditorModule.colorPicker.Base();
  color.init(model, this.genKey('color()'));
  this.addHeaderChildControl(color);
  color.addClassName(goog.getCssName('anychart-chart-editor-settings-control-right'));
  // endregion

  // region ==== Content
  var stroke = new anychart.chartEditorModule.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  this.addContentSeparator();

  // Tooltip
  var tooltip = new anychart.chartEditorModule.settings.Title(model, 'Tooltip');
  tooltip.allowEnabled(true);
  tooltip.allowEditPosition(false);
  tooltip.allowEditAlign(false);
  tooltip.setTitleKey('format()');
  tooltip.setKey(this.genKey('tooltip()'));
  this.addChildControl(tooltip);

  this.addContentSeparator();

  // Data labels
  var dataLabels = new anychart.chartEditorModule.settings.Labels(model);
  dataLabels.setName('Data Labels');
  dataLabels.allowEnabled(true);
  dataLabels.setKey(this.genKey('labels()'));
  this.addChildControl(dataLabels);

  this.addContentSeparator();

  // Data markers
  var dataMarkers = new anychart.chartEditorModule.settings.Markers(model);
  dataMarkers.setName('Data Markers');
  dataMarkers.allowEnabled(true);
  dataMarkers.setKey(this.genKey('markers()'));
  this.addChildControl(dataMarkers);

  // Color Scale
  if (this.seriesType_ === 'choropleth') {
    this.addContentSeparator();

    var colorScale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
    colorScale.setKey(this.genKey('colorScale()'));
    this.addChildControl(colorScale);
  }
  // endregion
};
