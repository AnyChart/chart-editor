goog.provide('chartEditor.ui.appearanceTabs.ChartTitle');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.ChartTitle = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ChartTitle.base(this, 'constructor', model, 'Chart Title', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.TITLE;

  this.key = [['chart'], ['settings'], 'title()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.ChartTitle, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ChartTitle.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.ChartTitle.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var title = new chartEditor.ui.panel.Title(model, null);
  title.allowEnabled(false);
  title.setPositionKey('orientation()');
  title.setKey([['chart'], ['settings'], 'title()']);
  this.addChildControl(title);
};


