goog.provide('chartEditor.settings.Grid');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.checkbox.Base");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.input.Palette");
goog.require("chartEditor.settings.Stroke");


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Grid = function(model, name, opt_domHelper) {
  chartEditor.settings.Grid.base(this, 'constructor', model, name, opt_domHelper);

  this.gridExists = false;

  var chartType = model.getModel()['chart']['type'];
  this.isRadarGrid = chartType === 'radar' || chartType === 'polar';

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-grid-single'));
};
goog.inherits(chartEditor.settings.Grid, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.Grid.prototype.createDom = function() {
  chartEditor.settings.Grid.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (!this.isRadarGrid) {
    var drawFirstLine = new chartEditor.checkbox.Base();
    drawFirstLine.setCaption('Draw first line');
    drawFirstLine.init(model, this.genKey('drawFirstLine()'));
    this.addChildControl(drawFirstLine);
  }

  var drawLastLine = new chartEditor.checkbox.Base();
  drawLastLine.setCaption('Draw last line');
  drawLastLine.init(model, this.genKey('drawLastLine()'));
  this.addChildControl(drawLastLine);

  var palette = new chartEditor.input.Palette('Comma separated colors');
  var paletteLC = new chartEditor.controls.LabeledControl(palette, 'Palette');
  paletteLC.init(model, this.genKey('palette()'));
  this.addChildControl(paletteLC);

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
  this.stroke_ = stroke;
};


/** @inheritDoc */
chartEditor.settings.Grid.prototype.onChartDraw = function(evt) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);

  if (!this.isExcluded()) {
    var chart = evt.chart;
    var stringKey = chartEditor.EditorModel.getStringKey(this.key);
    var splittedKey = stringKey.split('.');
    var elementsStat;

    if (splittedKey.length === 1)
      elementsStat = chart['getStat']('chartElements');
    else {
      // stock
      var plotKey = splittedKey[0];
      stringKey = splittedKey[1];
      var plot = /** @type {Object} */(chartEditor.binding.exec(chart, plotKey));
      elementsStat = plot['getStat']('chartElements');
    }

    this.gridExists = !!(stringKey === 'xGrid()' ? elementsStat['grids']['x'] : elementsStat['grids']['y']);
    this.stroke_.exclude(!this.gridExists);

    if (this.gridExists) {
      this.getHandler().unlisten(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
      chartEditor.settings.Grid.base(this, 'onChartDraw', evt);

    } else
      this.setContentEnabled(false);
  }
};
