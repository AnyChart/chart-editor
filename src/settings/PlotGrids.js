goog.provide('anychart.chartEditorModule.settings.PlotGrids');

goog.require('anychart.chartEditorModule.SettingsPanelIndexed');
goog.require('anychart.chartEditorModule.settings.Grid');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelIndexed}
 */
anychart.chartEditorModule.settings.PlotGrids = function(model, opt_plotIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.PlotGrids.base(
      this,
      'constructor',
      model,
      goog.isDef(opt_plotIndex) ? opt_plotIndex : 0,
      null,
      opt_domHelper);

  this.plotIndex_ = opt_plotIndex;

  this.key = [['chart'], ['settings']];
  if (goog.isDef(this.plotIndex_)) {
    this.name = 'Grids (plot ' + this.plotIndex_ + ')';
    this.key.push('plot(' + this.plotIndex_ + ')');

  } else {
    this.name = 'Grids';
  }

  this.allowEnabled(false);
};
goog.inherits(anychart.chartEditorModule.settings.PlotGrids, anychart.chartEditorModule.SettingsPanelIndexed);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.PlotGrids.CSS_CLASS = goog.getCssName('anychart-settings-panel-plot-grids');


/** @override */
anychart.chartEditorModule.settings.PlotGrids.prototype.createDom = function() {
  anychart.chartEditorModule.settings.PlotGrids.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, anychart.chartEditorModule.settings.PlotGrids.CSS_CLASS);
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var xGrid = new anychart.chartEditorModule.settings.Grid(model, 'X Grid');
  xGrid.allowEnabled(true);
  xGrid.setKey(this.genKey('xGrid()'));
  this.addChild(xGrid, true);
  this.xGrid_ = xGrid;

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator')));

  var yGrid = new anychart.chartEditorModule.settings.Grid(model, 'Y Grid');
  yGrid.allowEnabled(true);
  yGrid.setKey(this.genKey('yGrid()'));
  this.addChild(yGrid, true);
  this.yGrid_ = yGrid;
};


/** @inheritDoc */
anychart.chartEditorModule.settings.PlotGrids.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    this.key = [['chart'], ['settings']];
    if (goog.isDef(this.plotIndex_))
      this.key.push('plot(' + this.plotIndex_ + ')');

    // Update keys of children
    if (this.xGrid_) this.xGrid_.setKey(this.genKey('xGrid()'));
    if (this.yGrid_) this.yGrid_.setKey(this.genKey('yGrid()'));
  }

  // Update key of enabled checkbox
  anychart.chartEditorModule.settings.PlotGrids.base(this, 'updateKeys');
};


/** @override */
anychart.chartEditorModule.settings.PlotGrids.prototype.disposeInternal = function() {
  this.xGrid_.dispose();
  this.xGrid_ = null;

  this.yGrid_.dispose();
  this.yGrid_ = null;

  anychart.chartEditorModule.settings.PlotGrids.base(this, 'disposeInternal');
};
