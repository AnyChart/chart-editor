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

  this.allowReset(true);
  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-series-coloring'));
};
goog.inherits(chartEditor.ui.panel.SeriesColoring, chartEditor.ui.PanelZippy);



/** @inheritDoc */
chartEditor.ui.panel.SeriesColoring.prototype.createDom = function() {
  chartEditor.ui.panel.SeriesColoring.base(this, 'createDom');

  var dom = this.getDomHelper();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  console.log(this.getKey());
  // region ==== Header
  this.zippyHeader.getElement().appendChild(
      dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-zippy-title'), this.name));
  // endregion

  // region ==== Content
  var dataMarkers = new chartEditor.ui.panel.Markers(model);
  if (this.seriesType_ === 'marker') {
    dataMarkers.setFillKey('color()');
    dataMarkers.setName(null);
    dataMarkers.allowEnabled(false);
    dataMarkers.setKey(this.getKey());
    this.addChildControl(dataMarkers);

    this.addContentSeparator();
  }
  // endregion
};
