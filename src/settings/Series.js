goog.provide('chartEditor.settings.Series');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.input.Base');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Markers');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.Title');
goog.require('chartEditor.settings.scales.Base');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string|number} seriesId
 * @param {number} seriesIndex
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.Series = function(model, seriesId, seriesIndex, opt_plotIndex, opt_domHelper) {
  chartEditor.settings.Series.base(this, 'constructor', model, seriesIndex, null, opt_domHelper);

  this.seriesId_ = String(seriesId);

  var stringKey = 'getSeries(\'' + this.seriesId_ + '\')';
  if (goog.isDef(opt_plotIndex)) {
    this.plotIndex_ = opt_plotIndex;
    stringKey = 'plot(' + this.plotIndex_ + ').' + stringKey;
  }

  this.seriesType_ = model.getValue([['dataSettings'], ['mappings', this.getPlotIndex()], [this.index_, 'ctor']]);
  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-series-single'));
};
goog.inherits(chartEditor.settings.Series, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.Series.prototype.createDom = function() {
  chartEditor.settings.Series.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.input.Base('Series name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);

  var lockSeriesNames = model.getValue([['editorSettings'], ['lockSeriesName'], name.getKey()[2]]);
  name.setEnabled(!lockSeriesNames);

  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));

  var color = new chartEditor.colorPicker.Base();
  color.init(model, this.genKey('color()'));
  this.addHeaderChildControl(color);
  color.addClassName(goog.getCssName('anychart-ce-settings-control-right'));
  // endregion

  // region ==== Content
  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  this.addContentSeparator();

  // Tooltip
  var tooltip = new chartEditor.settings.Title(model, 'Tooltip');
  tooltip.allowEnabled(true);
  tooltip.allowEditPosition(false);
  tooltip.allowEditAlign(false);
  tooltip.setTitleKey('format()');
  tooltip.setKey(this.genKey('tooltip()'));
  this.addChildControl(tooltip);

  this.addContentSeparator();

  // Data labels
  var dataLabels = new chartEditor.settings.Labels(model);
  dataLabels.setName('Data Labels');
  dataLabels.allowEnabled(true);
  dataLabels.setKey(this.genKey('labels()'));
  this.addChildControl(dataLabels);

  this.addContentSeparator();

  // Data markers
  var dataMarkers = new chartEditor.settings.Markers(model);
  dataMarkers.setName('Data Markers');
  dataMarkers.allowEnabled(true);
  dataMarkers.setKey(this.genKey('markers()'));
  this.addChildControl(dataMarkers);

  // Color Scale
  if (this.seriesType_ === 'choropleth') {
    this.addContentSeparator();

    var colorScale = new chartEditor.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
    colorScale.setKey(this.genKey('colorScale()'));
    this.addChildControl(colorScale);
  }
  // endregion
};
