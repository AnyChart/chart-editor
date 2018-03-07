goog.provide('chartEditor.settings.Grid');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.input.Palette');
goog.require('chartEditor.settings.Stroke');


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
};
goog.inherits(chartEditor.settings.Grid, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Grid.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-grid-single');


/** @override */
chartEditor.settings.Grid.prototype.createDom = function() {
  chartEditor.settings.Grid.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, chartEditor.settings.Grid.CSS_CLASS);

  var content = this.getContentElement();
  //var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (!this.isRadarGrid) {
    this.firstLine_ = new chartEditor.checkbox.Base();
    this.firstLine_.setCaption('Draw first line');
    this.addChild(this.firstLine_, true);
  }

  this.lastLine_ = new chartEditor.checkbox.Base();
  this.lastLine_.setCaption('Draw last line');
  this.addChild(this.lastLine_, true);

  var paletteLabel = goog.dom.createDom(
      goog.dom.TagName.LABEL,
      [
        goog.ui.INLINE_BLOCK_CLASSNAME,
        goog.getCssName('anychart-ce-settings-label')
      ],
      'Palette');
  goog.dom.appendChild(content, paletteLabel);
  this.registerLabel(paletteLabel);

  var paletteInput = new chartEditor.input.Palette('Comma separated colors');
  this.addChild(paletteInput, true);
  goog.dom.classlist.add(paletteInput.getElement(), 'input-palette');
  goog.dom.classlist.add(paletteInput.getElement(), 'anychart-ce-settings-control-right');
  this.palette_ = paletteInput;

  goog.dom.appendChild(content, goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-gap')));

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var stroke = new chartEditor.settings.Stroke(model, 'Stroke');
  stroke.exclude(true);
  this.addChild(stroke, true);
  this.stroke_ = stroke;
};


/**
 * Update model keys.
 */
chartEditor.settings.Grid.prototype.updateKeys = function() {
  chartEditor.settings.Grid.base(this, 'updateKeys');
  if (this.isExcluded()) return;

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (this.firstLine_) this.firstLine_.init(model, this.genKey('drawFirstLine()'));
  if (this.lastLine_) this.lastLine_.init(model, this.genKey('drawLastLine()'));
  if (this.palette_) this.palette_.init(model, this.genKey('palette()'));

  if (this.stroke_) this.stroke_.setKey(this.genKey('stroke()'));
};


/** @inheritDoc */
chartEditor.settings.Grid.prototype.onChartDraw = function(evt) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
  if (this.isExcluded()) return;

  var chart = evt.chart;

  if (!this.gridExists) {
    var stringKey = chartEditor.EditorModel.getStringKey(this.key);
    var splittedKey = stringKey.split('.');

    if (splittedKey.length === 1)
      this.gridExists = stringKey === 'xGrid()' ? !!chart['getXGridsCount']() : !!chart['getYGridsCount']();
    else {
      // stock
      var plotKey = splittedKey[0];
      stringKey = splittedKey[1];
      var plot = /** @type {Object} */(chartEditor.binding.exec(chart, plotKey));
      this.gridExists = stringKey === 'xGrid()' ? !!plot['getXGridsCount']() : !!plot['getYGridsCount']();
    }
    this.stroke_.exclude(!this.gridExists);
  }

  if (evt.rebuild && this.gridExists) {
    this.enableContentCheckbox.setValueByTarget(chart);
    this.setContentEnabled(this.enableContentCheckbox.isChecked());

    if (this.firstLine_) this.firstLine_.setValueByTarget(chart);
    this.lastLine_.setValueByTarget(chart);
    this.palette_.setValueByTarget(chart, true);
  } else {
    this.setContentEnabled(false);
  }
};


/** @override */
chartEditor.settings.Grid.prototype.disposeInternal = function() {
  goog.dispose(this.firstLine_);
  this.firstLine_ = null;

  goog.dispose(this.lastLine_);
  this.lastLine_ = null;

  goog.dispose(this.palette_);
  this.palette_ = null;

  goog.dispose(this.stroke_);
  this.stroke_ = null;

  chartEditor.settings.Grid.base(this, 'disposeInternal');
};
