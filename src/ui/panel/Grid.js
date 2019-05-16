goog.provide('chartEditor.ui.panel.Grid');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.input.Palette');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Grid = function(model, name, opt_domHelper) {
  chartEditor.ui.panel.Grid.base(this, 'constructor', model, name, opt_domHelper);

  this.gridExists = false;

  var chartType = model.getModel()['chart']['type'];
  this.isPolar_ = chartType === 'radar' || chartType === 'polar';

  this.allowEnabled(true);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.Grid, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.Grid.prototype.createDom = function() {
  chartEditor.ui.panel.Grid.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getModel()['chart']['type'];

  if (this.isPolar_) {
    var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale'});
    xScale.init(model, this.genKey('xScale()'));
    this.addChildControl(xScale);

    var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale'});
    yScale.init(model, this.genKey('yScale()'));
    this.addChildControl(yScale);

  } else {
    if (chartType !== 'stock') {
      var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
      scale.init(model, this.genKey('scale()'), void 0, true);
      this.addChildControl(scale);
    }

    var drawFirstLine = new chartEditor.ui.control.checkbox.Base();
    drawFirstLine.setCaption('Draw first line');
    drawFirstLine.init(model, this.genKey('drawFirstLine()'));
    this.addChildControl(drawFirstLine);
  }

  var drawLastLine = new chartEditor.ui.control.checkbox.Base();
  drawLastLine.setCaption('Draw last line');
  drawLastLine.init(model, this.genKey('drawLastLine()'));
  this.addChildControl(drawLastLine);

  var palette = new chartEditor.ui.control.input.Palette('Comma separated colors');
  var paletteLC = new chartEditor.ui.control.wrapped.Labeled(palette, 'Palette');
  paletteLC.init(model, this.genKey('palette()'));
  this.addChildControl(paletteLC);

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
  this.stroke_ = stroke;
};


/** @inheritDoc */
chartEditor.ui.panel.Grid.prototype.onChartDraw = function(evt) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);

  if (!this.isExcluded()) {
    var chart = evt.chart;
    var stringKey = chartEditor.model.Base.getStringKey(this.key);
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
      chartEditor.ui.panel.Grid.base(this, 'onChartDraw', evt);
      this.stroke_.onChartDraw(evt);

    } else {
      this.setContentEnabled(false);
      this.enableContentCheckbox.setChecked(false);
    }
  }
};
