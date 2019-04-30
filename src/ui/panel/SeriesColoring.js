goog.provide('chartEditor.ui.panel.SeriesColoring');

goog.require('chartEditor.ui.PanelZippy');
// goog.require('chartEditor.ui.control.colorPicker.Base');
// goog.require('chartEditor.ui.control.comboBox.Base');
// goog.require('chartEditor.ui.control.fieldSelect.Base');
// goog.require('chartEditor.ui.control.wrapped.Labeled');
// goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.SeriesColoring = function(model, opt_domHelper) {
  chartEditor.ui.panel.SeriesColoring.base(this, 'constructor', model, 0, 'Coloring', opt_domHelper);

  // this.allowReset(true);
  // this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-series-coloring'));
};
goog.inherits(chartEditor.ui.panel.SeriesColoring, chartEditor.ui.PanelZippy);



/** @inheritDoc */
chartEditor.ui.panel.SeriesColoring.prototype.createDom = function() {
  chartEditor.ui.panel.SeriesColoring.base(this, 'createDom');

  var dom = this.getDomHelper();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // region ==== Header
  this.zippyHeader.getElement().appendChild(
      dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-zippy-title'), this.name));
  // endregion

  // region ==== Content
  this.seriesType_ = model.getValue([['dataSettings'], ['mappings', 0], [this.index_, 'ctor']]);

  // Falling/rising
  if (this.seriesType_ != 'ohlc') {
    var risingFill = new chartEditor.ui.control.colorPicker.Base();
    var risingFillLC = new chartEditor.ui.control.wrapped.Labeled(risingFill, 'Rising Fill');
    risingFillLC.init(model, this.genKey('risingFill()'));
    this.addChildControl(risingFillLC);
  }

  var risingStroke = new chartEditor.ui.panel.Stroke(model, 'Rising Stroke');
  risingStroke.setKey(this.genKey('risingStroke()'));
  this.addChildControl(risingStroke);

  if (this.seriesType_ != 'ohlc') {
    var fallingFill = new chartEditor.ui.control.colorPicker.Base();
    var fallingFillLC = new chartEditor.ui.control.wrapped.Labeled(fallingFill, 'Falling Fill');
    fallingFillLC.init(model, this.genKey('fallingFill()'));
    this.addChildControl(fallingFillLC);
  }

  var fallingStroke = new chartEditor.ui.panel.Stroke(model, 'Falling Stroke');
  fallingStroke.setKey(this.genKey('fallingStroke()'));
  this.addChildControl(fallingStroke);

  this.addContentSeparator();
  // endregion
};
